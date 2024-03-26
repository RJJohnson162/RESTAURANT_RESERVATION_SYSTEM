import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { SeatOptions } from "@/models/seatOptions";
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

export default function ItemPage({ seats }) {
  const { addSeat } = useContext(CartContext);
  return (
    <>
      <Header />
      <Bg>
        <Center>
          <ColWrapper>
            <WhiteBox>
              <ItemImages images={seats.images} />
            </WhiteBox>
            <div>
              <Title>{seats.title}</Title>
              <p>{seats.description}</p>
              <PriceRow>
                <div>
                  <Price>Kshs.{seats.price}</Price>
                </div>
                <div>
                  <Button
                    primary={1}
                    outline={1}
                    onClick={() => addSeat(seats._id)}
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
  const seats = await SeatOptions.findById(id);
  return {
    props: {
      seats: JSON.parse(JSON.stringify(seats)),
    },
  };
}
