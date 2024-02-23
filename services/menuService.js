import { Menu } from "../models/index.js";
import Restaurant from "../models/Restaurant.js";

const TAG = "service.menu";

const addMenu = async (menu) => {
  const { category, name, price, veg_or_non_veg } = menu.menuItem;
  const { restaurantId } = menu;

  try {
    const checkRestaurant = await Restaurant.findOne({ _id: restaurantId });
    let menuId = checkRestaurant.menu_id;

    if (!menuId) {
      const newMenuData = {
        [category]: {
          [name]: { price, veg_or_non_veg, available: true },
        },
      };
      const newMenu = await Menu.create(newMenuData);
      await Restaurant.findByIdAndUpdate(restaurantId, {
        menu_id: newMenu._id,
      });
      return {
        status: 201,
        message: "Menu added successfully",
        data: newMenu,
      };
    }

    const existingMenu = await Menu.findById(menuId);
    if (!existingMenu) {
      return {
        status: 404,
        message: "Menu not found",
      };
    }

    if (existingMenu[category] && existingMenu[category][name]) {
      return {
        status: 400,
        message: "Menu item already exists",
      };
    }

    await Menu.findByIdAndUpdate(
      menuId,
      {
        $set: {
          [`${category}.${name}`]: { price, veg_or_non_veg, available: true },
        },
      },
      { new: true }
    );

    const updatedMenu = await Menu.findById(menuId);

    return {
      status: 200,
      message: "Menu added successfully",
      data: updatedMenu,
    };
  } catch (error) {
    console.error(`${TAG} ERROR in addMenu() => ${error.message}`);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
};

export { addMenu };
