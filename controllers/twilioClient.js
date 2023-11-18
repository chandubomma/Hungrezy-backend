import dotenv from "dotenv";
dotenv.config();

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let serviceId = process.env.TWILIO_SERVICE_ID;
/*
createNewOTPService is the method to create new otp service it generates service sid which is required for sending and verifying otp services.
there is no need to create services every time. one service is enough for all your otp reequests.
use it to change the friendlyname and create new service store service id and use it.
*/

const createNewOTPService = (friendlyName) => {
  client.verify.v2.services
    .create({ friendlyName: friendlyName }) // friendlyName is the text shown along with otp to the user ex:'Your OTP for Hungrezy is'
    .then((service) => console.log(service.sid));
};

// sendOTP return status pending after sending OTP the user mobile.

const sendOTP = async (mobileNumber) => {
  const verification = await client.verify.v2
    .services(serviceId)
    .verifications.create({ to: mobileNumber, channel: "sms" }); // mobile number should be string, format : '+917636888212'

  return verification.status; // change channel for whatsapp or voice verifications.
};

// verifyOTP returns status approved upon successfull OTP verification.

const verifyOTP = async (userEnteredOTP, mobileNumber) => {
  const verification_check = await client.verify.v2
    .services(serviceId)
    .verificationChecks.create({ to: mobileNumber, code: userEnteredOTP });

  return verification_check.status;
};

export { createNewOTPService, sendOTP, verifyOTP };
