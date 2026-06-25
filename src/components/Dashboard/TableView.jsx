import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchAllProducts,
  fetchPetCategories,
  fetchProductTypes,
  deleteProduct,
  fetchUserProfile,
  fetchPurchaseHistory,
} from "../../API/api";
import { useToast } from "../Base/BaseToast";

const TableView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();
  const showErrorRef = useRef(showError);
  showErrorRef.current = showError;

  const selectedCategory = location.state?.pet;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
    title: "",
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        console.log("📥 Fetching categories, types, and products...");

        const userData = await fetchUserProfile().catch(() => null);
        const isAdminUser = userData && (userData.role_id === 1 || (userData.email || "").toLowerCase() === "admin@petstore.com");
        if (isAdminUser) {
          setIsAdmin(true);
        }

        const [productsData, categoriesData, typesData] = await Promise.all([
          isAdminUser ? fetchAllProducts() : fetchPurchaseHistory(),
          fetchPetCategories(),
          fetchProductTypes(),
        ]);

        console.log("✅ Raw products/purchases:", productsData);
        console.log("✅ Raw categories:", categoriesData);
        console.log("✅ Raw types:", typesData);

        // Build category ID → name map
        const catMap = {};
        const categoriesArray = Array.isArray(categoriesData)
          ? categoriesData
          : categoriesData.data || [];
        categoriesArray.forEach((cat) => {
          catMap[cat.id] = cat.name;
        });

        // Build type ID → name map
        const tMap = {};
        const typesArray = Array.isArray(typesData)
          ? typesData
          : typesData.data || [];
        typesArray.forEach((type) => {
          tMap[type.id] = type.name;
        });

        // Map products
        let productsArray = Array.isArray(productsData)
          ? productsData
          : productsData.data || [];

        if (!isAdminUser) {
          productsArray = productsArray.map(purchase => purchase.product).filter(Boolean);
        }

        const mappedPets = productsArray.map((pet) => {
          const categoryName = catMap[pet.pet_category_id] || "Unknown";
          const typeName = tMap[pet.type_product_id] || "Unknown";

          console.log(
            `📍 Product: ${pet.title} → Category: ${categoryName} (ID: ${pet.pet_category_id}), Type: ${typeName} (ID: ${pet.type_product_id})`,
          );

          return {
            id: pet.id,
            title: pet.title,
            image: pet.image_url,
            category: categoryName,
            Type: typeName,
            price: pet.price,
            description: pet.description,
          };
        });

        console.log("✅ Final mapped products:", mappedPets);
        setPets(mappedPets);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error loading products:", err);
        setLoading(false);
        showErrorRef.current("Error loading products");
      }
    };

    fetchPets();
  }, []); // ✅ FIX 3: empty deps — showError is accessed via ref, no stale-closure loop

  const handleDelete = (id, title) => {
    setDeleteModal({ show: true, id, title });
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      console.log("🗑️ Deleting product:", deleteModal.title);
      await deleteProduct(deleteModal.title);
      setPets((prev) => prev.filter((pet) => pet.id !== deleteModal.id));
      showSuccess("Product deleted successfully!");
      setDeleteModal({ show: false, id: null, title: "" });
    } catch (err) {
      console.error("❌ Error deleting:", err);
      showErrorRef.current("Failed to delete this item: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ show: false, id: null, title: "" });
  };

  const typeMenu = {
    Dog: ["All", "Food", "Toys", "Accessories", "Health & Care"],
    Cat: ["All", "Food", "Toys", "Litter & Hygiene", "Accessories"],
    Bird: ["All", "Food", "Cages", "Toys"],
    Fish: ["All", "Food", "Aquariums", "Filters & Pumps"],
    "Small Pet": ["All", "Food", "Cages", "Bedding", "Toys"],
  };

  const normalise = (str) => str?.trim().toLowerCase() ?? "";

  const filteredPets = pets.filter((pet) => {
    // ✅ FIX: use contains check so "Cats" matches selected "Cat", and vice versa
    const catA = normalise(pet.category);
    const catB = normalise(selectedCategory);
    const sameCategory = catA.includes(catB) || catB.includes(catA);

    const sameType =
      selectedType === "All" || normalise(pet.Type) === normalise(selectedType);

    const keyword = searchKeyword.trim().toLowerCase();
    const sameKeyword =
      keyword.length === 0 ||
      pet.title?.toLowerCase().includes(keyword) ||
      pet.Type?.toLowerCase().includes(keyword);

    return sameCategory && sameType && sameKeyword;
  });

  const totalItems = filteredPets.length;
  const averagePrice =
    totalItems === 0
      ? 0
      : filteredPets.reduce((sum, pet) => sum + Number(pet.price || 0), 0) /
        totalItems;

  const formatTypeClass = (type) => {
    const map = {
      Food: "bg-emerald-100 text-emerald-700",
      Toys: "bg-violet-100 text-violet-700",
      Accessories: "bg-cyan-100 text-cyan-700",
      "Health & Care": "bg-amber-100 text-amber-700",
      "Litter & Hygiene": "bg-indigo-100 text-indigo-700",
      Cages: "bg-sky-100 text-sky-700",
      Aquariums: "bg-blue-100 text-blue-700",
      "Filters & Pumps": "bg-teal-100 text-teal-700",
      Bedding: "bg-orange-100 text-orange-700",
    };
    return map[type] || "bg-slate-100 text-slate-700";
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500 text-lg">Loading...</p>;

  return (
    <div className="relative min-h-screen rounded-2xl border border-cyan-100 bg-linear-to-b from-white to-cyan-50/60 p-4 md:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {selectedCategory} Supplies
          </h1>
          <p className="text-sm text-slate-500">
            Review products, filter quickly, and manage inventory actions.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => navigate("/DashboardView/insertStore")}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700">
            <i className="bi bi-plus-circle" />
            Add New Product
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Visible Items
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {totalItems}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Active Category
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {selectedCategory || "-"}
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Average Price
          </p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            ${averagePrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="mb-4 rounded-2xl border border-cyan-100 bg-white p-3 shadow-sm md:p-4">
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Search by product or type
          </label>
          <div className="relative">
            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search product name..."
              className="w-full rounded-xl border border-cyan-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        <nav>
          <div className="flex flex-wrap gap-2 text-gray-700">
            {(typeMenu[selectedCategory] || ["All"]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-xl border px-3 py-1.5 text-sm font-medium transition
                ${
                  selectedType === type
                    ? "border-teal-600 bg-teal-600 text-white shadow-sm"
                    : "border-cyan-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
                }`}>
                {type}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-cyan-100 bg-white shadow-sm">
        <table className="min-w-full overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Pet Category
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Product Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Price ($)
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-cyan-100">
            {filteredPets.map((pet) => (
              <tr
                key={pet.id}
                className="bg-white transition-colors duration-200 odd:bg-white even:bg-slate-50/40 hover:bg-cyan-50/70">
                <td className="px-6 py-4">
                  <img
                    src={pet.image}
                    alt={pet.title}
                    className="h-14 w-14 rounded-xl object-cover ring-2 ring-cyan-100"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                  {pet.title}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {pet.category}
                </td>
                <td className="px-6 py-4 text-center text-sm text-slate-600">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${formatTypeClass(
                      pet.Type,
                    )}`}>
                    {pet.Type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                  {Number(pet.price).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    {isAdmin && (
                      <>
                        <button
                          onClick={() =>
                            navigate("/DashboardView/UpdateStore", {
                              state: { item: pet },
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
                          <i className="bi bi-pencil-square" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(pet.id, pet.title)}
                          className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rose-600">
                          <i className="bi bi-trash3" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filteredPets.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-slate-500">
                  No items found for {selectedCategory} — {selectedType}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <i className="bi bi-exclamation-triangle text-red-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Delete Product
                  </h3>
                  <p className="text-xs text-slate-500">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              <p className="text-slate-700">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-900">
                  "{deleteModal.title}"
                </span>
                ?
              </p>
              <p className="mt-2 text-sm text-slate-500">
                The product will be permanently removed from your store.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={cancelDelete}
                disabled={deleting}
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {deleting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-trash3" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableView;
