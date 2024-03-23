import { SeatOptions } from "@/models/seatOptions";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await SeatOptions.findOne({ _id: req.query.id }));
    } else {
      res.json(await SeatOptions.find());
    }
  }

  if (method === "POST") {
    const { title, description, tally, images, category, properties } =
      req.body;
    const SeatingOptionsDoc = await SeatOptions.create({
      title,
      description,
      tally,
      images,
      category,
      properties,
    });
    res.json(SeatingOptionsDoc);
  }

  if (method === "PUT") {
    const { title, description, tally, images, category, properties, _id } =
      req.body;
    await SeatOptions.updateOne(
      { _id },
      { title, description, tally, images, category, properties }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await SeatOptions.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
