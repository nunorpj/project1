const router = module.exports = require('express').Router();
const {login,registry} = require("./../core/auth")


const {verifyRegistryData,verifyLogInData} = require('../middlewares/auth')

router.post("/api/login",verifyLogInData,login);

router.post("/api/registry",verifyRegistryData,registry);



