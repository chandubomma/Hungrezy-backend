import express from "express";
import * as validations from "../middleware/validations/reviewValidation.js";
import { reviewController } from "../controllers/index.js";

const initReviewRoutes = () => {
  const reviewRoutes = express.Router();
  reviewRoutes
    .route("/")
    .post(validations.sendReviewMessage, reviewController.sendReviewMessage);
  reviewRoutes.route("/").get(reviewController.getReviewMessages);
  return reviewRoutes;
};

export default initReviewRoutes;
