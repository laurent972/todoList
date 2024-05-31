const express = require('express');
const router = express.Router();

router.get("/", (req,res) => {
    res.json({ message: "voici la data"})
})

router.post("/", (req,res) => {
    res.json({ message: req.body.message})
})

router.put("/:id", (req,res) => {
    res.json({ messageId: req.params.id})
})

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