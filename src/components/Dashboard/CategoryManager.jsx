import React, { useState, useEffect } from "react";
import { fetchPetCategories, fetchProductTypes, addPetCategory, addProductType, fetchUserProfile } from "../../API/api";
import { useToast } from "../Base/BaseToast";

const CategoryManager = () => {
  const { showSuccess, showError } = useToast();
  
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newCat, setNewCat] = useState("");
  const [newType, setNewType] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [addingType, setAddingType] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const user = await fetchUserProfile();
      if (!user || (user.role_id !== 2 && (user.email || "").toLowerCase() !== "admin@petstore.com")) {
        setIsSuperAdmin(false);
        setLoading(false);
        return;
      }
      setIsSuperAdmin(true);

      const [catData, typeData] = await Promise.all([
        fetchPetCategories(),
        fetchProductTypes()
      ]);
      setCategories(Array.isArray(catData) ? catData : catData?.data || []);
      setTypes(Array.isArray(typeData) ? typeData : typeData?.data || []);
    } catch (err) {
      showError("Failed to load categories or types");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setAddingCat(true);
    try {
      await addPetCategory(newCat.trim());
      showSuccess("Pet Category added successfully!");
      setNewCat("");
      loadData();
    } catch (err) {
      showError("Failed to add category");
    } finally {
      setAddingCat(false);
    }
  };

  const handleAddType = async (e) => {
    e.preventDefault();
    if (!newType.trim()) return;
    setAddingType(true);
    try {
      await addProductType(newType.trim());
      showSuccess("Product Type added successfully!");
      setNewType("");
      loadData();
    } catch (err) {
      showError("Failed to add product type");
    } finally {
      setAddingType(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading management data...</div>;
  }

  if (isSuperAdmin === false) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <i className="bi bi-shield-lock text-6xl text-rose-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Access Denied</h2>
        <p className="text-slate-500 mt-2">Only Super Administrators can manage categories and types.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Categories & Types</h1>
        <p className="text-sm text-slate-500 mt-1">Add new pet categories and product types to the system.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* PET CATEGORIES */}
        <section className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Pet Categories</h2>
          <form onSubmit={handleAddCategory} className="flex gap-3 mb-6">
            <input 
              type="text" 
              value={newCat} 
              onChange={e => setNewCat(e.target.value)} 
              placeholder="e.g. Rabbit, Snake..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              type="submit" 
              disabled={addingCat || !newCat.trim()}
              className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-50"
            >
              {addingCat ? "Adding..." : "Add"}
            </button>
          </form>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {categories.map((cat, i) => (
              <div key={i} className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                <span className="font-medium text-slate-700">{cat.name}</span>
                <span className="text-xs text-slate-400">ID: {cat.id}</span>
              </div>
            ))}
            {categories.length === 0 && <p className="text-slate-500 text-sm">No categories found.</p>}
          </div>
        </section>

        {/* PRODUCT TYPES */}
        <section className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Product Types</h2>
          <form onSubmit={handleAddType} className="flex gap-3 mb-6">
            <input 
              type="text" 
              value={newType} 
              onChange={e => setNewType(e.target.value)} 
              placeholder="e.g. Grooming, Medicine..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              type="submit" 
              disabled={addingType || !newType.trim()}
              className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-50"
            >
              {addingType ? "Adding..." : "Add"}
            </button>
          </form>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {types.map((type, i) => (
              <div key={i} className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                <span className="font-medium text-slate-700">{type.name}</span>
                <span className="text-xs text-slate-400">ID: {type.id}</span>
              </div>
            ))}
            {types.length === 0 && <p className="text-slate-500 text-sm">No product types found.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoryManager;
