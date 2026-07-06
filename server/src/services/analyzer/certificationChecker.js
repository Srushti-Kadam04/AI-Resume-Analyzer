const checkCertifications = (text) => {

    const resumeText = text.toLowerCase();

    let score = 0;
    const suggestions = [];

    const certificationKeywords = [
        "certification",
        "certifications",
        "certified",
        "certificate",
        "coursera",
        "udemy",
        "nptel",
        "oracle",
        "aws",
        "azure",
        "google",
        "microsoft",
        "ibm",
        "cisco",
        "salesforce"
    ];

    const found = certificationKeywords.some(keyword =>
        resumeText.includes(keyword)
    );

    if (found) {
        score = 10;
    } else {
        suggestions.push(
            "Consider adding relevant certifications to strengthen your resume."
        );
    }

    return {
        score,
        maxScore:10,
        suggestions
    };

};

module.exports = {
    checkCertifications
};