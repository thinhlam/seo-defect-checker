const should = require('should');
const loader = require('../loader');
const fs = require('fs');

describe('Loader', function(){

	it('should load successfully from file', function(done){
		loader.load('../sample/sample.html').then(function(data){
			data.should.be.an.instanceOf(Object);
			data.html().should.not.be.empty();
			done();
		})
	});

	it('should load successfully from stream', function(done){
		var stream = fs.createReadStream('../sample/sample.html');
		loader.load(stream).then(function(data){
			data.should.be.an.instanceOf(Object);
			data.html().should.not.be.empty();
			done();
		})
	});

	it('should fail to load', function(done){
		loader.load('sample').should.be.rejected();
		done();
	});

});
