const checkSections = (text) => {

    const resumeText = text.toLowerCase();

    let score = 0;
    const suggestions = [];

    // Section definitions
    const sections = [
        {
            names: ["professional summary", "summary", "profile"],
            points: 15,
            suggestion: "Add a Professional Summary section."
        },
        {
            names: ["technical skills", "skills"],
            points: 20,
            suggestion: "Add a Technical Skills section."
        },
        {
            names: ["education"],
            points: 15,
            suggestion: "Add an Education section."
        },
        {
            names: ["projects", "project"],
            points: 20,
            suggestion: "Add a Projects section."
        },
        {
            names: [
                "work experience",
                "professional experience",
                "employment history"
            ],
            points: 15,
            suggestion: "Add a dedicated Work Experience section."
        }
    ];

    sections.forEach(section => {

        const found = section.names.some(name =>
            resumeText.includes(name)
        );

        if (found) {
            score += section.points;
        } else {
            suggestions.push(section.suggestion);
        }

    });

    return {
        score,
        maxScore:70,
        suggestions
    };

};

module.exports = {
    checkSections
};