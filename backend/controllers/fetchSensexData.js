const SensexData = require("../models/SensexData");

async function handleGetSensexData(req, res) {
  try {
    const data = await SensexData.find().sort({ date: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function handleGetSensexDataById(req, res) {
  try {
    const data = await SensexData.findById(req.params.id);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handleGetSensexData,
  handleGetSensexDataById,
};
