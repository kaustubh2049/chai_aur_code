import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER, // should be your Brevo verified email
    pass: process.env.SMTP_PASSWORD, // the SMTP key
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP config error:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});

export default transporter;
