import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import styled from "styled-components";

// Styled components
const Card = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  background-image: linear-gradient(
    180deg,
    rgba(0, 22, 56, 0.5),
    rgb(100, 100, 50, 0.5)
  );
  padding: 4px;
  width: 100%;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
  backdrop-filter: blur(2px);
  margin-bottom: 10px;
  @media screen and (min-width: 540px) and (max-width: 821px) {
    width: 100%;
  }
  h2 {
    color: white;
    font-weight: bold;
    text-shadow: 0 2px 2px rgba(255, 100, 10, 0.5);
  }
  h3 {
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  place-items: center;
  gap: 10px;
  overflow-y: auto;
  max-height: 86vh;
  @media screen and (min-width: 540px) and (max-width: 821px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  @media screen and (min-width: 821px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Container = styled.div`
  background-image: url("/sd-et-dining-inside-out-20180801.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  width: 100%;
  margin-top: 10px;
`;

export default function Home() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seatCategories, setSeatCategories] = useState([]);
  const [seatOptions, setSeatOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          categoriesResponse,
          cuisineResponse,
          reservationsResponse,
          seatCategoriesResponse,
          seatOptionsResponse,
        ] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/cuisine"),
          axios.get("/api/reservations"),
          axios.get("/api/seatCategories"),
          axios.get("/api/seatOptions"),
        ]);

        setCategories(categoriesResponse.data);
        setCuisine(cuisineResponse.data);
        setReservations(reservationsResponse.data);
        setSeatCategories(seatCategoriesResponse.data);
        setSeatOptions(seatOptionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col mb-2">
        <div className="text-primary flex justify-between">
          <h1 className="text-primary">
            Hello, <b>{session?.user?.name}</b>
          </h1>

          <div className="flex bg-primary gap-1 text-white rounded-full overflow-hidden">
            <img
              src={session?.user?.image}
              alt=""
              className="w-11 h-11 rounded-full border-2 border-violet-100"
            />
            <span className="px-2 pt-2">
              <b>{session?.user?.name}</b>
            </span>
          </div>
        </div>

        <Container>
          <Grid>
            <Card>
              <h1 className="text-highlight font-bold">Cuisine variety</h1>
              {loading ? (
                <DotLoader color="#00CED1" loading={loading} size={50} />
              ) : (
                <h2 className="text-4xl">{categories.length}</h2>
              )}
              <h3>Diversity is our Priority</h3>
            </Card>

            <Card>
              <h1 className="text-highlight font-bold">Foods available</h1>
              {loading ? (
                <DotLoader color="#00CED1" loading={loading} size={50} />
              ) : (
                <h2 className="text-4xl">{cuisine.length}</h2>
              )}
              <h3>Menu Choices</h3>
            </Card>

            <Card>
              <h1 className="text-highlight font-bold">Seating Arrangements</h1>
              {loading ? (
                <DotLoader color="#00CED1" loading={loading} size={50} />
              ) : (
                <h2 className="text-4xl">{seatOptions.length}</h2>
              )}
              <h3>Enjoy Your High-end Taste</h3>
            </Card>

            <Card>
              <h1 className="text-highlight font-bold">Seat Categories</h1>
              {loading ? (
                <DotLoader color="#00CED1" loading={loading} size={50} />
              ) : (
                <h2 className="text-4xl">{seatCategories.length}</h2>
              )}
              <h3>Different Gauges of Comfort</h3>
            </Card>

            <Card>
              <h1 className="text-highlight font-bold">Placed Reservations</h1>
              {loading ? (
                <DotLoader color="#00CED1" loading={loading} size={50} />
              ) : (
                <h2 className="text-4xl">{reservations.length}</h2>
              )}
              <h3>Still Pending</h3>
            </Card>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
}
