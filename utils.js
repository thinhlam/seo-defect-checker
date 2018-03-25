module.exports.success = {
	success: true
};
module.exports.error = (message) => {
	return {
		success: false,
		msg: message
	}
};
