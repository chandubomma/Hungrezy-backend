import { Admin } from "../models/index.js";

const TAG = "service.admin";

const getAdmins = async () => {
  try {
    const admins = await Admin.find({});
    return {
      status: 200,
      message: "Get Admins Successful!",
      data: admins,
    };
  } catch (error) {
    console.error(`${TAG} ERROR in getAdmins() => ${error}`);
    throw(error);
  }
};


export {
    getAdmins,
}