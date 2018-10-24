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
    

    app.use("/api/auth", auth);
    app.use("/api/user", userData)
    app.use("/api/todo", todoData)

};




