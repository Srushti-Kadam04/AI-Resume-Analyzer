const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
    try {

        const resume = await Resume.create({
            user: req.user.id,
            fileName: req.file.filename,
            fileUrl: req.file.path
        });

        res.status(201).json({
            success: true,
            message: "Resume uploaded and saved successfully",
            resume
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