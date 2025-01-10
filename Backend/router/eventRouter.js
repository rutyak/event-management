const express = require("express");
const createController = require("../controller/createController");
const fetchController = require("../controller/fetchController");
const deleteController = require("../controller/deleteController");
const updateController = require("../controller/updateController");
const Event = require("../model/EventSchema");

const router = express.Router();

router.post("/create/event", createController(Event));

router.get("/fetch/event", fetchController(Event));

router.patch("/update/event/:id", updateController(Event));

router.delete("/delete/event/:id", deleteController(Event));

module.exports = router;
