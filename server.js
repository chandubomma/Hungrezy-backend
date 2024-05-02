// server.js

import { PORT } from "./config/index.js";
import http from "http";
import app from "./app.js"; // Make sure the path is correct
import {  connectToMongoDB } from "./db/mongoClient.js";
import { Server } from "socket.io";

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://hungrezy.vercel.app"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("new-announcement", (data) => {
    io.emit("announcement", data);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = PORT || 3000;

const start = async () => {
  try {
    //await connectDB();
    await connectToMongoDB();
    httpServer.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
