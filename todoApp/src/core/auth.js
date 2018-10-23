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



function verifyRegistryData(req, res, next) {

    if (!req.body.email || !req.body.password || !req.body.name) {
        res.status(400).send("Missing param")
        return
    }

    emailVerify(req.body.email,docs => {
        if(docs.length>0){
            res.status(400).send("Email already in use")
            return
        }
    })

    if (req.body.password.length < 6) {
        res.status(400).send("Password must be at least 6 characters long")
        return
    }
    if (req.body.name.length < 4) {
        res.status(400).send("Name must be at least 4 characters long")
        return
    }

    next();
}

function verifyLogInData(req, res, next) {
    if (!req.body.email || !req.body.password) {
        res.status(400).send("Missing param")
        return
    }

    emailVerify(req.body.email,docs => {
        if(docs.length==0){
            res.status(400).send("Email doesn't exists")
            return
        }
    })

    if (req.body.password.length < 6) {
        res.status(400).send("Password must be at least 6 characters long")
        return
    }
    next();
}



function emailVerify(email,cb) {
    User.find({email : email})
        .then(cb)
}


module.exports.login = login;
module.exports.registry = registry;
module.exports.verifyRegistryData = verifyRegistryData;
module.exports.verifyLogInData = verifyLogInData;