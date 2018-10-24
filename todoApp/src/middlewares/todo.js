const Todo = require("../../models/todo");


function verifyTodoData(req,res,next){
    if(!req.body.text){
        res.status(400).send("Todos need to have a text")
        return
    }
     if(req.body.text.length<2){
        res.status(400).send("Todos need to have more text")
        return
    }
    next();
}

function verifyOwnership(req,res,next){
    Todo.findById(req.params.id).then(todo=>{
        if(req.authData.playload!=todo.owner){
            res.status(403).send("Not your's taks.")
            return
        }else{
            next();
        }
    })
}





module.exports.verifyTodoData=verifyTodoData;
module.exports.verifyOwnership=verifyOwnership;