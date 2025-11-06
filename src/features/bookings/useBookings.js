import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router";

export function useBookings() {

	const [searchParams] = useSearchParams()

	const filterValue = searchParams.get("status")
	const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue}


	const {
		isPending,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter],
		queryFn: () =>  getAllBookings({filter}),
	});

	return { isPending, error, bookings };
}
