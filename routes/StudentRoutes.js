const express = require("express");
const router = express.Router();
const studentController = require("../controller/StudentController");

router.post("/register", studentController.studentRegister);
router.post("/login", studentController.studentLogin);
router.get("/allStudents",studentController.allStudents);
module.exports = router;