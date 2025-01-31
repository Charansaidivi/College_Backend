const express = require('express')
const Teacher = require('../model/Teacher') // Changed from Student to Teacher
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.JWT_SECRET;

const teacherRegister = async (req, res) => { // Changed from studentRegister to teacherRegister
    const { teacherName, teacherId, email, password} = req.body;
    try {
        const existingUser = await Teacher.findOne({ email }); // Changed from Student to Teacher
        if (existingUser) {
            return res.status(400).json({ message: "Teacher already exists" }); // Changed message
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Teacher({ teacherName, teacherId, email, password:hashedPassword }); // Changed from Student to Teacher
        await newUser.save();
        res.status(201).json({ message: "Teacher registered successfully" }); // Changed message
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const teacherLogin = async (req, res) => { // Changed from studentLogin to teacherLogin
    const { email, password } = req.body;
    try {
        const user = await Teacher.findOne({ email }); // Changed from Student to Teacher
        console.log("Teacher login:", user) // Changed log message
        if (!user) {
            return res.status(400).json({ message: "Teacher not found" }); // Changed message
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { teacherRegister, teacherLogin }; // Changed exports
