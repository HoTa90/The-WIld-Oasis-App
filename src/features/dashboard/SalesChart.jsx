import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading.jsx";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatCurrency } from "../../utils/helpers.js";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

export default function SalesChart({ bookings, numDays }) {
	const { isDarkMode } = useDarkMode();
	const colors = isDarkMode
		? {
				total_sales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extras_price: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
		  }
		: {
				total_sales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extras_price: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
		  };

	const allDays = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	const data = allDays.map((date) => {
		return {
			label: format(date, "MMM dd"),
			total_sales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.total_price, 0),
			extras_price: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.extras_price, 0),
		};
	});

	return (
		<StyledSalesChart>
			<Heading as="h2">Sales</Heading>
			<ResponsiveContainer
				height={300}
				width={"100%"}>
				<AreaChart data={data} margin={{ top: 16, right: 16, bottom: 16, left: 40 }} >
					<CartesianGrid strokeDasharray={4} />
					<XAxis
						dataKey={"label"}
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis
						unit={"$"}
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
						tickFormatter={formatCurrency}
					/>

					<Tooltip contentStyle={{ backgroundColor: colors.background }} formatter={formatCurrency}  />
					<Area
						dataKey={"total_sales"}
						type={"monotone"}
						stroke={colors.total_sales.stroke}
						fill={colors.total_sales.fill}
						strokeWidth={2}
						name="Total sales"
						unit={"$"}
					/>
					<Area
						dataKey={"extras_price"}
						type={"monotone"}
						stroke={colors.extras_price.stroke}
						fill={colors.extras_price.fill}
						strokeWidth={2}
						name="Extra sales"
						unit={"$"}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}
