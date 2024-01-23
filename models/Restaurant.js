import mongoose from 'mongoose';

const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // You might want to add validation for email format
  },
  image: {
    type: String,
    // You can add more validation or customization for image links
  },
  rating: {
    type: String, // You might want to change the type based on the actual data type
  },
  rating_count: {
    type: String, // You might want to change the type based on the actual data type
  },
  cost: {
    type: String,
  },
  address: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  lic_no: {
    type: String,
  },
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu',
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
