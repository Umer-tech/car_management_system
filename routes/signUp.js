const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwt-config");
const jwt = require("jsonwebtoken");

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
      const exists = await User.findOne({ where: { email: req.body.email } });
      if (exists) {
        return res.status(400).send("User alredy exists!!!");
      }

      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          address: req.body.address,
          isAdmin: req.body.isAdmin,
        });
        if (user) {
          //Generation JWT
          const token = jwt.sign(
            { id: user.user_id, isAdmin: user.isAdmin },
            jwtConfig.jwtSecret
          );
          return res
            .header("x-auth-token", token)
            .status(200)
            .send("You signed Up!!!");
        }
      });
    } else {
      return res.status(404).send("Fill all feilds!!");
    }
  } catch (ex) {
    console.log("ERRROOOO!!!!! ", ex.message);
    return res.status(500).send("Internal Server Error!!!");
  }
});

module.exports = router;
