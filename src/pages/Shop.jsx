import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";
import { fetchPublicProducts } from "../API/api";

const categoryOrder = ["Dog", "Cat", "Bird", "Fish", "Small Pet"];

export default function Shop() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";
  const selectedType = searchParams.get("type") || "All";
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();

  useEffect(() => {
    const load = async () => {
      try {
        console.log("📥 Loading public products for shop...");
        const data = (await fetchPublicProducts()) || [];
        console.log("✅ Shop products loaded:", data);
        setItems(data);
      } catch (error) {
        console.error("❌ Error loading products:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
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
      const queryOk =
        !searchQuery ||
        [item.title, item.content, item.category, item.Type]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(searchQuery);

      return categoryOk && typeOk && queryOk;
    });
  }, [items, selectedCategory, selectedType, searchQuery]);

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

  const handleBuy = (e, item) => {
    e.stopPropagation();
    navigate(`/checkout?itemId=${item.id}`, { state: { item } });
  };

  const handleProductClick = (item) => {
    navigate(`/product/${item.id}`);
  };

  const handleCategorySelect = (category) => {
    updateFilter(category, "All");
    setIsFilterOpen(false);
  };

  const handleTypeSelect = (type) => {
    updateFilter(selectedCategory, type);
    setIsFilterOpen(false);
  };

  return (
    <div className="site-shell flex flex-col">
      <style>{`
        /* ── PRODUCT CARD ── */
        .prod-card {
          border-radius:18px; border:1.5px solid #e5e7eb;
          background:#fff; overflow:hidden;
          transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .prod-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,0,0,.11); }
        .prod-card img { transition:transform .5s ease; }
        .prod-card:hover img { transform:scale(1.06); }
        
        /* ── CART btn ── */
        .cart-btn {
          border-radius:9px; padding:7px 14px;
          font-size:.78rem; font-weight:700; font-family:inherit;
          background:#0ea186; color:#fff; border:none; cursor:pointer;
          transition:background .18s,transform .15s;
        }
        .cart-btn:hover { background:#0a8c74; transform:translateY(-1px); }
      `}</style>
      <Header />

      <main className="flex-1 max-w-8xl w-full mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="relative rounded-3xl shop-hero shop-hero--animated p-6 md:p-8 lg:p-10 mb-8 border border-slate-200 overflow-hidden">
          <div
            className="shop-hero-blob shop-hero-blob--one"
            aria-hidden="true"></div>
          <div
            className="shop-hero-blob shop-hero-blob--two"
            aria-hidden="true"></div>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-stretch">
            <div className="relative z-10">
              <p className="shop-hero-badge inline-flex uppercase tracking-[0.14em] text-xs text-white mb-3 font-bold bg-white/15 border border-white/30 rounded-full px-3 py-1">
                PETZONE Shop
              </p>
              <h1 className="shop-hero-title text-2xl md:text-4xl font-black mb-4 text-white leading-tight">
                Shop Smarter With Fast Filters
              </h1>
              <p className="shop-hero-text text-slate-100 text-base md:text-lg max-w-2xl">
                Explore products by category and type in seconds. Use the left
                filter menu on desktop or offcanvas filters on mobile for a
                faster shopping flow.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-3 content-start">
              <div className="shop-hero-stat">
                <p className="shop-hero-stat__value">{items.length}</p>
                <p className="shop-hero-stat__label">Products</p>
              </div>
              <div className="shop-hero-stat">
                <p className="shop-hero-stat__value">
                  {Math.max(categories.length - 1, 0)}
                </p>
                <p className="shop-hero-stat__label">Categories</p>
              </div>
              <div className="shop-hero-stat">
                <p className="shop-hero-stat__value">
                  {Math.max(availableTypes.length - 1, 0)}
                </p>
                <p className="shop-hero-stat__label">Types</p>
              </div>
              <div className="shop-hero-stat">
                <p className="shop-hero-stat__value">{filteredItems.length}</p>
                <p className="shop-hero-stat__label">Showing</p>
              </div>
            </div>
          </div>
        </div>

        <section className="md:hidden shop-panel p-4 mb-5 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800">Filters</p>
              <p className="text-xs text-slate-500">
                {selectedCategory} / {selectedType}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <i className="bi bi-sliders"></i>
              Choose Category
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8">
          <aside className="hidden md:block">
            <div className="shop-filter-sidebar rounded-2xl border border-slate-200 bg-white p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                <i className="bi bi-funnel text-emerald-600"></i>
                <h2 className="text-2xl font-black text-slate-900">Filters</h2>
              </div>

              <div className="mb-6">
                <p className="text-base font-bold text-slate-900 mb-3">
                  Category
                </p>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={`sidebar-cat-${cat}`}
                      onClick={() => updateFilter(cat, "All")}
                      className={`shop-filter-option ${
                        selectedCategory === cat
                          ? "shop-filter-option--active"
                          : ""
                      }`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-base font-bold text-slate-900 mb-3">Types</p>
                <div className="flex flex-wrap gap-2">
                  {availableTypes.map((type) => (
                    <button
                      key={`sidebar-type-${type}`}
                      onClick={() => updateFilter(selectedCategory, type)}
                      className={`shop-filter-chip ${
                        selectedType === type ? "shop-filter-chip--active" : ""
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => updateFilter("All", "All")}
                className="w-full rounded-lg bg-emerald-600 text-white font-semibold py-2.5 hover:bg-emerald-700 transition">
                Clear Filters
              </button>
            </div>
          </aside>

          <section id="shop-products">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-slate-800">Products</h2>
              <p className="text-slate-500">{filteredItems.length} item(s)</p>
            </div>

            {searchQuery ? (
              <p className="text-slate-600 mb-4">
                Search results for{" "}
                <span className="font-semibold">"{searchQuery}"</span>
              </p>
            ) : null}

            {loading ? (
              <p className="text-slate-500 py-8">Loading products...</p>
            ) : filteredItems.length === 0 ? (
              <div className="shop-panel p-8 text-center rounded-2xl border border-slate-200 bg-white">
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
                    className="prod-card cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <div style={{ position: "relative", height: 188, overflow: "hidden" }}>
                      <img
                        src={item.image || item.image_url}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {/* Overlay gradient */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top,rgba(0,0,0,.35) 0%,transparent 55%)",
                      }} />
                      {/* Category badge */}
                      <span style={{
                        position: "absolute", left: 10, bottom: 10,
                        fontSize: ".68rem", fontWeight: 800, letterSpacing: ".06em",
                        textTransform: "uppercase",
                        background: "rgba(255,255,255,.92)", color: "#374151",
                        borderRadius: 7, padding: "3px 9px",
                        border: "1px solid rgba(255,255,255,.6)",
                      }}>
                        {item.category}
                      </span>
                      {/* Wishlist */}
                      <button style={{
                        position: "absolute", right: 10, top: 10,
                        width: 30, height: 30, borderRadius: "50%",
                        background: "rgba(255,255,255,.88)",
                        border: "none", cursor: "pointer",
                        display: "grid", placeItems: "center",
                        transition: "background .15s",
                      }}>
                        <i className="bi bi-heart" style={{ fontSize: ".8rem", color: "#6b7280" }} />
                      </button>
                      {/* Creator Info Overlay */}
                      {item.creator_id && (
                        <div
                          className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-full shadow-sm hover:bg-white transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/user/${item.creator_id}`);
                          }}
                        >
                          {item.creator_avatar ? (
                            <img src={item.creator_avatar} alt={item.creator_name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold">
                              {item.creator_name?.charAt(0)?.toUpperCase()}
                            </div>
                          )}
                          <div className="flex flex-col pr-1">
                            <span className="text-[10px] font-bold text-slate-800 leading-none mb-0.5">{item.creator_name}</span>
                            <span className="text-[9px] text-slate-500 leading-none">
                              {new Date(item.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{
                        margin: "0 0 3px", fontSize: ".875rem", fontWeight: 700, color: "#111827",
                        overflow: "hidden", display: "-webkit-box",
                        WebkitLineClamp: 1, WebkitBoxOrient: "vertical",
                      }}>
                        {item.title}
                      </h3>
                      <p style={{ margin: "0 0 6px", fontSize: ".68rem", fontWeight: 700, color: "#9ca3af", letterSpacing: ".1em", textTransform: "uppercase" }}>
                        {item.Type || "Pet Supply"}
                      </p>
                      <p style={{
                        margin: "0 0 12px", fontSize: ".78rem", color: "#6b7280", lineHeight: 1.55,
                        overflow: "hidden", display: "-webkit-box",
                        WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                      }}>
                        {item.description || item.content}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                        <span className="syne" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827" }}>
                          ${Number(item.price).toFixed(2)}
                        </span>
                        <button className="cart-btn" onClick={(e) => handleBuy(e, item)}>
                          <i className="bi bi-cart-plus" style={{ marginRight: 5 }} />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex px-5 py-2.5 rounded text-white hover:bg-slate-100 transition">
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />

      <div
        className={`md:hidden fixed inset-0 z-70 transition-opacity duration-200 ${
          isFilterOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}>
        <button
          type="button"
          aria-label="Close filters"
          onClick={() => setIsFilterOpen(false)}
          className="absolute inset-0 bg-slate-900/45"></button>

        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-white border-l border-slate-200 p-5 overflow-y-auto transition-transform duration-300 ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-black text-slate-900">
              Choose Filters
            </h3>
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="h-9 w-9 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-50">
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <div className="offcanvas-layout mb-6">
            <div className="offcanvas-left-menu">
              <p className="text-sm font-bold text-slate-900 mb-2">
                Categories
              </p>
              <div className="offcanvas-left-menu-list">
                {categories.map((cat) => (
                  <button
                    key={`mobile-cat-${cat}`}
                    onClick={() => handleCategorySelect(cat)}
                    className={`offcanvas-left-menu-item ${
                      selectedCategory === cat
                        ? "offcanvas-left-menu-item--active"
                        : ""
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="offcanvas-right-panel">
              <p className="text-sm font-bold text-slate-900 mb-2">Types</p>
              <div className="offcanvas-menu-list">
                {availableTypes.map((type) => (
                  <button
                    key={`mobile-type-${type}`}
                    onClick={() => handleTypeSelect(type)}
                    className={`offcanvas-menu-item ${
                      selectedType === type ? "offcanvas-menu-item--active" : ""
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              updateFilter("All", "All");
              setIsFilterOpen(false);
            }}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Clear All Filters
          </button>
        </aside>
      </div>
    </div>
  );
}
