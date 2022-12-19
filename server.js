
express = require("express");
app = express();
port = process.env.port || 3000;
bodyParser = require("body-parser");
mongoose = require("mongoose");
books = require("./models/bookModel");

mongoose.Promise = global.Promise;

// local db connection, url can be changed to seperate production url
mongoose.connect("mongodb://localhost:27017/BooksDB");

routes = require("./routes/bookRoutes");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);
// start server 
app.listen(port);
