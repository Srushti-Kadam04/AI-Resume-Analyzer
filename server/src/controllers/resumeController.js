const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../services/pdfService");

const uploadResume = async (req, res) => {
    try {

        // Extract text from uploaded PDF
        const extractedText = await extractTextFromPDF(req.file.path);

        // Save resume details in MongoDB
        const resume = await Resume.create({
            user: req.user.id,
            fileName: req.file.filename,
            fileUrl: req.file.path,
            extractedText
        });

        res.status(201).json({
            success: true,
            message: "Resume uploaded and text extracted successfully",
            resume
        });

    } catch (error) {
    console.error("===== PDF ERROR =====");
    console.error(error);

    throw error;
}
};

module.exports = {
    uploadResume
};