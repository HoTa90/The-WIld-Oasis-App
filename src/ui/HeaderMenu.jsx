import styled from "styled-components"
import LogOut from "../features/authentication/LogOut.jsx"
import ButtonIcon from "./ButtonIcon.jsx"
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router"

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`


export default function HeaderMenu() {
	const navigate = useNavigate()
  return (
	<StyledHeaderMenu>
		<li>
			<ButtonIcon onClick={() => navigate("/account")}>
				<HiOutlineUser/>
			</ButtonIcon>
		</li>
		<li>
			<LogOut/>
		</li>
	</StyledHeaderMenu>
  )
}