import { PORT } from "./config/index.js";
import {} from "express-async-errors";
import express from "express";
import cors  from 'cors';
import bodyParser from "body-parser";
import connectDB from "./db/connectDB.js"
import initRoutes from "./routes/index.js";
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectToMongoDB } from "./db/mongoClient.js";
import ErrorHandler from "./middleware/errorHandler.js";


const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Use import.meta.url to derive __dirname
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Set up static files middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api',initRoutes());


// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler)

const port = PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await connectToMongoDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
