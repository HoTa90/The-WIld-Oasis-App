import styled from "styled-components";
import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const {  isPending, isAuthenticated } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !isPending) {
			navigate("/login");
		}
	}, [isAuthenticated, navigate, isPending]);

	if (isPending)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAuthenticated) return children;
}
export default ProtectedRoute;
