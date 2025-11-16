import AddBooking from "../features/bookings/AddBooking.jsx";
import BookingTable from "../features/bookings/BookingTable.jsx";
import BookingTableOperations from "../features/bookings/BookingTableOperations.jsx";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All bookings</Heading>
				<BookingTableOperations />
			</Row>

			<Row>
				<BookingTable />
				<AddBooking />
			</Row>
		</>
	);
}

export default Bookings;
