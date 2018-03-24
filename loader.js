const fs = require('fs');
const stream = require('stream');
const toString = require('stream-to-string');
const cheerio = require('cheerio');


const load = (inputSrc) => {
	if (typeof inputSrc === 'string') {
		return loadFromFile(inputSrc);
	} else if (inputSrc instanceof stream.Readable) {
		return loadFromStream(inputSrc);
	} else {
		return Promise.reject("not a valid input src");
	}
}

const loadFromStream = (src) => {
	return toString(src).then(function(data) {
		return cheerio.load(data);
	});
}

const loadFromFile = (path) => {
	return new Promise(function(resolve, reject) {
		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(cheerio.load(data));
			}
		})
	});
}

module.exports.load = load;
