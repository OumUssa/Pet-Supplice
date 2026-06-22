import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Header/Footer";
import { fetchPublicProducts } from "../API/api";

const ORDERS_KEY = "petstore_orders";

function saveOrder(order) {
  try {
    const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
  } catch {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order]));
  }
}

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const hydrate = async () => {
      const stateItem = location.state?.item;
      if (stateItem) {
        setItem(stateItem);
        setLoading(false);
        return;
      }

      const itemId = searchParams.get("itemId");
      if (!itemId) {
        setLoading(false);
        return;
      }

      try {
        console.log("📥 Fetching products to find itemId:", itemId);
        const supplies = (await fetchPublicProducts()) || [];
        const found = supplies.find((p) => String(p.id) === String(itemId));
        console.log("✅ Found product:", found);
        setItem(found || null);
      } catch (error) {
        console.error("❌ Error fetching product:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, [location.state, searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validate = () => {
    if (!item) return "No product selected.";
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.cardNumber.trim()) return "Card number is required.";
    if (!form.expiry.trim()) return "Expiry date is required.";
    if (!form.cvv.trim()) return "CVV is required.";
    return "";
  };

  const handlePay = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      productId: item.id,
      productName: item.title,
      amount: Number(item.price),
      createdAt: new Date().toISOString(),
      customer: {
        fullName: form.fullName,
        email: form.email,
      },
      paymentStatus: "paid",
    };

    saveOrder(order);
    setPaid(true);
  };

  return (
    <div className="site-shell flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 py-10">
        <section className="relative overflow-hidden bg-[linear-gradient(140deg,#0f766e_0%,#0f172a_70%)] text-white rounded-3xl mb-8 py-12 md:py-16">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <p className="uppercase tracking-[0.18em] text-cyan-100 text-sm mb-3 fade-up">
              Secure Checkout
            </p>
            <h1 className="text-2xl md:text-4xl font-black max-w-3xl leading-tight fade-up">
              Complete Your Order Safely
            </h1>
            <p className="mt-5 text-cyan-50 text-lg max-w-2xl fade-up anim-delay-120">
              Fill in your payment details below. Your order is protected with
              secure checkout and instant confirmation.
            </p>
          </div>
        </section>

        {loading ? (
          <p className="text-slate-600">Loading checkout...</p>
        ) : !item ? (
          <div className="brand-card p-8 text-center">
            <h2 className="text-2xl font-black text-slate-800 mb-2">
              No Product Selected
            </h2>
            <p className="text-slate-600 mb-6">
              Please choose a product and click Buy again.
            </p>
            <Link
              to="/shop"
              className="inline-flex px-5 py-2.5 rounded-lg btn-primary font-semibold">
              Go To Shop
            </Link>
          </div>
        ) : paid ? (
          <div className="brand-card p-8 text-center">
            <h2 className="text-2xl font-black text-teal-700 mb-3">
              Payment Successful
            </h2>
            <p className="text-slate-600 mb-6">
              Your order for {item.title} has been placed successfully.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="px-5 py-2.5 rounded-lg btn-primary font-semibold">
                Continue Shopping
              </Link>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2.5 rounded-lg btn-outline-primary font-semibold">
                Back Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            <section className="lg:col-span-2 brand-card p-6">
              <h2 className="text-xl font-black mb-4">Order Summary</h2>
              <div className="rounded-xl overflow-hidden border border-teal-100 mb-4">
                <img
                  src={item.image || item.image_url}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-slate-600 mt-1">
                {item.category} • {item.Type}
              </p>
              <p className="text-2xl font-black text-teal-700 mt-4">
                ${Number(item.price).toFixed(2)}
              </p>
            </section>

            <section className="lg:col-span-3 brand-card p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-black mb-5">
                Payment Details
              </h2>
              <form onSubmit={handlePay} className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Card holder name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="123"
                  />
                </div>

                {error && (
                  <p className="md:col-span-2 text-red-600 text-sm">{error}</p>
                )}

                <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl btn-primary font-bold">
                    Pay ${Number(item.price).toFixed(2)}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 rounded-xl btn-outline-primary font-semibold">
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
