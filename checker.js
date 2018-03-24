const loader = require('./loader');
const writer = require('./writer');
const defaultRules = require('./predefined-rules');

const check = (input, output, rules = Object.values(defaultRules)) => {
	loader.load(input).then(function(dom) {
		let issues = rules.map(r => r.check(dom)).filter(i => !i.success);
		writer.write(issues, output);
	});
}

module.exports.check = check;
module.exports.rules = defaultRules;
