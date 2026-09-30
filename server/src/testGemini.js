require("dotenv").config();

const {
  analyzeResumeWithGemini,
} = require("./services/geminiAnalyzer");

const test = async () => {
  try {
    const result = await analyzeResumeWithGemini(
      `
      Python developer with experience in machine learning,
      TensorFlow, Pandas and Flask.
      Built several ML projects.
      `,
      "Technology",
      "AI Engineer"
    );

    console.log(
      JSON.stringify(result, null, 2)
    );

  } catch (error) {
    console.error("Gemini Error:", error);
  }
};

test();