import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import { useCabins } from "../cabins/useCabins.js";
import Select from "../../ui/Select.jsx";
import { getBookingsForCabin } from "../../services/apiCabins.js";
import { getDisabledDatesFromBookings, getFlagSvgUrl, rangeOverlapsDisabled } from "../../utils/helpers.js";
import { useSettings } from "../settings/useSettings.js";
import { useCreateBooking } from "./useCreateBooking.js";
import { useNavigate } from "react-router";

function CreateBookingForm({ onCloseModal }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
		setValue,
		setError,
		clearErrors,
	} = useForm({
		defaultValues: {
			cabinId: "",
			fullName: "",
			email: "",
			nationalId: "",
			nationality: "",
			countryFlag: "",
			numGuests: 1,
			hasBreakfast: false,
			observations: "",
		},
	});

	const { cabins, isPending: isCabinsPending } = useCabins();
	const { settings, isPending: isSettingsPending } = useSettings();
	const { createBooking, isCreating } = useCreateBooking();
	console.log(settings);
	const [disabledDates, setDisabledDates] = useState([]);

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isLoadingDates, setIsLoadingDates] = useState(false);
	const navigate = useNavigate();

	const watchedCabinId = watch("cabinId") || "";
	const nationality = watch("nationality");
	const countryFlag = watch("countryFlag");

	// Fetch bookings & disabled dates when cabin changes
	useEffect(() => {
		async function loadDisabledDates() {
			if (!watchedCabinId) {
				setDisabledDates([]);
				return;
			}

			try {
				setIsLoadingDates(true);
				const bookings = await getBookingsForCabin(Number(watchedCabinId));
				const disabled = getDisabledDatesFromBookings(bookings);
				setDisabledDates(disabled);
			} finally {
				setIsLoadingDates(false);
			}
		}

		loadDisabledDates();
	}, [watchedCabinId]);

	useEffect(() => {
		if (!nationality) {
			setValue("countryFlag", "");
			return;
		}

		const url = getFlagSvgUrl(nationality);
		setValue("countryFlag", url);
	}, [nationality, setValue]);

	if (isCabinsPending || isSettingsPending || !cabins || !settings) return <SpinnerMini />;

	const cabinOptions = [
		{ value: "", label: "Select a cabin..." },
		...cabins.map((cabin) => ({
			value: String(cabin.id),
			label: cabin.name,
		})),
	];

	const selectedCabin = cabins.find((cabin) => cabin.id === Number(watchedCabinId)) || null;

	const cabinMaxCapacity = selectedCabin?.max_capacity ?? 8;
	const settingsMaxGuests = settings?.max_guests_booking ?? cabinMaxCapacity;
	const maxGuests = Math.min(cabinMaxCapacity, settingsMaxGuests);

	async function onSubmit(values) {
		const {
			cabinId,
			fullName,
			email,
			nationalId,
			nationality,
			countryFlag,
			numGuests,
			hasBreakfast,
			observations,
		} = values;

		// Reset any manual errors from previous submit
		clearErrors(["startDate", "endDate", "cabinId"]);

		let hasError = false;

		if (!cabinId || !selectedCabin) {
			setError("cabinId", {
				type: "manual",
				message: "Please select a cabin",
			});
			hasError = true;
		}

		if (!startDate) {
			setError("startDate", {
				type: "manual",
				message: "Please select a start date",
			});
			hasError = true;
		}

		if (!endDate) {
			setError("endDate", {
				type: "manual",
				message: "Please select an end date",
			});
			hasError = true;
		}

		if (hasError) return;

		const numNights = Math.max(1, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)));

		const minNights = settings.min_booking_length;
		const maxNights = settings.max_booking_length;

		if (numNights < minNights || numNights > maxNights) {
			setError("endDate", {
				type: "manual",
				message: `Bookings must be between ${minNights} and ${maxNights} nights.`,
			});
			return;
		}

		const nightlyPrice = selectedCabin.regular_price - (selectedCabin.discount || 0);
		const cabinPrice = nightlyPrice * numNights;

		const breakfastPrice = settings.breakfast_price ?? 0;
		const extrasPrice = hasBreakfast ? Number(numGuests) * numNights * breakfastPrice : 0;

		createBooking(
			{
				cabinId: selectedCabin.id,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				numNights,
				numGuests: Number(numGuests),
				cabinPrice,
				extrasPrice,
				hasBreakfast,
				observations,
				status: "unconfirmed",
				hasPaid: false,
				guestData: {
					fullName,
					email,
					nationalId,
					nationality,
					countryFlag,
				},
			},
			{
				onSuccess: (data) => {
					reset();
					setStartDate(null);
					setEndDate(null);
					setDisabledDates([]);
					onCloseModal?.();
					navigate(`/bookings/${data.id}`);
				},
			}
		);
	}

	function handleCabinChange(e) {
		setValue("cabinId", e.target.value, { shouldValidate: true });
		setStartDate(null);
		setEndDate(null);
	}

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormRow
					label="Cabin"
					error={errors?.cabinId?.message}>
					<Select
						id="cabinId"
						options={cabinOptions}
						type="white"
						value={watchedCabinId}
						onChange={handleCabinChange}
					/>
				</FormRow>
				<input
					type="hidden"
					{...register("cabinId", {
						required: "Please choose a cabin",
					})}
				/>

				{/* Guest fields */}
				<FormRow
					label="Full name"
					error={errors?.fullName?.message}>
					<Input
						type="text"
						id="fullName"
						{...register("fullName", {
							required: "This field is required",
						})}
					/>
				</FormRow>

				<FormRow
					label="Email address"
					error={errors?.email?.message}>
					<Input
						type="email"
						id="email"
						{...register("email", {
							required: "This field is required",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "Please provide a valid email address",
							},
						})}
					/>
				</FormRow>

				<FormRow
					label="National ID"
					error={errors?.nationalId?.message}>
					<Input
						type="text"
						id="nationalId"
						{...register("nationalId", {
							required: "This field is required",
						})}
					/>
				</FormRow>

				<FormRow
					label="Country"
					error={errors?.nationality?.message}>
					<Input
						type="text"
						id="nationality"
						placeholder="e.g. Germany, France"
						{...register("nationality", {
							required: "This field is required",
						})}
					/>
				</FormRow>

				{/* Display flag image, store URL as hidden input */}
				<FormRow label="Country flag">
					<div>
						{countryFlag ? (
							<img
								src={countryFlag}
								alt="Country flag"
								style={{
									width: "40px",
									height: "30px",
									objectFit: "contain",
									border: "1px solid var(--color-grey-300)",
									borderRadius: "var(--border-radius-sm)",
								}}
							/>
						) : (
							<span style={{ color: "var(--color-grey-400)" }}>Enter your Country to see the flag</span>
						)}
						{/* Hidden input inside the same container */}
						<input
							type="hidden"
							{...register("countryFlag")}
						/>
					</div>
				</FormRow>

				<FormRow
					label="Start date"
					error={errors?.startDate?.message}>
					{isLoadingDates ? (
						<SpinnerMini />
					) : (
						<DatePicker
							selected={startDate}
							onChange={(date) => {
								setStartDate(date);
								clearErrors("startDate");

								if (date && endDate && rangeOverlapsDisabled(date, endDate, disabledDates)) {
									setError("endDate", {
										type: "manual",
										message:
											"This period overlaps an existing booking. Please choose different dates.",
									});
									setEndDate(null);
								}
							}}
							selectsStart
							startDate={startDate}
							endDate={endDate}
							excludeDates={disabledDates}
							minDate={new Date()}
							dateFormat="yyyy-MM-dd"
							placeholderText="Select start date"
							popperPlacement="bottom-start"
						/>
					)}
				</FormRow>

				<FormRow
					label="End date"
					error={errors?.endDate?.message}>
					{isLoadingDates ? (
						<SpinnerMini />
					) : (
						<DatePicker
							selected={endDate}
							onChange={(date) => {
								if (!date) {
									setEndDate(null);
									return;
								}

								if (!startDate) {
									setEndDate(date);
									clearErrors("endDate");
									return;
								}

								if (rangeOverlapsDisabled(startDate, date, disabledDates)) {
									setError("endDate", {
										type: "manual",
										message:
											"This period overlaps an existing booking. Please choose different dates.",
									});
									setEndDate(null);
									return;
								}

								clearErrors("endDate");
								setEndDate(date);
							}}
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							excludeDates={disabledDates}
							minDate={startDate || new Date()}
							dateFormat="yyyy-MM-dd"
							placeholderText="Select end date"
							popperPlacement="bottom-start"
						/>
					)}
				</FormRow>

				<FormRow
					label={`Number of guests (max ${maxGuests})`}
					error={errors?.numGuests?.message}>
					<Input
						type="number"
						id="numGuests"
						min={1}
						max={maxGuests}
						{...register("numGuests", {
							required: "This field is required",
							min: {
								value: 1,
								message: "At least 1 guest",
							},
							max: {
								value: maxGuests,
								message: `Max capacity is ${maxGuests}`,
							},
						})}
					/>
				</FormRow>

				<FormRow label="Include breakfast?">
					<Input
						type="checkbox"
						id="hasBreakfast"
						{...register("hasBreakfast")}
					/>
				</FormRow>

				<FormRow label="Observations">
					<Input
						as="textarea"
						id="observations"
						{...register("observations")}
					/>
				</FormRow>

				<FormRow>
					<Button
						$variation="secondary"
						type="reset"
						onClick={() => {
							reset();
							setStartDate(null);
							setEndDate(null);
							setDisabledDates([]);
						}}>
						Cancel
					</Button>
					<Button disabled={isCreating}>{isCreating ? "Creating..." : "Create booking"}</Button>
				</FormRow>
			</Form>
		</>
	);
}

export default CreateBookingForm;
