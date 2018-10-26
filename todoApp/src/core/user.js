const User = require("../db/models/user");
const bcrypt = require('bcrypt');
const sharp = require('sharp');
const fs = require("fs")


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
                bcrypt.hash(req.body.password, Number(process.env.PASSWORDSALTROUNDS)).then(hash => {

                    user.password = hash;
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


function userImg(req, res) {    



    let file  =  fs.readFileSync(req.file.path);

    let dir="./src/db/img/"+req.authData.playload
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    sharp(file).resize(100,100).toFile(dir + "/pic")

    fs.unlink(req.file.path)

    res.send("sucess")
}


function takeThatImg(req,res){

    console.log("------------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>><")

    console.log(req.params.email)

    User.find({email: req.params.email}).then(user=>{
        console.log(user._id)
    })
    let dir="./src/db/img/"+"5bd093c999b8b8309027815d"+ "/pic";
    res.download(dir)


}

module.exports.userImg = userImg;
module.exports.getUser = getUser;
module.exports.editUser = editUser;
module.exports.takeThatImg= takeThatImg;
