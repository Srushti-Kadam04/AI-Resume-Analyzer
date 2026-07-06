const checkEducation = (text) => {

    const resumeText = text.toLowerCase();

    let score = 0;
    const suggestions = [];

    // Education section heading
    if (
        resumeText.includes("education") ||
        resumeText.includes("academic background")
    ) {
        score += 8;
    } else {
        suggestions.push("Add an Education section.");
    }

    // Degree detection
    const degrees = [
        "bachelor",
        "master",
        "b.tech",
        "be",
        "m.tech",
        "mba",
        "bca",
        "mca",
        "b.sc",
        "m.sc",
        "phd",
        "doctorate",
        "diploma"
    ];

    const hasDegree = degrees.some(degree =>
        resumeText.includes(degree)
    );

    if (hasDegree) {
        score += 6;
    } else {
        suggestions.push("Mention your highest educational qualification.");
    }

    // Graduation year
    const yearPattern = /\b(19|20)\d{2}\b/;

    if (yearPattern.test(resumeText)) {
        score += 6;
    } else {
        suggestions.push("Include your graduation year.");
    }

    return {
        score,
        maxScore:20,
        suggestions
    };

};

module.exports = {
    checkEducation
};