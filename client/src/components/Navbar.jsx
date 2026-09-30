import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUploadCloud,
  FiBarChart2,
  FiClock,
  FiUser,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("analysis");
    localStorage.removeItem("careerField");
    localStorage.removeItem("targetRole");

    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "Upload Resume",
      path: "/upload",
      icon: FiUploadCloud,
    },
    {
      name: "Analysis",
      path: "/analysis",
      icon: FiBarChart2,
    },
    {
      name: "History",
      path: "/history",
      icon: FiClock,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FiUser,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0B1120]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group"
          >
            <div
              className="
                w-10 h-10
                rounded-xl
                bg-gradient-to-br from-blue-500 to-purple-600
                flex items-center justify-center
                shadow-lg shadow-blue-500/20
                group-hover:scale-105
                transition-transform
              "
            >
              <FiFileText className="text-white text-xl" />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-tight">
                Resume<span className="text-blue-400">AI</span>
              </h1>

              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                AI Resume Analyzer
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    hidden md:flex
                    items-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                    }
                    `
                  }
                >
                  <Icon className="text-base" />
                  {item.name}
                </NavLink>
              );
            })}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="
                ml-3
                flex items-center gap-2
                px-4 py-2.5
                rounded-xl
                text-sm font-medium
                text-slate-400
                border border-slate-700
                hover:border-red-500/30
                hover:bg-red-500/10
                hover:text-red-400
                transition-all duration-200
              "
            >
              <FiLogOut />
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;