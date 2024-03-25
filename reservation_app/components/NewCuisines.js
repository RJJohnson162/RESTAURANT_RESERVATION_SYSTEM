import styled from "styled-components";
import Center from "@/components/Center";
import ItemsGrid from "@/components/ItemsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;
const Bg = styled.div`
  background-color: #eeeeee;
  color: #f7418f;
  padding: 10px 0;
`;

export default function NewCuisines({ cuisines }) {
  return (
    <Bg>
      <Center>
        <Title>New Arrivals</Title>
        <ItemsGrid cuisines={cuisines} />
      </Center>
    </Bg>
  );
}
