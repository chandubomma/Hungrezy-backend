import { sendOTP, verifyOTP } from "../controllers/twilioClient.js";
import express from "express";
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { sendVerificationCode, verifyRegistration } from '../controllers/verificationController.js';


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
      return res.status(200).json({user});
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


// Check user existence route
router.get('/checkUser/:mobileNumber', async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const user = await User.findOne({ mobileNumber });

    if (user) {
      // User found, return user data
      res.status(200).json({ user });
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/restaurant/send-verification-code', sendVerificationCode);
router.post('/restaurant/verify-registration', verifyRegistration);

export default router;
