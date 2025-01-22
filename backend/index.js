const express = require ("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') 
const cors = require('cors')
const port = 5500;
require("dotenv").config();
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const connectDB = require("./config/db");
const app = express();


/*const corsOptions = {
    origin:'http://localhost:3000', // Change to your frontend's URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };*/

  const corsOptions = {
    origin:process.env.FRONT_URL,  // Allow only your frontend's URL
    credentials: true, // Allow cookies and authorization headers
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };


connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.options('*', cors(corsOptions)); // Allow preflight requests from any origin

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

app.post('/users/login', (req, res) => {
  // Code pour gérer la connexion de l'utilisateur
  res.status(200).json({ message: 'Login successful' });
});

app.listen(port, () => console.log('le serveur a démarré sur ' + port))






