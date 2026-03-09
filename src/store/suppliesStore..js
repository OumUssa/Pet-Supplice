// supplieStore.js

const SUPABASE_URL =
  "https://vskxtvhciaoavdosxujo.supabase.co/rest/v1/pet_supplies";
const SUPABASE_KEY = "sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-"; // replace with your anon key

export async function getPetSupplies() {
  try {
    const response = await fetch(SUPABASE_URL, {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Pet Supplies:", data); // logs your data
    return data;
  } catch (error) {
    console.error("Error fetching pet supplies:", error);
  }
}

export async function insertPetSupply({
  title,
  category,
  price,
  image,
  content,
  Type,
}) {
  try {
    console.log("Inserting payload:", {
      title,
      category,
      price,
      image,
      content,
      Type,
    });

    const response = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify([
        { title, category, price: Number(price), image, content, Type },
      ]),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    const data = await response.json();
    console.log("Inserted Pet Supply:", data);
    return data;
  } catch (error) {
    console.error("Error inserting pet supply:", error);
    return null;
  }
}

export async function deletePetSupply(id) {
  try {
    const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    console.log(`Pet supply with id ${id} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("Error deleting pet supply:", error);
    return false;
  }
}



export async function updatePetSupply(id, { title, category, price, image, content, Type }) {
  try {
    console.log("Updating payload:", {
      id,
      title,
      category,
      price,
      image,
      content,
      Type,
    });

    const response = await fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        title,
        category,
        price: Number(price),
        image,
        content,
        Type,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
    }

    const data = await response.json();
    console.log("Updated Pet Supply:", data);
    return data;
  } catch (error) {
    console.error("Error updating pet supply:", error);
    return null;
  }
}
