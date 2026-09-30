import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../api/resumeApi";
import {
  FiUploadCloud,
  FiFileText,
  FiTrash2,
  FiBriefcase,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [careerField, setCareerField] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const careerOptions = {
    Technology: [
      "Software Engineer",
      "AI Engineer",
      "ML Engineer",
      "Data Scientist",
      "Data Analyst",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Python Developer",
      "Java Developer",
      "DevOps Engineer",
      "Cybersecurity Analyst",
      "Cloud Engineer",
    ],

    "Business & Finance": [
      "Business Analyst",
      "Financial Analyst",
      "Investment Analyst",
      "Accountant",
      "Auditor",
      "Banking Professional",
      "Business Development Executive",
      "Management Consultant",
    ],

    "Design & Creative": [
      "UI/UX Designer",
      "Graphic Designer",
      "Product Designer",
      "Fashion Designer",
      "Video Editor",
      "Content Creator",
      "Photographer",
    ],

    "Marketing & Communication": [
      "Digital Marketing Specialist",
      "Marketing Manager",
      "SEO Specialist",
      "Social Media Manager",
      "Content Writer",
      "Copywriter",
      "PR Specialist",
      "Brand Manager",
    ],

    "Management & HR": [
      "Project Manager",
      "Product Manager",
      "HR Manager",
      "HR Executive",
      "Talent Acquisition Specialist",
      "Operations Manager",
      "Administrative Manager",
    ],

    Healthcare: [
      "Doctor",
      "Nurse",
      "Pharmacist",
      "Medical Laboratory Technician",
      "Healthcare Administrator",
      "Physiotherapist",
      "Medical Researcher",
    ],

    Legal: [
      "Lawyer",
      "Legal Associate",
      "Legal Consultant",
      "Corporate Lawyer",
      "Legal Researcher",
      "Compliance Officer",
    ],

    Engineering: [
      "Mechanical Engineer",
      "Civil Engineer",
      "Electrical Engineer",
      "Electronics Engineer",
      "Chemical Engineer",
      "Industrial Engineer",
      "Automotive Engineer",
    ],

    "Science & Research": [
      "Research Scientist",
      "Research Assistant",
      "Biotechnologist",
      "Chemist",
      "Physicist",
      "Environmental Scientist",
      "Laboratory Researcher",
    ],

    Education: [
      "School Teacher",
      "College Professor",
      "Lecturer",
      "Teaching Assistant",
      "Academic Researcher",
      "Instructional Designer",
    ],

    "Hospitality & Travel": [
      "Hotel Manager",
      "Hospitality Manager",
      "Event Manager",
      "Travel Consultant",
      "Chef",
      "Restaurant Manager",
    ],

    "Media & Arts": [
      "Journalist",
      "Editor",
      "Animator",
      "Film Producer",
      "Music Professional",
      "Art Director",
    ],
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
  };

  const handleUpload = async () => {
    setError("");

    if (!selectedFile) {
      setError("Please select a PDF resume.");
      return;
    }

    if (!careerField) {
      setError("Please select your career field.");
      return;
    }

    if (!targetRole) {
      setError("Please select your target job role.");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadResume(
        selectedFile,
        careerField,
        targetRole
      );

      localStorage.setItem(
        "analysis",
        JSON.stringify(data.analysis)
      );

      localStorage.setItem("careerField", careerField);
      localStorage.setItem("targetRole", targetRole);

      navigate("/analysis", {
        state: {
          analysis: data.analysis,
          careerField,
          targetRole,
        },
      });
    } catch (error) {
      console.error("Upload Error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while analyzing your resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white px-4 py-10 md:px-8">

      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-150px] right-[-100px] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-100px] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <FiFileText size={15} />
            AI Resume Analysis
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-5">
            Analyze Your Resume
          </h1>

          <p className="text-gray-400 text-lg mt-3 max-w-2xl">
            Upload your resume and tell us what role you're targeting.
            Our AI will evaluate your resume and provide personalized
            recommendations.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Section */}
          <div className="lg:col-span-2 space-y-7">

            {/* Upload Card */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                  <FiUploadCloud size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Upload Resume
                  </h2>

                  <p className="text-gray-500 text-sm">
                    PDF format only
                  </p>
                </div>
              </div>

              {/* Upload Area */}
              {!selectedFile ? (
                <label
                  className="
                    border-2 border-dashed border-gray-700
                    hover:border-blue-500
                    bg-[#0B1120]
                    hover:bg-blue-500/5
                    rounded-2xl
                    min-h-[280px]
                    flex flex-col
                    justify-center
                    items-center
                    text-center
                    cursor-pointer
                    transition
                  "
                >
                  <div className="p-5 rounded-full bg-blue-500/10 mb-5">
                    <FiUploadCloud
                      size={42}
                      className="text-blue-400"
                    />
                  </div>

                  <h3 className="text-xl font-semibold">
                    Drop your resume here
                  </h3>

                  <p className="text-gray-400 mt-2">
                    or click to browse from your computer
                  </p>

                  <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                    <span className="px-3 py-1 rounded-lg bg-gray-800">
                      PDF
                    </span>

                    <span>Maximum 5 MB</span>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                /* Selected File */
                <div className="border border-blue-500/30 bg-blue-500/5 rounded-2xl p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4 min-w-0">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                        <FiFileText size={28} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold truncate">
                          {selectedFile.name}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          {" • "}
                          PDF Document
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition shrink-0"
                      title="Remove file"
                    >
                      <FiTrash2 size={20} />
                    </button>

                  </div>

                  <div className="flex items-center gap-2 mt-5 text-sm text-green-400">
                    <FiCheckCircle size={17} />
                    Resume ready for analysis
                  </div>

                </div>
              )}
            </div>

            {/* Career Details */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">

              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Career Target
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Tell the AI what position you're applying for.
                </p>
              </div>

              <div className="space-y-6">

                {/* Career Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <FiBriefcase className="text-blue-400" />
                    Career Field
                  </label>

                  <select
                    value={careerField}
                    onChange={(e) => {
                      setCareerField(e.target.value);
                      setTargetRole("");
                    }}
                    className="
                      w-full bg-[#0B1120]
                      border border-gray-700
                      rounded-xl px-4 py-3.5
                      text-white
                      focus:outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                      transition
                    "
                  >
                    <option value="">
                      Select your career field
                    </option>

                    {Object.keys(careerOptions).map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Role */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                    <FiTarget className="text-blue-400" />
                    Target Job Role
                  </label>

                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    disabled={!careerField}
                    className="
                      w-full bg-[#0B1120]
                      border border-gray-700
                      rounded-xl px-4 py-3.5
                      text-white
                      focus:outline-none
                      focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/20
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    <option value="">
                      {careerField
                        ? "Select your target role"
                        : "Select career field first"}
                    </option>

                    {careerField &&
                      careerOptions[careerField].map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                  </select>

                  <p className="text-gray-500 text-sm mt-2">
                    Your target role helps the AI evaluate your resume
                    specifically for that position.
                  </p>
                </div>

              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-500/30 bg-red-500/10 rounded-xl px-5 py-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleUpload}
              disabled={
                !selectedFile ||
                !careerField ||
                !targetRole ||
                loading
              }
              className="
                w-full
                flex items-center justify-center gap-3
                bg-blue-600
                hover:bg-blue-500
                disabled:bg-gray-700
                disabled:text-gray-500
                disabled:cursor-not-allowed
                text-white
                py-4
                rounded-xl
                text-lg
                font-semibold
                shadow-lg
                shadow-blue-600/20
                transition
              "
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  Analyze Resume
                  <FiArrowRight size={20} />
                </>
              )}
            </button>

          </div>

          {/* Right Section */}
          <div className="space-y-6">

            {/* How it works */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">

              <h2 className="text-lg font-semibold mb-6">
                How it works
              </h2>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-semibold text-sm shrink-0">
                    1
                  </div>

                  <div>
                    <h3 className="font-medium">
                      Upload your resume
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Upload your latest resume as a PDF.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-semibold text-sm shrink-0">
                    2
                  </div>

                  <div>
                    <h3 className="font-medium">
                      Choose your target
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Select your career field and desired role.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-semibold text-sm shrink-0">
                    3
                  </div>

                  <div>
                    <h3 className="font-medium">
                      Get AI feedback
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Receive ATS scoring and personalized suggestions.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Analysis includes */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-2xl p-6">

              <h2 className="text-lg font-semibold mb-5">
                Your analysis includes
              </h2>

              <div className="space-y-3 text-sm">

                {[
                  "ATS compatibility score",
                  "Target role match",
                  "Resume strengths",
                  "Missing skills",
                  "Keyword suggestions",
                  "Improvement recommendations",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <FiCheckCircle
                      className="text-blue-400 shrink-0"
                      size={17}
                    />
                    {item}
                  </div>
                ))}

              </div>
            </div>

            {/* Security */}
            <div className="flex items-start gap-3 px-2 text-gray-500 text-sm">
              <FiShield
                className="text-gray-400 mt-0.5 shrink-0"
                size={17}
              />

              <p>
                Your resume is processed securely and analyzed only
                to provide your personalized results.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadResume;