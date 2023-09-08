import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_PRIVATE_KEY } from "../utils/config";
import { User } from "../models";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const user: any = await User.findOne({ where: { email: req.body.email } });

      if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          //Creating JWT
          const token = jwt.sign(
            { id: user.user_id, isAdmin: user.isAdmin },
            JWT_PRIVATE_KEY
          );
          return res.status(200).send(token);
        } else return res.status(401).send("Invalid Credentials!!!");
      } else {
        return res.status(401).send("Invalid Credentials!!!");
      }
    } else {
      return res.status(401).send("Fill all feilds!!");
    }
  } catch (ex: any) {
    console.log("ERRROOOO!!!!! ", ex.message);
    return res.status(500).send("Something went wrong!!!");
  }
});
export default router;
