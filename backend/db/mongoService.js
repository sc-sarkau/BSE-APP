const {
  handleDeleteSensexData,
  handleDeleteSensexDataById,
} = require("../controllers/deleteSensexData");
const {
  handleGetSensexData,
  handleGetSensexDataById,
} = require("../controllers/fetchSensexData");
const {
  handleUpdateData,
  handleAddNewData,
} = require("../controllers/updateSensexData");

async function find(req, res) {
  return handleGetSensexData(req, res);
}

async function findByID(req, res) {
  return handleGetSensexDataById(req, res);
}

async function update(req, res) {
  return handleUpdateData(req, res);
}

async function add(req, res) {
  return handleAddNewData(req, res);
}

async function deleteAll(req, res) {
  return handleDeleteSensexData(req, res);
}

async function deleteById(req, res) {
  return handleDeleteSensexDataById(req, res);
}
module.exports = {
  find,
  findByID,
  add,
  update,
  deleteAll,
  deleteById,
};
