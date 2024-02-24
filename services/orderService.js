import { Order } from "../models/index.js";
import { dbUtils } from "../utils/index.js";

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


  const getUserOrders = async (user_id,status) => {
    if(!status)return{
        status :400,
        message : 'Status query required!'
    }
    const ObjectId = dbUtils.stringToObjectId(user_id);
    let filter = {}
    if(status=='all')filter.userId = ObjectId
    else {
        filter.userId = ObjectId;
        filter.status = status;
    }
    try {
      const orders = await Order.find(filter)
      return {
        status : 200,
        message : 'User orders HIT!',
        data : orders
      }
    } catch (error) {
      console.error(`${TAG} ERROR in getUserOrders() => ${error}`);
      throw(error)
    }
  };

  const getRestaurantOrders = async (restaurant_id,status,customerId) => {
    if(!status)return{
        status :400,
        message : 'Status query required!'
    }
    const ObjectId = dbUtils.stringToObjectId(restaurant_id);
    let filter = {}
    if(status=='all')filter.restaurantIdId = ObjectId
    else {
        filter.restaurantId = ObjectId;
        filter.status = status;
    }
    if(customerId)filter.userId = dbUtils.stringToObjectId(customerId);
    try {
      const orders = await Order.find(filter)
      return {
        status : 200,
        message : 'Restaurant orders HIT!',
        data : orders
      }
    } catch (error) {
      console.error(`${TAG} ERROR in getRestaurantOrders() => ${error}`);
      throw(error)
    }
  };


  export {
    placeOrder,
    getUserOrders,
    getRestaurantOrders,
  }