const mongoose = require("mongoose");

const Course = new mongoose.Schema(
  {
    course_code: { type: String, required: true, unique: true },
    course_name: { type: String, required: true, unique: true },
    course_description: { type: String },
    credits_hours: { type: String, required: true },
    instructor_id: { type: mongoose.Schema.ObjectId, ref: "Instructor" },
    faculty_id: { type: String },
    prerequisites: [String],
    term: { type: Number, required: true },
    schedule: {
      day: { type: String },
      time: { type: String },
      location: { type: String },
    },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Course", courseSchema);
