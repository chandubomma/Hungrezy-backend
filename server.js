import { PORT } from "./config/index.js";
import {} from "express-async-errors";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/connectDB.js";
import initRoutes from "./routes/index.js";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from "./db/mongoClient.js";
import ErrorHandler from "./middleware/errorHandler.js";
import helmet from "helmet";
import rfs from "rotating-file-stream";
import http from "http";

import { Server } from "socket.io";

const __filename = new URL(import.meta.url).pathname;
// Use import.meta.url to derive __dirname
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173","https://hungrezy.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Handle "new-announcement" event
  socket.on("new-announcement", (data) => {
    // Broadcast the announcement to all clients
    io.emit("announcement", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: "./log",
});

app.use(morgan("combined", { stream: accessLogStream }));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());

// Set up static files middleware
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", initRoutes());

// ERROR HANDLER MIDDLEWARE (Last middleware to use)
app.use(ErrorHandler);

const port = PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await connectToMongoDB();
    httpServer.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
