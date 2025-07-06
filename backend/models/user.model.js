import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // ✅ fixed typo
      trim: true,
    },
    email: {
      type: String,
      required: true, // ✅ fixed typo
      unique: true,
      trim: true,
      match: [/^.+@.+\..+$/, "Please enter a valid email address"], // ✅ fixed regex
    },
    password: {
      type: String,
      required: true, // ✅ fixed typo
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"], // ✅ fixed typo "addmin"
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Password hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ✅ use function() for 'this'
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// ✅ Match user entered password to hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema); // ✅ capitalized "User"

export default User;
