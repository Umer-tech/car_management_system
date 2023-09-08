import express from "express";
const router = express.Router();
import { Rental, Car, User } from "../models";
import auth from "../middleware/auth";

router.get("/:id", auth, async (req, res) => {
  const composit_id_string: String = req.params.id;
  const id: String[] = composit_id_string.split("-");
  const user_id: Number = Number(id[0]);
  const car_id: Number = Number(id[1]);
  const rentaldetails = await Rental.findOne({
    where: {
      user_id: user_id,
      car_id: car_id
    },
    include: [{
      model: Car,
      through: { attributes: ['car_id'] }
    },
    {
      model: User,
      through: { attributes: ['user_id'] }
    }
  ]
  })
  return res.send(rentaldetails);
});
export default router;
