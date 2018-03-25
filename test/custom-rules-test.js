const should = require('should');
const checker = require('../checker');
const path = require('path');
const {
	TagCountRule,
	TagWithoutAttributeRule,
	TagCountExceedThresholdRule
} = require('../rules');

describe('user can easily define custom rules', function() {

	const customRulesHtmlFilePath = path.join(__dirname, '../sample', 'custom-rules.html');

	it('simple custom rules check tag without attr', function(done) {
		const ImgTagWithoutSrc = new TagWithoutAttributeRule((c) => {
			return `There are ${c} <img> tag without src attribute.`;
		}, 'img', 'src');

		checker.check(customRulesHtmlFilePath, console, [ImgTagWithoutSrc]).then(function(issues) {
			issues.length.should.be.equal(1);
			issues[0].msg.should.be.exactly('There are 1 <img> tag without src attribute.');
			done();
		}).catch(done);
	})

	it('simple count p tag rule', function(done) {
		const MultiplePTag = new TagCountExceedThresholdRule((c) => {
			return 'There are more than 2 <p> tag';
		}, 'p', 2);

		checker.check(customRulesHtmlFilePath, console, [MultiplePTag]).then(function(issues) {
			issues.length.should.be.equal(1);
			issues[0].msg.should.be.exactly('There are more than 2 <p> tag');
			done();
		}).catch(done);
	});

	it('simple rule with custom expression and evaluator', function(done) {
		const ULTagWithoutChildLi = new TagCountRule((c) => {
			return "There are ul tag without child li"
		}, 'ul:not(:has(>li))', (c) => {
			return c > 0;
		});

		checker.check(customRulesHtmlFilePath, console, [ULTagWithoutChildLi]).then(function(issues) {
			issues.length.should.be.equal(1);
			issues[0].msg.should.be.exactly('There are ul tag without child li');
			done();
		}).catch(done);
	})

});
