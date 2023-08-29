const express = require("express");
const router = express.Router();
const {
  models: { Car },
} = require("../models");

router.get("/", async (req, res) => {
  try {
    const cars = await Car.findAll();
    if (cars) {
      res.status(200).send(cars);
    } else {
      res.status(404).send("Not found!!");
    }
  } catch (ex) {
    res.status(500).send(ex.message);
  }
});

router.post("/", async (req, res) => {
  try {
    if (
      req.body.make &&
      req.body.model &&
      req.body.license_plate &&
      req.body.color
    ) {
      const car = Car.create({
        make: req.body.make,
        model: req.body.model,
        license_plate: req.body.license_plate,
        color: req.body.color,
      });
      if (car) {
        res.status(200).send("New Car Inserted!!!");
      }
    } else {
      res.status(404).send("Fill all feilds!!!");
    }
  } catch (ex) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (
      req.body.make &&
      req.body.model &&
      req.body.license_plate &&
      req.body.color
    ) {
      const car = await Car.update(
        {
          make: req.body.make,
          model: req.body.model,
          license_plate: req.body.license_plate,
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
  } catch (ex) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.destroy({
      where: {
        car_id: id,
      },
    });
    console.log(car);
    if (car) {
      res.status(200).send("Car Deleted!!!");
    } else {
      res.status(404).send("Not found!!!");
    }
  } catch (ex) {
    console.log("ERRROOOO!!!!! ", ex.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
