const SensexData = require("../models/SensexData");

async function handleAddNewData(req, res) {
  try {
    const data = new SensexData(req.body);
    const io = req.app.get("io");
    io.emit("data-added", data);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function handleUpdateData(req, res) {
  try {
    const updatedData = await SensexData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }

    const io = req.app.get("io");
    io.emit("data-updated", updatedData);
    res.json(updatedData);
  } catch (error) {
    res.status(400).json({ message: "Error updating data", error });
  }
}

module.exports = {
  handleAddNewData,
  handleUpdateData,
};
