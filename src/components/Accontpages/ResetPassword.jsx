import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../../API/api";
import { useToast } from "../Base/BaseToast";

export default function ResetPassword() {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!token || !email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Invalid Reset Link</h2>
        <p className="text-slate-500">The link you followed is broken or missing parameters.</p>
        <Link to="/signin" className="mt-4 text-emerald-600 font-bold hover:underline">Back to Sign In</Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      showError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await resetPassword(email, token, password);
      if (data.result) {
        showSuccess(data.message || "Password reset successfully!");
        setDone(true);
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        showError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      showError("An error occurred. The token may be expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <i className="bi bi-shield-lock-fill text-5xl text-emerald-500 mb-4 inline-block" />
          <h2 className="text-3xl font-black text-slate-900">Create New Password</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Please enter your new password below.
          </p>
        </div>

        {done ? (
          <div className="bg-emerald-50 text-emerald-700 p-5 rounded-2xl border border-emerald-100 text-center">
            <i className="bi bi-check-circle-fill text-3xl mb-2 inline-block" />
            <h3 className="font-bold mb-1">Password Changed!</h3>
            <p className="text-sm">You can now sign in with your new password. Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
