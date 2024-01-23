import randomstring from 'randomstring';
import { emailService } from '../services';

// Dummy data store for restaurant registration (replace this with a database)
const users = [];

const sendVerificationCode = (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit verification code
  const verificationCode = randomstring.generate({
    length: 6,
    charset: 'numeric',
  });

  // Store the verification code for later verification
  users.push({ email, verificationCode });

  // Send verification code via email
  emailService.sendVerificationEmail(email, verificationCode);

  res.json({ message: 'Verification code sent successfully.' });
};

const verifyCode = (req, res) => {
  const { email, verificationCode } = req.body;

  // Find the stored verification code for the given email
  const storedCode = users.find((entry) => entry.email === email)?.verificationCode;

  if (storedCode && storedCode === verificationCode) {
    res.json({ message: 'Verification successful!' });
  } else {
    res.status(401).json({ error: 'Invalid verification code.' });
  }
};


export {
  sendVerificationCode,
  verifyCode,
}
