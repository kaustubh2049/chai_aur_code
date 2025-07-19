import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to the Service",
        text: `Welcome to the greatstack website. Your account has been created successfully with email id: ${email}`,
      });
    } catch (err) {
      console.log("Failed to send welcome email:", err);
    }

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: "Error logging out" });
  }
};

// SEND VERIFICATION OTP
export const sendverifyOTP = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOTP = otp;
    user.verifyOTPexpired = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      text: `Your OTP is ${otp}. Please verify it.`,
    });

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req, res) => {
  const userId = req.user.id; // from middleware
  const { otp } = req.body;
  if (!otp) {
    return res.json({ success: false, message: "Missing OTP" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOTPexpired < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOTPexpired = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
//check if the user id authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//SEND PASSWORD RESET OTP -- CORRECTED
export const sendresetOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOTP = otp;
    user.verifyOTPexpired = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is ${otp}. It will expire in 15 minutes.`,
    });
    return res.json({
      success: true,
      message: "Password reset OTP sent to your email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// reset user password -- CORRECTED
export const resetpassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;
  if (!email || !otp || !newpassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and new password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOTPexpired < Date.now()) {
      return res.json({ success: false, message: "OTP has expired" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.verifyOTP = ""; // Clear OTP after use
    user.verifyOTPexpired = 0; // Clear expiration after use
    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
