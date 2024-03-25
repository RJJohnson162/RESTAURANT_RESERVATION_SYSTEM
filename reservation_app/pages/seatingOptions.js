import styled from "styled-components";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { SeatCategory } from "@/models/seatCategories";
import { SeatOptions } from "@/models/seatOptions";
import Center from "@/components/Center";
import { useState, useEffect } from "react";
import SeatItemsGrid from "@/components/seatItemsGrid";

const Bg = styled.div`
  background-color: #eeeeee;
  color: #fff;
  padding: 0;
  min-height: 100vh;
  padding-bottom: 20px;
`;

const Container = styled.div`
  overflow: hidden;
  display: flex;
  position: sticky;
  top: 65px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  z-index: 2;
  background-color: #eeeeee;
  overflow-x: auto;
  cursor: pointer;
  margin-bottom: 20px;
  max-width: calc(100% - 40px);
  @media screen and (max-width: 667px) {
    top: 70px;
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  @media screen and (max-width: 542px) {
    max-width: 300px;
  }
  @media screen and (min-width: 543px) and (max-width: 845px) {
    max-width: 550px;
  }
`;

const CategoryBox = styled.span`
  width: auto;
  white-space: nowrap;
  padding: 5px 10px;
  color: ${(props) => (props.active ? "#fff" : "#F7418F")};
  border-bottom: ${(props) => (props.active ? "2px solid #A0153E" : "")};
  border-left: ${(props) =>
    props.active ? "1px solid #A0153E" : "1px solid  #F7418F"};
  background: ${(props) =>
    props.active ? "rgba(247,65,143,.9)" : "rgba(247,65,143,.3)"};
  border-radius: 30px;
  transition: ease-in-out 0.2s;
  &:not(:first-child) {
    margin-left: 3px;
  }
  &:hover {
    border-left: 1px solid #000000;
    border-bottom: 2px solid #000000;
    color: #ffffff;
    background: rgba(247, 65, 143, 0.9);
  }
`;

export default function SeatsPage({
  seatCategory,
  seatOptions,
  selectedSeatCategoryId,
}) {
  const [selectedCategory, setSelectedCategory] = useState(
    selectedSeatCategoryId
  );

  useEffect(() => {
    if (!selectedSeatCategoryId && seatCategory.length > 0) {
      setSelectedCategory(seatCategory[0]._id.toString());
    }
  }, [selectedSeatCategoryId, seatCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter seatOptions based on selected category
  const filteredSeatOptions = seatOptions.filter(
    (option) => option.category.toString() === selectedCategory
  );

  return (
    <Bg>
      <Center>
        <Header />
        <Container>
          <StyledDiv>
            {seatCategory.map((category) => (
              <CategoryBox
                key={category._id}
                active={selectedCategory === category._id.toString()}
                onClick={() => handleCategoryClick(category._id.toString())}
              >
                {category.name}
              </CategoryBox>
            ))}
          </StyledDiv>
        </Container>
        <SeatItemsGrid seatOptions={filteredSeatOptions} />
      </Center>
    </Bg>
  );
}

export async function getServerSideProps() {
  try {
    await mongooseConnect();
    const seatCategory = await SeatCategory.find({}, null, {
      sort: { _id: -1 },
    });
    const seatOptions = await SeatOptions.find({}, null, { sort: { _id: -1 } });

    let selectedSeatCategoryId = null;
    if (seatCategory.length > 0) {
      selectedSeatCategoryId = seatCategory[0]._id.toString();
    }

    return {
      props: {
        seatCategory: JSON.parse(JSON.stringify(seatCategory)),
        seatOptions: JSON.parse(JSON.stringify(seatOptions)),
        selectedSeatCategoryId,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        seatCategory: [],
        seatOptions: [],
        selectedSeatCategoryId: null,
      },
    };
  }
}
