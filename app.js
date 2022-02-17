const express = require("express");
const session = require('express-session')
const cors = require('cors');
require('dotenv');
var path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
var expresslayouts = require('express-ejs-layouts');
const server = require ('http').createServer(app);
const io = require("socket.io")(server);
const routes = require('./server/routes/user');

 /*------------------------------------------------
 *  EVENEMENTS DE CONNECTION SOCKET
 * ----------------------------------------------- 
 */
 // établissement de la connexion
 // IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté ! ') // FILE /client/chat.js
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);//pour povoir envoyer les evenements on utilise le EMIT
    });
});

var corsOptions = {
origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(cookieParser());
app.use(session({
  secret: 'ReadME',
  saveUninitialized: true,
  resave: true
}));

app.set("layout", "./layouts/main");
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use("images", express.static(path.join(__dirname, "images")));

app.use(expresslayouts);

const db = require("./server/models");
const Role = db.role;

db.mongoose
  .connect('mongodb://localhost:27017/readme', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use('/', routes);

require('./server/routes/authent')(app);


const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}