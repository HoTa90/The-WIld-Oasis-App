import styled from "styled-components";
import Tag from "../../ui/Tag.jsx";
import { Flag } from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import { Link } from "react-router";
import CheckoutButton from "./CheckoutButton.jsx";

const StyledTodayItem = styled.li`
  display: grid;

  grid-template-columns: minmax(9rem, auto) 2rem minmax(8rem, 1fr) minmax(9rem, auto) minmax(10rem, auto);
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    grid-template-columns: minmax(8rem, auto) 2rem 1fr minmax(5rem, auto) minmax(9rem, auto);
    gap: 0.8rem;
    font-size: 1.3rem;
  }

`;

const Guest = styled.div`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0; /* Allow text truncation */
`;

const NightsInfo = styled.div`
  white-space: nowrap;
`;

function TodayItem({activity}) {
  const {id, status, guests, num_nights} = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.country_flag} alt={`Flag of ${guests.country}`}/>
      <Guest>{guests.full_name}</Guest>
      <NightsInfo>{num_nights} nights</NightsInfo>
      
      {status === "unconfirmed" && (
        <Button size="small" $variation="primary" as={Link} to={`/checkin/${id}`}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id}/>}
    </StyledTodayItem>
  );
}

export default TodayItem;