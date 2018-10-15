const router = module.exports = require('express').Router();
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true
    })
);



router.post("/api/login", (req, res) => {
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
            res.json({
                message: "error"
            });
        }
    });
});

router.post("/api/registry", (req, res) => {
    console.log(req.body);

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
});



