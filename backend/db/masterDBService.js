const mongoService = require("./mongoService");
const postgresService = require("./postgresService");

const dbType = process.env.DB_TYPE || "mongo";

let activeService;

if (dbType === "postgres") {
  activeService = postgresService;
  console.log("[DB] Using PostgreSQL");
} else {
  activeService = mongoService;
  console.log("[DB] Using MongoDB");
}

module.exports = {
  create: async (data) => activeService.create(data),
  find: async (req, res) => activeService.find(req, res),
  findById: async (req, res) => activeService.findById(req, res),
  add: async (req, res) => activeService.add(req, res),
  update: async (req, res) => activeService.update(req, res),
  deleteAll: async (req, res) => activeService.deleteAll(req, res),
  deleteById: async (req, res) => activeService.deleteById(req, res),
};
