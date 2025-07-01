const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/sensexdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("connection error", err));

const sensexRoutes = require("./routes/sensex");
const authRoutes = require("./routes/loginAuth");
const importCsvData = require("./importCsvData");

app.use("/api/sensex", sensexRoutes);
app.use("/users", authRoutes);

if (process.env.NODE_ENV !== 'test') {
  importCsvData();
}

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

module.exports = { app, server };
