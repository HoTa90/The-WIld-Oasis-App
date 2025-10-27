import styled from "styled-components";
import GlobalStyles from "./styles/GlobelStyles.js";

const H1 = styled.h1`
	font-size: 30px;
	font-weight: 600;
	background-color: blue;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<H1>Hello</H1>;
		</>
	);
}

export default App;
