const auth = require("./auth")
const userData = require("./user")
const todoData = require("./todo")
const bodyParser = require("body-parser");

module.exports = function (app) {
    
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    

    app.use("/", auth);
    app.use("/", userData)
    app.use("/", todoData)

};




