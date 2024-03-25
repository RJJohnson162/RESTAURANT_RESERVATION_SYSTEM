import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ItemsWrapper = styled.div`
  box-shadow: 10px 10px 10px #b5c0d0, -5px -5px 20px #b5c0d0;
  padding: 10px;
  border-radius: 15px;
  background-color: #eeeeee;
  transition: ease 1s;
  &:hover {
    box-shadow: 10px 10px 10px #b5c0d0, -5px -5px 20px #b5c0d0;
    transform: scale(1.02) translateY(-1px) translateX(-1px);
  }
`;

const BlackBox = styled(Link)`
  background-color: transparent;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  div {
    width: 100%;
    height: 100%;
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: #f7418f;
  text-decoration: none;
  margin: 0;
`;

const ItemInfoBox = styled.div`
  margin-top: 5px;
  Title {
    flex-wrap: no-wrap;
  }
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  color: #f7418f;
  padding: 5px;
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ItemBox({ _id, title, price, images }) {
  const { addCuisine } = useContext(CartContext);
  const url = "/cuisine/" + _id;
  return (
    <ItemsWrapper>
      <BlackBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </BlackBox>
      <ItemInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>Kshs. {price}</Price>
          <Button block onClick={() => addCuisine(_id)} primary>
            <CartIcon />
            Add to cart
          </Button>
        </PriceRow>
      </ItemInfoBox>
    </ItemsWrapper>
  );
}
