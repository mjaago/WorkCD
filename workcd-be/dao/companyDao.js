const companyTable = new Map();

async function saveCompany(company) {
	const id = Math.floor(Math.random() * 1000000);
	company.id = id;
	company.managers = [];
	companyTable.set(id, company);
	return company;
}

async function addCompanyManager(companyId, userId) {
	const company = companyTable.get(companyId);
	company.managers = [...company.managers, userId];
	return company;
}

async function getCompany(companyId) {
	return companyTable.get(companyId);
}

module.exports = {
	saveCompany,
	addCompanyManager,
	getCompany,
};
