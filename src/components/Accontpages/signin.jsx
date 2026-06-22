import { useEffect, useState } from "react";
import { loginUser } from "../../API/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Base/BaseToast";

export default function LoginForm() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const [showForgotModal, setShowForgotModal] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tokenPet");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Handle input change for login
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    let isValid = true;
    if (!form.email.trim()) {
      setError((prev) => ({ ...prev, email: "Email is required!" }));
      isValid = false;
    }
    if (!form.password.trim()) {
      setError((prev) => ({ ...prev, password: "Password is required!" }));
      isValid = false;
    }
    return isValid;
  };

  // Login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const data = await loginUser({
        email: form.email,
        password: form.password,
      });

      if (data) {
        localStorage.setItem("tokenPet", data.token);
        showSuccess("Login successful!");
        navigate("/", { replace: true });
      } else {
        console.warn("⚠️ No data returned from login");
        setError((prev) => ({ ...prev, password: "Invalid credentials" }));
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError((prev) => ({
        ...prev,
        password: err.message || "Invalid credentials",
      }));
      showError(err.message || "Login failed");
    }
  };

  // Forgot password verify
  const handleVerifyEmail = async () => {
    if (!forgotEmail.trim()) {
      setForgotError("Email is required!");
      return;
    }
    try {
      const data = await userStore.getUser();
      const user = data.find((el) => el.email === forgotEmail);
      if (user) {
        setForgotError("");
        setShowForgotModal(false);
        showSuccess(
          "Email verified. Please create a new account password in register page.",
        );
      } else {
        setForgotError("Email not found!");
      }
    } catch (err) {
      console.error(err);
      setForgotError("Error verifying email");
      showError("Error verifying email");
    }
  };

  return (
    <div className="site-shell min-h-screen px-4 py-6 md:py-10 flex items-center">
      <main className="max-w-5xl mx-auto w-full">
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(2,132,199,0.14)]">
          <div className="relative p-8 md:p-11 bg-gradient-to-br from-emerald-400 via-emerald-600 to-slate-900 flex flex-col text-white">
            <div className="mb-30 relative">
              <img
                src="/image/logo.png"
                alt="PETZONE Logo"
                className="h-45 object-contain absolute -top-10 -left-15"
              />
            </div>
            <div className="absolute top-6 right-6 rounded-full border border-emerald-300/60 bg-white/75 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-emerald-700 uppercase">
              Sign In
            </div>
            <h1 className="text-2xl md:text-2xl font-black leading-tight text-white drop-shadow-sm">
              Welcome to my website
            </h1>
            <p className="mt-3 max-w-md text-slate-100/90 leading-relaxed">
              Access your account to manage orders, discover pet essentials, and
              continue where you left off.
            </p>

            <div className="mt-10 grid gap-3 max-w-md">
              <div className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 shadow-sm hover:shadow-md transition backdrop-blur">
                <p className="font-semibold text-white">Fast access</p>
                <p className="text-sm text-slate-100/90">
                  Quick login and smooth navigation.
                </p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 shadow-sm hover:shadow-md transition backdrop-blur">
                <p className="font-semibold text-white">
                  Pet-focused experience
                </p>
                <p className="text-sm text-slate-100/90">
                  Everything designed for pet owners.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 bg-white flex flex-col justify-start">
            <h2 className="text-2xl font-black text-slate-800">
              Login Account
            </h2>
            <p className="text-slate-500 mt-1 mb-6">
              Enter your details to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  placeholder="Enter your email"
                />
                {error.email && (
                  <div className="text-red-500 mt-1 text-sm">{error.email}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  placeholder="Enter your password"
                />
                {error.password && (
                  <div className="text-red-500 mt-1 text-sm">
                    {error.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 px-4 rounded-xl transition font-semibold">
                Sign In
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-sm">
              <button
                className="text-emerald-700 hover:underline"
                onClick={() => setShowForgotModal(true)}>
                Forgot Password?
              </button>
              <button
                className="text-emerald-700 hover:underline"
                onClick={() => navigate("/register")}>
                Create Account
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-sm flex items-center justify-center text-slate-700 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-emerald-100 shadow-2xl">
            <h3 className="text-xl font-black mb-4">Verify Email</h3>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {forgotError && (
              <div className="text-red-500 mb-2">{forgotError}</div>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300"
                onClick={() => setShowForgotModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 btn-primary rounded-lg"
                onClick={handleVerifyEmail}>
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
