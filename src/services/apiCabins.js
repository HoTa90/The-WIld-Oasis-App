import supabase from "./supabase.js";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Coudn't fetch the cabins");
	}

	return data;
}

export async function createCabin(cabin) {
	const { data, error } = await supabase.from("cabins").insert([cabin]).select();

	if (error) {
		console.error(error);
		throw new Error("There was an error creating a cabin");
	}

	return data;
}

export async function deleteCabin(id) {
	const { error, data } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Coudn't delete the cabin");
	}

	return data;
}
