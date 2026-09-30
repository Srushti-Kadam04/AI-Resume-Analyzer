const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadResume,
  getResumeHistory,
  getResumeById,
  deleteResume,
} = require("../controllers/resumeController");

// Upload + analyze + save resume
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// Get user's resume history
router.get(
  "/history",
  authMiddleware,
  getResumeHistory
);

// Get a single user's resume with complete analysis
router.get(
  "/:id",
  authMiddleware,
  getResumeById
);

// Delete user's resume
router.delete(
  "/:id",
  authMiddleware,
  deleteResume
);

module.exports = router;