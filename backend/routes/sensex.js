const express = require("express");
const router = express.Router();
const SensexData = require("../models/SensexData");
const auth = require("../middleware/auth");
// const {
//   handleGetSensexData,
//   handleGetSensexDataById,
// } = require("../controllers/fetchSensexData");
// const {
//   handleAddNewData,
//   handleUpdateData,
// } = require("../controllers/updateSensexData");
// const {
//   handleDeleteSensexData,
//   handleDeleteSensexDataById,
// } = require("../controllers/deleteSensexData");
const {
  find,
  findById,
  add,
  update,
  deleteAll,
  deleteById,
} = require("../db/masterDBService");

router.get("/", auth, find);

router.get("/:id", auth, findById);

router.post("/", auth, add);

router.put("/:id", auth, update);

router.delete("/delete-all", auth, deleteAll);

router.delete("/:id", auth, deleteById);

module.exports = router;
