const should = require('should');
const checker = require('../checker');
const path = require('path');
const assert = require('assert');


describe('test default rules', function() {

	const simpleHtmlFilePath = path.join(__dirname, '../sample', 'simple.html');
	const seoFriendlyHtmlFilePath = path.join(__dirname, '../sample', 'seo-friendly.html');
	const seoViolationsHtmlFilePath = path.join(__dirname, '../sample', 'seo-violations.html');

	it('should find 7 violations', function(done) {
		checker.check(simpleHtmlFilePath).then(function(issues) {
			issues.length.should.equal(7);
			issues[0].msg.should.be.exactly('There are 2 <img> tag without alt attribute.');
			issues[3].msg.should.be.exactly('There are head tag without descriptions.');
			done();
		}).catch(done);
	});

	it('should find 2 violations', function(done) {
		let rules = [
			checker.rules.ImgTagWithoutAltRule,
			checker.rules.MissingKeywordsInHeadTagRule,
		];
		checker.check(simpleHtmlFilePath, console, rules).then(function(issues) {
			issues.length.should.equal(2);
			issues[0].msg.should.be.exactly('There are 2 <img> tag without alt attribute.');
			done();
		}).catch(done);
	});

	it('should find no violation', function(done) {
		checker.check(seoFriendlyHtmlFilePath).then(function(issues) {
			issues.length.should.equal(0);
			done();
		}).catch(done);
	})

	it('should find 2 img tag without alt attribute', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.ImgTagWithoutAltRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('There are 2 <img> tag without alt attribute.');
				done();
			}).catch(done);
	})

	it('should find 2 a tag without rel', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.ATagWithoutRelRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('There are 2 <a> tag without rel attribute.');
				done();
			}).catch(done);
	})

	it('should find missing title tag inside head tag', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.MissingTitleInHeadTagRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('There are head tag without title tag.');
				done();
			}).catch(done);
	})

	it('should find missing meta descriptions inside head tag', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.MissingDescriptionInHeadTagRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('There are head tag without descriptions.');
				done();
			}).catch(done);
	})

	it('should find missing meta keywords inside head tag', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.MissingKeywordsInHeadTagRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('There are head tag without keywords.');
				done();
			}).catch(done);
	})

	it('should find more than 15 strong tag', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.MoreThan15StrongTagRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('This HTML have more than 15 <strong> tag.');
				done();
			}).catch(done);
	})

	it('should find more multiple h1 tag', function(done) {
		checker.check(seoViolationsHtmlFilePath, console, [checker.rules.MultipleH1TagRule])
			.then(function(issues) {
				issues.length.should.equal(1);
				issues[0].msg.should.be.exactly('This HTML have more than 1 <h1> tag.');
				done();
			}).catch(done);
	})



})
