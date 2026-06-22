// Home.jsx
// Dependencies needed:
//   npm install swiper aos
//   In main.jsx / index.js: import 'aos/dist/aos.css';

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import AOS from "aos";
import { fetchPublicProducts } from "../../API/api";

// Swiper core styles (import once globally or here)
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos/dist/aos.css";

/* ─────────────────────────────────── DATA ─────────────────────────────────── */

const heroSlides = [
  {
    badge: "🌿 Spring Collection",
    title: "Healthy Picks\nFor Happy Pets",
    text: "Shop curated essentials for dogs, cats, birds, fish, and small pets in one clean experience.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=80",
    accent: "#0d9488",
  },
  {
    badge: "✨ New Arrivals",
    title: "Smarter Daily\nCare Starts Here",
    text: "From premium food to playful toys, discover products built for comfort and wellness.",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=80",
    accent: "#6366f1",
  },
  {
    badge: "⭐ Top Rated",
    title: "Trusted Products,\nFast Browsing",
    text: "A modern storefront with smooth motion and clear categories so users find what they need faster.",
    image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=1400&q=80",
    accent: "#f59e0b",
  },
];

const categoryCards = [
  { name: "Dog",       desc: "Food, toys, accessories, and daily care essentials.",   icon: "bi-heart-pulse",  color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd", types: ["Food","Toys","Accessories"] },
  { name: "Cat",       desc: "Comfort, nutrition, and fun for indoor and outdoor cats.", icon: "bi-moon-stars", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a", types: ["Food","Toys","Litter"] },
  { name: "Bird",      desc: "Balanced feed, cages, and enrichment products.",         icon: "bi-feather",    color: "#10b981", bg: "#f0fdf4", border: "#a7f3d0", types: ["Food","Cages","Toys"] },
  { name: "Fish",      desc: "Aquarium kits, filters, and healthy food blends.",       icon: "bi-water",      color: "#6366f1", bg: "#eef2ff", border: "#c7d2fe", types: ["Food","Aquariums","Filters"] },
  { name: "Small Pet", desc: "Bedding, toys, tunnels, and habitat support.",           icon: "bi-stars",      color: "#ec4899", bg: "#fdf2f8", border: "#fbcfe8", types: ["Food","Cages","Bedding"] },
  { name: "Reptile",   desc: "Terrariums, heating, and specialized diets for reptiles.", icon: "bi-brightness-high", color: "#8b5cf6", bg: "#f5f3ff", border: "#ddd6fe", types: ["Food","Heating","Habitats"] },
];

const faqItems = [
  { question: "How do I choose the right product for my pet?",     answer: "Start with pet type and age, then check product descriptions and category labels. Use the Shop filters to narrow down products quickly." },
  { question: "Can I filter products by category and type?",        answer: "Yes. On the Shop page use category and type filters from the left panel on desktop or the offcanvas on mobile." },
  { question: "Do product prices include all fees?",               answer: "Displayed prices show product cost. Final checkout totals may include additional charges based on delivery or payment method." },
  { question: "How can I place an order?",                          answer: "Open a product, click Add to cart or Buy, then continue to checkout and submit your details to place the order." },
  { question: "Can I update products as an admin?",                 answer: "Yes. Admin users can access the dashboard to insert, update, and manage product records." },
  { question: "Is PETZONE mobile friendly?",                        answer: "Yes. The interface is responsive and includes mobile-friendly menus, filters, and navigation." },
  { question: "Where can I get support?",                           answer: "Use the Contact page to send a message. The support team will help with products, orders, and general questions." },
  { question: "How often are products updated?",                    answer: "Products are updated as new items are added or edited through the dashboard, so availability can change over time." },
  { question: "Can I search for specific pet products?",            answer: "Yes. Use the search input in the header to find products by name, content, category, or type." },
  { question: "What pet types are covered on PETZONE?",             answer: "PETZONE currently supports Dog, Cat, Bird, Fish, and Small Pet categories with various product types in each." },
];

/* ─────────────────────────────────── COMPONENT ─────────────────────────────── */

const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 40}
      style={{
        borderRadius: 14,
        border: `1px solid ${open ? "#d1fae5" : "#e5e7eb"}`,
        background: open ? "#f0fdf4" : "#fff",
        overflow: "hidden",
        transition: "border-color .25s, background .25s",
        marginBottom: 8,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 12,
          padding: "15px 18px", background: "none", border: "none",
          cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: ".9rem", fontWeight: 600, color: "#111827", fontFamily: "inherit", lineHeight: 1.4 }}>
          {faq.question}
        </span>
        <span style={{
          width: 28, height: 28, borderRadius: "50%",
          background: open ? "#10b981" : "#f3f4f6",
          display: "grid", placeItems: "center", flexShrink: 0,
          transition: "background .25s, transform .3s",
          transform: open ? "rotate(45deg)" : "none",
        }}>
          <i className="bi bi-plus-lg" style={{ fontSize: ".7rem", color: open ? "#fff" : "#6b7280" }} />
        </span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: "hidden",
        transition: "max-height .35s cubic-bezier(.22,1,.36,1)",
      }}>
        <p style={{
          padding: "0 18px 16px", fontSize: ".875rem", color: "#4b5563",
          lineHeight: 1.7, margin: 0, fontFamily: "inherit",
        }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  /* init AOS */
  useEffect(() => {
    AOS.init({ duration: 650, once: true, easing: "ease-out-cubic", offset: 60 });
  }, []);

  /* load products */
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPublicProducts();
        setSupplies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = useMemo(() => supplies.slice(0, 8), [supplies]);

  const handleShopNow = () => navigate("/shop");
  const handleExploreCategories = () => {
    document.getElementById("home-categories")?.scrollIntoView({ behavior: "smooth" });
  };
  const handleBuy = (item) => navigate(`/checkout?itemId=${item.id}`, { state: { item } });
  const handleOpenCategory = (name) => navigate(`/shop?category=${encodeURIComponent(name)}`);

  const currentAccent = heroSlides[activeSlide]?.accent || "#0d9488";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn   { from{opacity:0;transform:scale(.93)} to{opacity:1;transform:scale(1)} }
        @keyframes slideLeft { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes badgePulse { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.4)} 50%{box-shadow:0 0 0 8px rgba(16,185,129,0)} }

        .home-root * { font-family:'Manrope',sans-serif; box-sizing:border-box; }
        .home-root h1,.home-root h2,.home-root .syne { font-family:'Syne',sans-serif; }

        /* ── HERO SWIPER overrides ── */
        .hero-swiper { border-radius:24px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.14); }
        .hero-swiper .swiper-pagination { bottom:22px !important; }
        .hero-swiper .swiper-pagination-bullet {
          width:8px; height:8px; background:rgba(255,255,255,.5);
          opacity:1; transition:all .3s;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width:28px; border-radius:99px; background:#fff;
        }
        .hero-swiper .swiper-button-prev,
        .hero-swiper .swiper-button-next {
          width:40px; height:40px; border-radius:50%;
          background:rgba(255,255,255,.18);
          backdrop-filter:blur(8px);
          border:1px solid rgba(255,255,255,.3);
          color:#fff !important;
          transition:background .2s;
        }
        .hero-swiper .swiper-button-prev:hover,
        .hero-swiper .swiper-button-next:hover { background:rgba(255,255,255,.32); }
        .hero-swiper .swiper-button-prev::after,
        .hero-swiper .swiper-button-next::after { font-size:.85rem !important; font-weight:900; }

        /* ── GLASS badge ── */
        .glass-badge {
          display:inline-flex; align-items:center; gap:7px;
          background:rgba(255,255,255,.18);
          backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,.35);
          border-radius:99px; padding:6px 16px;
          font-size:.78rem; font-weight:700; color:#fff;
          letter-spacing:.04em;
          animation:badgePulse 2.5s ease-in-out infinite;
        }

        /* ── GLASS PANEL (hero content) ── */
        .glass-panel {
          background:rgba(255,255,255,.10);
          backdrop-filter:blur(18px) saturate(1.6);
          border:1px solid rgba(255,255,255,.22);
          border-radius:20px;
          padding:36px 40px;
        }

        /* ── HERO FLOAT CARD ── */
        .float-card {
          background:rgba(255,255,255,.92);
          backdrop-filter:blur(16px);
          border:1px solid rgba(255,255,255,.7);
          border-radius:16px;
          padding:14px 18px;
          box-shadow:0 8px 24px rgba(0,0,0,.12);
          animation:float 3.5s ease-in-out infinite;
        }

        /* ── CATEGORY CARD ── */
        .cat-card {
          border-radius:18px; border:1.5px solid #e5e7eb;
          background:#fff; padding:20px;
          cursor:pointer;
          transition:transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s;
        }
        .cat-card:hover {
          transform:translateY(-5px);
          box-shadow:0 12px 32px rgba(0,0,0,.1);
        }

        /* ── PRODUCT CARD ── */
        .prod-card {
          border-radius:18px; border:1.5px solid #e5e7eb;
          background:#fff; overflow:hidden;
          transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s;
        }
        .prod-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,0,0,.11); }
        .prod-card img { transition:transform .5s ease; }
        .prod-card:hover img { transform:scale(1.06); }

        /* ── BTN ── */
        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          border-radius:12px; padding:12px 26px;
          font-weight:700; font-size:.875rem; font-family:inherit;
          border:none; cursor:pointer;
          transition:transform .18s,box-shadow .18s;
        }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,.18); }
        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          border-radius:12px; padding:11px 22px;
          font-weight:600; font-size:.875rem; font-family:inherit;
          background:rgba(255,255,255,.15);
          backdrop-filter:blur(10px);
          border:1.5px solid rgba(255,255,255,.4);
          color:#fff; cursor:pointer;
          transition:background .2s;
        }
        .btn-ghost:hover { background:rgba(255,255,255,.28); }

        /* ── STATS STRIP ── */
        .stat-strip {
          display:flex; gap:2px;
          background:linear-gradient(135deg,#f0fdf4,#eff6ff);
          border:1px solid #e5e7eb; border-radius:16px;
          overflow:hidden;
        }
        .stat-item {
          flex:1; padding:16px 10px; text-align:center;
          background:transparent;
          transition:background .2s;
        }
        .stat-item:hover { background:rgba(16,185,129,.07); }

        /* ── SECTION LABEL ── */
        .section-label {
          font-size:.7rem; font-weight:800;
          letter-spacing:.18em; text-transform:uppercase;
          display:inline-block;
        }

        /* ── HERO title lines ── */
        .hero-line { display:block; animation:fadeUp .55s cubic-bezier(.22,1,.36,1) both; }
        .hero-line:nth-child(2) { animation-delay:.1s; }

        /* ── CART btn ── */
        .cart-btn {
          border-radius:9px; padding:7px 14px;
          font-size:.78rem; font-weight:700; font-family:inherit;
          background:#0ea186; color:#fff; border:none; cursor:pointer;
          transition:background .18s,transform .15s;
        }
        .cart-btn:hover { background:#0a8c74; transform:translateY(-1px); }

        /* ── FAQ ── */
        .faq-wrap { max-width:780px; margin:0 auto; }

        /* ── DIVIDER ── */
        .wave-divider { height:2px; background:linear-gradient(90deg,transparent,#e5e7eb 30%,#10b981 50%,#e5e7eb 70%,transparent); border:none; margin:0; }
      `}</style>

      <div className="home-root" style={{ minHeight: "100vh", background: "linear-gradient(180deg,#f9fafb 0%,#f0fdf4 40%,#eff6ff 100%)" }}>

        {/* ══════════════════════════════════════════
            HERO SWIPER
        ══════════════════════════════════════════ */}
        <section style={{ padding: "24px 20px 0", maxWidth: 1280, margin: "0 auto" }}>
          <Swiper
            className="hero-swiper"
            modules={[Autoplay, Pagination, EffectFade, Navigation]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            onSlideChange={(s) => setActiveSlide(s.realIndex)}
            style={{ borderRadius: 24 }}
          >
            {heroSlides.map((slide, i) => (
              <SwiperSlide key={i}>
                <div style={{ position: "relative", height: "clamp(480px,58vw,640px)", overflow: "hidden" }}>
                  {/* BG Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(105deg,rgba(2,6,23,.82) 0%,rgba(2,6,23,.55) 55%,rgba(2,6,23,.15) 100%)"
                  }} />

                  {/* Floating accent orb */}
                  <div style={{
                    position: "absolute", top: "15%", right: "8%",
                    width: 320, height: 320, borderRadius: "50%",
                    background: `radial-gradient(circle,${slide.accent}44 0%,transparent 70%)`,
                    filter: "blur(40px)", pointerEvents: "none",
                  }} />

                  {/* Content */}
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center",
                    padding: "clamp(24px,4vw,64px)",
                  }}>
                    <div style={{ maxWidth: 560 }}>
                      {/* Glass badge */}
                      <div className="glass-badge" style={{ marginBottom: 20, animation: "fadeIn .5s ease .1s both" }}>
                        {slide.badge}
                      </div>

                      {/* Title */}
                      <h1 className="syne" style={{
                        fontSize: "clamp(2rem,4.5vw,3.25rem)",
                        fontWeight: 800, lineHeight: 1.12, color: "#fff",
                        margin: "0 0 18px", whiteSpace: "pre-line",
                        animation: "fadeUp .6s cubic-bezier(.22,1,.36,1) .15s both",
                      }}>
                        {slide.title}
                      </h1>

                      {/* Text */}
                      <p style={{
                        fontSize: "clamp(.875rem,1.4vw,1.05rem)",
                        color: "rgba(255,255,255,.82)", lineHeight: 1.65,
                        margin: "0 0 32px",
                        animation: "fadeUp .6s cubic-bezier(.22,1,.36,1) .25s both",
                      }}>
                        {slide.text}
                      </p>

                      {/* CTAs */}
                      <div style={{
                        display: "flex", gap: 12, flexWrap: "wrap",
                        animation: "fadeUp .6s cubic-bezier(.22,1,.36,1) .35s both",
                      }}>
                        <button
                          className="btn-primary"
                          onClick={handleShopNow}
                          style={{ background: "#F59E0B", color: "#fff" }}
                        >
                          <i className="bi bi-bag-fill" />
                          Shop Now
                        </button>
                        <button className="btn-ghost" onClick={handleExploreCategories}>
                          Explore Categories
                          <i className="bi bi-arrow-down" />
                        </button>
                      </div>
                    </div>

                    {/* Floating glass stat cards */}
                    <div style={{
                      position: "absolute", right: "clamp(20px,5vw,80px)", bottom: 48,
                      display: "flex", flexDirection: "column", gap: 10,
                      animation: "slideLeft .7s cubic-bezier(.22,1,.36,1) .4s both",
                    }}>
                      <div className="float-card" style={{ animationDelay: "0s" }}>
                        <div style={{ fontSize: ".7rem", fontWeight: 700, color: "#6b7280", letterSpacing: ".1em", textTransform: "uppercase" }}>Happy Pets</div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111827", fontFamily: "Syne,sans-serif" }}>12,400+</div>
                      </div>
                      <div className="float-card" style={{ animationDelay: ".3s" }}>
                        <div style={{ fontSize: ".7rem", fontWeight: 700, color: "#6b7280", letterSpacing: ".1em", textTransform: "uppercase" }}>Products</div>
                        <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#111827", fontFamily: "Syne,sans-serif" }}>500+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* ══════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════ */}
        <section style={{ padding: "20px 20px 0", maxWidth: 1280, margin: "0 auto" }} data-aos="fade-up">
          <div className="stat-strip">
            {[
              { icon: "bi-shield-check", label: "Quality Guaranteed", val: "100%" },
              { icon: "bi-truck",        label: "Fast Delivery",       val: "2–4 Days" },
              { icon: "bi-star-fill",    label: "Avg. Rating",         val: "4.9 ★" },
              { icon: "bi-headset",      label: "Support",             val: "24 / 7" },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <i className={`bi ${s.icon}`} style={{ fontSize: "1.1rem", color: "#10b981", display: "block", marginBottom: 4 }} />
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", fontFamily: "Syne,sans-serif" }}>{s.val}</div>
                <div style={{ fontSize: ".7rem", color: "#6b7280", fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CATEGORIES
        ══════════════════════════════════════════ */}
        <section id="home-categories" style={{ padding: "64px 20px 0", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }} data-aos="fade-up">
            <span className="section-label" style={{ color: "#10b981" }}>Categories</span>
            <h2 className="syne" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", fontWeight: 800, color: "#111827", margin: "8px 0 12px" }}>
              Shop By Pet Type
            </h2>
            <p style={{ color: "#6b7280", fontSize: ".9375rem", maxWidth: 480, margin: "0 auto" }}>
              Find everything your pet needs, organized by species.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {categoryCards.map((item, idx) => (
              <div
                key={item.name}
                className="cat-card"
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                onClick={() => handleOpenCategory(item.name)}
                style={{
                  background: "#fff",
                  borderColor: "#f8fafc",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderRadius: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: "#f3f4f6", // very light gray-blue
                  display: "grid", placeItems: "center", marginBottom: 24,
                }}>
                  <i className={`bi ${item.icon}`} style={{ fontSize: "1.4rem", color: "#6366f1" }} />
                </div>

                <h3 className="syne" style={{ margin: "0 0 14px", fontSize: "1.2rem", fontWeight: 700, color: "#1e293b" }}>{item.name}</h3>

                <p style={{ fontSize: ".9rem", color: "#64748b", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURED PRODUCTS
        ══════════════════════════════════════════ */}
        <section style={{ padding: "64px 20px 0", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 24, padding: "clamp(24px,3vw,40px)",
            boxShadow: "0 1px 3px rgba(0,0,0,.05), 0 8px 32px rgba(0,0,0,.04)",
          }}>
            <div style={{ textAlign: "center", marginBottom: 36 }} data-aos="fade-up">
              <span className="section-label" style={{ color: "#6366f1" }}>Featured</span>
              <h2 className="syne" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", fontWeight: 800, color: "#111827", margin: "8px 0 12px" }}>
                Best Sellers Right Now
              </h2>
              <p style={{ color: "#6b7280", fontSize: ".9375rem" }}>
                Curated top picks across all pet categories.
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "3px solid #e5e7eb", borderTopColor: "#10b981",
                  animation: "spin .7s linear infinite", margin: "0 auto 12px",
                }} />
                <p style={{ color: "#9ca3af", fontSize: ".875rem" }}>Loading products…</p>
              </div>
            ) : error ? (
              <p style={{ textAlign: "center", color: "#ef4444", padding: "60px 0" }}>{error}</p>
            ) : featured.length === 0 ? (
              <p style={{ textAlign: "center", color: "#9ca3af", padding: "60px 0" }}>No products available at the moment.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20 }}>
                {featured.map((item, idx) => (
                  <article
                    key={item.id || idx}
                    className="prod-card"
                    data-aos="fade-up"
                    data-aos-delay={idx * 60}
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
                    </div>

                    <div style={{ padding: "14px 14px 16px" }}>
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
                        {item.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className="syne" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827" }}>
                          ${Number(item.price).toFixed(2)}
                        </span>
                        <button className="cart-btn" onClick={() => handleBuy(item)}>
                          <i className="bi bi-cart-plus" style={{ marginRight: 5 }} />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* View all */}
            <div style={{ textAlign: "center", marginTop: 32 }} data-aos="fade-up">
              <button
                className="btn-primary"
                onClick={handleShopNow}
                style={{ background: "linear-gradient(135deg,#10b981,#0d9488)", color: "#fff" }}
              >
                View All Products
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BANNER CTA
        ══════════════════════════════════════════ */}
        <section style={{ padding: "64px 20px 0", maxWidth: 1280, margin: "0 auto" }} data-aos="zoom-in">
          <div style={{
            borderRadius: 24, overflow: "hidden", position: "relative",
            background: "linear-gradient(135deg,#0f172a 0%,#134e4a 60%,#0f766e 100%)",
            padding: "clamp(36px,5vw,60px) clamp(24px,4vw,60px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 24,
          }}>
            {/* Orbs */}
            <div style={{ position:"absolute", top:-60, right:80, width:260, height:260, borderRadius:"50%", background:"rgba(16,185,129,.18)", filter:"blur(50px)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-40, left:120, width:200, height:200, borderRadius:"50%", background:"rgba(99,102,241,.15)", filter:"blur(40px)", pointerEvents:"none" }} />

            <div style={{ position: "relative" }}>
              <span className="glass-badge" style={{ marginBottom: 16 }}>🐾 Limited Offer</span>
              <h2 className="syne" style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
                Get 20% Off Your First Order
              </h2>
              <p style={{ color: "rgba(255,255,255,.75)", fontSize: ".9375rem", margin: 0 }}>
                Use code <strong style={{ color: "#34d399" }}>PETZONE20</strong> at checkout for all new accounts.
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={handleShopNow}
              style={{ background: "#10b981", color: "#fff", position: "relative", zIndex: 1 }}
            >
              Shop Now <i className="bi bi-bag-heart-fill" />
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FAQ
        ══════════════════════════════════════════ */}
        <section style={{ padding: "64px 20px 80px", maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 24, padding: "clamp(24px,3vw,44px)",
              boxShadow: "0 1px 3px rgba(0,0,0,.04)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 36 }} data-aos="fade-up">
              <span className="section-label" style={{ color: "#0ea5e9" }}>Support</span>
              <h2 className="syne" style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", fontWeight: 800, color: "#111827", margin: "8px 0 12px" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#6b7280", fontSize: ".9375rem" }}>
                Everything you need to know about PETZONE.
              </p>
            </div>

            <div className="faq-wrap">
              {faqItems.map((faq, idx) => (
                <FaqItem key={faq.question} faq={faq} index={idx} />
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;