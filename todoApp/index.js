const express = require('express')
const mongoose = require('mongoose')
const app = express();
const jwt = require('jsonwebtoken')
const User = require('./models/user');
const Todo = require('./models/todo')
const bodyParser = require('body-parser');
require('./src/emailSender');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));


mongoose.connect('mongodb://localhost:27017/TODOApp', {
    useNewUrlParser: true
});
mongoose.connection
    .once('open', () => console.log('connected'))
    .on('error', (err) => {
        console.log(`could not connect`, err);
    });

app.get('/api', (req, res) => {


    res.json({
        message: 'Welcome to the API'
    });
});
//ver este

app.delete('/api/delete/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', {
        expiresIn: '1h'
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Todo.findOne({
                    _id: req.params.id,
                    owner: authData.playload
                })
                .then(todo => {
                    todo.remove().then(todoRemoved => {
                        res.send('Todo removed ' + todoRemoved)
                    });

                })

        }
    })
})



app.put('/api/edit', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', {
        expiresIn: '1h'
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {


            Todo.findOne({
                    _id: req.body._id,
                    owner: authData.playload
                })
                .then(todo => {

                    todo.text = req.body.text ? req.body.text : todo.text;
                    todo.goalDate = req.body.goalDate ? req.body.goalDate : todo.goalDate;
                    todo.done = req.body.done ? req.body.done : todo.done;
                    todo.save().then(todoSaved => {
                        res.send(todoSaved);
                    }).catch(err => console.log(err))
                })
        }
    })
})


app.get('/api/user', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', {
        expiresIn: '1h'
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            User.findOne({
                _id: authData.playload
            }).then(user => {
                
                let userInfo ={
                    email : user.email,
                    name : user.name,
                    notifications : user.notifications
                }
                res.send(userInfo);
            }).catch(err => {
                res.status(404).send('COULDNT GET TODOS BECAUSE.....' + err)
            });
        }
    })
})

app.put('/api/user', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', {
        expiresIn: '1h'
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            User.findOne({
                _id: authData.playload
            }).then(user => {
                console.log("req.body");

                console.log(req.body);

                

                user.name = req.body.name ? req.body.name : user.name;
                user.email = req.body.email ? req.body.email : user.email;
                user.password = req.body.password ? req.body.password : user.password;

                if(user.notifications!=undefined)
                    user.notifications = req.body.notifications;

                user.save().then(userSaved => {
                    res.send({name: userSaved.name});
                })

            }).catch(err => {
                res.status(404).send('COULDNT GET TODOS BECAUSE.....' + err)
            });
        }
    })
})




//as notificaçoes vao ser desligas por default
//se o mail ja existir devolve erro
app.post('/api/registry', (req, res) => {
    console.log(req.body)

    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });

    newUser.save().then(savedUser => {

        res.send({sucess:'User saved!'})
    }).catch(err => {
        res.send({err})

    });
});

app.post('/api/login', (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        if (user) {
            var playload = user._id;
            jwt.sign({
                playload
            }, 'secretkey', (err, token) => {
                console.log(err)
                res.json({
                    message: "loged in",
                    token,
                    user
                });
            });
        } else {
            res.json({
                message: "error"
            })
        }

    })
})

app.post('/api/insert', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', {
        expiresIn: '1h'
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            //Data do todo criado ou data p fazer o todo?

            if (req.body.text && req.body.date) {


                var newTodo = new Todo({
                    owner: authData.playload,
                    text: req.body.text,
                    date: new Date(req.body.date),
                    goalDate: !req.body.goalDate ? null : new Date(req.body.goalDate),
                })



                newTodo.save().then(todo => {

                    console.log('new todo saved!')

                    Todo.find(todo).then(t => {

                        res.send({
                            message: 'TODO created...',
                            t
                        })

                    })
                }).catch(err => {
                    res.status(404).send('TODO NOT SAVE BECAUSE.....' + err)
                });


            } else {
                res.send("missing info")
            }
        }
    })
})



app.get('/api/todos', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', {
        expiresIn: '1h'
    }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {

            Todo.find({
                owner: authData.playload
            }).then(todos => {
                res.send(todos);
            }).catch(err => {
                res.status(404).send('COULDNT GET TODOS BECAUSE.....' + err)
            });
        }
    })
})

app.listen(9999, (err) => {

    console.log('Runing on port 9999')
})


//FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer id undefine

    if (typeof bearerHeader !== 'undefined') {
        console.log(req.headers)
        //split at the space
        const bearer = bearerHeader.split(' ')
        //get token from array
        const bearerToken = bearer[1];
        //set the token

        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}