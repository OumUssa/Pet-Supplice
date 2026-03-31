import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";
import { getPetSupplies } from "../store/suppliesStore.";

const categoryOrder = ["Dog", "Cat", "Bird", "Fish", "Small Pet"];

export default function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";
  const selectedType = searchParams.get("type") || "All";

  useEffect(() => {
    const load = async () => {
      const data = (await getPetSupplies()) || [];
      setItems(data);
      setLoading(false);
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const fromData = [...new Set(items.map((item) => item.category))];
    const sorted = [
      ...categoryOrder.filter((cat) => fromData.includes(cat)),
      ...fromData.filter((cat) => !categoryOrder.includes(cat)),
    ];
    return ["All", ...sorted];
  }, [items]);

  const availableTypes = useMemo(() => {
    const scoped =
      selectedCategory === "All"
        ? items
        : items.filter((item) => item.category === selectedCategory);

    const types = [...new Set(scoped.map((item) => item.Type).filter(Boolean))];
    return ["All", ...types];
  }, [items, selectedCategory]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryOk =
        selectedCategory === "All" || item.category === selectedCategory;
      const typeOk = selectedType === "All" || item.Type === selectedType;
      return categoryOk && typeOk;
    });
  }, [items, selectedCategory, selectedType]);

  const updateFilter = (category, type) => {
    const next = new URLSearchParams(searchParams);

    if (!category || category === "All") {
      next.delete("category");
    } else {
      next.set("category", category);
    }

    if (!type || type === "All") {
      next.delete("type");
    } else {
      next.set("type", type);
    }

    setSearchParams(next);
  };

  const handleBuy = (item) => {
    navigate(`/checkout?itemId=${item.id}`, { state: { item } });
  };

  return (
    <div className="site-shell flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="rounded-3xl primary-gradient p-8 md:p-12 mb-8">
          <p className="uppercase tracking-[0.16em] text-sm text-cyan-100 mb-3">
            PETZONE Shop
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            All Categories In One Page
          </h1>
          <p className="text-cyan-50 text-lg max-w-2xl">
            Browse everything here. Category and type selections from the menu
            will open this page with the right filter.
          </p>
        </div>

        <section className="brand-card p-5 md:p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateFilter(cat, "All")}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedCategory === cat
                    ? "bg-cyan-700 text-white border-cyan-700"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="brand-card p-5 md:p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Types</h2>
          <div className="flex flex-wrap gap-3">
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => updateFilter(selectedCategory, type)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedType === type
                    ? "bg-cyan-600 text-white border-cyan-600"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}>
                {type}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-slate-800">Products</h2>
            <p className="text-slate-500">{filteredItems.length} item(s)</p>
          </div>

          {loading ? (
            <p className="text-slate-500 py-8">Loading products...</p>
          ) : filteredItems.length === 0 ? (
            <div className="brand-card p-8 text-center">
              <p className="text-slate-600 mb-3">
                No products found for this filter.
              </p>
              <button
                onClick={() => updateFilter("All", "All")}
                className="px-5 py-2 rounded-lg btn-primary transition">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="brand-card overflow-hidden transition duration-300">
                  <div className="h-44 bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
                        {item.Type}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                      {item.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-black text-teal-700">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleBuy(item)}
                        className="px-3 py-1.5 rounded-lg btn-primary transition text-sm font-semibold">
                        Buy
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition">
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
