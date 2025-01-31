const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
  teacherName: { type: String, required: true },
  teacherId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Teachers", teacherSchema);
