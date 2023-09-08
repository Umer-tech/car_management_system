import { Response, NextFunction } from "express";
import IAuthenticatedRequest from "../utils/IAuthenticateRequest"
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../utils/config";



export default function (req: IAuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded: any = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
