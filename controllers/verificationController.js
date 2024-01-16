import randomstring from 'randomstring';
import { sendVerificationEmail } from '../services/emailService.js';

// Dummy data store for restaurant registration (replace this with a database)
const registeredRestaurants = [];

export const sendVerificationCode = (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit verification code
  const verificationCode = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  // Store the verification code for later verification
  registeredRestaurants.push({ email, verificationCode });

  // Send verification code via email
  sendVerificationEmail(email, verificationCode);

  res.json({ message: 'Verification code sent successfully.' });
};

export const verifyRegistration = (req, res) => {
  const { email, verificationCode } = req.body;

  // Find the stored verification code for the given email
  const storedCode = registeredRestaurants.find((entry) => entry.email === email)?.verificationCode;

  if (storedCode && storedCode === verificationCode) {
    res.json({ message: 'Verification successful!' });
  } else {
    res.status(401).json({ error: 'Invalid verification code.' });
  }
};
