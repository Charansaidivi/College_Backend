const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  rollNo:{type:String,required:true},
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  year:{type:Number,required:true},
  branch:{ type: String, required: true },
  section:{ type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Students", studentSchema);