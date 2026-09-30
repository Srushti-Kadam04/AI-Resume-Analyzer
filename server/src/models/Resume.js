const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    careerField: {
      type: String,
      required: true,
    },

    targetRole: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    roleMatchScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      required: true,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    keywordSuggestions: {
      type: [String],
      default: [],
    },

    experienceFeedback: {
      type: [String],
      default: [],
    },

    projectFeedback: {
      type: [String],
      default: [],
    },

    educationFeedback: {
      type: [String],
      default: [],
    },

    improvementSuggestions: {
      type: [String],
      default: [],
    },

    recommendedSkills: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);