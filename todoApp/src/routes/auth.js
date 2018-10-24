const router = module.exports = require('express').Router();
const {login,registry} = require("./../core/auth")


const {verifyRegistryData,verifyLogInData} = require('../middlewares/auth')

router.post("/login",verifyLogInData,login);

router.post("/registry",verifyRegistryData,registry);



