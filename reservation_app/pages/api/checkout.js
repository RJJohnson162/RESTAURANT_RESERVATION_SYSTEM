import { mongooseConnect } from "@/lib/mongoose";
import { Cuisine } from "@/models/Cuisine";
import { SeatOptions } from "@/models/seatOptions";
import { Reservation } from "@/models/Reservation";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error("Only POST requests are allowed");
    }

    const { name, email, city, postalCode, streetAddress, country, cartData } =
      req.body;

    await mongooseConnect();

    const { cuisines, seats } = cartData;
    const cuisineIds = [...new Set(cuisines)];
    const seatIds = [...new Set(seats)];

    const [cuisineItems, seatItems] = await Promise.all([
      Cuisine.find({ _id: cuisineIds }),
      SeatOptions.find({ _id: seatIds }),
    ]);

    const line_items = [];

    // Function to add items to line_items
    const addItemToLineItems = (items, id, quantity) => {
      const item = items.find((item) => item._id.toString() === id);
      if (item && quantity > 0) {
        line_items.push({
          quantity,
          price_data: {
            currency: "KES",
            product_data: { name: item.title },
            unit_amount: quantity * item.price * 100,
          },
        });
      }
    };

    // Add cuisine items to line_items
    cuisineIds.forEach((id) => {
      const quantity = cuisines.filter((cuisineId) => cuisineId === id).length;
      addItemToLineItems(cuisineItems, id, quantity);
    });

    // Add seat items to line_items
    seatIds.forEach((id) => {
      const quantity = seats.filter((seatId) => seatId === id).length;
      addItemToLineItems(seatItems, id, quantity);
    });

    if (line_items.length === 0) {
      throw new Error("No items in the cart");
    }

    const reservationDoc = await Reservation.create({
      line_items,
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
      cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
      metadata: { orderId: reservationDoc._id.toString(), test: "ok" },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("An error occurred while processing the payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
