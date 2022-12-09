const User = require("../models").user;
const Ride = require("../models").ride;
const userRide = require("../models").userride;
const authMiddleware = require("../auth/middleware");
const { Router } = require("express");
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const alluserrides = await userRide.findAll({
      include: User,
      include: Ride,
    });
    res.send(alluserrides);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
//join-ride
//POST request -> rideId (ride you want to join), userId(user making the request), address (where to pick up user)
//userRides.create()
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { rideId } = req.body;

    console.log("post req", req.body);

    const newUserRide = await userRide.create({
      userId: req.user.id,
      rideId,
    });
    // console.log(newRide);
    res.send(newUserRide);
    return res
      .status(201)
      .send({ message: "New userRide published", newUserRide });
  } catch (e) {
    next(e.message);
  }
});
//accept or reject rides
//PATCH/PUT request -> requestId, new status (accepted or rejected)
//If accepted or rejected -> send an email (use nodemailer for email)
router.put("/:userRideId", async (req, res, next) => {
  try {
    const userRideId = parseInt(req.params.userRideId);
    const userToUpdate = await userRide.findByPk(userRideId);
    if (!userToUpdate) {
      res.status(404).send("User Ride not found");
    } else {
      const updatedUserRide = await userToUpdate.update(req.body);
      res.json(updatedUserRide);
    }
  } catch (e) {
    next(e.message);
  }
});
module.exports = router;
