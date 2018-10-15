const router = module.exports = require('express').Router();
const User = require("../../models/user");
const bodyParser = require("body-parser");
const verifyToken = require("../middlewares/verifyToken")

router.use(bodyParser.json());
router.use(
    bodyParser.urlencoded({
        extended: true
    })
);

router.get("/api/user", verifyToken, (req, res) => {

        User.findOne({
                _id: req.authData.playload
            })
            .then(user => {
                let userInfo = {
                    email: user.email,
                    name: user.name,
                    notifications: user.notifications,
                    sendingHour: user.sendingHour
                };
                res.send(userInfo);
            })
            .catch(err => {
                res.status(404).send("COULDNT GET TODOS BECAUSE....." + err);
            });
    }

);

router.put("/api/user", verifyToken, (req, res) => {

        User.findOne({
                _id: req.authData.playload
            })
            .then(user => {
                user.name = req.body.name ? req.body.name : user.name;
                user.email = req.body.email ? req.body.email : user.email;
                user.password = req.body.password ?
                    req.body.password :
                    user.password;
                user.sendingHour = req.body.sendingHour ?
                    req.body.sendingHour :
                    user.sendingHour;

                if (req.body.notifications != undefined)
                    user.notifications = req.body.notifications;

                if (user.sendingHour != undefined)
                    user.sendingHour = req.body.sendingHour;

                user
                    .save()
                    .then(userSaved => {
                        console.log(userSaved);
                        res.send({
                            name: userSaved.name
                        });
                    })
                    .catch(err => {
                        res.send("COULDNT GET TODOS BECAUSE....." + err);
                    });
            })
            .catch(err => {
                res.send("COULDNT GET TODOS BECAUSE....." + err);
            });
    }

);