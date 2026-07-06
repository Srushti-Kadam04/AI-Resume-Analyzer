const checkAchievements = (text) => {

    const resumeText = text.toLowerCase();

    let score = 0;
    const suggestions = [];

    // Strong action verbs
    const actionVerbs = [
        "developed",
        "designed",
        "implemented",
        "created",
        "built",
        "improved",
        "optimized",
        "led",
        "managed",
        "collaborated",
        "organized",
        "delivered",
        "achieved",
        "analyzed",
        "integrated",
        "supported",
        "reduced",
        "increased",
        "automated",
        "launched"
    ];

    const matchedVerbs = actionVerbs.filter(word =>
        resumeText.includes(word)
    );

    if (matchedVerbs.length >= 8) {
        score += 10;
    } else if (matchedVerbs.length >= 5) {
        score += 8;
    } else if (matchedVerbs.length >= 3) {
        score += 5;
    } else {
        suggestions.push(
            "Use more action verbs to describe your accomplishments."
        );
    }

    // Numbers and measurable achievements
    const measurablePattern =
        /\b\d+%|\b\d+\+?|\b₹\s?\d+|\$\s?\d+/g;

    const measurableMatches = resumeText.match(measurablePattern);

    if (measurableMatches && measurableMatches.length >= 3) {
        score += 10;
    } else if (measurableMatches && measurableMatches.length >= 1) {
        score += 5;
    } else {
        suggestions.push(
            "Include measurable achievements such as percentages, counts, or results."
        );
    }

    return {
        score,
        maxScore:20,
        suggestions
    };

};

module.exports = {
    checkAchievements
};