const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.send("AI Resume Analyzer Backend is Running...");
});

module.exports = app;