const should = require('should');
const loader = require('../loader');
const path = require('path');
const fs = require('fs');

describe('Loader', function(){

	const sampleHtmlFilePath = path.join(__dirname, '../sample', 'sample.html');

	it('should load successfully from file', function(done){
		loader.load(sampleHtmlFilePath).then(function(data){
			data.should.be.an.instanceOf(Object);
			data.html().should.not.be.empty();
			done();
		}).catch(done);
	});

	it('should load successfully from stream', function(done){
		var stream = fs.createReadStream(sampleHtmlFilePath);
		loader.load(stream).then(function(data){
			data.should.be.an.instanceOf(Object);
			data.html().should.not.be.empty();
			done();
		}).catch(done);
	});

	it('should fail to load', function(done){
		loader.load('sample').should.be.rejected();
		done();
	});

});
