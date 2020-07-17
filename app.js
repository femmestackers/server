const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const smoothieRouter = require("./routes/smoothies_routes");

const port = process.env.PORT || 3020

const app = express()

app.use(cors())
app.use(bodyParser.json())
const dbConn = process.env.MONGODB_URI || "mongodb://localhost/smoothies"  //only the animal shelter part changes according to app

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