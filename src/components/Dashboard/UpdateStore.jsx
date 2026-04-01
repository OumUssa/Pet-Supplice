// UpdateStore.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePetSupply } from "../../store/suppliesStore.";
import { useToast } from "../Base/BaseToast";

const CATEGORY_TYPES = {
  Dog: ["Food", "Toys", "Accessories", "Health & Care"],
  Cat: ["Food", "Toys", "Litter & Hygiene", "Accessories"],
  Bird: ["Food", "Cages", "Toys"],
  Fish: ["Food", "Aquariums", "Filters & Pumps"],
  "Small Pet": ["Food", "Cages", "Bedding", "Toys"],
};

const UpdateStore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const item = location.state?.item; // item passed from TableView

  const [title, setTitle] = useState(item?.title || "");
  const [category, setCategory] = useState(item?.category || "Dog");
  const [Type, setType] = useState(item?.Type || "");
  const [price, setPrice] = useState(item?.price || "");
  const [image, setImage] = useState(item?.image || "");
  const [content, setContent] = useState(item?.content || "");
  const [loading, setLoading] = useState(false);

  // get types for selected category
  const typesForCategory = CATEGORY_TYPES[category];
  const parsedPrice = Number(price);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !image || !content || !Type) {
      showError("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await updatePetSupply(item.id, {
        title,
        category,
        Type,
        price: Number(price),
        image,
        content,
      });

      if (result) {
        showSuccess("Pet/Supply updated successfully!");
        navigate(-1); // go back to previous page
      }
    } catch (err) {
      console.error(err);
      showError("Error updating pet supply");
    } finally {
      setLoading(false);
    }
  };

  // Reset Type if category changes
  useEffect(() => {
    if (!typesForCategory.includes(Type)) {
      setType("");
    }
  }, [category]);

  return (
    <div className="min-h-screen rounded-3xl border border-cyan-100/80 bg-[linear-gradient(180deg,#f8fcff_0%,#eefdfb_100%)] p-4 md:p-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 rounded-2xl border border-cyan-100 bg-white/90 p-5 shadow-sm backdrop-blur md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
            Admin Product Edit
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Update Pet Supply
            </h2>
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
              <i className="bi bi-pencil-square mr-2" />
              Clean Admin Form
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Edit product details and save changes to keep your store up to date.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm md:p-7">
            <div className="grid gap-5 text-gray-700 md:grid-cols-2">
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
                  Category
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
                  Type
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
                Review details before saving to avoid accidental product
                changes.
              </p>
              <button
                type="submit"
                className={`inline-flex items-center rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700 ${
                  loading ? "cursor-not-allowed opacity-60" : ""
                }`}
                disabled={loading}>
                <i className="bi bi-check2-circle mr-2" />
                {loading ? "Saving..." : "Save Changes"}
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

export default UpdateStore;
