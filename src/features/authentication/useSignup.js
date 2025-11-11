import { useMutation } from "@tanstack/react-query";
import { signup as signuApi } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signup, isPending } = useMutation({
		mutationFn: signuApi,
		onSuccess: () => {
			toast.success("Account successfully created. Please verify the new account from your email address.");
		},
		onError: (error) => {
			console.log(error);
			toast.error(error.message);
		},
	});

	return { signup, isPending };
}
