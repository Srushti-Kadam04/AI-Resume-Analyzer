const checkExperience = (text) => {

    const resumeText = text.toLowerCase();

    let score = 0;
    const suggestions = [];

    // Experience section headings
    const headings = [
        "work experience",
        "professional experience",
        "experience",
        "employment history",
        "career history"
    ];

    const hasExperienceSection = headings.some(heading =>
        resumeText.includes(heading)
    );

    if (!hasExperienceSection) {
        suggestions.push("Add a dedicated Work Experience section.");
        return {
            score,
            suggestions
        };
    }

    // Experience section exists
    score += 10;

    // Company indicators
    const companyWords = [
        "intern",
        "internship",
        "engineer",
        "developer",
        "analyst",
        "manager",
        "consultant",
        "associate",
        "executive"
    ];

    const hasCompanyInfo = companyWords.some(word =>
        resumeText.includes(word)
    );

    if (hasCompanyInfo) {
        score += 5;
    } else {
        suggestions.push("Describe your job title or internship role.");
    }

    // Date patterns
    const datePattern =
        /(19|20)\d{2}|present|current/i;

    if (datePattern.test(resumeText)) {
        score += 5;
    } else {
        suggestions.push("Include employment duration (e.g. 2023–2025).");
    }

    return {
        score,
        maxScore:20,
        suggestions
    };

};

module.exports = {
    checkExperience
};