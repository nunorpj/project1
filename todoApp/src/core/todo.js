const User = require("../../models/user");
const Todo = require("../../models/todo");
const moment = require("moment");


function deleteTodo(req, res) {
    Todo.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.send('Todo removed ');
    })

}

function editTodo(req, res) {
    var time = moment(req.body.goalDate).format("YYYY-MM-DD");
    if (time == "Invalid date")
        time = null

    let owner = req.authData.playload

    Todo.findOne({
            owner
        })
        .then(todo => {
            todo.text = req.body.text;
            todo.goalDate = time;

            todo.done = req.body.done;

            todo.save().then(todoSaved => {
                res.send(todoSaved);
            }).catch(err => console.log(err))
        })
}


function insertTodo(req, res) {
    if (req.body.text && req.body.date) {
        var newTodo = new Todo({
            text: req.body.text,
            date: new Date(req.body.date),
            goalDate: !req.body.goalDate ? null : new Date(req.body.goalDate),
            owner: req.authData.playload
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
    } else {
        res.send("missing info");
    }
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





module.exports.deleteTodo = deleteTodo;
module.exports.editTodo = editTodo;
module.exports.insertTodo = insertTodo;
module.exports.getTodos = getTodos;