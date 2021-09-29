const { saveCompany, addCompanyManager, getCompany } = require('../dao/companyDao');

async function addManager({ userId, companyId }, authenticatedUserId) {
	const company = await getCompany(companyId);

	if (!company || !isManager(authenticatedUserId, company)) {
		return null;
	}

	const updatedCompany = await addCompanyManager(company.id, userId);
	return updatedCompany;
}

function isManager(authenticatedUserId, company) {
	return company.managers.includes(authenticatedUserId);
}

async function createCompany(name, userId) {
	const company = { name };
	const savedCompany = await saveCompany(company);
	savedCompany = await addCompanyManager(company.id, userId);
	return savedCompany;
}

module.exports = { createCompany, addManager };
