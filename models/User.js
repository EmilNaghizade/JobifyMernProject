import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [20, "Name must be less than 20 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [20, "Last name must be less than 20 characters"],
    default: "lastName",
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: [20, "Location must be less than 20 characters"],
    default: "my city",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
