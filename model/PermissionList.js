const mongoose = require('mongoose');

// Define the Permission schema
const permissionSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', // Reference to the Teacher model
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

// Create the Permission model
const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
