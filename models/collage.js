const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact_info: {
    phone: { type: String },
    email: { type: String },
  },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("College", CollegeSchema);
