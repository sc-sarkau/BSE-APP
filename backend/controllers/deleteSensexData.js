const SensexData = require("../models/SensexData");

async function handleDeleteSensexData(req, res) {
  try {
    const result = await SensexData.deleteMany({});
    res.status(200).json({ message: "All data deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
}

async function handleDeleteSensexDataById(req, res) {
  try {
    const result = await SensexData.findByIdAndDelete(req.params.id);

    const io = req.app.get("io");
    io.emit("data-deleted", result);
    res.status(200).json({ message: "Data deleted", result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
}

module.exports = {
  handleDeleteSensexData,
  handleDeleteSensexDataById,
};
