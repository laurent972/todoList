const express = require ("express");
const port = 5500;

const mongoose = require('mongoose')

const app = express();
mongoose.connect('mongodb+srv://fs:>8,Ry)+GGgMgv!i@todolist.jf5tkn2.mongodb.net/?retryWrites=true&w=majority&appName=todolist');

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/tasks", require("./routes/tasks.routes"));

app.listen(port, () => console.log('le serveur a démarré sur ' + port))


