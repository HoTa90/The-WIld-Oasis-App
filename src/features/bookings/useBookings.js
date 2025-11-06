import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router";

export function useBookings() {
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get("status");
	const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

	const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };


	const {
		isPending,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getAllBookings({ filter, sortBy }),
	});

	return { isPending, error, bookings };
}
