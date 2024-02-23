import { menuService } from "../services/index.js";

const TAG = "controller.menu";

const addMenu = async (req, res, next) => {
  try {
    const result = await menuService.addMenu(req.body);
    res.status(result.status).send({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error(`${TAG} ERROR in addMenu() => ${error.message}`);
    next(error);
  }
};

export { addMenu };
