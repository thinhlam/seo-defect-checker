const {
	TagCountRule,
	TagWithoutAttributeRule,
	TagCountExceedThresholdRule
} = require('./rules');

const ImgTagWithoutAltRule = new TagWithoutAttributeRule((n) => {
	return `There ${n > 1 ? 'are' : 'is'} ${n} <img> tag without alt attribute.`;
}, 'img', 'alt');

const ATagWithoutRelRule = new TagWithoutAttributeRule((n) => {
	return `There ${n > 1 ? 'are' : 'is'} ${n} <a> tag without rel attribute.`
}, 'a', 'rel');

const MissingTitleInHeadTagRule = new TagCountRule((n) => {
	return 'There are head tag without title tag.'
}, 'head:not(:has(>title))', (n) => {
	return n > 0;
});

const MissingDescriptionInHeadTagRule = new TagCountRule((n) => {
	return 'There are head tag without descriptions.'
}, 'head:not(:has(>meta[name="descriptions"]))', (n) => {
	return n > 0;
});

const MissingKeywordsInHeadTagRule = new TagCountRule((n) => {
	return 'There are head tag without keywords.'
}, 'head:not(:has(>meta[name="keywords"]))', (n) => {
	return n > 0;
});

const MoreThan15StrongTagRule = new TagCountExceedThresholdRule((n) => {
	return 'This HTML have more than 15 <strong> tag';
}, 'strong', 15);

const MultipleH1TagRule = new TagCountExceedThresholdRule((n) => {
	return 'This HTML have more than 1 <h1> tag';
}, 'h1', 1);

module.exports = {
	ImgTagWithoutAltRule,
	ATagWithoutRelRule,
	MissingTitleInHeadTagRule,
	MissingDescriptionInHeadTagRule,
	MissingKeywordsInHeadTagRule,
	MoreThan15StrongTagRule,
	MultipleH1TagRule
};
