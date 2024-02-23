const newMenuData = {
  Biryanis: {
    "Chicken Dum Biryani": { price: "200", veg_or_non_veg: "Non-veg" },
    "Mutton Dum Biryani": { price: "220", veg_or_non_veg: "Non-veg" },
  },
  "Non Veg Meal": {
    "Bagara Rice and Chicken Curry": {
      price: "200",
      veg_or_non_veg: "Non-veg",
    },
    "Bagara Rice and Chicken Fry": { price: "220", veg_or_non_veg: "Non-veg" },
    "Bagara Rice and Mutton Biryani": {
      price: "250",
      veg_or_non_veg: "Non-veg",
    },
  },
  // Add more categories and items as needed
};

const newMenu = new Menu(newMenuData);

// Save the new menu to the database
newMenu
  .save()
  .then((result) => {
    console.log("New menu added successfully:", result);
  })
  .catch((error) => {
    console.error("Error adding new menu:", error);
  });
