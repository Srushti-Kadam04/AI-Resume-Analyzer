import axiosInstance from "./axios";

export const uploadResume = async (file, careerField, targetRole) => {
  try {
    const formData = new FormData();

    formData.append("resume", file);
    formData.append("careerField", careerField);
    formData.append("targetRole", targetRole);

    const response = await axiosInstance.post(
      "/resume/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};