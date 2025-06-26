const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/sensexdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("connection error", err));


const sensexRoutes = require('./routes/sensex');
app.use('/api/sensex', sensexRoutes);

const authRoutes = require('./routes/loginAuth');
app.use('/users', authRoutes);

const importCsvData = require('./importCsvData');

importCsvData();

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});