// InsertStore.jsx
import React, { useState } from "react";
import { insertPetSupply } from "../../store/suppliesStore.";
import { useToast } from "../Base/BaseToast";

const CATEGORY_TYPES = {
  Dog: ["Food", "Toys", "Accessories", "Health & Care"],
  Cat: ["Food", "Toys", "Litter & Hygiene", "Accessories"],
  Bird: ["Food", "Cage", "Toys"],
  Fish: ["Food", "Aquariums", "Filters & Pumps"],
  "Small Pet": ["Food", "Cage", "Bedding", "Toys"],
};

const InsertStore = () => {
  const { showSuccess, showError } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dog");
  const [Type, setType] = useState(""); // lowercase ✔
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image || !content || !Type) {
      showError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await insertPetSupply({
        title,
        category,
        Type, // lowercase ✔
        price: Number(price),
        image,
        content,
      });

      if (result) {
        showSuccess("Pet/Supply inserted successfully!");
        setTitle("");
        setCategory("Dog");
        setType("");
        setPrice("");
        setImage("");
        setContent("");
      }
    } catch (err) {
      console.error(err);
      showError("Error inserting pet supply");
    } finally {
      setLoading(false);
    }
  };

  const typesForCategory = CATEGORY_TYPES[category];
  const parsedPrice = Number(price);

  return (
    <div className="min-h-screen rounded-3xl border border-cyan-100/80 bg-[linear-gradient(180deg,#f8fcff_0%,#eefdfb_100%)] p-4 md:p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Admin Product Entry
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Insert New Pet Supply
            </h2>
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
              <i className="bi bi-shield-check mr-2" />
              Clean Admin Form
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Fill product details below to publish a new item into your store.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm md:p-7">
            <div className="grid gap-5 md:grid-cols-2 text-gray-700">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Cat Salmon Meal"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Pet Category
                </label>
                <select
                  className="w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setType("");
                  }}>
                  {Object.keys(CATEGORY_TYPES).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Type
                </label>
                <select
                  className="w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  value={Type}
                  onChange={(e) => setType(e.target.value)}>
                  <option value="">Select type</option>
                  {typesForCategory.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image URL / Filename
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... or my-image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>
                <textarea
                  className="w-full rounded-xl border border-cyan-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write a short description for this product..."
                  rows={5}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-cyan-100 pt-5">
              <p className="text-sm text-slate-500">
                Tip: Use a clear title and a short useful description.
              </p>
              <button
                type="submit"
                className={`inline-flex items-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700 ${
                  loading ? "cursor-not-allowed opacity-60" : ""
                }`}
                disabled={loading}>
                <i className="bi bi-cloud-upload mr-2" />
                {loading ? "Saving..." : "Insert Product"}
              </button>
            </div>
          </form>

          <aside className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Live Preview
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-100 bg-slate-50">
              {image ? (
                <img
                  src={image}
                  alt={title || "Preview"}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-[linear-gradient(135deg,#ccfbf1_0%,#e0f2fe_100%)] text-slate-500">
                  <span className="text-sm font-semibold">Image preview</span>
                </div>
              )}

              <div className="space-y-2 p-4">
                <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
                  {title || "Product title"}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-800">
                    {category}
                  </span>
                  <span className="rounded-full bg-teal-100 px-2.5 py-1 text-teal-800">
                    {Type || "Type"}
                  </span>
                </div>
                <p className="line-clamp-3 text-sm text-slate-600">
                  {content || "Product description preview appears here."}
                </p>
                <p className="pt-1 text-xl font-extrabold text-slate-900">
                  {Number.isFinite(parsedPrice) && parsedPrice > 0
                    ? `$${parsedPrice.toFixed(2)}`
                    : "$0.00"}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default InsertStore;
