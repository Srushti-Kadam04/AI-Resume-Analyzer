const getResumeStatus = (score) => {

    if (score >= 90) {
        return "Excellent";
    }

    if (score >= 75) {
        return "Good";
    }

    if (score >= 60) {
        return "Average";
    }

    return "Needs Improvement";
};

module.exports = {
    getResumeStatus
};