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
  },
  {
    name: "Cat",
    desc: "Comfort, nutrition, and fun for indoor and outdoor cats.",
    tone: "from-amber-100 to-orange-50",
  },
  {
    name: "Bird",
    desc: "Balanced feed, cages, and enrichment products.",
    tone: "from-lime-100 to-emerald-50",
  },
  {
    name: "Fish",
    desc: "Aquarium kits, filters, and healthy food blends.",
    tone: "from-blue-100 to-indigo-50",
  },
  {
    name: "Small Pet",
    desc: "Bedding, toys, tunnels, and habitat support.",
    tone: "from-rose-100 to-pink-50",
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
      <div className="mx-auto max-w-7xl rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg">
        <div className="grid lg:grid-cols-2 min-h-[22rem] md:min-h-[26rem] lg:min-h-[28rem] xl:min-h-[30rem]">
          <div className="relative p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-[linear-gradient(140deg,#0f766e_0%,#0f172a_70%)] text-white">
            <span className="inline-flex w-fit rounded-full bg-white/15 px-4 py-1 text-sm font-semibold tracking-wide backdrop-blur-sm fade-up">
              {current.badge}
            </span>
            <h1
              key={current.title}
              className="mt-5 text-4xl md:text-5xl lg:text-6xl font-black leading-tight fade-up">
              {current.title}
            </h1>
            <p
              key={current.text}
              className="mt-4 text-base md:text-lg text-slate-100 max-w-xl fade-up"
              style={{ animationDelay: "120ms" }}>
              {current.text}
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3 fade-up"
              style={{ animationDelay: "200ms" }}>
              <button
                onClick={onShopNow}
                className="rounded-xl bg-emerald-300 px-5 py-3 font-bold text-slate-900 hover:bg-emerald-200 transition">
                Shop Now
              </button>
              <button
                onClick={onExploreCategories}
                className="rounded-xl border border-white/40 px-5 py-3 font-semibold hover:bg-white/10 transition">
                Explore Categories
              </button>
            </div>

            <div className="mt-10 flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-9 bg-white" : "w-2.5 bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden bg-slate-100">
            <img
              key={current.image}
              src={current.image}
              alt="Pet hero"
              className="h-full w-full object-cover hero-image"
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
            <div className="py-8">
              <p className="text-sm uppercase tracking-[0.16em] text-teal-700 font-semibold">
                Categories
              </p>
              <h2 className="text-3xl md:text-4xl font-black ">
                Shop By Pet Type
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {categoryCards.map((item, idx) => (
              <article
                key={item.name}
                className={`rounded-2xl border border-white/70 bg-linear-to-br ${item.tone} p-5 shadow-sm card-enter`}
                style={{ animationDelay: `${idx * 90}ms` }}>
                <div className="h-11 w-11 rounded-xl bg-white/80 border border-white/80 grid place-items-center text-lg font-black text-slate-700">
                  {item.name.charAt(0)}
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-indigo-600 font-semibold">
                Featured
              </p>
              <h2 className="text-3xl md:text-4xl font-black">
                Best Sellers Right Now
              </h2>
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
                  className="group rounded-2xl border border-slate-200 overflow-hidden hover:-translate-y-1 transition duration-300 bg-white card-enter"
                  style={{ animationDelay: `${idx * 70}ms` }}>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 h-10 overflow-hidden">
                      {item.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-black text-teal-700">
                        ${Number(item.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleBuy(item)}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition">
                        Buy
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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
          animation: fadeUp 0.65s ease both;
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
      `}</style>
    </div>
  );
};

export default Home;
