import { useSearchParams } from "react-router";
import Select from "./Select.jsx";

function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || ""

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);
		if (searchParams.get("page")) searchParams.set("page", 1);
		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			type="white"
			onChange={handleChange}
			value={sortBy}
		/>
	);
}
export default SortBy;
