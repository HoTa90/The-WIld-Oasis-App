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
import { useSettings } from "../settings/useSettings.js";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [confirmedPaid, setConfirmedPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { booking, isPending } = useBooking();
	const { settings, isPending: isLoadingSettings } = useSettings();

	useEffect(() => {
		setConfirmedPaid(booking?.has_paid ?? false);
	}, [booking?.has_paid]);
	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();

	console.log(booking);

	if (isPending || isLoadingSettings) return <Spinner />;

	const { id: bookingId, guests, total_price, num_guests, has_breakfast, num_nights } = booking;
	const optionalBreakfastPrice = settings.breakfast_price * Number(num_nights) * Number(num_guests);

	function handleCheckin() {
		if (!confirmedPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					has_breakfast: true,
					extras_price: optionalBreakfastPrice,
					total_price: total_price + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />
			{!has_breakfast && (
				<Box>
					<Checkbox
						id={"breakfast"}
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((b) => !b);
							setConfirmedPaid(false);
						}}>
						Do you want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}
			<Box>
				<Checkbox
					checked={confirmedPaid}
					onChange={() => setConfirmedPaid((p) => !p)}
					id="confirm"
					disabled={confirmedPaid || isCheckingIn}>
					I confirm that {guests.full_name} has paid the total amount of{" "}
					{!addBreakfast
						? formatCurrency(total_price)
						: `${formatCurrency(total_price + optionalBreakfastPrice)} (${formatCurrency(
								total_price
						  )} + ${formatCurrency(optionalBreakfastPrice)})`}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmedPaid || isCheckingIn}>
					Check in booking #{bookingId}
				</Button>
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
