const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcryptjs"); // Using bcryptjs for better compatibility
const sendEmail = require("../utils/sendEmail"); // Import your gmail utility

// ------------------ REGISTER USER ---------------------------
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role, age, gender, bloodGroup } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create verification token
    const token = crypto.randomBytes(32).toString("hex");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
      age,
      gender,
      bloodGroup,
      verificationToken: token,
      verificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    const verifyURL = `http://localhost:3000/verify/${token}`;

    // HTML Content for the email
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #dce6f7; padding: 20px; border-radius: 10px;">
        <h2 style="color: #1c3faa;">Hello ${fullName},</h2>
        <p>Thank you for registering with <strong>MindEase</strong>. Please verify your email to activate your account:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyURL}" style="background-color: #1c3faa; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email Address</a>
        </div>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${verifyURL}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;">
        <p style="font-size: 12px; color: #777;">If you did not request this, please ignore this email.</p>
      </div>
    `;

    // SEND VERIFICATION EMAIL using your sendEmail utility
    await sendEmail(email, "Verify Your Email - MindEase", htmlMessage);

    res.json({
      message: "Verification email sent! Check your inbox (and spam folder).",
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Registration failed. Check server logs." });
  }
};

// ------------------ VERIFY EMAIL ---------------------------
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    return res.json({ message: "Email verified successfully! You can now login." });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
};

// ------------------ LOGIN ---------------------------
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ message: "Account not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    if (!user.emailVerified) {
      return res.status(400).json({ message: "Please verify your email first. Check your inbox." });
    }

    res.json({
      message: "Login successful",
      fullName: user.fullName,
      role: user.role,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};