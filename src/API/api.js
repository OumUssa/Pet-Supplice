const API_BASE_URL = "http://127.0.0.1:8000/api";

export const registerUser = async (userData) => {
  try {
    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    console.log(
      "📤 Sending registration request to:",
      `${API_BASE_URL}/register`,
    );
    console.log("📋 Payload:", payload);

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", {
      contentType: response.headers.get("content-type"),
      status: response.status,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Registration successful:", data);
    return data;
  } catch (error) {
    console.error("❌ Register error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const payload = {
      email: credentials.email,
      password: credentials.password,
    };

    console.log("📤 Sending login request to:", `${API_BASE_URL}/login`);
    console.log("📋 Payload:", payload);

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", {
      contentType: response.headers.get("content-type"),
      status: response.status,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Login successful:", data);
    return data;
  } catch (error) {
    console.error("❌ Login error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("tokenPet");
    const payload = {
      title: productData.title,
      description: productData.description,
      price: productData.price,
      image_url: productData.image_url,
      pet_category_name: productData.pet_category_name,
      product_type_name: productData.product_type_name,
    };

    console.log("📤 Sending product creation to:", `${API_BASE_URL}/products`);
    console.log("📋 Full Payload:", JSON.stringify(payload, null, 2));
    console.log("📋 Pet Category Being Sent:", payload.pet_category_name);
    console.log("📋 Product Type Being Sent:", payload.product_type_name);
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", {
      contentType: response.headers.get("content-type"),
      status: response.status,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Product created successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Create product error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const token = localStorage.getItem("tokenPet");
    console.log("📤 Fetching products from:", `${API_BASE_URL}/products`);
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", {
      contentType: response.headers.get("content-type"),
      status: response.status,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Products fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Fetch products error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const fetchPetCategories = async () => {
  try {
    console.log(
      "📤 Fetching pet categories from:",
      `${API_BASE_URL}/petCategories`,
    );

    const response = await fetch(`${API_BASE_URL}/petCategories`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    });

    console.log("📥 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ Pet categories fetched:", data);
    return data;
  } catch (error) {
    console.error("❌ Fetch pet categories error:", error.message);
    throw error;
  }
};

export const fetchProductTypes = async () => {
  try {
    const token = localStorage.getItem("tokenPet");
    console.log(
      "📤 Fetching product types from:",
      `${API_BASE_URL}/productTypes`,
    );
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/productTypes`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", {
      contentType: response.headers.get("content-type"),
      status: response.status,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("📋 Raw product types data:", JSON.stringify(data, null, 2));
    console.log("✅ Product types fetched successfully");
    return data;
  } catch (error) {
    console.error("❌ Fetch product types error:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};
