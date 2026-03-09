import React, { useState } from "react";
import { userStore } from "../../store/RegisterStore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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

  let Register=({
    
  }) 
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
      const data = await userStore.createUser({
        name: form.username,
        email: form.email,
        password: form.password,
      });

      if (data && data.length > 0) {
        setSuccess("User created successfully!");
        setForm({ username: "", email: "", password: "" });
      } else {
        setError((prev) => ({
          ...prev,
          email: "Failed to create user. Try again.",
        }));
      }
    } catch (err) {
      console.error(err);
      setError((prev) => ({
        ...prev,
        email: "An error occurred. Try again.",
      }));
    }
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full text-black max-w-md space-y-4 ">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
            placeholder="Enter username"
          />
          {error.username && (
            <div className="text-red-500 text-sm mt-1">{error.username}</div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
            placeholder="you@example.com"
          />
          {error.email && (
            <div className="text-red-500 text-sm mt-1">{error.email}</div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
            placeholder="******"
          />
          {error.password && (
            <div className="text-red-500 text-sm mt-1">{error.password}</div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Create Account
        </button>

        {/* Success */}
        {success && (
          <div className="text-green-600 text-center mt-2">{success}</div>
          
        )}
      </form>
    </div>
  );
}
