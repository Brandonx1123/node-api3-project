const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { logger } = require("./middleware/middleware");
const userRouter = require("./users/users-router");

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(express.json());

server.use(morgan("dev"));
server.use(cors());
server.use(helmet());

server.use("/api/users", userRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(500).json({
    message: err.message, //dev
    stack: err.stack, //dev
    custom: "Something went bad globally",
  });
});

module.exports = server;
