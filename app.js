const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const smoothieRouter = require("./routes/smoothies_routes");

const port = process.env.PORT || 3020

const app = express()

// If we are not running in production, load our local .env
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    } 
app.use(cors())
app.use(bodyParser.json())
const dbConn = process.env.MONGODB_URI || "mongodb://localhost/smoothies"  //only the animal shelter part changes according to app
//connect string from atlas the mongodb_uri
mongoose.connect(
    dbConn,
    {
        useNewUrlParser :true,
        useUnifiedTopology : true,
        useFindAndModify : false
    },
    err => {
        if (err){
            console.log("Error connecting to database", err)
        }else {
            console.log("Connected to database! " , dbConn)
        }
    }
)
app.use("/smoothies", smoothieRouter)
app.listen(port, ()=> console.log("Smoothiverse is running on port " + port))



app.get("/",(req, res) => {
    res.send("Welcome to our Smoothiverse app!!")
});