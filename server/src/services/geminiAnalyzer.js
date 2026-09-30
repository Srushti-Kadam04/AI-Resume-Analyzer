const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PRIMARY_MODEL = "gemini-3.1-flash-lite";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";

// Wait helper
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Check whether Gemini error is temporary/retryable
const isRetryableGeminiError = (error) => {
  const status = Number(
    error?.status ||
    error?.code ||
    error?.statusCode ||
    error?.response?.status
  );

  const message = String(error?.message || "");

  return (
    [408, 429, 500, 502, 503, 504].includes(status) ||
    /503|UNAVAILABLE|RESOURCE_EXHAUSTED|INTERNAL|DEADLINE_EXCEEDED/i.test(
      message
    )
  );
};

// Gemini request with exponential backoff
const generateWithRetry = async (model, prompt, maxRetries = 3) => {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `🤖 Gemini request using ${model} (attempt ${attempt + 1}/${
          maxRetries + 1
        })`
      );

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      return response;
    } catch (error) {
      lastError = error;

      console.error(
        `Gemini error with ${model}:`,
        error?.message || error
      );

      // Do not retry permanent errors
      if (!isRetryableGeminiError(error)) {
        throw error;
      }

      // Stop after final attempt
      if (attempt === maxRetries) {
        break;
      }

      // 2s, 4s, 8s + small random jitter
      const baseDelay = 2000 * Math.pow(2, attempt);
      const jitter = Math.floor(Math.random() * 500);
      const delay = baseDelay + jitter;

      console.log(
        `⏳ Gemini temporarily unavailable. Retrying in ${delay}ms...`
      );

      await sleep(delay);
    }
  }

  throw lastError;
};

const analyzeResumeWithGemini = async (
  resumeText,
  careerField,
  targetRole
) => {
  const prompt = `
You are an expert resume evaluator, ATS specialist, and career coach.

Analyze the following resume specifically for the target career.

Career Field:
${careerField}

Target Role:
${targetRole}

Resume:
${resumeText}

Return ONLY valid JSON.

Use EXACTLY this structure:

{
  "overallScore": 0,
  "atsScore": 0,
  "roleMatchScore": 0,
  "status": "",
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "keywordSuggestions": [],
  "experienceFeedback": [],
  "projectFeedback": [],
  "educationFeedback": [],
  "improvementSuggestions": [],
  "recommendedSkills": []
}

Rules:

1. All scores must be integers between 0 and 100.

2. overallScore:
Give an overall evaluation of the resume.

3. atsScore:
Evaluate ATS readability, formatting, keywords, sections,
and compatibility with applicant tracking systems.

4. roleMatchScore:
Evaluate how well the resume matches the target role:
${targetRole}

5. strengths:
List the strongest parts of the resume.

6. weaknesses:
List the most important weaknesses.

7. missingSkills:
Identify skills that are relevant to ${targetRole}
but are missing or insufficiently demonstrated.

8. keywordSuggestions:
Suggest important keywords that could improve the resume
for ${targetRole}.

9. experienceFeedback:
Evaluate the candidate's experience.
Do not invent experience.

10. projectFeedback:
Evaluate projects and their relevance to ${targetRole}.
Do not invent projects.

11. educationFeedback:
Evaluate education, certifications and relevant learning.

12. improvementSuggestions:
Give practical and specific improvements.

13. recommendedSkills:
Recommend skills that would help the candidate become
stronger for ${targetRole}.

14. Do not invent jobs, companies, degrees, certifications,
projects, achievements or experience.

15. Base the analysis only on the resume content and the
requirements of the target role.

16. Status must be one of:
"Excellent"
"Good"
"Needs Improvement"
"Poor"

Use this score mapping:

80-100 = Excellent
60-79 = Good
40-59 = Needs Improvement
0-39 = Poor

Return JSON only.
Do not include markdown.
Do not include explanations outside JSON.
`;

  try {
    let response;

    // --------------------------------------------------
    // 1. Try primary model with retries
    // --------------------------------------------------
    try {
      response = await generateWithRetry(
        PRIMARY_MODEL,
        prompt,
        3
      );
    } catch (primaryError) {
      console.error(
        `❌ Primary model failed: ${PRIMARY_MODEL}`
      );

      console.error(
        primaryError?.message || primaryError
      );

      // --------------------------------------------------
      // 2. Try fallback model
      // --------------------------------------------------
      console.log(
        `🔄 Trying fallback model: ${FALLBACK_MODEL}`
      );

      response = await generateWithRetry(
        FALLBACK_MODEL,
        prompt,
        2
      );
    }

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    console.log("✅ Gemini response received.");

    const cleanedResponse = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("❌ Gemini returned invalid JSON:");
      console.error(cleanedResponse);

      throw new Error("Gemini returned invalid JSON.");
    }

    // --------------------------------------------------
    // Ensure arrays always exist
    // --------------------------------------------------

    analysis.strengths = analysis.strengths || [];

    analysis.weaknesses = analysis.weaknesses || [];

    analysis.missingSkills =
      analysis.missingSkills || [];

    analysis.keywordSuggestions =
      analysis.keywordSuggestions || [];

    analysis.experienceFeedback =
      analysis.experienceFeedback || [];

    analysis.projectFeedback =
      analysis.projectFeedback || [];

    analysis.educationFeedback =
      analysis.educationFeedback || [];

    analysis.improvementSuggestions =
      analysis.improvementSuggestions || [];

    analysis.recommendedSkills =
      analysis.recommendedSkills || [];

    // --------------------------------------------------
    // Ensure scores are numbers
    // --------------------------------------------------

    analysis.overallScore =
      Number(analysis.overallScore) || 0;

    analysis.atsScore =
      Number(analysis.atsScore) || 0;

    analysis.roleMatchScore =
      Number(analysis.roleMatchScore) || 0;

    // --------------------------------------------------
    // Ensure status exists
    // --------------------------------------------------

    if (!analysis.status) {
      if (analysis.overallScore >= 80) {
        analysis.status = "Excellent";
      } else if (analysis.overallScore >= 60) {
        analysis.status = "Good";
      } else if (analysis.overallScore >= 40) {
        analysis.status = "Needs Improvement";
      } else {
        analysis.status = "Poor";
      }
    }

    analysis.analysisVersion = "Gemini AI";

    return analysis;

  } catch (error) {
    console.error("❌ Gemini Analysis Failed:", error);

    throw error;
  }
};

module.exports = {
  analyzeResumeWithGemini,
};