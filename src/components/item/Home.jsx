import React, { useEffect, useMemo, useState } from "react";
import { getPetSupplies } from "../../store/suppliesStore.";
import { useNavigate } from "react-router-dom";

const heroSlides = [
  {
    badge: "Spring Collection",
    title: "Healthy Picks For Happy Pets",
    text: "Shop curated essentials for dogs, cats, birds, fish, and small pets in one clean experience.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "New Arrivals",
    title: "Smarter Daily Care Starts Here",
    text: "From premium food to playful toys, discover products built for comfort and wellness.",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badge: "Top Rated",
    title: "Trusted Products, Fast Browsing",
    text: "A modern storefront with smooth motion and clear categories so users find what they need faster.",
    image:
      "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&w=1200&q=80",
  },
];

const categoryCards = [
  {
    name: "Dog",
    desc: "Food, toys, accessories, and daily care essentials.",
    tone: "from-cyan-100 to-sky-50",
    icon: "bi bi-heart-pulse",
    accent: "text-cyan-700",
    types: ["Food", "Toys", "Accessories"],
  },
  {
    name: "Cat",
    desc: "Comfort, nutrition, and fun for indoor and outdoor cats.",
    tone: "from-amber-100 to-orange-50",
    icon: "bi bi-moon-stars",
    accent: "text-amber-700",
    types: ["Food", "Toys", "Litter"],
  },
  {
    name: "Bird",
    desc: "Balanced feed, cages, and enrichment products.",
    tone: "from-lime-100 to-emerald-50",
    icon: "bi bi-feather",
    accent: "text-emerald-700",
    types: ["Food", "Cages", "Toys"],
  },
  {
    name: "Fish",
    desc: "Aquarium kits, filters, and healthy food blends.",
    tone: "from-blue-100 to-indigo-50",
    icon: "bi bi-water",
    accent: "text-blue-700",
    types: ["Food", "Aquariums", "Filters"],
  },
  {
    name: "Small Pet",
    desc: "Bedding, toys, tunnels, and habitat support.",
    tone: "from-rose-100 to-pink-50",
    icon: "bi bi-stars",
    accent: "text-rose-700",
    types: ["Food", "Cages", "Bedding"],
  },
];

const faqItems = [
  {
    question: "How do I choose the right product for my pet?",
    answer:
      "Start with pet type and age, then check product descriptions and category labels. You can use the Shop filters to narrow down products quickly.",
  },
  {
    question: "Can I filter products by category and type?",
    answer:
      "Yes. On the Shop page, use category and type filters from the left panel on desktop or offcanvas filters on mobile.",
  },
  {
    question: "Do product prices include all fees?",
    answer:
      "Displayed prices show product cost. Final checkout totals may include additional charges based on delivery or payment method.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Open a product and click Add to cart or Buy, then continue to checkout and submit your details to place the order.",
  },
  {
    question: "Can I update or remove products as an admin?",
    answer:
      "Yes. Admin users can access the dashboard to insert, update, and manage product records.",
  },
  {
    question: "Is PETZONE mobile friendly?",
    answer:
      "Yes. The interface is responsive and includes mobile-friendly menus, filters, and navigation.",
  },
  {
    question: "Where can I get support if I have an issue?",
    answer:
      "Use the Contact page to send us a message. The support team will help with products, orders, and general questions.",
  },
  {
    question: "How often are products updated?",
    answer:
      "Products are updated as new items are added or edited through the dashboard, so availability can change over time.",
  },
  {
    question: "Can I search for specific pet products?",
    answer:
      "Yes. Use the search input in the header to find products by name, content, category, or type.",
  },
  {
    question: "What types of pets are covered on PETZONE?",
    answer:
      "PETZONE currently supports Dog, Cat, Bird, Fish, and Small Pet categories with different product types in each.",
  },
];

