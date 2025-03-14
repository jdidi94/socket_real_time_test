const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const { sequelize } = require("./models/db");
const { Server } = require("socket.io"); // Import Socket.IO Server class

const app = express();
const server = require("http").createServer(app);
app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });

const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from this origin and my frontend port = 5173
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("friends_post", (userId) => {
    console.log("user joined friends_post");
    socket.join(userId);
  });
  socket.on("newPost", (post) => {
    console.log("server received new post", post);
    io.to().emit("sendBack", post);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = server;
