const Student = require("../models/student");
const User = require("../models/user");

exports.createStudent = async (req, res) => {
  // Add new student
  const {
    user_name,
    user_id,
    email,
    phone_number,
    role,
    gender,
    country,
    religion,
    birth_place,
    national_id,
    image,
    contact_info,
    student_details,
  } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({
    user_name,
    user_id,
    email,
    password: hashedPassword,
    phone_number,
    role,
    gender,
    country,
    religion,
    birth_place,
    national_id,
    image,
    contact_info,
  });

  const student = await Student.create({
    user_id: user._id,
    ...student_details,
  });

  // Check if the user exists
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.status(201).json({ success: true, data: user, token });
};

// get students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("user_id")
      .populate("department");
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate("user_id")
      .populate("department");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const student = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
