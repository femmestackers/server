const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//const mongoose = require("mongoose")

const port = process.env.PORT || 3020

const app = express()   

app.use(cors())
app.use(bodyParser.json())  

app.get('/' , (req, res) => res.send("Welcome to SMOOTHIVERSE server"))

app.listen(port, () => console.log("SMOOTHIVERSE server is running  on port "+ port))