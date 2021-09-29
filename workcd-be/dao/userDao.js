const userTable = new Map();

async function saveUser(user) {
	const id = Math.floor(Math.random() * 1000000);
	user.id = id;
	userTable.set(id, user);
	return user;
}

async function getUserByFullName(firstName, lastName) {
	console.log(firstName, lastName, Array.from(userTable.values()));
	return Array.from(userTable.values()).find((u) => u.firstName === firstName && u.lastName === lastName);
}

module.exports = { saveUser, getUserByFullName };
