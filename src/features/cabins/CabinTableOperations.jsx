import Filter from "../../ui/Filter.jsx";
import TableOperations from "../../ui/TableOperations.jsx";

function CabinTableOperations() {
	return (
		<TableOperations>
			<Filter
				filterField={"discount"}
				options={[
					{ value: "all", label: "All" },
					{ value: "with-discount", label: "With discount" },
					{ value: "no-discount", label: "No Discount" },
				]}
			/>
		</TableOperations>
	);
}
export default CabinTableOperations;
