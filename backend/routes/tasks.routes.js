const express = require('express');
const { setTask, getTasks, editTask, deleteTask, toggleTask, toggleFalseTask, toggleTrueTask } = require('../controllers/task.controller');
const router = express.Router();

router.get("/", getTasks)

router.post("/",  setTask)

router.put("/:id", editTask)

router.delete("/:id", deleteTask)

router.patch("/task-done/:id", toggleFalseTask)

router.patch("/task-undone/:id", toggleTrueTask)


module.exports = router;