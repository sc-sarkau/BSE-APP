const express = require("express");
const router = express.Router();
const SensexData = require("../models/SensexData");
const auth = require("../middleware/auth");
const {
  handleGetSensexData,
  handleGetSensexDataById,
} = require("../controllers/fetchSensexData");
const {
  handleAddNewData,
  handleUpdateData,
} = require("../controllers/updateSensexData");
const {
  handleDeleteSensexData,
  handleDeleteSensexDataById,
} = require("../controllers/deleteSensexData");

router.get("/", auth, handleGetSensexData);

router.get("/:id", auth, handleGetSensexDataById);

router.post("/", auth, handleAddNewData);

router.put("/:id", auth, handleUpdateData);

router.delete("/:id", auth, handleDeleteSensexDataById);

router.delete("/delete-all", auth, handleDeleteSensexData);
module.exports = router;
