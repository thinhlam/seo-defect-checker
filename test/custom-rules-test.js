const should = require('should');
const checker = require('../checker');
const {
	TagCountRule,
	TagWithoutAttributeRule,
	TagCountExceedThresholdRule
} = require('../rules');

describe('user can easily define custom rules', function() {

	it('simple custom rules', function(done) {
		const ImgTagWithoutSrc = new TagWithoutAttributeRule((c) => {
			return `There are ${c} <img> tag without src attribute.`;
		}, 'img', 'src');

		checker.check('../sample/custom-rules.html', console, [ImgTagWithoutSrc]).then(function(issues) {
			issues.length.should.be.equal(1);
			issues[0].msg.should.be.exactly('There are 1 <img> tag without src attribute.');
			done();
		});
	})

	it('simple count tag rule', function(done) {
		const MultiplePTag = new TagCountExceedThresholdRule((c) => {
			return 'There are more than 2 <p> tag';
		}, 'p', 2);

		checker.check('../sample/custom-rules.html', console, [MultiplePTag]).then(function(issues) {
			issues.length.should.be.equal(1);
			issues[0].msg.should.be.exactly('There are more than 2 <p> tag');
			done();
		});
	});

	it('simple rule with custom expression and evaluator', function(done) {
		const ULTagWithoutChildLi = new TagCountRule((c) => {
			return "There are ul tag without child li"
		}, 'ul:not(:has(>li))', (c) => {
			return c > 0;
		});

		checker.check('../sample/custom-rules.html', console, [ULTagWithoutChildLi]).then(function(issues) {
			issues.length.should.be.equal(1);
			issues[0].msg.should.be.exactly('There are ul tag without child li');
			done();
		});
	})

});
