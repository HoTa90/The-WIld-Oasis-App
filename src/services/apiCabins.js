import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
	let { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Coudn't fetch the cabins");
	}

	return data;
}

export async function createEditCabin(cabin, id) {
	const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

	const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
	//https://tqhtjuzacanlvgwhnwlb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
	const imagePath = hasImagePath ? cabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	let query = supabase.from("cabins");

	if (id) {
		query = query.update({ ...cabin, image: imagePath }).eq("id", id);
	}

	if (!id) {
		query = query.insert([{ ...cabin, image: imagePath }]);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("There was an error creating a cabin");
	}

	if (hasImagePath) return data;

	const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, cabin.image);

	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error("Cabin image could not be uploaded and the cabin was not created!");
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
