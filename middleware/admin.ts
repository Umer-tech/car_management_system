import IAuthenticatedRequest from "../utils/IAuthenticateRequest";
import {Response, NextFunction } from "express";
export default function (req: IAuthenticatedRequest, res: Response, next: NextFunction) {

  if (!req.user.isAdmin) return res.status(403).send("Access denied!!!");

  next();
};
