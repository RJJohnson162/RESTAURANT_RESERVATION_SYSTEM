import mongoose, { model, Schema, models } from "mongoose";

const seatOptionSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    tally: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

export const SeatOptions =
  models.SeatOptions || model("SeatOptions", seatOptionSchema);
