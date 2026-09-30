import { useLocation, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiTarget,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiTrendingUp,
  FiArrowLeft,
  FiUploadCloud,
  FiAward,
  FiZap,
  FiFileText,
  FiChevronRight,
} from "react-icons/fi";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get saved analysis from localStorage
  const savedAnalysis = JSON.parse(
    localStorage.getItem("analysis") || "null"
  );

  // Prefer route state, then localStorage
  const analysis = location.state?.analysis || savedAnalysis;

  const careerField =
    location.state?.careerField ||
    localStorage.getItem("careerField") ||
    "";

  const targetRole =
    location.state?.targetRole ||
    localStorage.getItem("targetRole") ||
    "";

  // --------------------------------------------------
  // No analysis state
  // --------------------------------------------------

  if (!analysis) {
    return (
      <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4">

        <div className="text-center max-w-md">

          <div className="mx-auto w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FiFileText className="text-blue-400" size={36} />
          </div>

          <h1 className="text-3xl font-bold mt-6">
            No Analysis Found
          </h1>

          <p className="text-gray-400 mt-3">
            Upload a resume first to generate your AI-powered resume
            analysis.
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
              shadow-lg
              shadow-blue-600/20
            "
          >
            <FiUploadCloud size={19} />
            Upload Resume
          </button>

        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

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

  const getStatusStyle = (status) => {
    if (status === "Excellent") {
      return {
        text: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        icon: "text-green-400",
      };
    }

    if (status === "Good") {
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        icon: "text-yellow-400",
      };
    }

    if (status === "Needs Improvement") {
      return {
        text: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        icon: "text-orange-400",
      };
    }

    return {
      text: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      icon: "text-red-400",
    };
  };

  const renderList = (
    items,
    emptyMessage = "No information available."
  ) => {
    if (!items || items.length === 0) {
      return (
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-500 text-sm">
            {emptyMessage}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="
              bg-[#111827]
              border
              border-gray-800
              hover:border-gray-700
              rounded-xl
              p-4
              flex
              gap-3
              transition
            "
          >
            <FiChevronRight
              className="text-blue-400 mt-0.5 shrink-0"
              size={18}
            />

            <p className="text-gray-300 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const statusStyle = getStatusStyle(
    analysis.status || "Needs Improvement"
  );

  const overallScore = Number(analysis.overallScore) || 0;
  const atsScore = Number(analysis.atsScore) || 0;
  const roleMatchScore = Number(analysis.roleMatchScore) || 0;

  // --------------------------------------------------
  // Score Card
  // --------------------------------------------------

  const ScoreCard = ({
    title,
    score,
    description,
    icon,
    iconColor,
  }) => {
    return (
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className={`p-2.5 rounded-xl bg-white/5 ${iconColor}`}
            >
              {icon}
            </div>

            <div>
              <p className="text-gray-300 font-medium">
                {title}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                {description}
              </p>
            </div>

          </div>

          <span
            className={`text-3xl font-bold ${getScoreColor(score)}`}
          >
            {score}
          </span>

        </div>

        {/* Score bar */}
        <div className="mt-6">

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreBar(score)} rounded-full transition-all duration-700`}
              style={{
                width: `${Math.min(Math.max(score, 0), 100)}%`,
              }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>0</span>
            <span>100</span>
          </div>

        </div>

      </div>
    );
  };

  // --------------------------------------------------
  // Analysis Section
  // --------------------------------------------------

  const AnalysisSection = ({
    title,
    icon,
    iconColor,
    children,
  }) => {
    return (
      <section className="mt-10">

        <div className="flex items-center gap-3 mb-5">

          <div
            className={`p-2 rounded-lg bg-white/5 ${iconColor}`}
          >
            {icon}
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">
              {title}
            </h2>
          </div>

        </div>

        {children}

      </section>
    );
  };

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-4 py-10 md:px-8">

      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-180px] right-[-120px] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl" />

        <div className="absolute bottom-[-180px] left-[-120px] w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ------------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------------ */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

          <div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <FiZap size={15} />
              AI Resume Report
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mt-5">
              Resume Analysis
            </h1>

            <p className="text-gray-400 text-lg mt-3 max-w-2xl">
              Here's how your resume performs against your selected
              career target.
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
            Analyze Another Resume
          </button>

        </div>

        {/* ------------------------------------------------ */}
        {/* Target Role Card */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg">

          <div className="flex items-center gap-3 mb-6">

            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
              <FiTarget size={22} />
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                Analysis Target
              </h2>

              <p className="text-gray-500 text-sm">
                Your resume was evaluated against this target.
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Career Field
              </p>

              <p className="text-lg font-semibold mt-2">
                {careerField || "Not specified"}
              </p>

            </div>

            <div className="bg-[#0B1120] border border-gray-800 rounded-xl p-5">

              <p className="text-gray-500 text-sm">
                Target Role
              </p>

              <p className="text-lg font-semibold mt-2">
                {targetRole || "Not specified"}
              </p>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* Score Overview */}
        {/* ------------------------------------------------ */}

        <div className="mt-8">

          <div className="flex items-center gap-3 mb-5">

            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <FiAward size={20} />
            </div>

            <h2 className="text-2xl font-bold">
              Score Overview
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <ScoreCard
              title="Overall Score"
              score={overallScore}
              description="Overall resume quality"
              icon={<FiTrendingUp size={21} />}
              iconColor="text-blue-400"
            />

            <ScoreCard
              title="ATS Score"
              score={atsScore}
              description="ATS compatibility"
              icon={<FiTarget size={21} />}
              iconColor="text-purple-400"
            />

            <ScoreCard
              title="Role Match"
              score={roleMatchScore}
              description="Target role alignment"
              icon={<FiBriefcase size={21} />}
              iconColor="text-green-400"
            />

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* Status */}
        {/* ------------------------------------------------ */}

        <div
          className={`
            mt-6
            ${statusStyle.bg}
            border
            ${statusStyle.border}
            rounded-2xl
            p-5
          `}
        >

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <FiAward
                className={statusStyle.icon}
                size={23}
              />

              <div>

                <p className="text-gray-400 text-sm">
                  Resume Status
                </p>

                <p
                  className={`text-xl font-bold mt-1 ${statusStyle.text}`}
                >
                  {analysis.status || "Needs Improvement"}
                </p>

              </div>

            </div>

            <div className="hidden sm:block text-right">

              <p className="text-gray-500 text-xs">
                Overall score
              </p>

              <p
                className={`text-lg font-bold ${getScoreColor(
                  overallScore
                )}`}
              >
                {overallScore}/100
              </p>

            </div>

          </div>

        </div>

        {/* ------------------------------------------------ */}
        {/* Strengths */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Strengths"
          icon={<FiCheckCircle size={19} />}
          iconColor="text-green-400"
        >
          {renderList(
            analysis.strengths,
            "No major strengths identified."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Weaknesses */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Weaknesses"
          icon={<FiAlertTriangle size={19} />}
          iconColor="text-red-400"
        >
          {renderList(
            analysis.weaknesses,
            "No weaknesses identified."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Skills */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Missing Skills"
          icon={<FiCode size={19} />}
          iconColor="text-blue-400"
        >
          {renderList(
            analysis.missingSkills,
            "No missing skills identified."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Keywords */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Keyword Suggestions"
          icon={<FiTarget size={19} />}
          iconColor="text-purple-400"
        >
          {renderList(
            analysis.keywordSuggestions,
            "No keyword suggestions available."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Experience */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Experience Feedback"
          icon={<FiBriefcase size={19} />}
          iconColor="text-yellow-400"
        >
          {renderList(
            analysis.experienceFeedback,
            "No experience feedback available."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Projects */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Project Feedback"
          icon={<FiCode size={19} />}
          iconColor="text-cyan-400"
        >
          {renderList(
            analysis.projectFeedback,
            "No project feedback available."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Education */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Education Feedback"
          icon={<FiBookOpen size={19} />}
          iconColor="text-orange-400"
        >
          {renderList(
            analysis.educationFeedback,
            "No education feedback available."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Recommended Skills */}
        {/* ------------------------------------------------ */}

        <AnalysisSection
          title="Recommended Skills"
          icon={<FiTrendingUp size={19} />}
          iconColor="text-green-400"
        >
          {renderList(
            analysis.recommendedSkills,
            "No recommended skills available."
          )}
        </AnalysisSection>

        {/* ------------------------------------------------ */}
        {/* Improvement Suggestions */}
        {/* ------------------------------------------------ */}

        <section className="mt-10 pb-16">

          <div className="bg-gradient-to-br from-blue-600/15 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                <FiZap size={22} />
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold">
                  Improvement Suggestions
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Practical recommendations to strengthen your resume.
                </p>
              </div>

            </div>

            {renderList(
              analysis.improvementSuggestions,
              "No improvement suggestions available."
            )}

          </div>

        </section>

        {/* ------------------------------------------------ */}
        {/* Bottom CTA */}
        {/* ------------------------------------------------ */}

        <div className="pb-12">

          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-7 md:p-8 text-center">

            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FiUploadCloud size={24} />
            </div>

            <h2 className="text-2xl font-bold mt-5">
              Want to improve your score?
            </h2>

            <p className="text-gray-400 mt-2 max-w-xl mx-auto">
              Make the recommended changes to your resume and run
              another analysis to see how your scores improve.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                mt-6
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
              Analyze Updated Resume
              <FiArrowLeft
                size={18}
                className="rotate-180"
              />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Analysis;