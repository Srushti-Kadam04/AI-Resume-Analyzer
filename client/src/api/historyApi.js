import axiosInstance from "./axios";

export const getResumeHistory = async ()=>{
    try{
        const response = await axiosInstance.get("/resume/history");
        return response.data;
    }catch(error){
        throw error;
    }
};

export const getResumeById = async(resumeId) => {
    try{
        const resume = await axiosInstance.get(
            `/resume/${resumeId}`
        );

        return response.data;
    }catch(error){
        throw error;
    }
};