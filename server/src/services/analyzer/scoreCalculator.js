const calculateScore = (results) => {

    let totalScore = 0;
    let maxScore = 0;
    let suggestions = [];

    results.forEach(result => {

        totalScore += result.score;

        // Each checker returns its maximum possible score
        if (result.maxScore) {
            maxScore += result.maxScore;
        }

        if (result.suggestions.length > 0) {
            suggestions.push(...result.suggestions);
        }

    });

    // Remove duplicate suggestions
    suggestions = [...new Set(suggestions)];

    // Normalize to 100
    const normalizedScore =
        Math.round((totalScore / maxScore) * 100);

    return {
        score: normalizedScore,
        suggestions
    };

};

module.exports = {
    calculateScore
};