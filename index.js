//packages
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

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
app.use(cors());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());

//routes
app.use("/auth", authRouter);
app.use("/rides", rideRouter);
app.use("/userRides", userrideRouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected:${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_msg", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_msg", data);
  });
});

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
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
