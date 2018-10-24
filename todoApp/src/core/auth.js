const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const moment = require("moment")


function login(req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        if (user) {
            var playload = user._id;
            jwt.sign({
                    playload
                },
                "secretkey",
                (err, token) => {
                    console.log(err);
                    res.json({
                        message: "loged in",
                        token,
                        user
                    });
                }
            );
        } else {
            res.status(400).send("Invalid password")

        }
    });
}

function registry(req, res) {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        date: moment().format("YYYY-MM-DD")
    });

    newUser
        .save()
        .then(savedUser => {
            res.send({
                sucess: "User saved!"
            });
        })
        .catch(err => {
            res.send({
                err
            });
        });
}

module.exports.login = login;
module.exports.registry = registry;