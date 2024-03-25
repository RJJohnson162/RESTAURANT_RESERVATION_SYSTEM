import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Cuisine } from "@/models/Cuisine";
import { Category } from "@/models/Categories";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import NewCuisines from "@/components/NewCuisines";
import styled from "styled-components";

const Bg = styled.div`
  background-color: #eeeeee;
  color: #eeeeee;
  padding: 0;
  min-height: 100vh;
`;

export default function HomePage({ featuredCuisine, newCuisines }) {
  return (
    <Bg>
      <Center>
        <Header />
        <Featured cuisine={featuredCuisine} />
        <NewCuisines cuisines={newCuisines} />
      </Center>
    </Bg>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  // Fetch a random cuisine
  const randomProduct = await Cuisine.aggregate([{ $sample: { size: 1 } }]);
  const featuredCuisine = randomProduct[0];

  // Fetch new cuisines
  const newCuisines = await Cuisine.find({}, null, {
    sort: { _id: -1 },
    limit: 12,
  });

  return {
    props: {
      featuredCuisine: JSON.parse(JSON.stringify(featuredCuisine)),
      newCuisines: JSON.parse(JSON.stringify(newCuisines)),
    },
  };
}
