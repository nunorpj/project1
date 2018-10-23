const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken")
const {getUser,editUser} = require("../core/user")




router.get("/api/user", verifyToken,getUser);

router.put("/api/user", verifyToken,editUser);