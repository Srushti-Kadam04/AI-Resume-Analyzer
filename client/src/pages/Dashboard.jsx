import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import {
  FiUploadCloud,
  FiBarChart2,
  FiCpu,
  FiUser,
  FiClock,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:px-8">

        {/* ================= HERO ================= */}
        <section className="mb-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-5">
                <FiCpu />
                AI-Powered Resume Platform
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Welcome back{" "}
                <span className="text-blue-400">👋</span>
              </h1>

              <p className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed">
                Analyze your resume, improve your ATS compatibility,
                identify skill gaps, and get personalized career
                recommendations.
              </p>
            </div>

            <button
              onClick={() => navigate("/upload")}
              className="
                self-start lg:self-auto
                flex items-center gap-2
                bg-blue-600
                hover:bg-blue-500
                px-5 py-3
                rounded-xl
                font-semibold
                shadow-lg shadow-blue-600/20
                transition-all duration-200
                hover:-translate-y-0.5
              "
            >
              <FiUploadCloud />
              Analyze New Resume
            </button>

          </div>

        </section>


        {/* ================= AI BANNER ================= */}
        <section
          className="
            relative overflow-hidden
            rounded-3xl
            border border-blue-400/20
            bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-purple-700/90
            p-8 md:p-10
            shadow-2xl shadow-blue-900/20
          "
        >

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />

          <div className="relative">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                <FiCpu className="text-2xl" />
              </div>

              <span className="text-blue-100 text-sm font-medium">
                Powered by Generative AI
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              Turn your resume into your career advantage.
            </h2>

            <p className="mt-4 text-blue-100 text-base md:text-lg max-w-3xl leading-relaxed">
              Get detailed AI feedback on your resume, including ATS
              compatibility, role matching, missing skills, keywords,
              projects, experience, and improvement recommendations.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                mt-7
                inline-flex items-center gap-2
                bg-white
                text-blue-700
                font-semibold
                px-6 py-3
                rounded-xl
                hover:bg-blue-50
                hover:-translate-y-0.5
                transition-all duration-200
                shadow-lg
              "
            >
              Upload Resume
              <FiArrowRight />
            </button>

          </div>
        </section>


        {/* ================= QUICK STATS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                AI Analysis
              </p>

              <FiCheckCircle className="text-green-400" />
            </div>

            <p className="text-2xl font-bold mt-3">
              Available
            </p>

            <p className="text-slate-500 text-sm mt-1">
              Analyze resumes instantly
            </p>
          </div>


          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Resume History
              </p>

              <FiClock className="text-blue-400" />
            </div>

            <p className="text-2xl font-bold mt-3">
              Track
            </p>

            <p className="text-slate-500 text-sm mt-1">
              Review previous analyses
            </p>
          </div>


          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">
                Career Insights
              </p>

              <FiBarChart2 className="text-purple-400" />
            </div>

            <p className="text-2xl font-bold mt-3">
              Personalized
            </p>

            <p className="text-slate-500 text-sm mt-1">
              Based on your target role
            </p>
          </div>

        </section>


        {/* ================= FEATURES ================= */}
        <section className="mt-12">

          <div className="flex items-end justify-between mb-6">

            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
                Workspace
              </p>

              <h2 className="text-2xl md:text-3xl font-bold mt-1">
                Resume tools
              </h2>

              <p className="text-slate-400 mt-2">
                Everything you need to improve your resume.
              </p>
            </div>

          </div>


          <div className="grid grid-cols-12 gap-5">

            <DashboardCard
              title="Upload Resume"
              description="Upload a PDF and get a detailed AI-powered resume analysis."
              icon={<FiUploadCloud size={28} />}
              to="/upload"
              span="lg:col-span-7"
            />

            <DashboardCard
              title="Resume Analysis"
              description="Review your ATS score, role match and AI feedback."
              icon={<FiBarChart2 size={28} />}
              to="/analysis"
              span="lg:col-span-5"
            />

            <DashboardCard
              title="AI Resume Assistant"
              description="Discover missing skills, useful keywords and practical improvements."
              icon={<FiCpu size={28} />}
              to="/analysis"
              span="lg:col-span-5"
            />

            <DashboardCard
              title="My Profile"
              description="View and manage your account information."
              icon={<FiUser size={28} />}
              to="/profile"
              span="lg:col-span-3"
            />

            <DashboardCard
              title="Resume History"
              description="View and manage your previous resume analyses."
              icon={<FiClock size={28} />}
              to="/history"
              span="lg:col-span-4"
            />

          </div>

        </section>


        {/* ================= FOOTER CTA ================= */}
        <section className="mt-12 mb-6">

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h3 className="text-xl font-bold">
                Ready to improve your resume?
              </h3>

              <p className="text-slate-400 mt-2">
                Upload your latest resume and get personalized AI feedback.
              </p>
            </div>

            <button
              onClick={() => navigate("/upload")}
              className="
                flex items-center justify-center gap-2
                bg-blue-600
                hover:bg-blue-500
                px-5 py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Start Analysis
              <FiArrowRight />
            </button>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Dashboard;