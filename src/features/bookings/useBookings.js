import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";

export function useBookings() {
	const {
		isPending,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings"],
		queryFn: getAllBookings,
	});

	return { isPending, error, bookings };
}
