import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import mongoose from "mongoose";
import __dirname from "./utils.js";

import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import userRouter from "./routes/user.router.js";
import viewRouter from "./routes/views.router.js";

import Message from "./dao/models/messages.js";

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

const publics = path.join(__dirname, "./public");

const app = express();

app.use(express.static(publics));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log("Connection Error: ", err);
    return;
  }
  console.log(`Server listening on port ${PORT}`);
});

import { Server } from "socket.io";
const io = new Server(server);
const connection = mongoose.connect(
  "mongodb+srv://juanstillo:abc123abc123@ecommerce.ywig996.mongodb.net/?retryWrites=true&w=majority",
  {
    dbName: "ecommerce",
  }
  );

// chat
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chat message", (message) => {
    console.log("Message received:", message);

    const newMessage = new Message({ text: message });
    newMessage.save();

    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://juanstillo:abc123abc123@ecommerce.ywig996.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 3600,
    }),
    secret: "EcommerceCoderHouse",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
initializePassport();

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", userRouter);
app.use("/", viewRouter);

export default app;
