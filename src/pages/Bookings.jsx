import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import CreateBookingForm from "../features/bookings/CreateBookingForm.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All bookings</Heading>
				<BookingTableOperations/>
			</Row>

			<BookingTable />
			<CreateBookingForm/>
		</>
	);
}

export default Bookings;
