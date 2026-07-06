const pdfParse = require("pdf-parse");
const axios = require("axios");

const extractTextFromPDF = async (pdfUrl) => {
    try {

        // Download the PDF from Cloudinary
        const response = await axios.get(pdfUrl, {
            responseType: "arraybuffer"
        });

        // Extract text from the PDF
        const data = await pdfParse(response.data);

        // Return only the extracted text
        return data.text;

    }catch (error) {
    console.error("===== PDF ERROR =====");
    console.error(error);

    throw error;
}
};

module.exports = {
    extractTextFromPDF 
};