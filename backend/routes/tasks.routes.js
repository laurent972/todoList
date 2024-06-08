const express = require('express');
const { setTask, getTasks, editTask } = require('../controllers/task.controller');
const router = express.Router();

router.get("/", getTasks)

router.post("/",  setTask)

router.put("/:id", editTask)

router.delete("/:id", (req,res) => {
    res.json({ message : "deleted" + req.params.id})
})

router.patch("/task-done/:id", (req,res) => {
    res.json({ message : "done " + req.params.id})
})

router.patch("/task-undone/:id", (req,res) => {
    res.json({ message : "undone " + req.params.id})
})


module.exports = router;