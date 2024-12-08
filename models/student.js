const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    student_id: { type: String, required: true, unique: true },
    arabic_name: { type: String, required: true, unique: true },
    english_name: { type: String, required: true, unique: true },
    country: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    religion: { type: String, required: true },
    birth_date: { type: Date, required: true },
    birth_place: { type: String, required: true },
    national_id: { type: String, required: true, unique: true },
    image: { type: String },

    // Family information
    familyInfo: {
      father_name: { type: String },
      job: { type: String },
      town: { type: String },
      address: { type: String },
      home_phone: { type: String },
      self_phone: { type: String },
      email: { type: String },
      fax: { type: String },
    },

    // Contact information
    contact_info: {
      town: { type: String },
      address: { type: String },
      home_phone: { type: String },
      self_phone: { type: String },
      email: { type: String },
      fax: { type: String },
    },

    // Previous qualification data
    previous_education: {
      school_name: { type: String },
      qualification: { type: String },
      graduation_year: { type: String },
      total_grade: { type: Number },
      ratio: { type: Number },
      seat_number: { type: Number, unique: true },
    },

    // Recording subjects and grades for each semester
    enrollments: [
      {
        term: { type: Number, required: true },
        courses: [
          {
            course_code: { type: Number, required: true, unique },
            course_name: { type: String, required: true },
            instructor_id: {
              type: mongoose.Schema.ObjectId,
              ref: "Instructor",
            },
            attendance: {
              present: [{ date: Date, status: { type: Number, enum: [0, 1] } }],
            },
            grades: {
              midterm: { type: Number, default: 0 },
              year_work: { type: Number, default: 0 },
              final_exam: { type: Number, default: 0 },
              total: { type: Number, default: 0 },
            },
            status: {
              type: String,
              enum: ["Registered", "Dropped"],
              default: "Registered",
            },
          },
        ],
      },
    ],

    // Student table
    schedule: [
      {
        day: { type: String },
        time: { type: String },
        course_id: { type: mongoose.Schema.ObjectId, ref: "Course" },
        instructor_id: { type: mongoose.Schema.ObjectId, ref: "Instructor" },
        location: { type: String },
      },
    ],

    // Exam schedule
    exam_schedule: [
      {
        course_id: { type: mongoose.Schema.ObjectId, ref: "Course" },
        date: { type: Date },
        location: { type: String },
      },
    ],

    // Student Warnings
    warnings: [
      {
        date: { type: Date },
        reason: { type: String },
      },
    ],

    // Military training
    military_training: {
      status: {
        type: String,
        enum: ["Completed", "Pending"],
        default: "Pending",
      },
      result: { type: String },
    },

    // Student card
    student_card: {
      card_number: { type: String },
      issue_date: { type: Date },
      expiry_date: { type: Date },
    },

    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    // to enable virtual populate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Student", studentSchema);
