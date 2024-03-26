import styled from "styled-components";
import ItemBox from "@/components/ItemBox";

const StyledItemsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  @media screen and (min-width: 540px) and (max-width: 821px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
  }
  @media screen and (min-width: 821px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ItemsGrid({ cuisines }) {
  return (
    <StyledItemsGrid>
      {cuisines?.length > 0 &&
        cuisines.map((cuisine) => <ItemBox key={cuisine._id} {...cuisine} />)}
    </StyledItemsGrid>
  );
}
