import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useNavigate } from "react-router";
import { useCheckout } from "../check-in-out/useCheckout.js";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import Modal from "../../ui/Modal.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isPending } = useBooking();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isPending: isDeleting } = useDeleteBooking();

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isPending) return <Spinner />;
	if (!booking) return <Empty resource={"booking"}/>
	const { status, id } = booking;
	

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{id}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>}

				{status === "checked-in" && (
					<Button
						onClick={() => checkout(id)}
						disabled={isCheckingOut}>
						Check out
					</Button>
				)}
				<Modal>
					<Modal.Open opens={"delete"}>
						<Button $variation={"danger"}>Delete Booking</Button>
					</Modal.Open>
					<Modal.Window name={"delete"}>
						<ConfirmDelete
							resourceName={"booking"}
							disabled={isDeleting}
							onConfirm={() =>
								deleteBooking(id, {
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>

				<Button
					$variation="secondary"
					onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
