import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

// function AddCabin() {
// 	const [showModal, setShowModal] = useState(false);

// 	return (
// 		<div>
// 			<Button onClick={() => setShowModal((prev) => !prev)}>Add new cabin</Button>
// 			{showModal && (
// 				<Modal onClose={() => setShowModal(false)}>
// 					<CreateCabinForm onCloseModal={() => setShowModal(false)} />
// 				</Modal>
// 			)}
// 		</div>
// 	);
// }
export default AddCabin;
