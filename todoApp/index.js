const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const result = dotenv.config();
require("./src/utils/emailSender");
require("./src/routes/routersConfi")(app);


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




app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT, err => {
    console.log("Runing on port " + process.env.PORT);
});



