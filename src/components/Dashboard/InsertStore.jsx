// InsertStore.jsx
import React, { useState } from "react";
import { insertPetSupply } from "../../store/suppliesStore.";

const CATEGORY_TYPES = {
  Dog: ["Food", "Toys", "Accessories", "Health & Care"],
  Cat: ["Food", "Toys", "Litter & Hygiene", "Accessories"],
  Bird: ["Food", "Cage", "Toys"],
  Fish: ["Food", "Aquariums", "Filters & Pumps",],
  "Small Pet": ["Food", "Cage", "Bedding", "Toys"],
};

const InsertStore = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dog");
  const [Type, setType] = useState("");   // lowercase ✔
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image || !content || !Type) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await insertPetSupply({
        title,
        category,
        Type,                // lowercase ✔
        price: Number(price),
        image,
        content,
      });

      if (result) {
        alert("Pet/Supply inserted successfully!");
        setTitle("");
        setCategory("Dog");
        setType("");
        setPrice("");
        setImage("");
        setContent("");
      }
    } catch (err) {
      console.error(err);
      alert("Error inserting pet supply");
    } finally {
      setLoading(false);
    }
  };

  const typesForCategory = CATEGORY_TYPES[category];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Insert Pet/Supply
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Category</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setType(""); // reset when changing category
              }}>
              {Object.keys(CATEGORY_TYPES).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* NEW: Type */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Type of {category}
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              value={Type}
              onChange={(e) => setType(e.target.value)}>
              <option value="">Select type</option>
              {typesForCategory.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Image Filename or URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image filename or URL"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Content / Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}>
            {loading ? "Saving..." : "Insert"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertStore;
