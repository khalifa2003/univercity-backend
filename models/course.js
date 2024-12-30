const mongoose = require("mongoose");

const Course = new mongoose.Schema(
  {
    course_code: { type: String, required: true, unique: true },
    course_name: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

    credits_hours: { type: String, required: true },
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Instructor" }],
    faculty_id: { type: String },

    prerequisites: [{ type: mongoose.Schema.ObjectId, ref: "Course" }],

    term: { type: Number, required: true },
    schedule: {
      day: { type: String },
      time: { type: String },
      location: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", Course);
