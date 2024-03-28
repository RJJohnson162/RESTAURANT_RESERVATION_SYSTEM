import { mongooseConnect } from "@/lib/mongoose";
import { Reservation } from "@/models/Reservation";

export default async function handler(req, res) {
  await mongooseConnect();
  const reservations = await Reservation.find().sort({ createdAt: -1 });
  res.json(reservations);
}
