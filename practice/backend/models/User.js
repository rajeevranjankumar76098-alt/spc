const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,   // 👈 same mobile dobara nahi jaayega
    },
    provider: {
      type: String,
      enum: ["manual", "google", "facebook"],
      default: "manual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
