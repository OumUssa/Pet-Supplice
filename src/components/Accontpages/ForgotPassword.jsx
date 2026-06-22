import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../API/api";
import { useToast } from "../Base/BaseToast";

export default function ForgotPassword() {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const data = await forgotPassword(email);
      if (data.result !== false) {
        setSent(true);
        showSuccess("Password reset link sent to your email!");
      } else {
        showError(data.message || "Failed to send reset link.");
      }
    } catch (err) {
      showError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <i className="bi bi-key-fill text-5xl text-emerald-500 mb-4 inline-block" />
          <h2 className="text-3xl font-black text-slate-900">Forgot Password</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="bg-emerald-50 text-emerald-700 p-5 rounded-2xl border border-emerald-100 text-center">
            <i className="bi bi-check-circle-fill text-3xl mb-2 inline-block" />
            <h3 className="font-bold mb-1">Check your inbox</h3>
            <p className="text-sm">We've sent a password reset link to <strong>{email}</strong></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center text-sm font-semibold">
          <span className="text-slate-500">Remember your password? </span>
          <Link to="/signin" className="text-emerald-600 hover:text-emerald-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
