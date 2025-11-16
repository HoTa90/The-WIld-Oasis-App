import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	overflow-y: auto; 
	overflow-x: hidden; 
	transform: translateZ(0);
	will-change: background-color;

	/* Custom scrollbar styling */
	&::-webkit-scrollbar {
		width: 1rem;
	}

	&::-webkit-scrollbar-track {
		background: var(--color-grey-100);
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: var(--color-grey-400);
		border-radius: 10px;
		transition: background 0.3s;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: var(--color-grey-500);
	}

	
	scrollbar-width: thin;
	scrollbar-color: var(--color-grey-400) var(--color-grey-100);
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
	width: 100%;
`;

export default function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}