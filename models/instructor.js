const mongoose = require("mongoose");

const Instructor = new mongoose.Schema(
  {
    instructor_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String },
    hire_date: { type: Date },
    salary: { type: Number },
    department: { type: String },

    // Determine the role of the lecturer => Doctor - Assistant
    role: {
      type: String,
      enum: ["Assistant", "Doctor"],
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
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
