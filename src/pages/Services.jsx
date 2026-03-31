import React from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Bath,
  ClipboardList,
  HeartPulse,
  Scissors,
  Shield,
  Sparkles,
  Truck,
} from "lucide-react";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";

const serviceList = [
  {
    title: "Pet Grooming Support",
    desc: "Guidance on grooming kits, coat care essentials, and hygiene products.",
    icon: Scissors,
    tone: "from-sky-100 to-cyan-50",
  },
  {
    title: "Nutrition Consultation",
    desc: "Help selecting balanced food by pet type, age, and lifestyle.",
    icon: HeartPulse,
    tone: "from-emerald-100 to-teal-50",
  },
  {
    title: "Bath & Skin Care",
    desc: "Recommendations for shampoos, conditioners, and skin protection.",
    icon: Bath,
    tone: "from-indigo-100 to-blue-50",
  },
  {
    title: "Order & Delivery Help",
    desc: "Fast support for checkout, tracking, and delivery-related issues.",
    icon: Truck,
    tone: "from-amber-100 to-yellow-50",
  },
  {
    title: "Care Plan Setup",
    desc: "Build a practical monthly plan for food, toys, and maintenance.",
    icon: ClipboardList,
    tone: "from-rose-100 to-pink-50",
  },
  {
    title: "Quality Assurance",
    desc: "Products reviewed for reliability, safety, and pet comfort.",
    icon: Shield,
    tone: "from-violet-100 to-fuchsia-50",
  },
];

const Services = () => {
  return (
    <>
      <Header />

      <div className="site-shell text-slate-800">
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-cyan-900 to-teal-800 text-white py-16 md:py-20">
          <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-emerald-300/15 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <p className="uppercase tracking-[0.18em] text-cyan-100 text-sm mb-3 fade-up">
              PETZONE Services
            </p>
            <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl fade-up">
              Smart Services For Better Pet Care
            </h1>
            <p
              className="mt-5 text-cyan-50 text-lg max-w-2xl fade-up"
              style={{ animationDelay: "120ms" }}>
              We support pet owners with practical guidance, reliable product
              recommendations, and responsive customer care.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {serviceList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={`brand-card bg-gradient-to-br ${service.tone} p-6 transition duration-300 fade-up`}
                  style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="brand-icon mb-4 bg-white/90">
                    <Icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </article>
              );
            })}
          </section>

          <section
            className="mt-10 brand-card p-6 md:p-8 fade-up"
            style={{ animationDelay: "180ms" }}>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="brand-card p-5">
                <Sparkles className="w-5 h-5 text-cyan-700 mb-2" />
                <h3 className="font-bold text-lg">Friendly Guidance</h3>
                <p className="text-slate-600 mt-1 text-sm">
                  Simple recommendations you can trust.
                </p>
              </div>
              <div className="brand-card p-5">
                <BadgeCheck className="w-5 h-5 text-emerald-700 mb-2" />
                <h3 className="font-bold text-lg">Verified Quality</h3>
                <p className="text-slate-600 mt-1 text-sm">
                  Products selected with care and consistency.
                </p>
              </div>
              <div className="brand-card p-5">
                <Truck className="w-5 h-5 text-indigo-700 mb-2" />
                <h3 className="font-bold text-lg">Reliable Support</h3>
                <p className="text-slate-600 mt-1 text-sm">
                  Clear help for orders, products, and next steps.
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex px-5 py-2.5 rounded-xl btn-primary font-semibold transition">
                Go To Shop
              </Link>
              <Link
                to="/contact"
                className="inline-flex px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition">
                Contact Us
              </Link>
            </div>
          </section>
        </main>

        <style>{`
          .fade-up {
            animation: fadeUp 0.7s ease both;
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
        `}</style>
      </div>

      <Footer />
    </>
  );
};

export default Services;
