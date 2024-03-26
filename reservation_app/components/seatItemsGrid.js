import styled from "styled-components";
import SeatItemBox from "@/components/seatItemBox";

const StyledItemsGrid = styled.div`
  display: grid;
  place-items: center;
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

export default function SeatItemsGrid({ seatOptions }) {
  return (
    <StyledItemsGrid>
      {seatOptions?.length > 0 &&
        seatOptions.map((seat) => <SeatItemBox key={seat._id} {...seat} />)}
    </StyledItemsGrid>
  );
}
