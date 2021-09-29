var express = require('express');
const { login } = require('../service/authService');
const { createUser } = require('../service/userService');
var router = express.Router();

router.post('/login', async function (req, res) {
	const token = await login(req.body);
    res.send({ token });
});

router.post('/create-user', async function (req, res) {
	const user = await createUser(req.body);
	res.send({ user });
});

module.exports = router;
