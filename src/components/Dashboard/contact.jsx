import React from "react";
import { Link } from "react-router-dom";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Header/Footer";

const getDelayClass = (delay) =>
  delay > 0 ? `anim-delay-${String(delay)}` : "";

const Contact = () => {
  return (
    <>
      <Header />

      <div className="site-shell text-slate-800">
        <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0f766e_0%,#0f172a_70%)] text-white py-16 md:py-20">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <p className="uppercase tracking-[0.18em] text-cyan-100 text-sm mb-3 fade-up">
              Contact PETZONE
            </p>
            <h1 className="text-2xl md:text-4xl font-black max-w-3xl leading-tight fade-up">
              Let&apos;s Talk About Your Pet Care Needs
            </h1>
            <p className="mt-5 text-cyan-50 text-lg max-w-2xl fade-up anim-delay-120">
              Ask about products, orders, or support. Our team is ready to help
              you quickly.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            <aside className="lg:col-span-2 space-y-5">
              <div className="brand-card contact-flat p-5 fade-up">
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-5 h-5 text-cyan-700" />
                  <h3 className="font-bold text-lg">Phone</h3>
                </div>
                <p className="text-slate-600">+855 12 345 678</p>
                <p className="text-slate-500 text-sm mt-1">
                  Mon-Sat, 8:00 AM - 8:00 PM
                </p>
              </div>

              <div className="brand-card contact-flat p-5 fade-up anim-delay-90">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5 text-cyan-700" />
                  <h3 className="font-bold text-lg">Email</h3>
                </div>
                <p className="text-slate-600">support@petzone.com</p>
                <p className="text-slate-500 text-sm mt-1">
                  Average response under 24 hours
                </p>
              </div>

              <div className="brand-card contact-flat p-5 fade-up anim-delay-180">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-cyan-700" />
                  <h3 className="font-bold text-lg">Address</h3>
                </div>
                <p className="text-slate-600">Phnom Penh, Cambodia</p>
                <p className="text-slate-500 text-sm mt-1">
                  Visit our pet care experience center
                </p>
              </div>

              <div className="brand-card contact-flat contact-hours-card text-white p-5 fade-up anim-delay-270">
                <div className="flex items-center gap-3 mb-2">
                  <Clock3 className="w-5 h-5 text-emerald-300" />
                  <h3 className="font-bold text-lg">Working Hours</h3>
                </div>
                <p className="text-slate-300">Mon - Fri: 8:00 AM - 8:00 PM</p>
                <p className="text-slate-300">Sat - Sun: 9:00 AM - 6:00 PM</p>
              </div>
            </aside>

            <section className="lg:col-span-3 brand-card contact-flat p-6 md:p-8 fade-up anim-delay-120">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
                Send Us A Message
              </h2>
              <p className="text-slate-600 mb-6">
                Tell us what you need and we will guide you to the best options.
              </p>

              <form className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+855 ..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Topic
                  </label>
                  <select className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option>Product Inquiry</option>
                    <option>Order Support</option>
                    <option>Delivery Information</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-3 font-bold transition">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>

                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-slate-700 font-semibold hover:bg-slate-100 transition">
                    <MessageCircle className="w-4 h-4" />
                    Browse Shop
                  </Link>
                </div>
              </form>
            </section>
          </div>

          <section className="mt-10 brand-card contact-flat p-6 md:p-8 fade-up anim-delay-220">
            <div className="flex items-start gap-3 text-slate-700">
              <ShieldCheck className="w-5 h-5 mt-1 text-emerald-600" />
              <div>
                <h3 className="font-bold text-lg">Customer Care Promise</h3>
                <p className="text-slate-600 mt-1">
                  PETZONE is committed to friendly support, transparent advice,
                  and practical solutions for every pet owner.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
