import { useState } from "react";
import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";


function AddCabin() {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<Button onClick={() => setShowModal((prev) => !prev)}>Add new cabin</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateCabinForm onCloseModal={() => setShowModal(false)} />
				</Modal>
			)}
		</div>
	);
}
export default AddCabin;
