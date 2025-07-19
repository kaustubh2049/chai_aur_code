import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host:'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user:'xiekaustubh.anr18@gmail.com', // your verified sender
    pass: 'xsmtpsib-b8be5c778ecc5dce242baba86b0ff782f73f5f2fe7dd62b3159f57dee44fcbb2-CYVHTwy2kFmzcQ6L' // new SMTP key here
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP config error:", error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});
