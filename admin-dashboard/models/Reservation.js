import { model, models, Schema } from "mongoose";

const ReservationSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    phone: String,
    city: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Reservations =
  models?.Reservations || model("Reservations", ReservationSchema);
