const router = module.exports = require('express').Router();
const verifyToken = require("../middlewares/verifyToken")
const {getUser,editUser,userImg,takeThatImg} = require("../core/user")
const verifyUserData = require("../middlewares/user").verifyUserData
var multer = require('multer')
var upload = multer({
    dest: './tmp'
})



router.get("/user", verifyToken,getUser);

router.put("/user",verifyToken,upload.single('file'),verifyUserData,editUser);

router.post("/img",verifyToken,upload.single('file'),userImg);
router.get("/img/:email",takeThatImg);
