import axiosInstance from "./axios";

export const saveResume = async (resumeData) => {
  try {
    const response = await axiosInstance.post(
      "/resume/save",
      resumeData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};