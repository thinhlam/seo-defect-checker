const fs = require('fs');
const stream = require('stream');

const write = (issues, output) => {
	return new Promise(function(resolve, reject){
		let formattedResult = issues.map(i => `${i.msg}\n`).join('');
		if (typeof output === 'string') {
			fs.writeFile(output, formattedResult, function(err, data) {
				if (err) {
					reject(err);
				}
				resolve(issues);
			})
		} else if (output instanceof stream.Writable) {
			output.write(formattedResult);
			resolve(issues);
		} else if (output instanceof console.Console) {
			console.log(formattedResult);
			resolve(issues);
		} else {
			reject('Not supported output.');
		}
	});
}

module.exports.write = write;
