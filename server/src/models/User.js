const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }
},
{
    timestamps: true
}
);

const User = mongoose.model("User",userSchema);

module.exports = User;