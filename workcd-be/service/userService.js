const { saveUser } = require('../dao/userDao');

async function createUser({ firstName, lastName, email }) {
	const user = { firstName, lastName, email };

	console.log('Creating user', user);
	if (!isValidUser(user)) {
		return null;
	}
	const savedUser = await saveUser(user);
	return savedUser;
}

function isValidUser({ firstName, lastName, email }) {
	return firstName && lastName && email;
}

module.exports = { createUser };
