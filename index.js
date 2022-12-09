//packages
const express = require("express");
const corsMiddleWare = require("cors");
const User = require("./models").user;
const Ride = require("./models").ride;
const rideRouter = require("./routers/rideRouter");
const userrideRouter = require("./routers/userRideRouter");
const authMiddleware = require("./auth/middleware");
//routers
const authRouter = require("./routers/auth");

//constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();

// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(corsMiddleWare());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());

//routes
app.use("/auth", authRouter);
app.use("/rides", rideRouter);
app.use("/userRides", userrideRouter);

app.get("/users", async (req, res, next) => {
  try {
    const allUsers = await User.findAll({ include: Ride });
    res.send(allUsers);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
//delete new ride
app.delete(
  "/users/:userId/rides/:rideId",
  authMiddleware,
  async (req, res, next) => {
    try {
      // const rider = await User.findOne({
      //   where: { id: req.user.id },
      // });
      // console.log("rider from server", rider);
      const rideId = parseInt(req.params.rideId);
      const toDelete = await Ride.findByPk(rideId);

      if (!toDelete) {
        res.status(404).send("ride not found");
      }

      if (toDelete.userId !== req.user.id) {
        res.status(404).send("not an authorized rider to delete this");
      }

      // console.log("todeleteride", toDelete.userId);
      // console.log("check condition", req.user.id === toDelete.userId);
      // console.log("user auth id", req.user.id);
      const deleted = await toDelete.destroy();
      res.json(deleted);
    } catch (e) {
      next(e);
    }
  }
);

//start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
