import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiFileText,
  FiShield,
} from "react-icons/fi";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-6 py-10">

      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div
              className="
                w-12 h-12
                rounded-2xl
                bg-gradient-to-br from-blue-500 to-purple-600
                flex items-center justify-center
                shadow-lg shadow-blue-500/20
                group-hover:scale-105
                transition
              "
            >
              <FiFileText className="text-2xl" />
            </div>

            <div className="text-left">
              <h1 className="text-xl font-bold">
                Resume<span className="text-blue-400">AI</span>
              </h1>

              <p className="text-xs text-slate-500 tracking-wider uppercase">
                AI Resume Analyzer
              </p>
            </div>
          </Link>

        </div>

        {/* Login Card */}
        <div
          className="
            bg-[#111827]/95
            border border-slate-800
            rounded-3xl
            p-8
            md:p-10
            shadow-2xl
            backdrop-blur-xl
          "
        >

          {/* Heading */}
          <div className="text-center">

            <h2 className="text-3xl font-bold">
              Welcome back
            </h2>

            <p className="text-slate-400 mt-2">
              Sign in to continue analyzing your resume.
            </p>

          </div>


          {/* Error */}
          {error && (
            <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm">
              {error}
            </div>
          )}


          {/* Form */}
          <form
            onSubmit={handleLogin}
            className="mt-8"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>

              <div className="relative">

                <FiMail
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    bg-[#0B1120]
                    border border-slate-700
                    rounded-xl
                    py-3.5
                    pl-11
                    pr-4
                    text-white
                    placeholder-slate-600
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                  "
                />

              </div>

            </div>


            {/* Password */}
            <div className="mt-5">

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">

                <FiLock
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-500
                  "
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full
                    bg-[#0B1120]
                    border border-slate-700
                    rounded-xl
                    py-3.5
                    pl-11
                    pr-4
                    text-white
                    placeholder-slate-600
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                  "
                />

              </div>

            </div>


            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-7
                flex
                items-center
                justify-center
                gap-2
                bg-blue-600
                hover:bg-blue-500
                disabled:bg-blue-600/50
                disabled:cursor-not-allowed
                text-white
                py-3.5
                rounded-xl
                font-semibold
                shadow-lg
                shadow-blue-600/20
                transition-all
                duration-200
                hover:-translate-y-0.5
              "
            >

              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}

            </button>

          </form>


          {/* Security message */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
            <FiShield />
            Secure authentication
          </div>


          {/* Register */}
          <p className="text-center text-slate-400 mt-6 text-sm">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Create an account
            </Link>

          </p>

        </div>


        {/* Bottom text */}
        <p className="text-center text-slate-600 text-xs mt-6">
          Analyze smarter. Improve faster. Get career-ready.
        </p>

      </div>

    </div>
  );
};

export default Login;