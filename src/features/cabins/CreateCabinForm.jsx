import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import { useCreateCabin } from "./useCreateCabin.js";
import { useEditCabin } from "./useEditCabin.js";

function CreateCabinForm({ cabinForEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinForEdit;

	const isEditing = !!editId;
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditing ? editValues : {},
	});
	const { errors } = formState;
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditPending, editCabin } = useEditCabin();

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditing) {
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: (data) => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createCabin(
				{ ...data, image },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			type={onCloseModal ? "modal" : "regular"}>
			<FormRow
				label={"Cabin Name"}
				error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating || isEditPending}
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
					disabled={isCreating || isEditPending}
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
					disabled={isCreating || isEditPending}
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
					disabled={isCreating || isEditPending}
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
					disabled={isCreating || isEditPending}
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
					disabled={isCreating || isEditPending}
					accept="image/*"
					{...register("image", {
						required: isEditing ? false : "This field is required!",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isCreating || isEditPending}>{isEditing ? " Edit cabin" : "Add cabin"}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
