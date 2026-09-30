const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResumeWithGemini } = require("../services/geminiAnalyzer");


// ==========================================
// HELPER: GET RESUME STATUS
// ==========================================

const getResumeStatus = (score) => {
  if (score >= 80) {
    return "Excellent";
  }

  if (score >= 60) {
    return "Good";
  }

  if (score >= 40) {
    return "Needs Improvement";
  }

  return "Poor";
};


// ==========================================
// UPLOAD + ANALYZE + SAVE RESUME
// ==========================================

const uploadResume = async (req, res) => {
  try {

    // --------------------------------------
    // 1. Check PDF
    // --------------------------------------

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }


    // --------------------------------------
    // 2. Get career information
    // --------------------------------------

    const { careerField, targetRole } = req.body;

    if (!careerField || !targetRole) {
      return res.status(400).json({
        success: false,
        message: "Career field and target role are required",
      });
    }


    // --------------------------------------
    // 3. Extract text from PDF
    // --------------------------------------

    const extractedText = await extractTextFromPDF(
      req.file.path
    );

    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from the resume PDF",
      });
    }


    // --------------------------------------
    // 4. Gemini AI analysis
    // --------------------------------------

    const analysis = await analyzeResumeWithGemini(
      extractedText,
      careerField,
      targetRole
    );

    console.log("Gemini Analysis:", analysis);

    

    // --------------------------------------
    // 5. Calculate status
    // --------------------------------------

    const overallScore =
      Number(analysis.overallScore) || 0;

    const atsScore =
      Number(analysis.atsScore) || 0;

    const roleMatchScore =
      Number(analysis.roleMatchScore) || 0;

    const status = getResumeStatus(
      overallScore
    );


    // --------------------------------------
    // 6. Save complete analysis to MongoDB
    // --------------------------------------

    const resume = await Resume.create({

      user: req.user.id,

      fileName: req.file.originalname,

      careerField,

      targetRole,

      overallScore,

      atsScore,

      roleMatchScore,

      status,

      strengths:
        analysis.strengths || [],

      weaknesses:
        analysis.weaknesses || [],

      missingSkills:
        analysis.missingSkills || [],

      keywordSuggestions:
        analysis.keywordSuggestions || [],

      experienceFeedback:
        analysis.experienceFeedback || [],

      projectFeedback:
        analysis.projectFeedback || [],

      educationFeedback:
        analysis.educationFeedback || [],

      improvementSuggestions:
        analysis.improvementSuggestions || [],

      recommendedSkills:
        analysis.recommendedSkills || [],
    });


    // --------------------------------------
    // 7. Send result to frontend
    // --------------------------------------

    return res.status(201).json({

      success: true,

      message:
        "Resume uploaded and analyzed successfully",

      careerField,

      targetRole,

      analysis: {

        overallScore,

        atsScore,

        roleMatchScore,

        status,

        analysisVersion:
          analysis.analysisVersion ||
          "Gemini AI",

        strengths:
          analysis.strengths || [],

        weaknesses:
          analysis.weaknesses || [],

        missingSkills:
          analysis.missingSkills || [],

        keywordSuggestions:
          analysis.keywordSuggestions || [],

        experienceFeedback:
          analysis.experienceFeedback || [],

        projectFeedback:
          analysis.projectFeedback || [],

        educationFeedback:
          analysis.educationFeedback || [],

        improvementSuggestions:
          analysis.improvementSuggestions || [],

        recommendedSkills:
          analysis.recommendedSkills || [],

        // Backward compatibility
        suggestions:
          analysis.improvementSuggestions ||
          [],
      },

      resume: {

        id: resume._id,

        fileName:
          resume.fileName,

        careerField:
          resume.careerField,

        targetRole:
          resume.targetRole,

        overallScore:
          resume.overallScore,

        atsScore:
          resume.atsScore,

        roleMatchScore:
          resume.roleMatchScore,

        status:
          resume.status,

        createdAt:
          resume.createdAt,
      },
    });

  } catch (error) {

    console.error(
      "Upload Resume Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to analyze resume",
    });
  }
};


// ==========================================
// GET RESUME HISTORY
// ==========================================

const getResumeHistory = async (req, res) => {

  try {

    const resumes = await Resume.find({
      user: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .lean();


    return res.status(200).json({

      success: true,

      resumes,
    });

  } catch (error) {

    console.error(
      "History Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server Error",
    });
  }
};

// Get a single resume with complete analysis
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });

  } catch (error) {
    console.error("Get Resume Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// DELETE RESUME
// ==========================================

const deleteResume = async (req, res) => {

  try {

    const resume =
      await Resume.findOneAndDelete({

        _id: req.params.id,

        user: req.user.id,
      });


    if (!resume) {

      return res.status(404).json({

        success: false,

        message: "Resume not found",
      });
    }


    return res.status(200).json({

      success: true,

      message:
        "Resume deleted successfully",
    });

  } catch (error) {

    console.error(
      "Delete Resume Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Server Error",
    });
  }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {

  uploadResume,

  getResumeHistory,

  getResumeById,

  deleteResume,

};
