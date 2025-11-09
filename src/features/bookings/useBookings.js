import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants.js";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get("status");
	const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

	const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	const {
		isPending,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getAllBookings({ filter, sortBy, page }),
		placeholderData: keepPreviousData,
	});

	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
		});
	}

	return { isPending, error, bookings, count };
}
