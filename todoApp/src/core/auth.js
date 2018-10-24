const User = require("../../models/user");
const jwt = require("jsonwebtoken");

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
    console.log("aqui")
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
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