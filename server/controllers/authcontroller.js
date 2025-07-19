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
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to the Service",
      text: `Welcome to the greatstack website. Your account has been created successfully with email id: ${email}`,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.log("Failed to send welcome email:", err);
    }

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
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
//send verification otp to the user's email
export const  sendverifyOTP= async(req,res)=>{
  try {
    const {userId} = req.body
    const user = await userModel.findById(userId);
    if(user.isAccountVerified){
      return res.json({succes:false,message:"account already verfied"})
    }
    const otp =String(Math.floor(100000 + Math.random()*900000));
    user.verifyOTP= otp;
    user.verifyOTPexpired=Date.now()+ 24*60*60*1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: " Account verification OTP",
      text: `your OTP is ${otp}. verfiy it please `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
     return res.json({ success: false, message:error.message });
  }
}
export const verfiyEmail = async (req,res)=> {
  const {userId,otp} = req.body;
  if(!userId || !otp){
    res.json({
      succes:false,message:'missing details'
    })
    try {
      const user = await userModel.findById(userId);
      if(!user){
        return res.json({success:false,message:'user not found'})
      }
      if(user.verifyOTP === '' || user.verifyOTP !== otp){
        return res.json({success:false,message:'invalid otp'})
      }
      if(user.verifyOTPexpired < Date.now()){
        return res.json({success:false,message:' otp expired'})
      }
      user.isAccountVerified = true;
      user.verifyOTP='';
      user.verifyOTPexpired=0;
      await user.save();
      return res.json({success:true,message:'Email verified succesfully'})
      
    } catch (error) {
      return res.json({succes:false,message: error.message})
    }
  }
}