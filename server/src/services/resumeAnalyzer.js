const { checkSections } = require("./analyzer/sectionChecker");
const { checkContact } = require("./analyzer/contactChecker");
const { checkExperience } = require("./analyzer/experienceChecker");
const { checkEducation } = require("./analyzer/educationChecker");
const { checkProjects } = require("./analyzer/projectChecker");
const { checkAchievements } = require("./analyzer/achievementChecker");
const { checkCertifications } = require("./analyzer/certificationChecker");
const { checkResumeLength } = require("./analyzer/resumeLengthChecker");
const { calculateScore } = require("./analyzer/scoreCalculator");
const { getResumeStatus } = require("./analyzer/resumeStatus");

const analyzeResume = (resumeText) => {

    const results = [

        checkSections(resumeText),

        checkContact(resumeText),

        checkExperience(resumeText),

        checkEducation(resumeText),

        checkProjects(resumeText),

        checkAchievements(resumeText),

        checkCertifications(resumeText),

        checkResumeLength(resumeText)

    ];

    const analysis = calculateScore(results);

    analysis.status = getResumeStatus(analysis.score);
    analysis.analysisVersion = "Rule-Based v2";

    return analysis;

};

module.exports = {
    analyzeResume
};