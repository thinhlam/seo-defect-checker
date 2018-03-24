const utils = require('./utils');

class BaseRule {
	constructor(msgBuilder) {
		this.msgBuilder = msgBuilder;
	}

	check(dom) {
		return this.msgBuilder();
	}
}

class TagWithoutAttributeRule extends BaseRule {
	constructor(msgBuilder, tag, missingAttrs) {
		super(msgBuilder);
		this.tag = tag;
		this.missingAttrs = missingAttrs;
	}

	check(dom) {
		var missingAttr = Array.isArray(this.missingAttrs) ? this.missingAttrs.join(', ') : this.missingAttrs;
		var count = dom(`${this.tag}:not([${missingAttr}])`).length;
		return count > 0 ? utils.error(this.msgBuilder(count)) : utils.success;
	}
}

class TagCountExceedThresholdRule extends BaseRule {
	constructor(msgBuilder, tag, threshold) {
		super(msgBuilder);
		this.tag = tag;
		this.threshold = threshold;
	}

	check(dom) {
		var count = dom(this.tag).length;
		return count > this.threshold ? utils.error(this.msgBuilder(count)) : utils.success;
	}
}

class TagCountRule extends BaseRule {
	constructor(msgBuilder, findTagExp, evaluator) {
		super(msgBuilder);
		this.findTagExp = findTagExp;
		this.evaluator = evaluator;
	}

	check(dom) {
		var count = dom(this.findTagExp).length;
		return this.evaluator(count) ? utils.error(this.msgBuilder(count)) : utils.success;
	}
}

module.exports = {
	TagCountRule,
	TagWithoutAttributeRule,
	TagCountExceedThresholdRule
};
