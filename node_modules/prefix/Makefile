serve: node_modules
	@$</serve/bin/serve -Slojp 0

test: node_modules
	@$</mocha/bin/mocha test/prefix.spec.js

node_modules: package.json
	@npm install

.PHONY: serve test
