const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const result = dotenv.config();
require("./src/utils/emailSender");
const auth = require("./src/routes/auth")
const userData = require("./src/routes/user")
const todoData = require("./src/routes/todo")
const https = require('https')
const fs = require('fs')

if (result.error) {
    console.log(".env file missing!");
    process.exit();
}


mongoose.connect(
    process.env.MONGOOSE, {
        useNewUrlParser: true
    }
);
mongoose.connection
    .once("open", () => console.log("connected"))
    .on("error", err => {
        console.log(`could not connect`, err);
    });

app.use("/", auth);
app.use("/", userData)
app.use("/", todoData)


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static(__dirname + "/public"));



app.listen(process.env.PORT, err => {
    console.log("Runing on port " + process.env.PORT);
});



//https.createServer(app).listen(process.env.PORT);