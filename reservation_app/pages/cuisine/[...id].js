import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Cuisine } from "@/models/Cuisine";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ItemImages from "@/components/ItemImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
  color: #f7418f;
`;
const Bg = styled.div`
  background-color: #eeeeee;
  color: #00000;
  padding: 50px 0;
  min-height: 100vh;
`;

export default function ItemPage({ cuisine }) {
  const { addCuisine } = useContext(CartContext);
  return (
    <>
      <Header />
      <Bg>
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ItemImages images={cuisine.images} />
            </WhiteBox>
            <div>
              <Title>{cuisine.title}</Title>
              <p>{cuisine.description}</p>
              <PriceRow>
                <div>
                  <Price>Kshs. {cuisine.price}</Price>
                </div>
                <div>
                  <Button
                    primary={1}
                    outline={1}
                    onClick={() => addCuisine(cuisine._id)}
                  >
                    <CartIcon />
                    Add to cart
                  </Button>
                </div>
              </PriceRow>
            </div>
          </ColWrapper>
        </Center>
      </Bg>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const cuisine = await Cuisine.findById(id);
  return {
    props: {
      cuisine: JSON.parse(JSON.stringify(cuisine)),
    },
  };
}
