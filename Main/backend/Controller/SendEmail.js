import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import{updateParticipantStatus} from './PaymentController.js';

dotenv.config();

// Create a Nodemailer transporter using your SMTP credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'codeboxp1@gmail.com',
    pass: 'ojtb jgwf kbmt xafh'
  }
});

// Object to store OTPs along with corresponding emails
const otpStore = {};

const SendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  // Generate OTP
  const OTP = randomstring.generate({
    length: 6,
    charset: "numeric",
  });

  var mailOption = {
    from: 'codeboxp1@gmail.com',
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${OTP}`,
  }

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Failed to send email" });
    } else {
      console.log("Email sent successfully");
      // Store the OTP along with the email for verification later
      otpStore[email] = OTP;
      res.status(200).send({ message: "Email sent successfully" });
    }
  })
});

const VerifyOTP = expressAsyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  // Retrieve the OTP corresponding to the email from the otpStore
  const storedOTP = otpStore[email];
  if (!storedOTP) {
    return res.status(400).json({ message: "OTP not found or expired" });
  }

  // Compare the submitted OTP with the stored OTP
  if (otp === storedOTP) {
    // OTP is valid, clear it from the store
    delete otpStore[email];
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

const ResetPassword = expressAsyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  // Check if email exists in the database
  try {
    // Find user by email and OTP
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user's password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(newPassword, salt);
    user.password = secPass;
    await user.save();

    // Respond with success message
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.error('Error confirming OTP and updating password:', error);
    res.status(500).send('Internal server error');
  }
});

const SignUpSucess = expressAsyncHandler(async (req, res) => {
  const { name, email } = req.body;

  var mailOption = {
    from: 'codeboxp1@gmail.com',
    to: email,
    subject: "Welcome to Team Event! Let's get started 🚀",
    text: `Dear ${name},\n\n
          Welcome to Team Event, your ultimate platform for seamless event management! 🎉 We're thrilled to have you join us and excited to simplify your journey through organizing and managing events effortlessly.
          \n
          Thank you for choosing Team Event. Let's make every event a success together!
          \n
          Warm regards,
          [HEMANT K]
          Team Event
          `,
  }

  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "Failed to send email" });
    } else {
      console.log("Email sent successfully");
      res.status(200).send({ message: "Email sent successfully" });
    }
  })
});

const MailtoAll = expressAsyncHandler(async (req,res) =>{
  try {
    // Update participant status and retrieve the updated participant object
    const updatedParticipant = await updateParticipantStatus();

    // Log the updated participant object
    console.log(updatedParticipant);

    // Respond with success message
    res.status(200).json({ message: 'Participant status updated successfully' });
} catch (error) {
    console.error('Error updating participant status:', error);
    res.status(500).json({ message: 'Internal server error' });
}
});

export { SendEmail, VerifyOTP, ResetPassword, SignUpSucess ,MailtoAll};
