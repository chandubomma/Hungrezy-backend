// app.js

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import initRoutes from "./routes/index.js";
import ErrorHandler from "./middleware/errorHandler.js";

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "https://hungrezy.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());



app.use("/api", initRoutes());

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler);

export default app;
