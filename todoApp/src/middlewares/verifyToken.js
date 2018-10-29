const jwt = require("jsonwebtoken");


const verifyToken = module.exports = function (req, res, next) {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    //check if bearer id undefine

    if (typeof bearerHeader !== "undefined") {
        //split at the space
        const bearer = bearerHeader.split(" ");
        //get token from array
        const bearerToken = bearer[1];
        
        jwt.verify(
            bearerToken,
            process.env.SECRETKEY, {
                expiresIn: "1h"
            }, (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    req.authData = authData;
                    next();

                }
            
            });
    } else {
        res.sendStatus(401);
    }

}

