const checkResumeLength = (text) => {

    const words = text
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);

    const wordCount = words.length;

    let score = 0;
    const suggestions = [];

    if (wordCount >= 350 && wordCount <= 800) {
        score = 10;
    }
    else if (wordCount >= 250 && wordCount < 350) {
        score = 7;
        suggestions.push(
            "Consider adding more details to strengthen your resume."
        );
    }
    else if (wordCount > 800 && wordCount <= 1000) {
        score = 7;
        suggestions.push(
            "Your resume is slightly long. Consider making it more concise."
        );
    }
    else if (wordCount < 250) {
        score = 3;
        suggestions.push(
            "Your resume is too short. Add more relevant details."
        );
    }
    else {
        score = 3;
        suggestions.push(
            "Your resume is too long. Remove unnecessary information."
        );
    }

    return {
        score,
        maxScore:10,
        wordCount,
        suggestions
    };

};

module.exports = {
    checkResumeLength
};