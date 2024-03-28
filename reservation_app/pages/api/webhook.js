import { mongooseConnect } from "@/lib/mongoose";
import { buffer } from "micro";
import { Reservation } from "@/models/Reservation";
const stripe = require("stripe")(process.env.STRIPE_SK);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const orderId = session.metadata.orderId;
        const paid = session.payment_status === "paid";
        if (orderId && paid) {
          await Reservation.findByIdAndUpdate(orderId, {
            paid: true,
          });
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("ok");
  } catch (error) {
    console.error("Error handling webhook event:", error);
    res.status(500).send("Error handling webhook event");
  }
}

export const config = {
  api: { bodyParser: false },
};
