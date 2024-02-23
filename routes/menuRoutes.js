import express from "express";

import { menuController } from "../controllers/index.js";

const initMenuRoutes = () => {
  const menuRoutes = express.Router();
  menuRoutes.route("/addMenu").post(menuController.addMenu);
  return menuRoutes;
};

export default initMenuRoutes;
