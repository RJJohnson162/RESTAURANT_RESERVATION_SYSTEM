import mongoose, { model, models, Schema } from "mongoose";

const SeatCategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "SeatCategory" },
  properties: [{ type: Object }],
});

export const SeatCategory =
  models?.SeatCategory || model("SeatCategory", SeatCategorySchema);
