const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const moment = require("moment")
const bcrypt = require('bcrypt');


function login(req, res) {


    User.findOne({
        email: req.body.email,
    }).then(user => {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) {
                res.status(400).send("erro")
                return
            }
            if (!result) {
                res.status(400).send("Invalid password")
                return
            } else {

                let playload = user._id;
                jwt.sign({
                        playload
                    },
                    process.env.SECRETKEY,
                    (errr, token) => {
                        res.json({
                            message: "loged in",
                            token,
                            name:user.name
                        });
                    }
                );


            }



        });
    });
}

function registry(req, res) {

    bcrypt.hash(req.body.password, Number(process.env.PASSWORDSALTROUNDS), function (err, hash) {
        if (err) {
            res.send(err);
            return
        }
        const newUser = new User({
            email: req.body.email,
            password: hash,
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
            .catch(errr => {
                res.send({
                    errr
                });
            });

    });
}



module.exports.login = login;
module.exports.registry = registry;