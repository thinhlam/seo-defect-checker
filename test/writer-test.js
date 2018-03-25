const should = require('should');
const writer = require('../writer');
const fs = require('fs');
const assert = require('assert');
const sinon = require('sinon');
const path = require('path');


describe('test writer', function(){

	var issues = [
		{success: false, msg: "First Issue"},
		{success: false, msg: "Second Issue"},
		{success: false, msg: "Third Issue"}
	];

	var spy = sinon.spy(console, "log");

	it('should write result to console', function(done){
		writer.write(issues, console).then(function(iss){
			var msg = issues.map(i => `${i.msg}\n`).join('');
			assert(console.log.withArgs(msg).calledOnce);
			done();
		}).catch(done);
	})

	it('should write to file', function(done){
		writer.write(issues, './result.txt').then(function(iss){
			assert(fs.existsSync('./result.txt'));
			done();
		}).catch(done);
	})

})
