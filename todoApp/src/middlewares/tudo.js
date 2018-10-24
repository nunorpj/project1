const User = require("../../models/user");


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

    User.findById(req.authData.playload).then(user=>{
       
        if(user.todos.indexOf(req.params.id) == -1){
            res.status(403).send("Not your's taks.")
            return
        }

        
    })

    next();
}





module.exports.verifyTodoData=verifyTodoData;
module.exports.verifyOwnership=verifyOwnership;