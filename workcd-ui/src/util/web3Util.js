import { Signer } from '@ethersproject/abstract-signer';
import { utils, Contract } from 'ethers';
import CompanyContractABI from '../contract-abi/CompanyContract.json';

function trunkateAddress(address) {
	if (!address || address.length <= 10) {
		return address;
	}
	return address.slice(0, 6) + '...' + address.slice(-4);
}

async function isCompanyOwner(providerOrSigner, company) {
	return (
		Signer.isSigner(providerOrSigner) &&
		(await providerOrSigner.getAddress()) === company.owner
	);
}

async function getCompanyContract(providerOrSigner, selectedCompany) {
	if (!selectedCompany.compContract || !Signer.isSigner(providerOrSigner)) {
		return null;
	}
	const compContractInterface = new utils.Interface(CompanyContractABI);
	const contract = new Contract(
		selectedCompany.compContract,
		compContractInterface,
		providerOrSigner,
	);
	return contract;
}

export { trunkateAddress, isCompanyOwner, getCompanyContract };
