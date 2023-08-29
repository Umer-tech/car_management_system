const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  models: { User },
} = require("../models");

router.post("/", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) res.status(200).send("You signed In!!!");
        else res.status(200).send("Invalid Password!!!");
      } else {
        res.status(401).send("Invalid Email!!!");
      }
    } else {
      res.status(401).send("Fill all feilds!!");
    }
  } catch (ex) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Something went wrong!!!");
  }
});
module.exports = router;
