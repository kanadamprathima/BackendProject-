const User = require("../models").user;
const Ride = require("../models").ride;
const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const router = new Router();
router.get("/", async (req, res, next) => {
  try {
    const allrides = await Ride.findAll({ include: User });
    res.send(allrides);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rideById = await Ride.findByPk(id, { include: User });
    if (rideById) {
      res.send(rideById);
    } else {
      res.status(404).send({ message: "Ride not found!" });
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

//posting new ride
// http POST :4000/rides Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2OTQwMDA5MSwiZXhwIjoxNjY5NDA3MjkxfQ.ZKbcvgW7RpJyqWHLrsr_BNAaokZTeNQFQ0J19FekLHo" pickuplat=52.24509774096897 pickuplong=4.813070658211372 droplat=52.38979710607991 droplong=4.6416547447811185 amount=2 .
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { pickuplat, pickuplong, droplat, droplong, amount } = req.body;
    // console.log("test", pickuplat);
    console.log("post req", req.body);
    if (!pickuplat || !droplat || !pickuplong || !amount) {
      return res.status(402).send("no credentials");
    }
    if (amount >= 7) {
      return res.status(402).send("no seats available");
    }

    const newRide = await Ride.create({
      pickuplat,
      pickuplong,
      droplat,
      droplong,
      amount,
      startTime: new Date(),
      userId: req.user.id,
    });
    // console.log(newRide);
    res.send(newRide);
    return res.status(201).send({ message: "New Ride published", newRide });
  } catch (e) {
    next(e.message);
  }
});

//delete your ride

module.exports = router;
