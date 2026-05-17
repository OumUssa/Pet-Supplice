import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPetSupplies, deletePetSupply } from "../../store/suppliesStore.";
import { useToast } from "../Base/BaseToast";

const TableView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();
  const selectedCategory = location.state?.pet;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      const data = await getPetSupplies();
      setPets(data || []);
      setLoading(false);
    };
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?",
    );
    if (!confirmed) return;

    const success = await deletePetSupply(id);
    if (success) {
      setPets(pets.filter((pet) => pet.id !== id));
      showSuccess("Pet supply deleted successfully!");
    } else {
      showError("Failed to delete this item");
    }
  };

  const typeMenu = {
    Dog: ["All", "Food", "Toys", "Accessories", "Health & Care"],
    Cat: ["All", "Food", "Toys", "Litter & Hygiene", "Accessories"],
    Bird: ["All", "Food", "Cages", "Toys"],
    Fish: ["All", "Food", "Aquariums", "Filters & Pumps"],
    "Small Pet": ["All", "Food", "Cages", "Bedding", "Toys"],
  };

  const filteredPets = pets.filter((pet) => {
    const sameCategory = pet.category === selectedCategory;
    const sameType = selectedType === "All" || pet.Type === selectedType;
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

        <button
          onClick={() => navigate("/DashboardView/insertStore")}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700">
          <i className="bi bi-plus-circle" />
          Add New Product
        </button>
      </div>

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
              onChange={(event) => setSearchKeyword(event.target.value)}
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
                      onClick={() => handleDelete(pet.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rose-600">
                      <i className="bi bi-trash3" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredPets.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-slate-500">
                  No items found for {selectedCategory} - {selectedType}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
