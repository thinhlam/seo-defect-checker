### A module to check whether site is SEO friendly or not.
---

#### Basic usage

```javascript
const checker = require('./checker');
checker.check('./sample/sample.html');
```

#### User is free to compose rules in any order

```javascript
const Rules = require('./predefined-rules');

var rules = [
	Rules.MoreThan15StrongTagRule,
	Rules.ImgTagWithoutAltRule,
	Rules.MissingDescriptionInHeadTagRule
];
checker.check('./sample/sample.html', console, rules);
```
**Default Rules.**

```javascript
const Rules = require('./predefined-rules');
Rules.ImgTagWithoutAltRule,
Rules.ATagWithoutRelRule,
Rules.MissingTitleInHeadTagRule,
Rules.MissingDescriptionInHeadTagRule,
Rules.MissingKeywordsInHeadTagRule,
Rules.MoreThan15StrongTagRule,
Rules.MultipleH1TagRule
```

**Custom rules**

For e.g. Checking if &lt;meta name=“robots” /&gt; exists

```javascript
const {
	TagCountRule,
	TagWithoutAttributeRule,
	TagCountExceedThresholdRule
} = require('./rules');

const customRules = new TagCountRule((count) => {
	return "Your msg"
}, 'meta[name="robots"]', (c) => {
	return n > 0
});
```
For more information take a look at rules.js
