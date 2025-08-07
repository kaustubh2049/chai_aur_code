import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransporter({
  host:'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER, // your verified sender
    pass: process.env.SMTP_PASSWORD // SMTP key from environment variables
  },
});emailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user:'', // your verified sender
    pass: '' // new SMTP key here
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP config error:", error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});