function Hero({ onShopNow, onExploreCategories }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[index];

  return (
    <section className="relative px-4 md:px-6 pt-6 md:pt-10">
      <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden border-slate-200 bg-white shadow-lg">
        <div className="grid md:grid-cols-2 ">
          <div className="relative p-8 md:p-12 lg:p-14 flex align-center flex-col justify-center bg-[linear-gradient(140deg,#0f766e_0%,#0f172a_70%)] text-white max-h-500">
            <span className="inline-flex w-fit rounded-full bg-white/15 px-4 py-1 text-sm font-semibold tracking-wide backdrop-blur-sm fade-up">
              {current.badge}
            </span>
            <h1
              key={current.title}
              className="mt-5 text-2xl md:text-3xl lg:text-4xl font-black leading-tight fade-up">
              {current.title}
            </h1>
            <p
              key={current.text}
              className="mt-4 text-base md:text-lg text-slate-100 max-w-xl fade-up"
              style={{ animationDelay: "120ms" }}>
              {current.text}
            </p>

            <div
              className="mt-15 mb-5 flex flex-wrap gap-3 fade-up"
              style={{ animationDelay: "200ms" }}>
              <button
                onClick={onShopNow}
                className="rounded-xl bg-emerald-300 px-5 py-2 font-bold text-slate-900 hover:bg-emerald-200 transition">
                Shop Now
              </button>
              <button
                onClick={onExploreCategories}
                className="rounded-xl border border-white/40 px-3 py-3 font-semibold hover:bg-white/10 transition">
                Explore Categories
              </button>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === index ? "w-9 bg-white" : "w-2.5 bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-100 max-h-full">
            <img
              key={current.image}
              src={current.image}
              alt="Pet hero"
              className="h-125 w-full object-cover hero-image"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

const Home = () => {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShopNow = () => {
    navigate("/shop");
  };

  const handleExploreCategories = () => {
    const categoriesSection = document.getElementById("home-categories");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBuy = (item) => {
    navigate(`/checkout?itemId=${item.id}`, { state: { item } });
  };

  const handleOpenCategory = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  useEffect(() => {
    const loadSupplies = async () => {
      const data = (await getPetSupplies()) || [];
      setSupplies(data);
      setLoading(false);
    };

    loadSupplies();
  }, []);

  const featured = useMemo(() => supplies.slice(0, 8), [supplies]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-800">
      <Hero
        onShopNow={handleShopNow}
        onExploreCategories={handleExploreCategories}
      />

      <section id="home-categories" className="px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-7">
            <div className="py-8 m-auto text-center">
              <h2 className="text-2xl md:text-4xl font-black ">
                SHOP BY PET TYPE
              </h2>
              <p className="text-sm uppercase tracking-[0.16em] text-teal-700 font-semibold">
                Categories
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {categoryCards.map((item, idx) => (
              <button
                key={item.name}
                onClick={() => handleOpenCategory(item.name)}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[340px] text-left border border-slate-200/90 bg-white p-5 card-enter pet-type-card"
                style={{ animationDelay: `${idx * 90}ms` }}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="pet-type-card__icon-wrap">
                      <i
                        className={`text-base pet-type-card__icon ${item.icon} ${item.accent}`}
                        aria-hidden="true"></i>
                    </span>
                    <h3 className="text-base font-semibold text-slate-800">
                      {item.name}
                    </h3>
                  </div>
                  <span className="pet-type-count">{item.types.length}</span>
                </div>

                <p className="text-[13px] text-slate-600 leading-relaxed min-h-12">
                  {item.desc}
                </p>

                <div className="mt-3.5 flex flex-wrap gap-2">
                  {item.types.map((type) => (
                    <span key={type} className="pet-type-chip">
                      {type}
                    </span>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>Shop {item.name}</span>
                  <i className="bi bi-arrow-right pet-type-card__arrow"></i>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-wrap  items-center justify-between gap-4 mb-8">
            <div className="m-auto text-center my-5 ">
              <h2 className="text-2xl  md:text-4xl font-black">
                BEST SELLERS RIGHT NOW
              </h2>
              <p className="text-sm uppercase tracking-[0.16em] text-indigo-600 font-semibold">
                Featured
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-center py-12 text-slate-500">
              Loading products...
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {featured.map((item, idx) => (
                <article
                  key={item.id || idx}
                  className="group rounded-2xl border border-slate-200 overflow-hidden bg-white card-enter product-card"
                  style={{ animationDelay: `${idx * 70}ms` }}>
                  <div className="relative h-44 overflow-hidden product-card__media">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="absolute right-2 top-2 h-6 w-6 rounded-full bg-white/80 text-slate-500 grid place-items-center product-card__fav">
                      <i className="bi bi-heart"></i>
                    </button>
                    <span className="absolute left-2.5 bottom-2.5 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3.5">
                    <h3 className="font-bold text-sm line-clamp-1 text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-[0.12em]">
                      {item.Type || "Pet Supply"}
                    </p>
                    <p className="text-xs text-slate-600 mt-1.5 h-8 overflow-hidden line-clamp-2 leading-relaxed">
                      {item.content}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-base font-black text-slate-900">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleBuy(item)}
                        className="rounded-md bg-slate-700 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-slate-800 transition whitespace-nowrap">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 md:px-6 pb-14 md:pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-sm uppercase tracking-[0.16em] text-cyan-700 font-semibold mt-2">
              FAQ
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, idx) => (
              <details
                key={faq.question}
                className="faq-item fade-up"
                style={{ animationDelay: `${idx * 50}ms` }}>
                <summary className="faq-question">
                  <span>{faq.question}</span>
                  <i className="bi bi-plus-lg faq-icon"></i>
                </summary>
                <p className="faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .fade-up {
          animation: fadeUp 0.7s ease both;
        }

        .hero-image {
          animation: revealZoom 0.8s ease both;
        }

        .card-enter {
          animation: cardRise 0.65s cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .pet-type-card {
          border-radius: 14px;
          box-shadow: 0 6px 14px -14px rgba(15, 23, 42, 0.45);
          transition: border-color 0.22s ease, box-shadow 0.22s ease,
            transform 0.22s ease;
        }

        .pet-type-card__icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .pet-type-card__icon {
          transition: transform 0.2s ease;
        }

        .pet-type-count {
          min-width: 24px;
          height: 24px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #475569;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }

        .pet-type-chip {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid #d1d5db;
          color: #475569;
          background: #f8fafc;
        }

        .pet-type-card:hover {
          transform: translateY(-4px);
          border-color: #94a3b8;
          box-shadow: 0 16px 24px -18px rgba(15, 23, 42, 0.45);
        }

        .pet-type-card:hover .pet-type-card__icon {
          transform: translateX(2px);
        }

        .pet-type-card:hover .pet-type-chip {
          border-color: #94a3b8;
          background: #ffffff;
        }

        .pet-type-card:focus-visible {
          outline: 2px solid #14b8a6;
          outline-offset: 2px;
        }

        .pet-type-card__arrow {
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .pet-type-card:hover .pet-type-card__arrow {
          transform: translateX(2px);
          color: #0f766e;
        }

        .product-card {
          animation: cardRise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 8px 18px -14px rgba(15, 23, 42, 0.5);
        }

        .product-card__media {
          background: linear-gradient(160deg, #c7b6f4 0%, #a78bfa 100%);
        }

        .product-card__fav {
          border: 1px solid rgba(148, 163, 184, 0.35);
          transition: transform 0.2s ease, background-color 0.2s ease,
            color 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px -16px rgba(15, 23, 42, 0.35);
        }

        .product-card:hover .product-card__fav {
          transform: scale(1.08);
          background-color: #ffffff;
          color: #7c3aed;
        }

        .faq-item {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          overflow: hidden;
        }

        .faq-question {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          cursor: pointer;
          padding: 14px 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .faq-question::-webkit-details-marker {
          display: none;
        }

        .faq-answer {
          padding: 0 16px 14px;
          color: #475569;
          line-height: 1.6;
          font-size: 0.92rem;
        }

        .faq-icon {
          transition: transform 0.2s ease;
          color: #0f766e;
          font-size: 14px;
          flex-shrink: 0;
        }

        .faq-item[open] .faq-icon {
          transform: rotate(45deg);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes revealZoom {
          from {
            opacity: 0;
            transform: scale(1.06);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cardRise {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up,
          .hero-image,
          .card-enter,
          .product-card {
            animation: none !important;
          }

          .pet-type-card,
          .pet-type-chip,
          .product-card {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
