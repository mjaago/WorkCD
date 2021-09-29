const jwt = require('jsonwebtoken');
const { getUserByFullName } = require('../dao/userDao');

const superSecretKey = 'Said Im never lackin, always pistol packing With them automatics, we gon send him to heaven';

async function login({ firstName, lastName }) {
	// 24h expiry
	const user = await getUserByFullName(firstName, lastName);
	const token = jwt.sign({ userId: user.id, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 }, superSecretKey);
	return token;
}

function parseTokenPayload(token) {
	return jwt.verify(token, superSecretKey);
}

module.exports = { login, parseTokenPayload };
