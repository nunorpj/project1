const User = require("../db/models/user");
const Todo = require("../db/models/todo");
const moment = require("moment");
const fs = require("fs")


function deleteTodo(req, res) {
    Todo.findOneAndRemove({
        _id: req.params.id
    }).then((todo) => {
        if (fs.existsSync(todo.filePath)) {
            fs.unlink(todo.filePath)
        }
        res.send('Todo removed ');
    })

}


function deleteFile(req, res) {
    Todo.findById(req.params.id).then(todo => {
        try {
            if(todo.filePath != "no file")
                fs.unlink(todo.filePath);
        }catch(err){
            console.log(err)
        }
        todo.filePath = "no file"
        todo.fileName = "no file"
        res.send("success")
        todo.save()

    }).catch(err => {
        res.status(400).send("erro")
    })
}


function editTodo(req, res) {





    if (req.body.goalDate == "null") {
        req.body.goalDate = undefined
    } else {
        req.body.goalDate = new Date(req.body.goalDate);
    }

    Todo.findById(req.body.id)
        .then(todo => {


            if (req.file) {
                let oldFilePath = todo.filePath;

                let file = fs.readFileSync(req.file.path);
                let dir = "./src/db/img/" + req.authData.playload
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }

                let newFilePath = dir + "/" + req.file.filename

                fs.writeFileSync(newFilePath, file)

                fs.unlink(req.file.path)
                if (oldFilePath != "no file")
                    fs.unlink(oldFilePath)

                todo.filePath = newFilePath;
                todo.fileName = req.file.originalname;
            }



            todo.text = req.body.text;
            todo.goalDate = moment(req.body.goalDate).format("YYYY-MM-DD")
            todo.done = req.body.done;
            todo.save().then(todoSaved => {
                res.send(todoSaved);
            }).catch(err => console.log(err))
        })
}


function insertTodo(req, res) {

    if (req.body.goalDate == "undefined")
        req.body.goalDate = undefined
    else
        req.body.goalDate = new Date(req.body.goalDate);


    let fileName = "no file"
    let filePath = "no file"
    if (req.file) {
        fileName = req.file.originalname;
        let file = fs.readFileSync(req.file.path);

        let dir = "./src/db/img/" + req.authData.playload
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        filePath = dir + "/" + req.file.filename
        fs.writeFileSync(filePath, file)
        fs.unlink(req.file.path)

    }

    var newTodo = new Todo({
        text: req.body.text,
        date: moment(req.body.goalDate).format("YYYY-MM-DD"),
        goalDate: !req.body.goalDate ? null : moment(req.body.goalDate).format("YYYY-MM-DD"),
        owner: req.authData.playload,
        filePath: filePath,
        fileName: fileName
    });

    newTodo.save().then(todo => {
            res.send({
                message: "TODO created...",
                todo
            });
            return
        })
        .catch(err => {
            res.status(400).send("TODO NOT SAVE BECAUSE....." + err);
        });

}

function getTodos(req, res) {

    let owner = req.authData.playload;

    Todo.find({
            owner
        })
        .then(todos => {
            res.send(todos);
        }).catch(err => {
            res.status(400).send("COULDNT GET TODOS BECAUSE....." + err);
        })
}

function getFile(req, res) {


    Todo.findById(req.params.id).then(todo => {

        res.download(todo.filePath, todo.fileName)

    }).catch(err => {
        console.log(err)
        res.send("error, file not found")
    })


}

module.exports.deleteTodo = deleteTodo;
module.exports.editTodo = editTodo;
module.exports.insertTodo = insertTodo;
module.exports.getTodos = getTodos;
module.exports.getFile = getFile;
module.exports.deleteFile = deleteFile;