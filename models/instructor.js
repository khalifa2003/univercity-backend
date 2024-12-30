const mongoose = require("mongoose");

const Instructor = new mongoose.Schema(
  {
    instructor_id: { type: Number, required: true, unique: true },

    hire_date: { type: Date },
    salary: { type: Number },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

    // Determine the role of the lecturer => Doctor - Assistant
    role_in_college: {
      type: String,
      enum: ["Doctor", "Assistant"],
      required: true,
    },

    // Subjects taught with absence record
    courses: [
      {
        course_id: { type: mongoose.Schema.ObjectId, ref: "Course" },

        // Attendance
        attendance: [
          {
            student_id: { type: mongoose.Schema.ObjectId, ref: "Student" },
            total_absences: { type: Number, default: 0 },
            attendance_dates: [
              {
                date: { type: Date, required: true },
                status: {
                  type: String,
                  enum: ["Present", "Absent"],
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Instructor", Instructor);
