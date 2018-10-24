const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken")
const {getUser,editUser} = require("../core/user")
const verifyUserData = require("../middlewares/user").verifyUserData



router.get("/user", verifyToken,getUser);

router.put("/user", verifyToken,verifyUserData,editUser);