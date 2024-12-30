const mongoose = require("mongoose");

const Student = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },

    // Family information
    family_info: {
      father_name: { type: String },
      job: { type: String },
      town: { type: String },
      address: { type: String },
      home_phone: { type: String },
      self_phone: { type: String },
      email: { type: String },
      fax: { type: String },
    },

    // Recording subjects and grades for each semester
    enrollments: [
      {
        term: { type: Number, required: true },
        courses: [
          {
            course_code: { type: mongoose.Schema.ObjectId, ref: "Course" },
            instructor_id: {
              type: mongoose.Schema.ObjectId,
              ref: "Instructor",
            },
            attendance: [
              { date: Date, status: { type: Number, enum: [0, 1] } },
            ],

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

    // Student Warnings
    warnings: [
      {
        date: { type: Date },
        reason: { type: String },
      },
    ],

    // Fees
    fees: [
      {
        term: { type: Number },
        amount: { type: Number },
        status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
        payment_date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Student", Student);
