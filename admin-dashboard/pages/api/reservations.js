import { mongooseConnect } from "@/lib/mongoose";
import { Reservations } from "@/models/Reservation";

export default async function handler(req, res) {
  await mongooseConnect();
  const orders = await Reservations.find().sort({ createdAt: -1 });
  res.json(orders);
}
