// File: pages/api/send-email.js

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to_email, message } = req.body;

  if (!to_email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // Configure transporter using your Gmail account
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_PASS, // your Gmail app password
      },
    });

    const mailOptions = {
      from: `"Hospital Auth" <${process.env.GMAIL_USER}>`,
      to: to_email,
      subject: "Doctor Login Verification Code",
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ message: "Email failed to send" });
  }
}
