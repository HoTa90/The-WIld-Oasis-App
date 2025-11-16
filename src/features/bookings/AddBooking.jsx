import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateBookingForm from "./CreateBookingForm.jsx";

function AddBooking() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="create-booking">
					<Button
						size="medium"
						$variation="primary">
						Add new booking
					</Button>
				</Modal.Open>

				<Modal.Window name="create-booking">
					<CreateBookingForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddBooking;
