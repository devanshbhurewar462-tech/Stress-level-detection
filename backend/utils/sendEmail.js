const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MindEase Support" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent, // This must be 'html' not 'text'
    });

    console.log("✅ Verification email sent to:", to);
  } catch (error) {
    console.error("❌ Nodemailer Error:", error);
    throw error; // Throwing error so register function catches it
  }
};

module.exports = sendEmail;