const express = require("express");
const createController = require("../controller/createController");
const fetchController = require("../controller/fetchController");
const deleteController = require("../controller/deleteController");
const updateController = require("../controller/updateController");
const Task = require("../model/TaskSchema");

const router = express.Router();

router.post("/create/task", createController(Task));

router.get("/fetch/task", fetchController(Task));

router.patch("/update/task/:id", updateController(Task));

router.delete("/delete/task/:id",deleteController(Task));

module.exports = router;
