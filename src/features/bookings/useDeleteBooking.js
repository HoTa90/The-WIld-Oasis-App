import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings.js";

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { isPending, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingAPI,
		onSuccess: () => {
			toast.success("Booking was succesfully deleted");
			queryClient.invalidateQueries({
				queryKey: ["bookings"]
			});
		},
		onError: (err) => toast.error(err.message),
	});

	return { isPending, deleteBooking };
}
