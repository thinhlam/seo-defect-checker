const fs = require('fs');
const stream = require('stream');

const write = (issues, output) => {
	let formattedResult = issues.map(i => `${i.msg}\n`).join('');
	if (output == null || output === undefined) {
		resolve(result);
	} else if (typeof output === 'string') {
		fs.writeFile(output, formattedResult, function(err, data) {
			if (err) {
				throw err;
			}
		})
	} else if (output instanceof stream.Writable) {
		output.write(formattedResult);
	} else if (output instanceof console.Console) {
		console.log(formattedResult);
	} else {
		throw 'Not supported output.';
	}
}

module.exports.write = write;
