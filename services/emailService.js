import nodemailer from 'nodemailer';
import { EMAILADDRESS,EMAILPASSWORDS } from '../constants/emailAdressConstants.js';
import fs from 'fs';


// Read HTML content from the file
const htmlContent = fs.readFileSync('public/EmailVerificationTemplate.html', 'utf-8');

// Create a NodeMailer transporter with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAILADDRESS.Host,
    pass: EMAILPASSWORDS.Host,
  },
});

const notificationTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAILADDRESS.Notification,
      pass: EMAILPASSWORDS.Notification,
    },
  });

export const sendVerificationEmail = (email, verificationCode) => {
  // Create HTML template for the email
  // const htmlTemplate = `
  //   <p>Your verification code for Hungrezy Restaurant Registration is: <strong>${verificationCode}</strong></p>
  // `;

  const emailContent = htmlContent.replace('{verificationCode}', verificationCode);

  // Set up email options
  const mailOptions = {
    from: EMAILADDRESS.Notification,
    to: email,
    subject: 'Hungrezy Verification Code',
    html: emailContent,
  };

  // Send the email
  notificationTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      // Handle error (log, throw, etc.)
    } else {
      console.log('Email sent: ' + info.response);
      // Handle success (log, etc.)
    }
  });
};
