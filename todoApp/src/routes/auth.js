const router = module.exports = require('express').Router();
const login = require("./../core/auth").login
const registry = require("./../core/auth").registry


router.post("/api/login",login);

router.post("/api/registry",registry);



