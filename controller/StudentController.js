const express = require('express')
const Student= require('../model/Student')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.JWT_SECRET;
const studentRegister = async (req, res) => {
    const { rollNo,username, email, password,year,branch,section} = req.body;
    try {
        const existingUser = await Student.findOne({rollNo});
        if (existingUser) {
            return res.status(400).json({ message: "Student already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Student({ rollNo,username, email, password: hashedPassword,year,branch,section });
        await newUser.save();
        res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const studentLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Student.findOne({ email });
        console.log("Studentlogin:",user)
        if (!user) {
            return res.status(400).json({ message: "Student not found" });
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

const allStudents = async (req, res) => {
    try {
        const students = await Student.find(); // Fetch all students from the database
        res.status(200).json(students); // Return the list of students
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { studentRegister, studentLogin, allStudents };
