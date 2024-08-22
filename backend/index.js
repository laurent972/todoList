const express = require ("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') 
var cors = require('cors')
const port = 5500;
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();


connectDB();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/tasks", require("./routes/tasks.routes"));
app.use("/users", require("./routes/users.routes"));

app.listen(port, () => console.log('le serveur a démarré sur ' + port))






