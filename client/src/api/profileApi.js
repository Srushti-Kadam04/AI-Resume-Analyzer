import axiosInstance from "./axios";

export const getProfile = async () => {
    try{
        const response = await axiosInstance.get("/auth/profile");
        return response.data;

    }catch(error){
        throw error;
    }

};