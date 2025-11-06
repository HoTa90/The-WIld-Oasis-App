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

	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
	

	const { isPending, data, error } = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getAllBookings({ filter, sortBy, page }),
	});

	const bookings = data?.data ?? [];
	const count = data?.count ?? 0;

	return { isPending, error, bookings, count };
}
