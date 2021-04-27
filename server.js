const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./server/database/connection");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config( { path : 'config.env'} )

// Middleware
app.use(bodyParser.json());
// app.use(express.json())

// Connect to DataBase
connectDB();


//set view engine
app.set("view engine","ejs")

app.use('/',express.static(path.join(__dirname,'static')));

// load assets
app.use("/css", express.static(path.resolve(__dirname,"assets/css")))
app.use("/img", express.static(path.resolve(__dirname,"assets/img")))
app.use("/js", express.static(path.resolve(__dirname,"assets/js")))

// Import Routes
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");


// Route Middlewares
app.use("/",authRoute);
app.use("/", privateRoute);

// Setting up Port
let PORT = process.env.PORT
if(PORT == null || PORT == "")
{
    PORT = 8080;
}

app.listen(PORT,function(){
    console.log(`Server started at http://localhost:${PORT}.`);
});