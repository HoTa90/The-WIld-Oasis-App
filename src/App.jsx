import styled from "styled-components";
import GlobalStyles from "./styles/GlobelStyles.js";
import Button from "./ui/Button.jsx";
import Heading from "./ui/Heading.jsx";

function App() {
	return (
		<>
			<GlobalStyles />
			<Heading as={"h1"}>this is h1</Heading>
			<Heading as={"h2"}>this is h2</Heading>
			<Heading as={"h3"}>this is h3</Heading>
		</>
	);
}

export default App;
