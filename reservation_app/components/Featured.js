import { useContext } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import { CartContext } from "@/components/CartContext";

const Bg = styled.div`
  background-color: #f7418f;
  color: #eeeeee;
  padding: 50px 0;
  background-attachment: fixed;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #eeeeee;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    Column{
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      ImageWrapper{
        img{
          max-width: 100%;
          max-height: 100%;
          border-radius: 10px;
          object-fit: cover;
        }
      }
    }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.span`
  width: 100%;
  height: 400px;

  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ cuisine }) {
  const { addCuisine } = useContext(CartContext);

  const addFeaturedToCart = () => {
    addCuisine(cuisine._id);
  };

  return (
    <Bg>
      <ColumnsWrapper>
        <Column>
          <div>
            <Title>{cuisine.title}</Title>
            <Desc>{cuisine.description}</Desc>
            <ButtonsWrapper>
              <ButtonLink
                href={`/cuisine/${cuisine._id}`}
                outline={0}
                primary={1}
              >
                Read more
              </ButtonLink>
              <Button primary={1} outline={1} onClick={addFeaturedToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonsWrapper>
          </div>
        </Column>
        <Column>
          <ImageWrapper>
            <img src={cuisine.images?.[0] || ""} alt={cuisine.title} />
          </ImageWrapper>
        </Column>
      </ColumnsWrapper>
    </Bg>
  );
}
