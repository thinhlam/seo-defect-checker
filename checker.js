const loader = require('./loader');
const writer = require('./writer');
const defaultRules = require('./predefined-rules');

const check = (input, output = console, rules = Object.values(defaultRules)) => {
	return loader.load(input).then(function(dom) {
		let issues = rules.map(r => r.check(dom)).filter(i => !i.success);
		return writer.write(issues, output);
	});
}

module.exports.check = check;
module.exports.rules = defaultRules;
