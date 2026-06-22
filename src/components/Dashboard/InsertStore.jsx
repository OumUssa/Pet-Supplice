// InsertStore.jsx
import React, { useState, useEffect, useRef } from "react";
import { insertPetSupply } from "../../store/suppliesStore.";
import {
  createProduct,
  fetchPetCategories,
  fetchProductTypes,
  fetchUserProfile,
} from "../../API/api";
import { useToast } from "../Base/BaseToast";

/* ─── tiny hook: staggered mount flag ─── */
const useStagger = (count, delay = 60) => {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    let timers = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => setVisible((v) => [...v, i]), 80 + i * delay),
      );
    }
    return () => timers.forEach(clearTimeout);
  }, []);
  return (i) => visible.includes(i);
};

const InsertStore = () => {
  const { showSuccess, showError } = useToast();
  const isVis = useStagger(8, 55);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [Type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [categoryTypeMap, setCategoryTypeMap] = useState({});
  const [imgError, setImgError] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, typesData, userData] = await Promise.all([
          fetchPetCategories(),
          fetchProductTypes(),
          fetchUserProfile().catch(() => null),
        ]);
        
        if (userData) {
          setCurrentUser(userData);
        }

        let categoryNames = [];
        if (Array.isArray(categoriesData)) {
          categoryNames = categoriesData.map((c) => c.name || c);
        } else if (categoriesData?.data) {
          categoryNames = categoriesData.data.map((c) => c.name || c);
        }
        setCategories(categoryNames);
        if (categoryNames.length > 0) setCategory(categoryNames[0]);

        let typeNames = [];
        if (Array.isArray(typesData)) {
          typeNames = typesData.map((t) => t.name || t);
        } else if (typesData?.data) {
          typeNames = typesData.data.map((t) => t.name || t);
        } else if (typesData?.product_types) {
          typeNames = typesData.product_types.map((t) => t.name || t);
        }

        const typeMap = {};
        categoryNames.forEach((cat) => {
          typeMap[cat] = typeNames;
        });
        setCategoryTypeMap(typeMap);
        setProductTypes(typeNames);
      } catch (err) {
        showError("Error loading categories: " + err.message);
      }
    };
    loadData();
  }, [showError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !image || !content || !Type) {
      showError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const localResult = await insertPetSupply({
        title,
        category,
        Type,
        price: Number(price),
        image,
        content,
      });
      if (localResult) {
        showSuccess("Product saved!");
        setTitle("");
        setCategory(categories[0] || "");
        setType("");
        setPrice("");
        setImage("");
        setContent("");
        try {
          const token = localStorage.getItem("tokenPet");
          if (token) {
            await createProduct({
              title,
              description: content,
              price: Number(price),
              image_url: image,
              pet_category_name: category,
              product_type_name: Type,
            });
          }
        } catch (_) {}
      }
    } catch (err) {
      showError("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const typesForCategory = categoryTypeMap[category] || [];
  const parsedPrice = Number(price);
  const isValidImg = image && !imgError;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
        @keyframes slideRight { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes pulse    { 0%,100%{opacity:.7} 50%{opacity:1} }
        @keyframes barGrow  { from{width:0} to{width:100%} }
        @keyframes badgePop { 0%{transform:scale(0) rotate(-10deg)} 70%{transform:scale(1.12) rotate(2deg)} 100%{transform:scale(1) rotate(0)} }

        .ins-root * { font-family:inherit; box-sizing:border-box; }
        .ins-root h1,
        .ins-root h2 { font-family:inherit; font-weight:700; }

        /* stagger helpers */
        .s0{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .05s both}
        .s1{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .12s both}
        .s2{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .19s both}
        .s3{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .26s both}
        .s4{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .33s both}
        .s5{animation:fadeUp .5s cubic-bezier(.22,1,.36,1) .40s both}
        .s6{animation:scaleIn .5s cubic-bezier(.22,1,.36,1) .18s both}

        /* field */
        .ins-field {
          width:100%;
          background:#fafbfc;
          border:1.5px solid #e5eaf1;
          border-radius:12px;
          padding:11px 14px;
          font-size:.875rem;
          font-family:inherit;
          color:#111827;
          outline:none;
          transition:border-color .2s, box-shadow .2s, background .2s;
          appearance:none;
        }
        .ins-field:focus {
          background:#fff;
          border-color:#10b981;
          box-shadow:0 0 0 3.5px rgba(16,185,129,.13);
        }
        .ins-field::placeholder { color:#a0adb8; }
        .ins-field:hover:not(:focus) { border-color:#cbd5e1; }

        /* select arrow */
        .ins-select-wrap { position:relative; }
        .ins-select-wrap::after {
          content:'';
          position:absolute; right:14px; top:50%; transform:translateY(-50%);
          width:0; height:0;
          border-left:4.5px solid transparent;
          border-right:4.5px solid transparent;
          border-top:5.5px solid #94a3b8;
          pointer-events:none;
        }

        /* label */
        .ins-label {
          display:block;
          font-size:.75rem;
          font-weight:600;
          letter-spacing:.06em;
          text-transform:uppercase;
          color:#64748b;
          margin-bottom:7px;
        }

        /* submit btn */
        .ins-btn {
          display:inline-flex; align-items:center; gap:9px;
          background:linear-gradient(135deg,#10b981,#059669);
          color:#fff; font-weight:700; font-family:inherit;
          font-size:.875rem; border:none; border-radius:13px;
          padding:12px 26px; cursor:pointer;
          box-shadow:0 4px 16px rgba(16,185,129,.30), 0 1px 3px rgba(0,0,0,.08);
          transition:transform .18s,box-shadow .18s,opacity .18s;
        }
        .ins-btn:hover:not(:disabled) {
          transform:translateY(-2px);
          box-shadow:0 8px 22px rgba(16,185,129,.38), 0 2px 6px rgba(0,0,0,.08);
        }
        .ins-btn:active:not(:disabled) { transform:translateY(0); }
        .ins-btn:disabled { opacity:.55; cursor:not-allowed; }

        /* ghost */
        .ins-ghost {
          display:inline-flex; align-items:center; gap:7px;
          background:#fff; color:#64748b; font-family:inherit;
          font-size:.8125rem; font-weight:600;
          border:1.5px solid #e5eaf1; border-radius:11px;
          padding:10px 18px; cursor:pointer;
          transition:background .15s,border-color .15s;
        }
        .ins-ghost:hover { background:#f8fafc; border-color:#cbd5e1; }

        /* tag badge */
        .tag {
          display:inline-flex; align-items:center;
          font-size:.72rem; font-weight:700;
          border-radius:99px; padding:3px 11px;
          letter-spacing:.02em;
        }
        .tag-green  { background:#d1fae5; color:#065f46; }
        .tag-blue   { background:#dbeafe; color:#1e40af; }
        .tag-amber  { background:#fef3c7; color:#92400e; }

        /* card */
        .ins-card {
          background:#fff;
          border:1px solid #edf1f7;
          border-radius:20px;
          box-shadow:0 1px 3px rgba(0,0,0,.05),0 6px 24px rgba(0,0,0,.04);
        }

        /* preview image placeholder */
        .img-ph {
          height:180px; border-radius:14px;
          background:linear-gradient(135deg,#ecfdf5 0%,#eff6ff 100%);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          gap:10px; color:#94a3b8;
        }
        .img-ph-icon {
          width:44px; height:44px; border-radius:12px;
          background:#e5e7eb;
          display:grid; place-items:center;
          font-size:1.25rem; color:#9ca3af;
          animation:pulse 2.2s ease-in-out infinite;
        }

        /* price highlight */
        .price-big {
          font-family:inherit;
          font-size:1.75rem; color:#111827; line-height:1;
        }

        /* progress dots */
        .dot { width:7px; height:7px; border-radius:50%; background:#e2e8f0; }
        .dot.active { background:#10b981; animation:badgePop .35s cubic-bezier(.22,1,.36,1) both; }

        /* divider */
        .divider { height:1px; background:linear-gradient(90deg,transparent,#e5eaf1,transparent); margin:0; }

        /* field group focus glow */
        .field-group {
          border-radius:14px;
          transition:background .2s;
        }
        .field-group.focused { background:#f0fdf7; }

        /* character counter */
        .char-count { font-size:.72rem; color:#94a3b8; }
        .char-count.warn { color:#f59e0b; }
      `}</style>

      <div
        className="ins-root"
        style={{ padding: "1.5rem", maxWidth: 1100, margin: "0 auto" }}>
        {/* ── HEADER ── */}
        <div className="s0" style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}>
            <div>
              <p
                style={{
                  fontSize: ".6875rem",
                  fontWeight: 700,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "#10b981",
                  margin: 0,
                }}>
                Admin · Product Entry
              </p>
              <h1
                style={{
                  margin: "4px 0 0",
                  fontSize: "clamp(1.5rem,3vw,2rem)",
                  color: "#111827",
                  lineHeight: 1.15,
                }}>
                Insert New Pet Supply
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: ".875rem",
                  color: "#64748b",
                }}>
                Fill in the details below to publish a product to the store.
              </p>
            </div>
            <span className="tag tag-green" style={{ marginTop: 4 }}>
              <i className="bi bi-shield-check" style={{ marginRight: 5 }} />
              Admin Console
            </span>
          </div>
        </div>

        {/* ── BODY GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "1.25rem",
            alignItems: "start",
          }}>
          {/* ── FORM CARD ── */}
          <form onSubmit={handleSubmit}>
            <div className="ins-card s1" style={{ padding: "1.75rem" }}>
              {/* Section: Basic Info */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p
                  style={{
                    fontSize: ".6875rem",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#10b981",
                    marginBottom: "1.1rem",
                  }}>
                  Basic Information
                </p>

                <div style={{ marginBottom: "1.1rem" }}>
                  <label className="ins-label">Product Title</label>
                  <input
                    className="ins-field"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Salmon Grain-Free Cat Meal"
                    maxLength={80}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 4,
                    }}>
                    <span
                      className={`char-count${title.length > 65 ? " warn" : ""}`}>
                      {title.length}/80
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}>
                  <div>
                    <label className="ins-label">Pet Category</label>
                    <div className="ins-select-wrap">
                      <select
                        className="ins-field"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setType("");
                        }}>
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="ins-label">Product Type</label>
                    <div className="ins-select-wrap">
                      <select
                        className="ins-field"
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
                  </div>
                </div>
              </div>

              <div className="divider s2" />

              {/* Section: Pricing & Media */}
              <div style={{ margin: "1.5rem 0" }}>
                <p
                  style={{
                    fontSize: ".6875rem",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#10b981",
                    marginBottom: "1.1rem",
                  }}>
                  Pricing & Media
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}>
                  <div>
                    <label className="ins-label">Price (USD)</label>
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: 13,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: ".9rem",
                          fontWeight: 600,
                          color: "#94a3b8",
                          pointerEvents: "none",
                        }}>
                        $
                      </span>
                      <input
                        className="ins-field"
                        type="number"
                        step="0.01"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        style={{ paddingLeft: 26 }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="ins-label">Image URL / Filename</label>
                    <input
                      className="ins-field"
                      type="text"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                        setImgError(false);
                      }}
                      placeholder="https://… or filename.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="divider s3" />

              {/* Section: Description */}
              <div style={{ margin: "1.5rem 0 0" }}>
                <p
                  style={{
                    fontSize: ".6875rem",
                    fontWeight: 700,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "#10b981",
                    marginBottom: "1.1rem",
                  }}>
                  Description
                </p>
                <textarea
                  className="ins-field"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write a short, helpful description of this product…"
                  rows={5}
                  maxLength={500}
                  style={{ resize: "vertical", minHeight: 110 }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 4,
                  }}>
                  <span
                    className={`char-count${content.length > 420 ? " warn" : ""}`}>
                    {content.length}/500
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: ".75rem",
                  paddingTop: "1.25rem",
                  marginTop: "1.25rem",
                  borderTop: "1px solid #f1f5f9",
                }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[title, category, Type, price, image, content].map(
                    (v, i) => (
                      <div
                        key={i}
                        className={`dot${v ? " active" : ""}`}
                        style={{ animationDelay: `${i * 50}ms` }}
                      />
                    ),
                  )}
                  <span
                    style={{
                      fontSize: ".75rem",
                      color: "#94a3b8",
                      marginLeft: 8,
                      alignSelf: "center",
                    }}>
                    {
                      [title, category, Type, price, image, content].filter(
                        Boolean,
                      ).length
                    }
                    /6 fields
                  </span>
                </div>
                <div style={{ display: "flex", gap: ".625rem" }}>
                  <button
                    type="button"
                    className="ins-ghost"
                    onClick={() => {
                      setTitle("");
                      setCategory(categories[0] || "");
                      setType("");
                      setPrice("");
                      setImage("");
                      setContent("");
                    }}>
                    <i className="bi bi-arrow-counterclockwise" />
                    Clear
                  </button>
                  <button type="submit" className="ins-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <span
                          style={{
                            width: 15,
                            height: 15,
                            border: "2.5px solid rgba(255,255,255,.35)",
                            borderTopColor: "#fff",
                            borderRadius: "50%",
                            animation: "spin .7s linear infinite",
                            flexShrink: 0,
                          }}
                        />
                        Saving…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-cloud-arrow-up-fill" />
                        Insert Product
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* ── PREVIEW CARD ── */}
          <div
            className="ins-card s6"
            style={{ position: "sticky", top: "1.5rem", overflow: "hidden" }}>
            {/* top accent bar */}
            <div
              style={{
                height: 3,
                background: "linear-gradient(90deg,#10b981,#3b82f6,#8b5cf6)",
                borderRadius: "20px 20px 0 0",
              }}
            />

            <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
              <p
                style={{
                  fontSize: ".6875rem",
                  fontWeight: 700,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#10b981",
                  marginBottom: "1rem",
                }}>
                Live Preview
              </p>

              {/* Creator Info on Preview */}
              {currentUser && (
                <div className="flex items-center gap-2 mb-3">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-bold">
                      {currentUser.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] font-bold text-slate-800 leading-none mb-0.5">{currentUser.name}</p>
                    <p className="text-[8px] text-slate-500 leading-none">Just now</p>
                  </div>
                </div>
              )}

              {/* Image */}
              <div
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}>
                {isValidImg ? (
                  <img
                    src={image}
                    alt={title || "Preview"}
                    onError={() => setImgError(true)}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      display: "block",
                      animation: "fadeIn .4s ease",
                    }}
                  />
                ) : (
                  <div className="img-ph">
                    <div className="img-ph-icon">
                      <i className="bi bi-image" />
                    </div>
                    <span style={{ fontSize: ".78rem", fontWeight: 500 }}>
                      {imgError ? "Image not found" : "Paste image URL above"}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginBottom: ".75rem",
                }}>
                {category && <span className="tag tag-green">{category}</span>}
                {Type && <span className="tag tag-blue">{Type}</span>}
                {!category && !Type && (
                  <span className="tag tag-amber">No tags yet</span>
                )}
              </div>

              {/* Title */}
              <h2
                style={{
                  margin: "0 0 .5rem",
                  fontSize: "1.15rem",
                  color: title ? "#111827" : "#d1d5db",
                  lineHeight: 1.3,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                {title || "Product title goes here"}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: ".8125rem",
                  color: content ? "#475569" : "#d1d5db",
                  lineHeight: 1.55,
                  margin: "0 0 1rem",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}>
                {content ||
                  "Product description preview appears here once you start typing."}
              </p>

              <div className="divider" style={{ marginBottom: "1rem" }} />

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span className="price-big">
                  {Number.isFinite(parsedPrice) && parsedPrice > 0
                    ? `$${parsedPrice.toFixed(2)}`
                    : "$0.00"}
                </span>
                {parsedPrice > 0 && (
                  <span
                    style={{
                      fontSize: ".78rem",
                      color: "#94a3b8",
                      fontWeight: 500,
                    }}>
                    USD
                  </span>
                )}
              </div>

              {/* Add to cart mockup */}
              <div
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  gap: ".5rem",
                }}>
                <div
                  style={{
                    flex: 1,
                    height: 38,
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#10b981,#059669)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: ".78rem",
                    fontWeight: 700,
                    color: "#fff",
                    opacity: title && price ? 1 : 0.35,
                    transition: "opacity .3s",
                  }}>
                  <i className="bi bi-cart-plus" style={{ marginRight: 6 }} />
                  Add to Cart
                </div>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    border: "1.5px solid #e5eaf1",
                    display: "grid",
                    placeItems: "center",
                    fontSize: ".875rem",
                    color: "#94a3b8",
                    opacity: title && price ? 1 : 0.35,
                    transition: "opacity .3s",
                  }}>
                  <i className="bi bi-heart" />
                </div>
              </div>

              {/* completeness hint */}
              {!(title && category && Type && price && image && content) && (
                <p
                  style={{
                    marginTop: ".875rem",
                    fontSize: ".72rem",
                    color: "#94a3b8",
                    textAlign: "center",
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: "7px 10px",
                    border: "1px dashed #e2e8f0",
                  }}>
                  <i className="bi bi-info-circle" style={{ marginRight: 5 }} />
                  Fill all fields to enable submit
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsertStore;
