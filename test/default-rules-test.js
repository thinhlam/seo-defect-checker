const should = require('should');
const checker = require('../checker');


describe('test default rule', function(){
	it('should find 7 violations', function(done){
		checker.check('../sample/simple.html').then(function(issues){
			issues.length.should.be.equal(7);
			done();
		});
	});
})
