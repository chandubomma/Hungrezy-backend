import { Admin } from "../models/index.js";
import { dbUtils } from "../utils/index.js";

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

const setActive = async (id,active) => {
    const ObjectId = dbUtils.stringToObjectId(id);
    try {
      const admin = await Admin.findById(ObjectId);
      admin.active=active;
      await admin.save();
      return {
        status: 200,
        message: "Success",
        data: admin,
      };
    } catch (error) {
      console.error(`${TAG} ERROR in setActive() => ${error}`);
      throw(error);
    }
  };


export {
    getAdmins,
    setActive,
}