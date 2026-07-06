const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResume } = require("../services/resumeAnalyzer");

const uploadResume = async (req, res) => {
    try {

        // Extract text from uploaded PDF
        const extractedText = await extractTextFromPDF(req.file.path);
        const analysis = analyzeResume(extractedText);

        // Save resume details in MongoDB
        const resume = await Resume.create({
            user: req.user.id,
            fileName: req.file.filename,
            fileUrl: req.file.path,
            extractedText,
            score: analysis.score,
            suggestions: analysis.suggestions

        });

        res.status(201).json({
    success: true,
    message: "Resume uploaded and analyzed successfully",

    analysis: {
        overallScore: analysis.score,
        status: analysis.status,
        analysisVersion: analysis.analysisVersion,
        suggestions: analysis.suggestions
    },

    resume: {
        id: resume._id,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        createdAt: resume.createdAt
    }
});

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    uploadResume
};