const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    user_name: { type: String, required: true },
    role: { type: String, enum: ["Student", "Instructor"], required: true },
    password: {
      type: String,
      required: [true, "Password Required"],
      minlength: [6, "Too Short Password"],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,

    active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    
    user_info: {
      address: {
        city: String,
        country: String,
        address: String,
      },

      religion: { type: String },
      birth_place: { type: String },
      national_id: { type: String, unique: true },
      image: { type: String },
      birth_date: { type: Date, required: true },
      phone: { type: String },
      gender: { type: String, enum: ["Male", "Female"] },
      email: { type: String, required: true, unique: true },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", UserSchema);
