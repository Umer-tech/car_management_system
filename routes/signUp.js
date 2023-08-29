const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const {
  models: { User },
} = require("../models");

router.post("/", async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.address
    ) {
      const exists = User.findOne({ where: { email: req.body.email } });
      if (exists) res.status(400).send("User alredy exists!!!");
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          address: req.body.address,
          isAdmin: req.body.isAdmin,
        });
        if (user) {
          res.status(200).send("You signed Up!!!");
        }
      });
    } else {
      res.status(404).send("Fill all feilds!!");
    }
  } catch (ex) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Internal Server Error!!!");
  }
});

module.exports = router;
