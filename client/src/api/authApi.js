import axios from "axios";

export const loginUser = async (email, password) => {

    const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
            email,
            password,
        }
    );

    
    return response.data;
    
    localStorage.setItem("token", response.data.token);

};

export const registerUser = async (name, email, password) => {

    const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
            name,
            email,
            password,
        }
    );

    return response.data;
};