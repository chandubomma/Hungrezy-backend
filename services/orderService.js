import { Order } from "../models/index.js";

const TAG = 'service.order';

const placeOrder = async (payload) => {
    try {
      const { userId, restaurantId, foodItems, address, paymentDetails } = payload;
      const order = new Order({
        userId,
        restaurantId,
        foodItems,
        address,
        paymentDetails,
        orderedAt: new Date(),
        status: 'placed', 
      });
      await order.save();
      return {
        status : 200,
        message : 'order placed!',
        data : order
      }
    } catch (error) {
      console.error(`${TAG} ERROR in placeOrder() => ${error}`);
      throw(error)
    }
  };


  export {
    placeOrder,
  }