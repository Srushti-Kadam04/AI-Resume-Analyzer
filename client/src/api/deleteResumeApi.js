import axiosInstance from "./axios";

export const deleteResume = async (resumeId) => {
    try{
        const response = await axiosInstance.delete(`/resume/${resumeId}`);
        return response.data;
    }catch(error){
        throw error;
    }
};