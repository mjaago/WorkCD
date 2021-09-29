var express = require('express');
const { authorizeRequest } = require('../middleware/authorizeRequest');
const { createCompany, addManager } = require('../service/companyService');
var router = express.Router();

router.use(authorizeRequest);

router.post('/create', async function (req, res) {
	const authenticatedUserId = req.userId;
	const company = await createCompany(req.body.name, authenticatedUserId);
	res.send({ company });
});

router.post('/add-manager', async function (req, res) {
	const authenticatedUserId = req.userId;
	const company = await addManager(req.body, authenticatedUserId);
	res.send({ company });
});

router.post('/add-worker', async function (req, res) {
	const authenticatedUserId = req.userId;
	const company = await addManager(req.body, authenticatedUserId);
	res.send({ company });
});

module.exports = router;
