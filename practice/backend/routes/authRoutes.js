const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, mobile, provider } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ mobile });
    if (exist) {
      return res.status(400).json({ message: "Mobile already registered" });
    }

    const user = await User.create({ name, mobile, provider });
    res.status(201).json({ success: true, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { mobile } = req.body;

    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

