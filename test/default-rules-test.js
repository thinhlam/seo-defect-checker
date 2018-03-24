const should = require('should');
const checker = require('../checker');


describe('test default rules', function(){

	it('should find 7 violations', function(done){
		checker.check('../sample/simple.html').then(function(issues){
			issues.length.should.be.equal(7);
			issues[0].msg.should.be.exactly('There are 2 <img> tag without alt attribute.');
			issues[3].msg.should.be.exactly('There are head tag without descriptions.');
			done();
		});
	});


	it('should find 2 violations', function(done){
		let rules = [
			checker.rules.ImgTagWithoutAltRule,
			checker.rules.MissingKeywordsInHeadTagRule,
		];
		checker.check('../sample/simple.html', console, rules).then(function(issues){
			issues.length.should.be.equal(2);
			issues[0].msg.should.be.exactly('There are 2 <img> tag without alt attribute.');
			done();
		});
	});


	it('should find no violation', function(done){
		checker.check('../sample/seo-friendly.html').then(function(issues){
			issues.length.should.be.equal(0);
			done();
		}).catch(function(error){
			done();
		});
	})

})
