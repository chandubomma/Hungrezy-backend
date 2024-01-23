import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuSchema = new Schema({
  items: {
    type: Map,
    of: [{
      name: String,
      price: String,
      veg_or_non_veg: String,
    }],
  },
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
