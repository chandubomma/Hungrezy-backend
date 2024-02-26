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

  const getOrder = async (req) => {
    const ObjectId = dbUtils.stringToObjectId(req.params.orderId);
    try {
        const order = await Order.findById(ObjectId).populate('userId',"_id firstName lastName");
        if(!order)return {
            status : 404,
            message : "order not found"
        }
        if (req.user_role === 'restaurant' && order.restaurantId.toString() !== req.user_mongo_id)return {
            status : 403,
            message : "Unauthorized access"
        }
        if (req.user_role === 'user' && order.userId.toString() !== req.user_mongo_id)return {
            status : 403,
            message : "Unauthorized access"
        }
        return {
            status : 200,
            message : "Order HIT!",
            data : order
        }

    } catch (error) {
      console.error(`${TAG} ERROR in getOrder() => ${error}`);
      throw(error)
    }
  };

  const updateOrderStatus = async(orderId,status)=>{
   
    try {
        const ObjectId = dbUtils.stringToObjectId(orderId);
        const order = await Order.findById(ObjectId);
        if(!order)return {
            status : 404,
            message : "order not found"
        }
        const currentStatus = order.status;
        if(!checkValidUpdateOrderStatus(currentStatus,status))return {
            status : 400,
            message : "Invalid order status update request"
        }
        order.status = status;
        await order.save();
        return {
            status : 200,
            message : "Order status updated successfully!",
            data : order
        }
        
      } catch (error) {
        console.error(`${TAG} ERROR in updateOrderStatus() => ${error}`);
        throw(error)
      }
  }

  const checkValidUpdateOrderStatus = (currentStatus,status)=>{
    console.log(currentStatus,status)
    if(currentStatus=='placed' && (status=='processing'||status=='delivered'||status=="cancelled"))return true;
    if(currentStatus=='processing' && (status=='delivered'||status=='cancelled'))return true;
    return false;
  }

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
      const orders = await Order.find(filter).populate('restaurantId','_id name')
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


const getRestaurantOrders = async (restaurant_id, status, customerId) => {
    if (!status) 
        return {
            status: 400,
            message: 'Status query required!'
        };
    const ObjectId = dbUtils.stringToObjectId(restaurant_id);
    let filter = {};
    if (status === 'all') {
        filter.restaurantId = ObjectId;
    } else {
        filter.restaurantId = ObjectId;
        filter.status = status;
    }
    if (customerId) {
        filter.userId = dbUtils.stringToObjectId(customerId);
    }
    try {
        const orders = await Order.find(filter)
            .populate('restaurantId', '_id name email') 
            .populate('userId', '_id firstName lastName');
        return {
            status: 200,
            message: 'Restaurant orders HIT!',
            data: orders
        };
    } catch (error) {
        console.error(`${TAG} ERROR in getRestaurantOrders() => ${error}`);
        throw error;
    }
};

const getRestaurantOrderStats = async (restaurant_id) => {
    const ObjectId = dbUtils.stringToObjectId(restaurant_id);
    try {
        const [
            totalOrders,
            newOrders,
            processingOrders,
            deliveredOrders,
            cancelledOrders,
            totalRevenue
          ] = await Promise.all([
            Order.find({ restaurantId:ObjectId }).countDocuments(),
            Order.find({ status: "placed", restaurantId:ObjectId }).countDocuments(),
            Order.find({ status: "processing", restaurantId:ObjectId }).countDocuments(),
            Order.find({ status: "delivered", restaurantId:ObjectId }).countDocuments(),
            Order.find({ status: "cancelled", restaurantId:ObjectId }).countDocuments(),
            Order.aggregate([
              { $match: { restaurantId: ObjectId, status: "delivered" } },
              { $group: { _id: null, totalRevenue: { $sum: "$paymentDetails.amount" } } }
            ])
          ]);
          const stats = {
            totalOrders,
            newOrders,
            processingOrders,
            deliveredOrders,
            cancelledOrders,
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0
          };
          return {
            status : 200,
            message : "Order Stats HIT!",
            data : stats
          };
    } catch (error) {
        console.error(`${TAG} ERROR in getRestaurantOrderStats() => ${error}`);
        throw error;
    }
};




  export {
    placeOrder,
    getUserOrders,
    getRestaurantOrders,
    getOrder,
    updateOrderStatus,
    getRestaurantOrderStats,
  }