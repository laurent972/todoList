const express = require ("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') 
const cors = require('cors')

const dotenv = require("dotenv").config();
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const connectDB = require("./config/db");
const app = express();

const port = 5500;

const corsOptions = {
    origin:'https://todo-list-9x4c.vercel.app/', // Change to your frontend's URL
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

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log('le serveur a démarré sur ' + port))






