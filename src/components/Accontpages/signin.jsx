import { useState } from "react";
import { userStore } from "../../store/RegisterStore";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  // Modals
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Forgot password
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotError, setForgotError] = useState("");

  // Sign up
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signupError, setSignupError] = useState("");

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
      const data = await userStore.getUser();
      const user = data.find(
        (el) => el.email === form.email && el.password === form.password
      );

      if (user) {
        localStorage.setItem("tokenPet", user.id);
        navigate("/");
      } else {
        setError((prev) => ({ ...prev, password: "Invalid credentials" }));
      }
    } catch (err) {
      console.error("Failed fetching users:", err);
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
        setShowResetModal(true);
      } else {
        setForgotError("Email not found!");
      }
    } catch (err) {
      console.error(err);
      setForgotError("Error verifying email");
    }
  };

  // Reset password using Supabase
  const handleResetPassword = async () => {
    if (!newPassword.trim()) return;
    try {
      const updated = await userStore.resetPassword(forgotEmail, newPassword);
      if (updated) {
        alert("Password updated successfully!");
        setShowResetModal(false);
        setForgotEmail("");
        setNewPassword("");
      } else {
        alert("Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Signup input change
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") setSignupError("");
  };

  // Handle signup
  const handleSignup = async () => {
    const { name, email, password } = signupForm;
    if (!name || !email || !password) {
      setSignupError("All fields are required!");
      return;
    }
    try {
      const existing = await userStore.getUser();
      if (existing.find((el) => el.email === email)) {
        setSignupError("Email already registered!");
        return;
      }
      const created = await userStore.createUser(signupForm);
      if (created) {
        alert("Account created successfully!");
        setShowSignupModal(false);
        setSignupForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 text-blue-500">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 transition"
                placeholder="Enter your email"
              />
              {error.email && (
                <div className="text-red-500 mt-1">{error.email}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 transition"
                placeholder="Enter your password"
              />
              {error.password && (
                <div className="text-red-500 mt-1">{error.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>

          <div className="flex justify-between mt-4">
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setShowForgotModal(true)}>
              Forgot Password?
            </button>

            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => {
                setShowSignupModal(false);
                navigate("/register");
              }}>
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center  z-50 text-gray-700">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm border absolute">
            <h3 className="text-xl font-bold mb-4">Verify Email</h3>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg mb-2"
            />
            {forgotError && (
              <div className="text-red-500 mb-2">{forgotError}</div>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={() => setShowForgotModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
