import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import { Request, Response, NextFunction } from "express";
import {Car} from "../models"

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  try {
    const cars = await Car.findAll();
    if (cars) {
      res.status(200).send(cars);
    } else {
      res.status(404).send("Not found!!");
    }
  } catch (ex: any) {
    res.status(500).send(ex.message);
  }
});

router.post("/", [auth, admin], async (req: Request, res: Response) => {
  try {
    if (
      req.body.make &&
      req.body.model &&
      req.body.license_plate_number &&
      req.body.color
    ) {
      const car =await Car.create({
        make: req.body.make,
        model: req.body.model,
        license_plate_number: req.body.license_plate_number,
        color: req.body.color,
      });
      if (car) {
        res.status(200).send("New Car Inserted!!!");
      }
    } else {
      res.status(404).send("Fill all feilds!!!");
    }
  } catch (ex: any) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", [auth, admin], async (req: Request , res: Response) => {
  try {
    const id = req.params.id;
    if (
      req.body.make &&
      req.body.model &&
      req.body.license_plate_number &&
      req.body.color
    ){
      const car = await Car.update(
        {
          make: req.body.make,
          model: req.body.model,
          license_plate_number: req.body.license_plate_number,
          color: req.body.color,
        },
        {
          where: {
            car_id: id,
          },
        }
      );
      if (car[0]) {
        res.status(200).send("Car data Updated!!!");
      } else {
        res.status(400).send("Not updated!!!");
      }
    } else {
      res.status(404).send("Fill all feilds!!!");
    }
  } catch (ex: any) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", [auth, admin], async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const car = await Car.destroy({
      where: {
        car_id: id,
      },
    });
    if (car) {
      return res.status(200).send("Car Deleted!!!");
    } else {
      return res.status(404).send("Not found!!!");
    }
  } catch (ex: any) {
    console.log("ERRROOOO!!!!! ", ex.message);
    return res.status(500).send("Internal Server Error");
  }
});
export default router;
