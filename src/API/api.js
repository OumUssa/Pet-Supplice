const API_BASE_URL = "https://petsupplice.cms-jubpet.linkpc.net/api";

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

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("tokenPet");
    console.log("📤 Fetching user profile from:", `${API_BASE_URL}/profile`);
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
    console.log("✅ User profile fetched successfully:", data);

    // Extract the user object from the nested response
    const userData = data.user || data;
    console.log("📋 Extracted user data:", userData);

    return userData;
  } catch (error) {
    console.error("❌ Fetch user profile error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("tokenPet");
    const payload = {
      name: profileData.name,
      email: profileData.email,
      password: profileData.password,
      avatar: profileData.avatar,
    };

    console.log("📤 Updating user profile to:", `${API_BASE_URL}/user`);
    console.log("📋 Payload:", payload);
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    console.log("📥 Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Server error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ User profile updated successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Update user profile error:", error.message);
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
    console.log("📤 Fetching products from:", `${API_BASE_URL}/userProduct`);
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/userProduct`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
    console.log("❌ Fetch product types error:", error.message);
    console.error("Full error:", error);
    throw error;
  }
};

export const deleteProduct = async (productName) => {
  try {
    const token = localStorage.getItem("tokenPet");
    console.log(
      "📤 Sending delete request to:",
      `${API_BASE_URL}/products/${productName}`,
    );
    console.log("🔐 Token:", token ? "Present" : "Missing");

    const response = await fetch(`${API_BASE_URL}/products/${productName}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
    console.log("✅ Product deleted successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Delete product error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const fetchPublicProducts = async () => {
  try {
    console.log(
      "📤 Fetching all public products from:",
      `${API_BASE_URL}/products`,
    );

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
    console.log("📋 Raw products data:", JSON.stringify(data, null, 2));

    // Extract products array from response
    let productsArray = [];
    if (Array.isArray(data)) {
      productsArray = data;
    } else if (data?.data && Array.isArray(data.data)) {
      productsArray = data.data;
    } else if (data?.products && Array.isArray(data.products)) {
      productsArray = data.products;
    }

    let catMap = {};
    let tMap = {};
    try {
      const categoriesData = await fetchPetCategories();
      const categoriesArray = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];
      categoriesArray.forEach(cat => { catMap[cat.id] = cat.name; });
      
      const typesData = await fetchProductTypes();
      const typesArray = Array.isArray(typesData) ? typesData : typesData?.data || [];
      typesArray.forEach(type => { tMap[type.id] = type.name; });
    } catch (e) {
      console.warn("Could not fetch categories/types for mapping", e);
    }

    // Map to shop format
    const mappedProducts = productsArray.map((product) => ({
      id: product.id,
      title: product.title,
      image: product.image_url,
      image_url: product.image_url,
      category:
        product.pet_category_name || product.pet_category?.name || product.category?.name || product.category || catMap[product.pet_category_id] || "Uncategorized",
      Type: product.product_type_name || product.product_type?.name || product.type?.name || product.type || tMap[product.type_product_id] || "Uncategorized",
      price: Number(product.price) || 0,
      description: product.description,
      content: product.description,
    }));

    console.log("✅ Public products fetched successfully:", mappedProducts);
    return mappedProducts;
  } catch (error) {
    console.error("❌ Fetch public products error:", error.message);
    console.error("Full error object:", error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const token = localStorage.getItem("tokenPet");
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Fetch user by id error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("tokenPet");
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Logout error:", error);
    throw error;
  }
};

export const addPetCategory = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/petCategories`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Add pet category error:", error);
    throw error;
  }
};

export const addProductType = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productTypes`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Add product type error:", error);
    throw error;
  }
};

export const updateProduct = async (name, productData) => {
  try {
    const token = localStorage.getItem("tokenPet");
    const response = await fetch(`${API_BASE_URL}/products/${name}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Update product error:", error);
    throw error;
  }
};

export const purchaseProduct = async (product_name, quantity, total_price = 0) => {
  try {
    const token = localStorage.getItem("tokenPet");
    const response = await fetch(`${API_BASE_URL}/purchase`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product_name, quantity, total_price }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Purchase product error:", error);
    throw error;
  }
};

export const fetchPurchaseHistory = async () => {
  try {
    const token = localStorage.getItem("tokenPet");
    const response = await fetch(`${API_BASE_URL}/purchase`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Fetch purchase history error:", error);
    throw error;
  }
};
