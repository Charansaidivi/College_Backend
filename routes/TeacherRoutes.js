const express = require("express");
const router = express.Router();
const teacherController = require("../controller/TeacherController");

router.post("/register", teacherController.teacherRegister);
router.post("/login", teacherController.teacherLogin);
module.exports = router;
