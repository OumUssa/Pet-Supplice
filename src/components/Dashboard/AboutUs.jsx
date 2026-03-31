import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  Heart,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Header/Footer";

const highlights = [
  {
    title: "One Place For Pet Shopping",
    desc: "Dogs, Cats, Birds, Fish, and Small Pets are organized in one clean storefront.",
    icon: Boxes,
  },
  {
    title: "Simple Dashboard Flow",
    desc: "Insert, update, and manage product records from a practical admin interface.",
    icon: LayoutDashboard,
  },
  {
    title: "Fast Front-End Experience",
    desc: "The website remains smooth and usable with local data persistence.",
    icon: BarChart3,
  },
  {
    title: "Customer-Centered Support",
    desc: "Contact and Services pages provide clear help paths for pet owners.",
    icon: Users,
  },
];

const values = [
  "Pet-first product organization",
  "Clean UI with responsive layouts",
  "Consistent navigation across pages",
  "Reliable and simple user flow",
];

const AboutPage = () => {
  return (
    <>
      <Header />

      <div className="site-shell text-slate-800">
        <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-700 text-white py-16 md:py-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <p className="uppercase tracking-[0.18em] text-cyan-100 text-sm mb-3 fade-up">
              About PETZONE
            </p>
            <h1 className="text-4xl md:text-6xl font-black max-w-3xl leading-tight fade-up">
              One Website Experience For Every Pet Need
            </h1>
            <p
              className="mt-5 text-cyan-50 text-lg max-w-2xl fade-up"
              style={{ animationDelay: "120ms" }}>
              PETZONE combines shopping, services, support, and admin product
              management in a single consistent platform.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <section className="grid lg:grid-cols-5 gap-6 md:gap-8">
            <div className="lg:col-span-3 brand-card p-6 md:p-8 fade-up">
              <h2 className="text-2xl md:text-3xl font-black mb-4">
                Our Story
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                PETZONE was built to make pet shopping easy for users and
                product management simple for admins. Instead of scattered
                experiences, we designed one website with connected pages and
                clear navigation.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                From category browsing in Shop, to guidance in Services, to
                direct communication in Contact, every page follows one brand
                language.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our goal is straightforward: help pet owners find better
                products faster while keeping the platform clean, reliable, and
                easy to use.
              </p>
            </div>

            <div
              className="lg:col-span-2 brand-card p-6 md:p-8 fade-up"
              style={{ animationDelay: "90ms" }}>
              <h3 className="text-xl font-black mb-4">Core Values</h3>
              <ul className="space-y-3">
                {values.map((value) => (
                  <li
                    key={value}
                    className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-cyan-700 mt-0.5" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-cyan-50 border border-cyan-100 p-4">
                <div className="flex items-center gap-2 text-cyan-800 font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Reliable Platform
                </div>
                <p className="text-slate-600 text-sm">
                  Built with a practical architecture for smooth current usage
                  and future growth.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="brand-card p-6 transition duration-300 fade-up"
                  style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="brand-icon mb-4">
                    <Icon className="w-5 h-5 text-cyan-700" />
                  </div>
                  <h3 className="text-lg font-black mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </section>

          <section
            className="mt-10 brand-card p-6 md:p-8 fade-up"
            style={{ animationDelay: "200ms" }}>
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-black mb-2">
                  Built Around Pet Owners
                </h3>
                <p className="text-slate-600">
                  PETZONE keeps information clear and actions simple, so users
                  can focus on choosing what is best for their pets.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="inline-flex px-5 py-2.5 rounded-xl btn-primary font-semibold transition">
                  Explore Shop
                </Link>
                <Link
                  to="/services"
                  className="inline-flex px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition">
                  View Services
                </Link>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-cyan-800">
              <Sparkles className="w-4 h-4" />
              <Heart className="w-4 h-4" />
              <p className="text-sm font-semibold">
                Consistent design, consistent experience.
              </p>
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

export default AboutPage;
