const express = require("express");
const router = express.Router();
const db = require("../models");
const sql = require("sequelize-sql-tag");
const {
  models: { Rental },
} = require("../models");

router.get("/:id", async (req, res) => {
  const composit_id = req.params.id;
  const id = composit_id.split("-");
  const user_id = id[0];
  const car_id = id[1];
  const rentaldetails = await db.sequelize.query(
    sql`SELECT u.name, c.license_plate, r.rent_date, r.return_date FROM rental r INNER JOIN user u ON u.user_id = ${user_id} INNER JOIN car c ON c.car_id = ${car_id}`
  );
  res.send(rentaldetails);
});
module.exports = router;
