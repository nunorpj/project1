const Todo = require("../db/models/todo");
const fs = require("fs")


function verifyTodoData(req, res, next) {
    if (!req.body.text) {
        res.status(400).send("Todos need to have a text")
        return
    }
    if (req.body.text.length < 2) {
        res.status(400).send("Todos need to have more text")
        return
    }
    next();
}

function verifyOwnership(req, res, next) {
    Todo.findById(req.params.id).then(todo => {
        if (req.authData.playload != todo.owner) {
            res.status(403).send("Not your's.")
            return
        } else {
            next();
        }
    })
}


function verifyFileExistence(req, res, next) {
   

    
    Todo.findById(req.params.id).then(todo => {
        try {
            if (fs.existsSync(todo.filePath)) {
                next();
            }
        }catch(e){
            console.log(e)
            res.status(404).send("File not found!");
            return;
        }
    }).catch(err=>{
        console.log(err)
        res.status(404).send("File not found!");
        return;
    })






}



module.exports.verifyTodoData = verifyTodoData;
module.exports.verifyOwnership = verifyOwnership;
module.exports.verifyFileExistence = verifyFileExistence;