import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiArrowRight,
  FiShield,
  FiUploadCloud,
  FiAlertCircle,
} from "react-icons/fi";

import { getProfile } from "../api/profileApi";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.user);
      } catch (error) {
        console.error("API Error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load your profile."
        );
      }
    };

    fetchProfile();
  }, []);

  // ----------------------------------------
  // Loading
  // ----------------------------------------

  if (!profile && !error) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4">

        <div className="text-center">

          <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FiUser
              size={26}
              className="text-blue-400 animate-pulse"
            />
          </div>

          <h2 className="text-xl font-semibold mt-5">
            Loading Profile
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Fetching your account information...
          </p>

        </div>
      </div>
    );
  }

  // ----------------------------------------
  // Error
  // ----------------------------------------

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4">

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center">

          <div className="w-14 h-14 mx-auto rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <FiAlertCircle
              size={26}
              className="text-red-400"
            />
          </div>

          <h2 className="text-xl font-semibold mt-5">
            Profile Unavailable
          </h2>

          <p className="text-gray-500 mt-2">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="
              mt-6
              bg-blue-600
              hover:bg-blue-500
              px-5
              py-2.5
              rounded-xl
              font-semibold
              transition
            "
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // ----------------------------------------
  // Local analysis data
  // ----------------------------------------

  const savedAnalysis = JSON.parse(
    localStorage.getItem("analysis") || "null"
  );

  const latestScore =
    savedAnalysis?.overallScore ?? null;

  // ----------------------------------------
  // Main
  // ----------------------------------------

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-4 py-10 md:px-8">

      {/* Background effects */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-180px] right-[-120px] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-180px] left-[-120px] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="mb-8">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">

            <FiUser size={15} />

            Account Profile

          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            My Profile
          </h1>

          <p className="text-gray-400 text-lg mt-3 max-w-2xl">
            Manage your account information and view your
            resume analysis activity.
          </p>

        </div>

        {/* -------------------------------- */}
        {/* Profile + Stats */}
        {/* -------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* -------------------------------- */}
          {/* Profile Card */}
          {/* -------------------------------- */}

          <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-2xl p-7 md:p-8">

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

              {/* Avatar */}

              <div className="
                w-24
                h-24
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-600
                flex
                items-center
                justify-center
                text-4xl
                font-bold
                text-white
                shadow-lg
                shadow-blue-600/20
                shrink-0
              ">
                {profile.name
                  ? profile.name
                      .charAt(0)
                      .toUpperCase()
                  : "U"}
              </div>

              {/* User information */}

              <div className="text-center sm:text-left">

                <p className="text-gray-500 text-sm">
                  Account Holder
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {profile.name}
                </h2>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-400 mt-3">

                  <FiMail size={16} />

                  <span>
                    {profile.email}
                  </span>

                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 text-sm mt-2">

                  <FiCalendar size={15} />

                  <span>
                    Member since{" "}
                    {profile.createdAt
                      ? new Date(
                          profile.createdAt
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </span>

                </div>

              </div>

            </div>

            {/* Account details */}

            <div className="border-t border-gray-800 mt-8 pt-6">

              <h3 className="text-lg font-semibold">
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">

                <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-4">

                  <div className="flex items-center gap-3">

                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <FiUser size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Full Name
                      </p>

                      <p className="text-sm font-medium mt-1">
                        {profile.name}
                      </p>
                    </div>

                  </div>

                </div>

                <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-4">

                  <div className="flex items-center gap-3">

                    <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                      <FiMail size={18} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">
                        Email Address
                      </p>

                      <p className="text-sm font-medium mt-1 truncate">
                        {profile.email}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* -------------------------------- */}
          {/* Account Status */}
          {/* -------------------------------- */}

          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-7">

            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <FiShield
                size={22}
                className="text-green-400"
              />
            </div>

            <h3 className="text-xl font-semibold mt-5">
              Account Status
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Your account is active and ready to use.
            </p>

            <div className="flex items-center gap-2 mt-6">

              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />

              <span className="text-green-400 text-sm font-medium">
                Active
              </span>

            </div>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Statistics */}
        {/* -------------------------------- */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Resume uploads */}

          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Resumes Uploaded
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  1
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

                <FiFileText
                  size={22}
                  className="text-blue-400"
                />

              </div>

            </div>

            <p className="text-gray-600 text-xs mt-5">
              Resume upload activity
            </p>

          </div>

          {/* Latest score */}

          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  Latest Resume Score
                </p>

                <h2 className="text-4xl font-bold mt-2 text-blue-400">
                  {latestScore !== null
                    ? latestScore
                    : "--"}
                </h2>

              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">

                <FiTrendingUp
                  size={22}
                  className="text-purple-400"
                />

              </div>

            </div>

            <p className="text-gray-600 text-xs mt-5">
              Based on your latest analysis
            </p>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Quick Actions */}
        {/* -------------------------------- */}

        <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/10 rounded-2xl p-6 md:p-7 mt-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h3 className="text-xl font-semibold">
                Continue improving your resume
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Upload another resume and get fresh AI-powered
                recommendations.
              </p>

            </div>

            <button
              onClick={() => navigate("/upload")}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                bg-blue-600
                hover:bg-blue-500
                px-5
                py-3
                rounded-xl
                font-semibold
                transition
                shadow-lg
                shadow-blue-600/20
                shrink-0
              "
            >
              <FiUploadCloud size={18} />
              Analyze Resume
              <FiArrowRight size={17} />
            </button>

          </div>

        </div>

        {/* -------------------------------- */}
        {/* Footer note */}
        {/* -------------------------------- */}

        <div className="flex items-start gap-3 text-gray-600 text-sm mt-7 pb-10">

          <FiShield
            size={16}
            className="mt-0.5 shrink-0"
          />

          <p>
            Your account information is displayed securely
            within your authenticated profile.
          </p>

        </div>

      </div>
    </div>
  );
};

export default Profile;