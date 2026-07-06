const checkContact = (text) => {

    let score = 0;
    const suggestions = [];

    // Email
    const hasEmail = /\S+@\S+\.\S+/.test(text);

    if (hasEmail) {
        score += 5;
    } else {
        suggestions.push("Add a valid email address.");
    }

    // Phone
    const phone = text.replace(/\D/g, "");

    if (phone.length >= 10) {
        score += 5;
    } else {
        suggestions.push("Add a valid phone number.");
    }

    // LinkedIn
    if (/linkedin\.com/i.test(text)) {
        score += 3;
    } else {
        suggestions.push("Include your LinkedIn profile.");
    }

    // GitHub
    if (/github\.com/i.test(text)) {
        score += 2;
    } else {
        suggestions.push("Include your GitHub profile.");
    }

    return {
        score,
        maxScore:15,
        suggestions
    };

};

module.exports = {
    checkContact
};