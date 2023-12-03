import { sendOTP, verifyOTP } from "../controllers/twilioClient.js";
import express from "express";
const router = express.Router();

// Sign-up route
router.post("/signup", (req, res) => {});

// Sign-in route
router.post("/signin", (req, res) => {});

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
