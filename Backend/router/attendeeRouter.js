const express = require("express");
const createController = require("../controller/createController");
const fetchController = require("../controller/fetchController");
const deleteController = require("../controller/deleteController");
const updateController = require("../controller/updateController");
const Attendee = require("../model/AttendeeSchema");

const router = express.Router();

router.post("/create/attendee", createController(Attendee))

router.get("/fetch/attendee", fetchController(Attendee));

router.patch("/update/attendee/:id", updateController(Attendee));

router.delete("/delete/attendee/:id", deleteController(Attendee));

module.exports = router;
