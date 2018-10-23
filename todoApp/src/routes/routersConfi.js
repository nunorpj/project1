const auth = require("./auth")
const userData = require("./user")
const todoData = require("./todo")

module.exports = function (app) {
    
    app.use("/", auth);
    app.use("/", userData)
    app.use("/", todoData)

};




