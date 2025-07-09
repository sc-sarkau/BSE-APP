const SensexData = require("../models/SensexData");
const { success, error } = require("../utils/responseHandlers");

async function handleGetSensexData(req, res) {
  try {
    const data = await SensexData.find().sort({ date: -1 });
    return success(res, "Data fetched successfully", data);
  } catch (err) {
    return error(res, "Failed to fetch data", 400);
  }
}

async function handleGetSensexDataById(req, res) {
  try {
    const data = await SensexData.findById(req.params.id);

    res.json(data);
  } catch (err) {
    return error(res, "Failed to fetch data", 400);
  }
}

module.exports = {
  handleGetSensexData,
  handleGetSensexDataById,
};
