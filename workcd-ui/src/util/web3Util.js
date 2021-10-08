function trunkateAddress(address) {
	if (!address || address.length <= 10) {
		return address;
	}
	return address.slice(0, 6) + '...' + address.slice(-4);
}

export { trunkateAddress };
