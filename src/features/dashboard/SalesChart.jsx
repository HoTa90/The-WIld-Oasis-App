import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading.jsx";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

const fakeData = [
	{ label: "Jan 09", total_sales: 480, extras_price: 20 },
	{ label: "Jan 10", total_sales: 580, extras_price: 100 },
	{ label: "Jan 11", total_sales: 550, extras_price: 150 },
	{ label: "Jan 12", total_sales: 600, extras_price: 50 },
	{ label: "Jan 13", total_sales: 700, extras_price: 150 },
	{ label: "Jan 14", total_sales: 800, extras_price: 150 },
	{ label: "Jan 15", total_sales: 700, extras_price: 200 },
	{ label: "Jan 16", total_sales: 650, extras_price: 200 },
	{ label: "Jan 17", total_sales: 600, extras_price: 300 },
	{ label: "Jan 18", total_sales: 550, extras_price: 100 },
	{ label: "Jan 19", total_sales: 700, extras_price: 100 },
	{ label: "Jan 20", total_sales: 800, extras_price: 200 },
	{ label: "Jan 21", total_sales: 700, extras_price: 100 },
	{ label: "Jan 22", total_sales: 810, extras_price: 50 },
	{ label: "Jan 23", total_sales: 950, extras_price: 250 },
	{ label: "Jan 24", total_sales: 970, extras_price: 100 },
	{ label: "Jan 25", total_sales: 900, extras_price: 200 },
	{ label: "Jan 26", total_sales: 950, extras_price: 300 },
	{ label: "Jan 27", total_sales: 850, extras_price: 200 },
	{ label: "Jan 28", total_sales: 900, extras_price: 100 },
	{ label: "Jan 29", total_sales: 800, extras_price: 300 },
	{ label: "Jan 30", total_sales: 950, extras_price: 200 },
	{ label: "Jan 31", total_sales: 1100, extras_price: 300 },
	{ label: "Feb 01", total_sales: 1200, extras_price: 400 },
	{ label: "Feb 02", total_sales: 1250, extras_price: 300 },
	{ label: "Feb 03", total_sales: 1400, extras_price: 450 },
	{ label: "Feb 04", total_sales: 1500, extras_price: 500 },
	{ label: "Feb 05", total_sales: 1400, extras_price: 600 },
	{ label: "Feb 06", total_sales: 1450, extras_price: 400 },
];

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
				<AreaChart data={data}>
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
					/>

					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
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
