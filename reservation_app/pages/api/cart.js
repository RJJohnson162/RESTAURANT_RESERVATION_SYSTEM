import { mongooseConnect } from "@/lib/mongoose";
import { Cuisine } from "@/models/Cuisine";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  try {
    const cuisines = await Cuisine.find({ _id: { $in: ids } });
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
