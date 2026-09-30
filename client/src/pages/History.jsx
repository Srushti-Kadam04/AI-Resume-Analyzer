import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResumeHistory } from "../api/historyApi";
import { deleteResume } from "../api/deleteResumeApi";
import {
  FiFileText,
  FiEye,
  FiTrash2,
  FiBriefcase,
  FiTarget,
  FiCalendar,
  FiTrendingUp,
  FiUploadCloud,
  FiClock,
  FiChevronRight,
  FiAlertCircle,
} from "react-icons/fi";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getResumeHistory();

        setHistory(data.resumes || []);
      } catch (error) {
        console.error("History Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const deleteHistoryItem = async (resumeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(resumeId);

      setHistory((prevHistory) =>
        prevHistory.filter((item) => item._id !== resumeId)
      );
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete resume."
      );
    }
  };

  // ----------------------------------------
  // Score color
  // ----------------------------------------

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBar = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  // ----------------------------------------
  // Status styling
  // ----------------------------------------

  const getStatusStyle = (status) => {
    if (status === "Excellent") {
      return "text-green-400 bg-green-500/10 border-green-500/20";
    }

    if (status === "Good") {
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    }

    if (status === "Needs Improvement") {
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    }

    return "text-red-400 bg-red-500/10 border-red-500/20";
  };

  // ----------------------------------------
  // View Analysis
  // ----------------------------------------

  const viewAnalysis = (item) => {
    navigate("/analysis", {
      state: {
        analysis: {
          overallScore: item.overallScore ?? 0,

          atsScore: item.atsScore ?? 0,

          roleMatchScore: item.roleMatchScore ?? 0,

          status: item.status || "Needs Improvement",

          strengths: item.strengths || [],

          weaknesses: item.weaknesses || [],

          missingSkills: item.missingSkills || [],

          keywordSuggestions: item.keywordSuggestions || [],

          experienceFeedback: item.experienceFeedback || [],

          projectFeedback: item.projectFeedback || [],

          educationFeedback: item.educationFeedback || [],

          improvementSuggestions:
            item.improvementSuggestions || [],

          recommendedSkills:
            item.recommendedSkills || [],

          suggestions:
            item.improvementSuggestions ||
            item.suggestions ||
            [],
        },

        careerField: item.careerField,

        targetRole: item.targetRole,
      },
    });
  };

  // ----------------------------------------
  // Loading
  // ----------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4">

        <div className="text-center">

          <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FiClock
              size={24}
              className="text-blue-400 animate-pulse"
            />
          </div>

          <h2 className="text-xl font-semibold mt-5">
            Loading Resume History
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Fetching your previous resume analyses...
          </p>

        </div>
      </div>
    );
  }

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

      <div className="relative max-w-7xl mx-auto">

        {/* -------------------------------- */}
        {/* Header */}
        {/* -------------------------------- */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <FiClock size={15} />
              Resume History
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mt-5">
              Your Resume History
            </h1>

            <p className="text-gray-400 text-lg mt-3 max-w-2xl">
              Review your previous resume analyses, scores, and
              AI recommendations.
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
            "
          >
            <FiUploadCloud size={18} />
            Analyze New Resume
          </button>

        </div>

        {/* -------------------------------- */}
        {/* Summary */}
        {/* -------------------------------- */}

        {history.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">

            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">

              <div className="flex items-center gap-3">

                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <FiFileText size={20} />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Total Analyses
                  </p>

                  <p className="text-2xl font-bold mt-1">
                    {history.length}
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">

              <div className="flex items-center gap-3">

                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <FiTrendingUp size={20} />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Latest Score
                  </p>

                  <p
                    className={`text-2xl font-bold mt-1 ${getScoreColor(
                      Number(history[0]?.overallScore) || 0
                    )}`}
                  >
                    {history[0]?.overallScore ?? 0}
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5">

              <div className="flex items-center gap-3">

                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
                  <FiTarget size={20} />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Latest Status
                  </p>

                  <p className="text-lg font-bold mt-1">
                    {history[0]?.status ||
                      "Needs Improvement"}
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* -------------------------------- */}
        {/* Empty State */}
        {/* -------------------------------- */}

        {history.length === 0 ? (
          <div className="mt-10">

            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-10 md:p-16 text-center">

              <div className="mx-auto w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <FiFileText
                  size={34}
                  className="text-blue-400"
                />
              </div>

              <h2 className="text-2xl font-bold mt-6">
                No Resume Analyses Yet
              </h2>

              <p className="text-gray-500 mt-3 max-w-md mx-auto">
                Upload your first resume and let AI analyze its
                ATS compatibility, skills, experience, and role match.
              </p>

              <button
                onClick={() => navigate("/upload")}
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  bg-blue-600
                  hover:bg-blue-500
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                <FiUploadCloud size={19} />
                Upload Resume
              </button>

            </div>

          </div>
        ) : (
          /* -------------------------------- */
          /* History List */
          /* -------------------------------- */

          <div className="mt-10 space-y-5">

            {history.map((item) => {

              const score =
                Number(item.overallScore) || 0;

              const status =
                item.status || "Needs Improvement";

              return (
                <div
                  key={item._id}
                  className="
                    bg-[#111827]
                    border
                    border-gray-800
                    hover:border-gray-700
                    rounded-2xl
                    p-5
                    md:p-6
                    shadow-lg
                    transition
                  "
                >

                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">

                    {/* -------------------------------- */}
                    {/* Resume information */}
                    {/* -------------------------------- */}

                    <div className="flex-1 min-w-0">

                      <div className="flex items-start gap-4">

                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                          <FiFileText size={25} />
                        </div>

                        <div className="min-w-0">

                          <h2 className="text-lg md:text-xl font-semibold truncate">
                            {item.fileName ||
                              "Resume Analysis"}
                          </h2>

                          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-sm text-gray-500">

                            <span className="flex items-center gap-2">
                              <FiBriefcase size={14} />
                              {item.careerField ||
                                "Not specified"}
                            </span>

                            <span className="flex items-center gap-2">
                              <FiTarget size={14} />
                              {item.targetRole ||
                                "Not specified"}
                            </span>

                            <span className="flex items-center gap-2">
                              <FiCalendar size={14} />

                              {item.createdAt
                                ? new Date(
                                    item.createdAt
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "Date unavailable"}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Status */}
                      <div className="mt-5 flex flex-wrap items-center gap-3">

                        <span
                          className={`
                            inline-flex
                            items-center
                            px-3
                            py-1.5
                            rounded-full
                            border
                            text-xs
                            font-medium
                            ${getStatusStyle(status)}
                          `}
                        >
                          {status}
                        </span>

                      </div>

                    </div>

                    {/* -------------------------------- */}
                    {/* Score */}
                    {/* -------------------------------- */}

                    <div className="lg:w-52">

                      <div className="flex items-end justify-between">

                        <div>
                          <p className="text-gray-500 text-xs">
                            Overall Score
                          </p>

                          <p
                            className={`text-4xl font-bold mt-1 ${getScoreColor(
                              score
                            )}`}
                          >
                            {score}
                            <span className="text-gray-600 text-base font-normal">
                              /100
                            </span>
                          </p>
                        </div>

                      </div>

                      <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">

                        <div
                          className={`h-full ${getScoreBar(
                            score
                          )} rounded-full`}
                          style={{
                            width: `${Math.min(
                              Math.max(score, 0),
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>

                    {/* -------------------------------- */}
                    {/* Actions */}
                    {/* -------------------------------- */}

                    <div className="flex lg:flex-col gap-3 lg:w-40">

                      <button
                        onClick={() => viewAnalysis(item)}
                        className="
                          flex-1
                          lg:w-full
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          bg-blue-600
                          hover:bg-blue-500
                          px-4
                          py-2.5
                          rounded-xl
                          font-medium
                          text-sm
                          transition
                        "
                      >
                        <FiEye size={17} />
                        View Analysis
                      </button>

                      <button
                        onClick={() =>
                          deleteHistoryItem(item._id)
                        }
                        className="
                          flex-1
                          lg:w-full
                          inline-flex
                          items-center
                          justify-center
                          gap-2
                          bg-red-500/10
                          hover:bg-red-500/20
                          border
                          border-red-500/20
                          text-red-400
                          px-4
                          py-2.5
                          rounded-xl
                          font-medium
                          text-sm
                          transition
                        "
                      >
                        <FiTrash2 size={17} />
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* -------------------------------- */}
        {/* Bottom note */}
        {/* -------------------------------- */}

        {history.length > 0 && (
          <div className="mt-8 pb-12 flex items-start gap-3 text-gray-500 text-sm">

            <FiAlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />

            <p>
              Previous analyses are stored in your account so you
              can review your resume improvements over time.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

export default History;