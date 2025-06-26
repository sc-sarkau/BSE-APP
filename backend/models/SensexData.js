const mongoose = require("mongoose");

const sensexSchema = new mongoose.Schema({
    date: Date,
    open: Number,
    close: Number,
});
module.exports = mongoose.model("SensexData", sensexSchema);