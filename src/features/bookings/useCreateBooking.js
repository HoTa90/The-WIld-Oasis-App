import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings.js";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending: isCreating } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully created!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      queryClient.invalidateQueries({ queryKey: ["stays-today"] }); 
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message || "Booking could not be created");
    },
  });

  return { createBooking, isCreating };
}
