import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_PRIVATE_KEY } from "../utils/config";
import { User } from "../models";

const router = express.Router();

// Wrap bcrypt.hash in a Promise to handle TypeScript typings better
const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err: Error | undefined, hash: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

router.post("/", async (req: Request, res: Response) => {
  try {
    if (
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.address
    ) {
      const exists = await User.findOne({ where: { email: req.body.email } });
      if (exists) {
        return res.status(400).send("User already exists!!!");
      }

      const hashedPassword = await hashPassword(req.body.password);

  
        try {
          const user: any = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            isAdmin: req.body.isAdmin, // Assuming isAdmin is passed in the request body
          });

          if (user) {
            // Generate JWT
            const token = jwt.sign(
              { id: user.user_id, isAdmin: user.isAdmin },
              JWT_PRIVATE_KEY
            );
            return res
              .header("x-auth-token", token)
              .status(200)
              .send("You signed Up!!!");
          }
        } catch (ex) {
          console.error("Error creating user:", ex);
          return res.status(500).send("Internal Server Error!!!");
        }
  
      }
     else {
      return res.status(400).send("Fill all fields!!");
    }
  } catch (ex: any) {
    console.error("ERROR!!!!! ", ex.message);
    return res.status(500).send("Internal Server Error!!!");
  }
});

export default router;
