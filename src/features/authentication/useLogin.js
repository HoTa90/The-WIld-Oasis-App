import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();
	const { mutate: login, isPending: isLogging } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => {
			navigate("/dashboard");
		},
		onError: (err) => {
			console.log("ERROR", err);
			toast.error("The email or password are incorrect!");
		},
	});

	return { login, isLogging };
}
