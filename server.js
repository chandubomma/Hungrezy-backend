import dotenv from "dotenv";
dotenv.config();
import {} from "express-async-errors";
import express from "express";
import cors  from 'cors';
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/connectDB.js"
import restaurant from './routes/restaurant.js'



const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/restaurants', restaurant);

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
