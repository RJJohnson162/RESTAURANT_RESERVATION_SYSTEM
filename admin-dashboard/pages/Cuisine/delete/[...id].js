import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  background-image: linear-gradient(
    180deg,
    rgba(0, 22, 56, 6),
    rgb(255, 200, 0) 70%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;
  margin-left: 250px;
  height: 250px;
  width: 450px;
  padding: 3px;
  border-radius: 8px;
  overflow: hidden; /* Ensure contents do not spill past */
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  place-items: center;
  padding: 2px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 80%;
  width: 100%;
  border-radius: 8px;
`;

const Decor = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1em;
  line-height: normal;
  color: white;
  text-shadow: 0 0 10px black;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  backdrop-filter: blur(1px);
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    border-bottom: 1px solid #fff;
    padding-bottom: 10px;
  }
  span {
    display: grid;
    place-items: center;
    max-height: 150px;
    overflow-y: auto; /* Enable vertical scrolling */
    text-overflow: ellipsis;
    white-space: wrap;
  }
`;

export default function DeleteProductPage() {
  const router = useRouter();
  const [cuisineInfo, setCuisineInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/cuisine?id=" + id).then((response) => {
      setCuisineInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push("/cuisine");
  }

  async function deleteCuisine() {
    await axios.delete("/api/cuisine?id=" + id);
    goBack();
  }

  return (
    <Layout>
      {cuisineInfo && (
        <Wrapper>
          <h1 className="text-center text-amber-300">
            Do you really want to delete &nbsp;&quot;{cuisineInfo.title}
            &quot;?
          </h1>
          <Grid className="bg-black bg-opacity-50">
            <Desc className="bg-primary bg-opacity-70 text-white flex flex-col items-center justify-center h-full w-full  rounded-lg">
              <h2 className="border-white">Cuisine description</h2>
              <span>{cuisineInfo.description}</span>
            </Desc>
            <Decor>
              <Image src={cuisineInfo.images[0]} alt="Cuisine photo" />
              <ButtonsWrapper className="bg-primary bg-opacity-40">
                <button onClick={deleteCuisine} className="btn-default">
                  Yes
                </button>
                <button
                  className="btn-red hover:bg-highlight hover:text-primary"
                  onClick={goBack}
                >
                  NO
                </button>
              </ButtonsWrapper>
            </Decor>
          </Grid>
        </Wrapper>
      )}
    </Layout>
  );
}
