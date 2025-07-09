const pool = require("../config/postgres");

module.exports = {
  //   async create(data) {
  //     const result = await pool.query(
  //       'INSERT INTO my_table (column1, column2) VALUES ($1, $2) RETURNING *',
  //       [data.column1, data.column2]
  //     );
  //     return result.rows[0];
  //   },

  async add(req, res) {
    const data = req.body;
    const result = await pool.query(
      "INSERT INTO sensex_data (date, open, close) VALUES ($1, $2, $3) RETURNING *",
      [data.date, data.open, data.close]
    );
    console.log("in add");
    return result.rows[0];
  },
  async find(req, res) {
    const result = await pool.query("SELECT * FROM sensex_data");
    console.log(result.rows);
    res.json(result.rows);
    return result.rows;
  },

  async findById(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      const result = await pool.query(
        "SELECT * FROM sensex_data WHERE _id = $1",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      console.log(result.rows[0]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async update(req, res) {
    const id = req.params.id;
    console.log(req.params);
    const data = req.body;
    try {
      const result = await pool.query(
        "UPDATE sensex_data SET date = $1, open = $2, close = $3 WHERE _id = $4 RETURNING *",
        [data.date, data.open, data.close, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      console.log(result.rows[0]);

      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteAll(req, res) {
    try {
      await pool.query("DELETE FROM sensex_data");
      res.json({ message: "All records deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteById(req, res) {
    const id = req.params.id;
    try {
      const result = await pool.query(
        "DELETE FROM sensex_data WHERE _id = $1 RETURNING *",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json({ message: "Record deleted", data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
