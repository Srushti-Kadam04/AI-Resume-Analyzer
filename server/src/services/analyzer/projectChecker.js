const checkProjects = (text) => {

    const resumeText = text.toLowerCase();

    let score = 0;
    const suggestions = [];

    // Check if Projects section exists
    if (
        resumeText.includes("projects") ||
        resumeText.includes("project")
    ) {
        score += 8;
    } else {
        suggestions.push("Add a Projects section.");
        return {
            score,
            suggestions
        };
    }

    // Count project titles (simple heuristic)
    const projectTitles = text.match(/\|/g) || [];

    if (projectTitles.length >= 3) {
        score += 6;
    } else if (projectTitles.length >= 2) {
        score += 4;
    } else if (projectTitles.length >= 1) {
        score += 2;
    } else {
        suggestions.push("Include more projects.");
    }

    // Technology keywords
    const techWords = [
        "python",
        "java",
        "javascript",
        "react",
        "node",
        "express",
        "mongodb",
        "mysql",
        "html",
        "css",
        "pytorch",
        "tensorflow",
        "opencv",
        "pandas",
        "numpy",
        "power bi",
        "excel"
    ];

    const found = techWords.filter(skill =>
        resumeText.includes(skill)
    );

    if (found.length >= 5) {
        score += 6;
    } else {
        suggestions.push(
            "Mention technologies used in your projects."
        );
    }

    return {
        score,
        maxScore:20,
        suggestions
    };

};

module.exports = {
    checkProjects
};