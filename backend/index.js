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
    origin: ['http://localhost:3000', process.env.FRONTEND_URL], // Autoriser uniquement l'URL de votre frontend
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Méthodes HTTP autorisées
    credentials: true, // Autoriser l'envoi de cookies et des headers d'autorisation
    optionsSuccessStatus: 200, // Pour les navigateurs anciens qui bloquent sur 204
  };

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));


// Gérer les requêtes preflight (OPTIONS)
app.options('*', cors(corsOptions));
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

app.listen(port, () => console.log('le serveur a démarré sur ' + port))






