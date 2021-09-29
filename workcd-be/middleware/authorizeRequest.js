const { JWT_HEADER, BEARER_PREFIX, TOKEN_PAYLOAD_USER_ID_KEY } = require('../config/constant');
const { parseTokenPayload } = require('../service/authService');

function authorizeRequest(req, res, next) {
	const tokenHeader = req.headers[JWT_HEADER];
	if (!tokenHeader || !tokenHeader.startsWith(BEARER_PREFIX)) {
		return res.sendStatus(401);
	}
	const token = tokenHeader.replace(BEARER_PREFIX, '');
	let payload;

	try {
		payload = parseTokenPayload(token);
	} catch (err) {
		return res.sendStatus(403);
	}

	req.userId = payload[TOKEN_PAYLOAD_USER_ID_KEY];
	next();
}
module.exports = { authorizeRequest };
