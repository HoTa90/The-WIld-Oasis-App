import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";


function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;

	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("New cabin successfully created!");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label={"Cabin Name"}
				error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isPending}
					{...register("name", {
						required: "This field is required!",
					})}
				/>
			</FormRow>

			<FormRow
				label={"Maximum capacity"}
				error={errors?.max_capacity?.message}>
				<Input
					type="number"
					id="max_capacity"
					disabled={isPending}
					{...register("max_capacity", {
						required: "This field is required!",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label={"Regular price"}
				error={errors?.regular_price?.message}>
				<Input
					type="number"
					id="regular_price"
					disabled={isPending}
					{...register("regular_price", {
						required: "This field is required!",
						min: {
							value: 1,
							message: "Price should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label={"Discount"}
				error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isPending}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required!",
						min: { value: 0, message: "Discount cannot be negative" },
						validate: (value) => {
							const discount = Number(value);
							const price = Number(getValues("regular_price"));
							return discount <= price || "Discount must be less than the regular price";
						},
					})}
				/>
			</FormRow>

			<FormRow
				label={"Description for website"}
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isPending}
					defaultValue=""
					{...register("description", {
						required: "This field is required!",
					})}
				/>
			</FormRow>

			<FormRow
				label={"Cabin photo"}
				error={errors?.image?.message}>
				<FileInput
					id="image"
					disabled={isPending}
					accept="image/*"
					{...register("image", {
						required: "This field is required!",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset">
					Cancel
				</Button>
				<Button disabled={isPending}>Add a cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
