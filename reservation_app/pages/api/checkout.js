import { mongooseConnect } from "@/lib/mongoose";
import { Cuisine } from "@/models/Cuisine";
import { Reservation } from "@/models/Reservation";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }
  const { name, email, city, postalCode, streetAddress, country, cartItems } =
    req.body;
  await mongooseConnect();
  const itemIds = cartItems;
  const uniqueIds = [...new Set(itemIds)];
  const itemsInfo = await Cuisine.find({ _id: uniqueIds });

  let line_items = [];
  for (const itemId of uniqueIds) {
    const itemInfo = itemsInfo.find((p) => p._id.toString() === itemId);
    const quantity = itemIds.filter((id) => id === itemId)?.length || 0;
    if (quantity > 0 && itemInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "KES",
          Item_data: { name: itemInfo.title },
          unit_amount: quantity * itemInfo.price * 100,
        },
      });
    }
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
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: reservationDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}
