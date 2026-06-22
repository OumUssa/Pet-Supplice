import React, { useState } from "react";
import { registerUser } from "../../API/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Base/BaseToast";

export default function Signup() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");

  // v-model-like handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (value.trim() !== "") {
      setError((prev) => ({ ...prev, [name]: "" }));
      setSuccess(""); // clear success if typing
    }
  };

  // Validate before submit
  const validate = () => {
    let isValid = true;
    const newError = { username: "", email: "", password: "" };

    if (!form.username.trim()) {
      newError.username = "Username is required";
      isValid = false;
    }
    if (!form.email.trim()) {
      newError.email = "Email is required";
      isValid = false;
    }
    if (!form.password.trim()) {
      newError.password = "Password is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
    
      const data = await registerUser({
        name: form.username,
        email: form.email,
        password: form.password,
      });

      if (data) {
        showSuccess("Account created successfully! Please sign in.");
        setForm({ username: "", email: "", password: "" });
        // Optionally redirect after short delay
        setTimeout(() => navigate("/signin"), 1500);
      } else {
       
        setError((prev) => ({
          ...prev,
          email: "Failed to create user. Try again.",
        }));
      }
    } catch (err) {
      console.error("❌ Registration failed:", err);
      showError(err.message || "An error occurred. Try again.");
      setError((prev) => ({
        ...prev,
        email: err.message || "An error occurred. Try again.",
      }));
    }
  };

  return (
    <div className="site-shell min-h-screen px-4 py-6 md:py-10 flex items-center">
      <main className="max-w-5xl mx-auto w-full">
        <section className="grid lg:grid-cols-[0.92fr_1.08fr] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,118,110,0.13)]">
          <div className="relative p-8 md:p-10 bg-gradient-to-br from-emerald-400 via-emerald-600 to-slate-900 flex flex-col text-white">
            <div className="mb-30 relative">
              <img
                src="/image/logo.png"
                alt="PETZONE Logo"
                className="h-45 object-contain absolute -top-10 -left-15"
              />
            </div>
            <div className="absolute top-6 right-6 rounded-full border border-emerald-300/60 bg-white/75 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-emerald-700 uppercase">
              Register
            </div>
            <h1 className="text-2xl md:text-2xl font-black leading-tight text-white drop-shadow-sm">
              Create Your PETZONE Profile
            </h1>
            <p className="mt-3 text-slate-100/90 leading-relaxed max-w-sm">
              Start with one account for simpler shopping and better continuity.
            </p>

            <div className="mt-10 space-y-3 max-w-sm">
              <div className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 shadow-sm hover:shadow-md transition backdrop-blur">
                <p className="text-sm font-semibold text-white">
                  One profile for all pet needs
                </p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 shadow-sm hover:shadow-md transition backdrop-blur">
                <p className="text-sm font-semibold text-white">
                  Keep your account details ready
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 bg-white text-black flex flex-col">
            <h2 className="text-2xl mb-8 font-black text-slate-800">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter username"
                />
                {error.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {error.username}
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
                {error.email && (
                  <div className="text-red-500 text-sm mt-1">{error.email}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="******"
                />
                {error.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {error.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 rounded-xl transition font-semibold">
                Create Account
              </button>

              <button
                type="button"
                onClick={() => navigate("/signin")}
                className="w-full btn-outline-primary py-3 rounded-xl transition font-semibold">
                Back To Sign In
              </button>

              {success && (
                <div className="text-green-600 text-center mt-2">{success}</div>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
