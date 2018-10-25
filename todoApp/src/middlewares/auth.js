const User = require("../db/models/user");

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

    if (req.body.password.length < 6) {
        res.status(400).send("Password must be at least 6 characters long")
        return
    }

    emailVerify(req.body.email,docs => {
        if(docs.length==0){
            res.status(400).send("Email doesn't exists")
            return
        }else{
            next();
        }
    })
}

function emailVerify(email,cb) {
    User.find({email : email})
        .then(cb)
}

module.exports.verifyRegistryData = verifyRegistryData;
module.exports.verifyLogInData = verifyLogInData;