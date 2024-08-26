const express = require ("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') 
const cors = require('cors')
const port = 5500;
const dotenv = require("dotenv").config();
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const connectDB = require("./config/db");
const app = express();


const corsOptions = {
    origin:'*', // Change to your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };


connectDB();
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req,res)=>{
    res.status(200).send(res.locals.user._id)
})


app.use("/tasks", require("./routes/tasks.routes"));
app.use("/users", require("./routes/users.routes"));

app.listen(port, () => console.log('le serveur a démarré sur ' + port))






