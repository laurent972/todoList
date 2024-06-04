const express = require ("express");
const port = 5500;

const mongoose = require('mongoose');
const connectDB = require("./config/db");

const app = express();

connectDB();


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/tasks", require("./routes/tasks.routes"));

app.listen(port, () => console.log('le serveur a démarré sur ' + port))


