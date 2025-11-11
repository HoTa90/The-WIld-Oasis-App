import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import { useLogout } from "./useLogout.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function LogOut() {
	const { isPending, logout } = useLogout();

	return (
		<ButtonIcon
			disabled={isPending}
			onClick={logout}>
			{!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
		</ButtonIcon>
	);
}
export default LogOut;
