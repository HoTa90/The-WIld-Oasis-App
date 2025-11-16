import { useForm } from "react-hook-form";
import Button from "../../ui/Button.jsx";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import { useCabins } from "../cabins/useCabins.js";
import Select from "../../ui/Select.jsx";

function CreateBookingForm({ onCloseModal }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		watch,
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			cabinId: "",
			numGuests: 1,
			hasBreakfast: false,
		},
	});

	const { cabins, isPending } = useCabins();

	if (isPending || !cabins) return <SpinnerMini />;

	// Build options for Select from cabins
	const cabinOptions = [
		{ value: "", label: "Select a cabin..." },
		...cabins.map((cabin) => ({
			value: String(cabin.id),
			label: cabin.name,
		})),
	];

	console.log(cabinOptions);

	const watchedCabinId = watch("cabinId") || "";

	const selectedCabin = cabins.find((cabin) => cabin.id === Number(watchedCabinId)) || null;

	const maxCapacity = selectedCabin?.max_capacity ?? 8;

	async function onSubmit(values) {
		const {
			cabinId,
			fullName,
			email,
			nationalId,
			nationality,
			countryFlag,
			startDate,
			endDate,
			numGuests,
			hasBreakfast,
			observations,
		} = values;

		if (!cabinId || !selectedCabin) {
			alert("Please select a cabin");
			return;
		}

		const start = new Date(startDate);
		const end = new Date(endDate);
		const numNights = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));

		const nightlyPrice = selectedCabin.regular_price - (selectedCabin.discount || 0);
		const cabinPrice = nightlyPrice * numNights;

		/*
    await createBooking({
      cabinId: selectedCabin.id,
      guestData: { fullName, email, nationalId, nationality, countryFlag },
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      numGuests: Number(numGuests),
      numNights,
      cabinPrice,
      extrasPrice: 0,
      hasBreakfast,
      observations,
    });
    */

		reset();
		onCloseModal?.();
	}

	// Sync Select -> RHF field
	function handleCabinChange(e) {
		setValue("cabinId", e.target.value, { shouldValidate: true });
	}

	return (
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
				label="Nationality"
				error={errors?.nationality?.message}>
				<Input
					type="text"
					id="nationality"
					{...register("nationality", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Country flag (emoji)">
				<Input
					type="text"
					id="countryFlag"
					{...register("countryFlag")}
				/>
			</FormRow>

			{/* Booking fields */}
			<FormRow
				label="Start date"
				error={errors?.startDate?.message}>
				<Input
					type="date"
					id="startDate"
					{...register("startDate", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="End date"
				error={errors?.endDate?.message}>
				<Input
					type="date"
					id="endDate"
					{...register("endDate", {
						required: "This field is required",
						validate: (value) =>
							new Date(value) > new Date(getValues().startDate) || "End date must be after start date",
					})}
				/>
			</FormRow>

			<FormRow
				label={`Number of guests (max ${maxCapacity})`}
				error={errors?.numGuests?.message}>
				<Input
					type="number"
					id="numGuests"
					min={1}
					max={maxCapacity}
					{...register("numGuests", {
						required: "This field is required",
						min: {
							value: 1,
							message: "At least 1 guest",
						},
						max: {
							value: maxCapacity,
							message: `Max capacity is ${maxCapacity}`,
						},
					})}
				/>
			</FormRow>

			<FormRow label="Include breakfast?">
				<input
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
					onClick={reset}>
					Cancel
				</Button>
				<Button>Create booking</Button>
			</FormRow>
		</Form>
	);
}

export default CreateBookingForm;
