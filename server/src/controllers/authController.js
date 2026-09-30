const bcrypt = require("bcrypt");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {

        // Get data from request body
        const { name, email, password } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save to MongoDB
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const loginUser = async(req,res)=>{
    console.log("Login API Hit");
    console.log(req.body);

    try{
        const{email,password} = req.body;

        //check required fields
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        //find user

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not fount"
            });
        }

        //compare password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message:"Invalid credentials"
            });
        }

        //Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn:"7d"}
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getProfile = async(req,res)=>{
    const user = await User.findById(req.user.id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        success:true,
        user:{
            name:user.name,
            email:user.email,
            createdAt:user.createdAt
        }
    });

};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};