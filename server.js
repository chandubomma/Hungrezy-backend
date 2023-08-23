import dotenv from "dotenv";
dotenv.config();
import {} from "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js"

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
