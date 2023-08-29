const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const jwtConfig = require("../config/jwt-config");
const {
  models: { User },
} = require("../models");

router.post("/", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          //Creating JWT
          const token = jwt.sign({ _id: user.user_id }, "abc");
          res.status(200).send(token);
        } else res.status(401).send("Invalid Credentials!!!");
      } else {
        res.status(401).send("Invalid Credentials!!!");
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
