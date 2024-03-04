import { Review } from "../models/index.js";

const TAG = "service.review";

const sendReviewMessage = async (review) => {
  try {
    const newReview = new Review({
      name: review.name,
      message: review.message,
      rating: review.rating,
    });
    await newReview.save();
    return {
      status: 200,
      message: "Success",
      data: newReview,
    };
  } catch (error) {
    console.error(`${TAG} ERROR in sendReviewMessage() => ${error}`);
    throw error;
  }
};

const getReviewMessages = async () => {
  try {
    const contacts = await Review.find();
    return {
      status: 200,
      message: "Success",
      data: contacts,
    };
  } catch (error) {
    console.error(`${TAG} ERROR in getReviewMessages() => ${error}`);
    throw error;
  }
};

export { sendReviewMessage, getReviewMessages };
