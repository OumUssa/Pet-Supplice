import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPetSupplies, deletePetSupply } from "../../store/suppliesStore.";

const TableView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategory = location.state?.pet;

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [selectedType, setSelectedType] = useState("All"); // NEW STATE

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
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) return;

    const success = await deletePetSupply(id);
    if (success) {
      setPets(pets.filter((pet) => pet.id !== id));
      setNotification("Pet supply deleted successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // TYPE LIST by PET
  const typeMenu = {
    Dog: ["All", "Food", "Toys", "Accessories", "Health & Care"],
    Cat: ["All", "Food", "Toys", "Litter & Hygiene", "Accessories"],
    Bird: ["All", "Food", "Cages", "Toys"],
    Fish: ["All", "Food", "Aquariums", "Filters & Pumps"],
    "Small Pet": ["All", "Food", "Cages", "Bedding", "Toys"],
  };

  // Filter items by category + type
  const filteredPets = pets.filter((pet) => {
    const sameCategory = pet.category === selectedCategory;
    const sameType = selectedType === "All" || pet.Type === selectedType;
    return sameCategory && sameType;
  });

  if (loading)
    return <p className="p-6 text-center text-gray-500 text-lg">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100 relative">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        {selectedCategory} Supplies
      </h1>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-3 bg-green-500 text-white rounded shadow-lg
          transform transition-all duration-500 ease-in-out
          ${
            showNotification
              ? "translate-x-0 opacity-100"
              : "translate-x-20 opacity-0"
          }`}>
          {notification}
        </div>
      )}

      {/* TYPE FILTER MENU */}
      <nav className="mb-4">
        <div className="flex gap-3 flex-wrap text-gray-700">
          {(typeMenu[selectedCategory] || ["All"]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-md border transition
                ${
                  selectedType === type
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}>
              {type}
            </button>
          ))}
        </div>
      </nav>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Price ($)
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredPets.map((pet) => (
              <tr
                key={pet.id}
                className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <img
                    src={pet.image} // ✅ correct key from your DB
                    alt={pet.title}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {pet.title}
                </td>
                <td className="px-6 py-4 text-gray-600">{pet.category}</td>
                <td className="px-6 py-4 text-gray-600">
                  <p className="bg-green-500 text-center rounded-xl text-white font-bold m-2 p-1">
                    {pet.Type}
                  </p>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {Number(pet.price).toFixed(2)}
                </td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate("/DashboardView/UpdateStore", {
                        state: { item: pet },
                      })
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredPets.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No items found for {selectedCategory} → {selectedType}
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
