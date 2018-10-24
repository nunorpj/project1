const User = require("../../models/user");
const Todo = require("../../models/todo");


function deleteTodo(req, res){
    User.updateOne({
        _id: req.authData.playload
    }, {
        $pull: {
            todos: req.params.id
        }
    }).then(user => {
        Todo.findOneAndRemove({
                _id: req.params.id
            }),
            res.send('Todo removed ')
    });
}

function editTodo(req, res){

    User.findById(req.authData.playload).populate("todos").then(user => {

        for (var i = 0; i < user.todos.length; i++) {
            if (user.todos[i]._id == req.body._id) {

                Todo.findOne({
                        _id: req.body._id,
                    })
                    .then(todo => {
                        todo.text = req.body.text;
                        todo.goalDate = req.body.goalDate;

                        todo.done = req.body.done;


                        todo.save().then(todoSaved => {
                            res.send(todoSaved);
                        }).catch(err => console.log(err))
                    })
            }
        }
    })
}

function insertTodo (req, res){
    if (req.body.text && req.body.date) {
        var newTodo = new Todo({
            text: req.body.text,
            date: new Date(req.body.date),
            goalDate: !req.body.goalDate ? null : new Date(req.body.goalDate)
        });

        newTodo
            .save()
            .then(todo => {
                User.findByIdAndUpdate(req.authData.playload).then(user => {
                    user.todos.push(todo._id);
                    user.save();
                });

                Todo.find(todo).then(t => {
                    res.send({
                        message: "TODO created...",
                        t
                    });
                });
            })
            .catch(err => {
                res.status(404).send("TODO NOT SAVE BECAUSE....." + err);
            });
    } else {
        res.send("missing info");
    }
}

function getTodos(req, res){

    console.log(req.authData)

    User.findById(req.authData.playload)
        .populate("todos")
        .exec((err, user) => {
            if (err) {
                res.status(404).send("COULDNT GET TODOS BECAUSE....." + err);
                console.log(err);
            }

            res.send(user.todos);

        });
}





module.exports.deleteTodo = deleteTodo;
module.exports.editTodo= editTodo;
module.exports.insertTodo=insertTodo;
module.exports.getTodos = getTodos;
