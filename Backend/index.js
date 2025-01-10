const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const eventRouter = require("./router/eventRouter");
const attendeeRouter = require("./router/attendeeRouter");
const taskRouter = require("./router/taskRouter");
const userAuthRouter = require("./router/authentication");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
const url = process.env.MongoDB_URL;

app.use(cors());
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb connection established...");
  })
  .catch((error) => {
    console.error("error in connection...", error);
  });

app.options("*", cors());

app.use(eventRouter);
app.use(attendeeRouter);
app.use(taskRouter);
app.use(userAuthRouter);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
