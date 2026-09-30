import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiFileText,
  FiUser,
  FiMail,
  FiLock,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import { registerUser } from "../api/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(name, email, password);

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4 py-10">

      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-100px] w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-100px] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-bold"
          >
            <div className="p-2 rounded-xl bg-blue-600">
              <FiFileText size={22} />
            </div>

            <span>
              Resume<span className="text-blue-400">AI</span>
            </span>
          </Link>

          <p className="text-gray-400 mt-3">
            Create your account and start improving your resume.
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-[#111827]/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">

          <div className="mb-7">
            <h1 className="text-3xl font-bold">
              Create Account
            </h1>

            <p className="text-gray-400 mt-2">
              Get started with your AI-powered resume analysis.
            </p>
          </div>

          <form onSubmit={handleRegister}>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <FiUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0B1120] border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  Create Account
                  <FiArrowRight size={18} />
                </>
              )}
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-400 mt-7 text-sm">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Login
            </Link>
          </p>

          {/* Security message */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
            <FiShield size={14} />
            <span>Your account information is securely protected.</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;