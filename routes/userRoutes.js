// routes/userRoutes.js
import express from "express";
const router = express.Router();

import User from "../models/User.js";

// Route to update user details
router.put("/updateDetails", async (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  const updates = req.body.updates;

  try {
    // Find the user by email
    const user = await User.findOne({ mobileNumber: mobileNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    user.updateDetails(updates);

    res.status(200).json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
