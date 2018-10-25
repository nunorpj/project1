const User = require("../db/models/user");




 function verifyUserData(req, res, next) {
    if (req.body.name) {
        if (req.body.name < 4) {
            res.status(400).send("Name it's to short")
            return
        }
    }
    if (req.body.password) {
        if (req.body.password < 6) {
            res.status(400).send("Password it's to short")
            return
        }
    }


    if (req.body.sendingHour) {
        if (req.body.sendingHour < 0 && req.body.sendingHour > 23) {
            res.status(400).send("Invalid hour")
            return
        }
    }


     emailVerify(req.body.email,(err,docs) => {
        if (docs.length != 0) {
            if (docs[0]._id != req.authData.playload) {
                res.status(400).send("Email already exists")
                return 
            }else{
                next();
            }
        }else{
            next()
        }
    })

}


 function emailVerify(email, cb) {
    User.find({
          email: email
      })
      .exec(cb)
}


module.exports.verifyUserData = verifyUserData;