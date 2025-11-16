import ReactSelect from "react-select";
import styled from "styled-components";

const StyledReactSelect = styled(ReactSelect)`
	font-size: 1.4rem;
	font-weight: 500;
`;

function Select({ options, value, onChange, type, ...props }) {
	// Find the selected option object
	const selectedOption = options.find((opt) => opt.value === value) || null;

	// Handle change - extract just the value
	const handleChange = (option) => {
		// Create a synthetic event to match native select behavior
		const syntheticEvent = {
			target: {
				value: option ? option.value : "",
			},
		};
		onChange(syntheticEvent);
	};

	const borderColor = type === "white" ? "var(--color-grey-300)" : "var(--color-grey-100)";

	return (
		<StyledReactSelect
			options={options}
			value={selectedOption}
			onChange={handleChange}
			maxMenuHeight={null}
			menuShouldScrollIntoView={false}
			styles={{
				control: (base) => ({
					...base,
					backgroundColor: "var(--color-grey-0)",
					borderColor: borderColor,
					borderRadius: "var(--border-radius-sm)",
					boxShadow: "var(--shadow-sm)",
					minHeight: "40px",
					height: "40px",
					fontSize: "1.4rem",
					transition: "background-color 0.3s, border-color 0.3s, box-shadow 0.3s",
					"&:hover": {
						borderColor: borderColor,
					},
					outline: "none",
				}),
				valueContainer: (base) => ({
					...base,
					padding: "0.8rem 1.2rem",
					height: "40px",
				}),
				input: (base) => ({
					...base,
					margin: 0,
					padding: 0,
				}),
				indicatorsContainer: (base) => ({
					...base,
					height: "40px",
				}),
				indicatorSeparator: () => ({
					display: "none",
				}),
				singleValue: (base) => ({
					...base,
					color: "var(--color-grey-700)",
					transition: "color 0.3s",
				}),
				placeholder: (base) => ({
					...base,
					color: "var(--color-grey-400)",
					transition: "color 0.3s",
				}),
				menu: (base) => ({
					...base,
					backgroundColor: "var(--color-grey-0)",
					borderRadius: "var(--border-radius-sm)",
					border: `1px solid ${borderColor}`,
					overflow: "hidden",
					transition: "background-color 0.3s, border-color 0.3s",
				}),
				menuList: (base) => ({
					...base,
					maxHeight: "none",
					padding: 0,
				}),
				option: (base, state) => ({
					...base,
					backgroundColor: state.isSelected
						? "var(--color-brand-600)"
						: state.isFocused
						? "var(--color-grey-100)"
						: "var(--color-grey-0)",
					color: state.isSelected ? "var(--color-brand-50)" : "var(--color-grey-700)",
					padding: "0.8rem 1.2rem",
					fontSize: "1.4rem",
					transition: "background-color 0.2s, color 0.2s",
					"&:active": {
						backgroundColor: "var(--color-brand-600)",
					},
				}),
			}}
			{...props}
		/>
	);
}

export default Select;
