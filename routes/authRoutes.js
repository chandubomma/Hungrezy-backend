import { sendOTP, verifyOTP } from "../controllers/twilioClient.js";
import express from "express";
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  try {
    const userData = req.body;

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({
      mobileNumber: userData.mobileNumber,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    // Find user by mobile number
    const user = await User.findOne({ mobileNumber });

    // If user not found, return authentication failure
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, return success, otherwise return authentication failure
    if (passwordMatch) {
      return res.status(200).json({ message: 'Authentication successful' });
    } else {
      return res.status(401).json({ error: 'Authentication failed. Incorrect password.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/sendOTP", (req, res) => {
  let mobileNumber = req.body.mobileNumber;
  mobileNumber = '+91'+mobileNumber
  sendOTP(mobileNumber).then((status) => {
    console.log(status);
    return res.json({ status });
  });
});

router.post("/verifyOTP", (req, res) => {
  const OTP = req.body.OTP;
  const mobileNumber = '+91'+req.body.mobileNumber;
  verifyOTP(OTP, mobileNumber).then((status) => {
    console.log(status);
    return res.json({ status });
  });
});

export default router;
