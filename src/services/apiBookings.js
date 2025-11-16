import { PAGE_SIZE } from "../utils/constants.js";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings({ filter, sortBy, page }) {
	let query = supabase
		.from("bookings")
		.select(
			"id, created_at,start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)",
			{ count: "exact" }
		);

	if (filter) {
		query = query.eq(filter.field, filter.value);
	}

	if (sortBy) {
		query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
	}


	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from, to);
	}

	const { data, error, count } = await query;
	

	if (error) {
		console.error(error);
		throw new Error("Bookings not found");
	}
	

	return { data, count };
}

export async function getBooking(id) {
	const { data, error } = await supabase.from("bookings").select("*, cabins(*), guests(*)").eq("id", id).single();

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, total_price, extras_price")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(full_name)")
		.gte("start_date", date)
		.lte("start_date", getToday());

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(full_name, nationality, country_flag)")
		.or(
			`and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
		)
		.order("created_at");

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.start_date))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.end_date)))

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase.from("bookings").update(obj).eq("id", id).select().single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from("bookings").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
}
async function getOrCreateGuest({
  fullName,
  email,
  nationalId,
  nationality,
  countryFlag,
}) {
  // 1) Check if guest already exists by email
  const { data: guests, error: guestError } = await supabase
    .from("guests")
    .select("id")
    .eq("email", email);

  if (guestError) {
    console.error(guestError);
    throw new Error("Could not check existing guest");
  }

  if (guests && guests.length > 0) {
    return guests[0]; // { id }
  }


  const { data, error } = await supabase
    .from("guests")
    .insert([
      {
        full_name: fullName,
        national_id: nationalId,
        email,
        nationality,
        country_flag: countryFlag,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data; 
}

export async function createBooking({
  cabinId,
  startDate,
  endDate,
  numNights,
  numGuests,
  cabinPrice,
  extrasPrice,
  hasBreakfast,
  observations,
  status = "unconfirmed",    
  hasPaid = false,           
  guestData,                  
}) {
  const guest = await getOrCreateGuest(guestData);

  const totalPrice = cabinPrice + extrasPrice;

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        start_date: startDate,      
        end_date: endDate,           
        num_nights: numNights,     
        num_guests: numGuests,     
        cabin_price: cabinPrice,     
        extras_price: extrasPrice,   
        total_price: totalPrice,     
        status,                    
        has_breakfast: hasBreakfast,
        has_paid: hasPaid,         
        observations,              
        cabin_id: cabinId,            
        guest_id: guest.id,           
      },
    ])
    .select(
      "id, start_date, end_date, status, cabin_id, guest_id, num_nights, num_guests, total_price"
    )
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
