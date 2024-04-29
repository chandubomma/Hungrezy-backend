import { passwordUtils, authUtils } from "../utils/index.js";
import { emailService } from "./index.js";
import { User, Restaurant, Admin, UserVerification } from "../models/index.js";
import * as Constants from "../constants/userRoleConstants.js";
import { getOrSetCache } from "../redis/getOrSetCache.js";
import client from "../redis/client.js";

const signin = async (payload) => {
  const { email, password } = payload;
  try {
    const cachedUser = await getOrSetCache(`user-${email}`, async () => {
      const user = await User.findOne({ email });
      return user;
    });
    if (!cachedUser) {
      return {
        status: 400,
        message: "User not found! Please Signup first",
      };
    }
    if (cachedUser.status !== "active") {
      return {
        status: 400,
        message: `Your account is ${cachedUser.status}! Please contact admin for more details.`,
      };
    }
    if (
      !(await passwordUtils.comparePasswords(cachedUser.password, password))
    ) {
      return {
        status: 400,
        message: "Incorrect Password! Please try again.",
      };
    }
    const accessToken = await authUtils.generateAccessToken({
      id: cachedUser.email,
      user_role: Constants.USER_ROLE,
      user: cachedUser,
    });
    const refreshToken = await authUtils.generateRefreshToken({
      user: cachedUser,
    });
    const token = {
      accessToken,
      refreshToken,
      user: cachedUser,
    };
    return {
      status: 200,
      message: "Sign in Successful!",
      token,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

const signinSendOtp = async (payload) => {
  const { email, user_role } = payload;
  try {
    let user;
    if (user_role == Constants.USER_ROLE) user = await User.findOne({ email });
    else if (user_role == Constants.USER_ROLE_RESTAURANT)
      user = await Restaurant.findOne({ email });
    else if (user_role == Constants.USER_ROLE_ADMIN)
      user = await Admin.findOne({ email });
    if (!user) {
      return {
        status: 400,
        message: "User not found! Please Signup first",
      };
    }
    if (user.status !== "active") {
      return {
        status: 400,
        message: `Your account is ${user.status}! Please contact admin for more details.`,
      };
    }

    const verificationCode = passwordUtils.generateRandomOTP(6);
    let userVerification = await UserVerification.findOne({ email, user_role });
    if (userVerification) {
      userVerification.otp = verificationCode;
    } else {
      userVerification = new UserVerification({
        email,
        user_role,
        otp: verificationCode,
      });
    }
    await userVerification.save();
    await emailService.sendVerificationEmail(email, verificationCode);
    return {
      status: 200,
      message: "Verification code sent successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

const signinVerifyOtp = async (payload) => {
  const { email, user_role, verificationCode } = payload;
  try {
    const userVerification = await UserVerification.findOne({ email });
    if (userVerification && userVerification.otp === verificationCode) {
      let user;
      if (user_role == Constants.USER_ROLE)
        user = await User.findOne({ email });
      else if (user_role == Constants.USER_ROLE_RESTAURANT)
        user = await Restaurant.findOne({ email });
      else if (user_role == Constants.USER_ROLE_ADMIN)
        user = await Admin.findOne({ email });
      const accessToken = await authUtils.generateAccessToken(
        { id: email, user_role: user_role, user },
        "1h"
      );
      const refreshToken = await authUtils.generateRefreshToken({ user });
      const token = {};
      token.accessToken = accessToken;
      token.refreshToken = refreshToken;
      token.user = user;
      return {
        status: 200,
        message: "Sign in Successfull!",
        token: token,
      };
    } else {
      return {
        status: 401,
        message: "Invalid verification code",
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const signup = async (payload) => {
  const { email, password, lastName, firstName, mobileNumber, accessToken } =
    payload;
  try {
    const decode = await authUtils.verifyJWT(accessToken);
    if (decode) {
      const hashPassword = await passwordUtils.hashPassword(password);
      const temp = {
        email,
        firstName,
        lastName,
        mobileNumber,
        password: hashPassword,
      };
      let user = new User(temp);
      await user.save();
      const accessToken = await authUtils.generateAccessToken({
        id: user.email,
        user_role: Constants.USER_ROLE,
        user,
      });
      const refreshToken = await authUtils.generateRefreshToken({ user });
      const token = {};
      token.accessToken = accessToken;
      token.refreshToken = refreshToken;
      token.user = user;
      return {
        status: 200,
        message: "Sign up successfull!",
        token: token,
      };
    } else {
      return {
        message: "Signup failed! Please try again.",
        status: 400,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const restaurantSignin = async (payload) => {
  const { email, password } = payload;
  try {
    const cachedRestaurant = await getOrSetCache(`restaurant-${email}`, async () => {
      const restaurant = await Restaurant.findOne({ email });
      return restaurant;
    });
    if (!cachedRestaurant) {
      return {
        status: 400,
        message: "Restaurant not found! Please Signup first",
      };
    }
    if (cachedRestaurant.status !== "approved") {
      return {
        status: 400,
        message: `Your account is ${cachedRestaurant.status}! Please contact admin for more details.`,
      };
    }

    if (
      !(await passwordUtils.comparePasswords(
        cachedRestaurant.password,
        password
      ))
    ) {
      return {
        message: "Incorrect Password! Please try again.",
        status: 400,
      };
    }
    const accessToken = await authUtils.generateAccessToken({
      id: cachedRestaurant.email,
      user_role: Constants.USER_ROLE_RESTAURANT,
      user: cachedRestaurant,
    });
    const refreshToken = await authUtils.generateRefreshToken({
      cachedRestaurant,
    });
    const token = {};
    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    token.user = cachedRestaurant;
    return {
      status: 200,
      message: "Sign in Successfull!",
      token: token,
    };
  } catch (error) {
    console.error(error);
  }
};

const restaurantSignup = async (payload) => {
  const { email, password, name, accessToken } = payload;
  try {
    const decode = await authUtils.verifyJWT(accessToken);
    if (decode) {
      const hashPassword = await passwordUtils.hashPassword(password);
      const temp = {
        email,
        name,
        password: hashPassword,
      };
      let restaurant = new Restaurant(temp);
      await restaurant.save();
      const accessToken = await authUtils.generateAccessToken({
        id: restaurant.email,
        user_role: Constants.USER_ROLE_RESTAURANT,
        user: restaurant,
      });
      const refreshToken = await authUtils.generateRefreshToken({ restaurant });
      const token = {};
      token.accessToken = accessToken;
      token.refreshToken = refreshToken;
      token.user = restaurant;
      return {
        status: 200,
        message: "Sign up successfull!",
        token: token,
      };
    } else {
      return {
        message: "Signup failed! Please try again.",
        status: 400,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: error,
    };
  }
};

const adminSignin = async (payload) => {
  const { email, password } = payload;
  try {
    const cachedAdmin = await getOrSetCache(`admin-${email}`, async () => {
      const admin = await Admin.findOne({ email });
      return admin;
    });
    if (!cachedAdmin) {
      return {
        status: 400,
        message: "Admin not found! Please Signup first",
      };
    }
    if (!cachedAdmin.active) {
      return {
        message: "This account is not active!",
        status: 400,
      };
    }
    // if(!await passwordUtils.comparePasswords(admin.password,password)){
    //     return{
    //         message: 'Incorrect Password! Please try again.',
    //         status: 400,
    //     }
    // }
    const accessToken = await authUtils.generateAccessToken({
      id: cachedAdmin.email,
      user_role: cachedAdmin.superAdmin
        ? Constants.USER_ROLE_SUPERADMIN
        : Constants.USER_ROLE_ADMIN,
      user: cachedAdmin,
    });
    const refreshToken = await authUtils.generateRefreshToken({ cachedAdmin });
    const token = {};
    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    token.user = cachedAdmin;
    return {
      status: 200,
      message: "Sign in Successfull!",
      token: token,
    };
  } catch (error) {
    console.error(error);
  }
};

const adminSignup = async (payload) => {
  const {
    email,
    password,
    lastName,
    firstName,
    superAdmin,
    //   accessToken,
  } = payload;
  try {
    // const decode = await authUtils.verifyJWT(accessToken);
    // if(decode){
    // const hashPassword = await passwordUtils.hashPassword(password)
    const temp = {
      email,
      firstName,
      lastName,
      password,
      superAdmin,
    };
    let admin = new Admin(temp);
    await admin.save();
    const accessToken = await authUtils.generateAccessToken({
      id: admin.email,
      user_role: superAdmin
        ? Constants.USER_ROLE_SUPERADMIN
        : Constants.USER_ROLE_ADMIN,
      user: admin,
    });
    const refreshToken = await authUtils.generateRefreshToken({ admin });
    const token = {};
    token.accessToken = accessToken;
    token.refreshToken = refreshToken;
    token.user = admin;
    return {
      status: 200,
      message: "Sign up successfull!",
      token: token,
    };
    // }else{
    //     return {
    //         message: 'Signup failed! Please try again.',
    //         status: 400,
    //     };
    // }
  } catch (error) {
    console.error(error);
  }
};

export {
  signin,
  signup,
  restaurantSignup,
  restaurantSignin,
  adminSignin,
  adminSignup,
  signinSendOtp,
  signinVerifyOtp,
};
