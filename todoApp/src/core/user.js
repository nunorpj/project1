const User = require("../../models/user");


function getUser(req, res){

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

function editUser  (req, res){

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


module.exports.getUser =getUser;
module.exports.editUser = editUser;

