import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  Compass,
  Heart,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
import DeveloperAnimation from "../../assets/animation/Developer.json";

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
    desc: "Contact pages provide clear help paths for pet owners.",
    icon: Users,
  },
];

const values = [
  "Pet-first product organization",
  "Clean UI with responsive layouts",
  "Consistent navigation across pages",
  "Reliable and simple user flow",
];

const roadmap = [
  {
    title: "Phase 1 - Unified Storefront",
    desc: "Create one clear shopping experience with category-based filtering.",
    icon: Compass,
  },
  {
    title: "Phase 2 - Better Admin Flow",
    desc: "Improve dashboard operations for adding and updating products faster.",
    icon: Target,
  },
  {
    title: "Phase 3 - Ongoing Improvement",
    desc: "Enhance speed, UX clarity, and customer support touchpoints.",
    icon: Rocket,
  },
];

const getDelayClass = (delay) =>
  delay > 0 ? `anim-delay-${String(delay)}` : "";

const AboutPage = () => {
  return (
    <>
      <Header />

      <div className="site-shell text-slate-800">
        <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0f766e_0%,#0f172a_70%)] text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <p className="uppercase tracking-[0.18em] text-cyan-100 text-sm mb-3 fade-up">
              About PETZONE
            </p>
            <h1 className="text-2xl md:text-4xl font-black max-w-3xl leading-tight fade-up">
              One Platform For Better Pet Shopping
            </h1>
            <p className="mt-5 text-cyan-50 text-lg max-w-2xl fade-up anim-delay-120">
              PETZONE combines browsing, buying, and product management in one
              connected experience focused on speed, clarity, and trust.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <section className="grid lg:grid-cols-2 gap-8 md:gap-10">
            <div className="brand-card about-content-flat p-6 md:p-8 fade-up">
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
                From category browsing in Shop to direct communication in
                Contact, every page follows one brand language.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Our goal is straightforward: help pet owners find better
                products faster while keeping the platform clean, reliable, and
                easy to use.
              </p>
            </div>

            <div className="brand-card about-content-flat p-6 md:p-8 fade-up anim-delay-90 flex items-center justify-center min-h-96">
              <Lottie
                animationData={DeveloperAnimation}
                loop
                autoplay
                style={{
                  width: "100%",
                  height: "100%",
                  maxWidth: "400px",
                  maxHeight: "400px",
                }}
              />
            </div>
          </section>

          <section className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`brand-card about-content-flat p-6 transition duration-300 fade-up ${getDelayClass(idx * 80)}`}>
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

          <section className="mt-10 grid lg:grid-cols-3 gap-5">
            {roadmap.map((item, idx) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`brand-card about-content-flat p-6 fade-up ${getDelayClass(120 + idx * 70)}`}>
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

          <section className="mt-10 brand-card about-content-flat p-6 md:p-8 fade-up anim-delay-120">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
              Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {values.map((value) => (
                <div
                  key={value}
                  className="flex items-start gap-3 p-4 rounded-lg bg-cyan-50 border border-cyan-100">
                  <CheckCircle2 className="w-5 h-5 text-cyan-700 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 font-semibold">{value}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4 mb-6">
              <div className="flex items-center gap-2 text-cyan-800 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                Reliable Platform
              </div>
              <p className="text-slate-600 text-sm">
                Built with a practical architecture for smooth current usage and
                future growth.
              </p>
            </div>
          </section>

          <section className="mt-10 brand-card about-content-flat p-6 md:p-8 fade-up anim-delay-200">
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
                  to="/contact"
                  className="inline-flex px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition">
                  Contact Us
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
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;
