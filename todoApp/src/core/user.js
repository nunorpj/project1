const User = require("../db/models/user");
const bcrypt = require('bcrypt');


function getUser(req, res) {

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
            res.status(404).send("COULDNT GET USER BECAUSE....." + err);
        });
}

function editUser(req, res) {
    User.findOne({
            _id: req.authData.playload
        })
        .then(user => {
            user.name = req.body.name ? req.body.name : user.name;
            user.email = req.body.email ? req.body.email : user.email;

            if (req.body.notifications != undefined)
                user.notifications = req.body.notifications;

            if (req.body.sendingHour != undefined)
                user.sendingHour = req.body.sendingHour;


            if (req.body.password != undefined) {
                bcrypt.hash(req.body.password, Number(process.env.PASSWORDSALTROUNDS)).then( hash=> {

                    user.password=hash;
                }).then(() => {
                    user.save()
                        .then(userSaved => {
                            res.send({
                                name: userSaved.name
                            });
                        })

                })
            } else {
                
                user.save()
                    .then(userSaved => {
                        res.send({
                            name: userSaved.name
                        });
                    })
            }



        })
        .catch(err => {
            res.send("COULDNT UPDATE USER BECAUSE....." + err);
        });
}


module.exports.getUser = getUser;
module.exports.editUser = editUser;