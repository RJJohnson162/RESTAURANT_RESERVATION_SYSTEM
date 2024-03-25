import styled from "styled-components";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Categories";
import { Cuisine } from "@/models/Cuisine";
import Center from "@/components/Center";
import { useState } from "react";
import ItemsGrid from "@/components/ItemsGrid";

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

export default function CategoriesPage({
  categories,
  cuisines,
  selectedCategoryId,
}) {
  // Set the default category to the first category ID if selectedCategoryId is null
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryId || (categories.length > 0 ? categories[0]._id : null)
  );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter cuisines based on the selected category
  const filteredCuisines = cuisines.filter(
    (cuisine) => cuisine.category.toString() === selectedCategory
  );

  return (
    <Bg>
      <Center>
        <Header />
        <Container>
          <StyledDiv>
            {categories.map((category) => (
              <CategoryBox
                key={category._id}
                active={selectedCategory === category._id}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </CategoryBox>
            ))}
          </StyledDiv>
        </Container>
        <ItemsGrid cuisines={filteredCuisines} />
      </Center>
    </Bg>
  );
}

export async function getServerSideProps() {
  try {
    await mongooseConnect();
    const categories = await Category.find({}, null, { sort: { _id: -1 } });
    const cuisines = await Cuisine.find({}, null, { sort: { _id: -1 } });

    // Find the first category with associated cuisines
    let selectedCategoryId = null;
    const firstCategoryWithCuisines = categories.find((category) =>
      cuisines.some((c) => c.category.toString() === category._id)
    );
    if (firstCategoryWithCuisines) {
      selectedCategoryId = firstCategoryWithCuisines._id;
    }

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
        cuisines: JSON.parse(JSON.stringify(cuisines)),
        selectedCategoryId,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);

    return {
      props: {
        categories: [],
        cuisines: [],
        selectedCategoryId: null,
      },
    };
  }
}
