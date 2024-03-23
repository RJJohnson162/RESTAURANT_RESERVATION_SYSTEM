import { Cuisine } from "@/models/Cuisine";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Cuisine.findOne({ _id: req.query.id }));
    } else {
      res.json(await Cuisine.find());
    }
  }

  if (method === "POST") {
    const { title, description, price, images, category, properties } =
      req.body;
    const cuisineDoc = await Cuisine.create({
      title,
      description,
      price,
      images,
      category,
      properties,
    });
    res.json(cuisineDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, category, properties, _id } =
      req.body;
    await Cuisine.updateOne(
      { _id },
      { title, description, price, images, category, properties }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Cuisine.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
