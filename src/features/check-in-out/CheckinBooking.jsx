import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useCheckin } from "./useCheckin.js";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmedPaid, setConfirmedPaid] = useState(false);
	const { booking, isPending } = useBooking();

	useEffect(() => {
		setConfirmedPaid(booking?.has_paid ?? false);
	}, [booking?.has_paid]);
	const moveBack = useMoveBack();
	const {checkin, isCheckingIn} = useCheckin();

	if (isPending) return <Spinner />;

	const { id: bookingId, guests, total_price, num_guests, has_breakfast, num_nights } = booking;

	function handleCheckin() {
		if (!confirmedPaid) return
		checkin(bookingId)
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			<Box>
				<Checkbox
					checked={confirmedPaid}
					onChange={() => setConfirmedPaid((p) => !p)}
					id={"confirm"}
					disabled={confirmedPaid || isCheckingIn}>
					confirm that {guests.full_name} has paid the total amount of {formatCurrency(total_price)}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmedPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
				<Button
					$variation="secondary"
					onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
