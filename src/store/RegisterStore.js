// const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const VITE_SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const userStore = {
  getUser: async () => {
    try {
      const res = await fetch(
        `https://vskxtvhciaoavdosxujo.supabase.co/rest/v1/register`,
        {
          method: "GET",
          headers: {
            apikey: "sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-",
            Authorization: `Bearer sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  },
  createUser: async (user) => {
    try {
      // user = { name: "", email: "", password: "" } (raw)
      const res = await fetch(
        `https://vskxtvhciaoavdosxujo.supabase.co/rest/v1/register`,
        {
          method: "POST",
          headers: {
            apikey: "sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-",
            Authorization: `Bearer sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-`,
            "Content-Type": "application/json",
            Prefer: "return=representation", // return created row
          },
          body: JSON.stringify(user), // raw JSON body
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },


  
 resetPassword: async (email, newPassword) => {
    try {
      const res = await fetch(
        `https://vskxtvhciaoavdosxujo.supabase.co/rest/v1/register?email=eq.${email}`,
        {
          method: "PATCH",
          headers: {
            apikey: "sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-",
            Authorization: `Bearer sb_publishable_ob0ofkfPJrZF9BRZ5zrSIQ_gEiIsBF-`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      return data; // Returns the updated user row
    } catch (error) {
      console.error("Error resetting password:", error);
      return null;
    }
  },
};
  