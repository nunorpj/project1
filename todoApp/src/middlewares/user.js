const User = require("../../models/user");

function verifyUserData(req, res, next) {
    if (!req.body.email && !req.body.password && !req.body.name && !req.body.notifications && !req.body.sendingHour) {
        res.status(400).send("Missing params")
        return
    }
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

    if (req.body.email) {
        emailVerify(req.body.email, docs => {
            if (docs.length > 0) {
                res.status(400).send("Email already in use")
                return

            }
        })
    }

    next();

}

function emailVerify(email, cb) {
    User.find({
            email: email
        })
        .then(cb)
}


module.exports.verifyUserData = verifyUserData;