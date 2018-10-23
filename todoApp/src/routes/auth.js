const router = module.exports = require('express').Router();
const {login,registry,verifyRegistryData,verifyLogInData} = require("./../core/auth")


router.post("/api/login",verifyLogInData,login);

router.post("/api/registry",verifyRegistryData,registry);



