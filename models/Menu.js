import { Schema, model } from "mongoose";

const MenuSchema = new Schema({}, { strict: false });

const Menu = model("Menu", MenuSchema);

export default Menu;
