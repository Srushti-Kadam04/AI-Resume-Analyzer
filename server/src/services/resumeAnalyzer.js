const analyzeResume = (text) => {

    let score = 0;
    const suggestions = [];

    const resumeText = text.toLowerCase();

    // Professional Summary
    if (resumeText.includes("summary") || resumeText.includes("professional summary")) {
        score += 15;
    } else {
        suggestions.push("Add a Professional Summary section.");
    }

    // Skills
    if (resumeText.includes("skills") || resumeText.includes("technical skills")) {
        score += 20;
    } else {
        suggestions.push("Add a Technical Skills section.");
    }

    // Education
    if (resumeText.includes("education")) {
        score += 15;
    } else {
        suggestions.push("Add an Education section.");
    }

    // Projects
    if (resumeText.includes("projects")) {
        score += 20;
    } else {
        suggestions.push("Add a Projects section.");
    }

    // Experience
    if (resumeText.includes("experience") || resumeText.includes("work experience")) {
        score += 15;
    } else {
        suggestions.push("Add a Work Experience section.");
    }

    // Contact Information
    const hasEmail = /\S+@\S+\.\S+/.test(text);
    const hasPhone = /\d{10}/.test(text.replace(/\D/g, ""));

    if (hasEmail && hasPhone) {
        score += 15;
    } else {
        suggestions.push("Include both a valid email and phone number.");
    }

    return {
        score,
        suggestions
    };
};

module.exports = {
    analyzeResume
};