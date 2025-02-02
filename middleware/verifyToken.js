const Teacher = require('../model/Teacher')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
dotEnv.config()
const secretKey = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
    const token = req.header('token');
    console.log("Received token:", token);
    
    if (!token) {
      return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      const teacher = await Teacher.findById(decoded.teacherId);
      console.log("Found teacher:", teacher);
      
      if (!teacher) {
        console.log("Teacher not found in database");
        return res.status(401).json({ msg: 'Teacher not found.' });
      }
      
      req.teacherId = teacher._id;
      // req.teacher = teacher;
      console.log("Setting teacherId:", req.teacherId);
      console.log("Middleware completed successfully");
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401).json({ msg: 'Invalid token.' });
    }
  };
  
  module.exports = verifyToken;