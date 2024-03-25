import { model, models, Schema } from "mongoose";

const ReservationSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Reservation =
  models?.Reservation || model("Reservation", ReservationSchema);