.PHONY: build
build:
	npm run test

.PHONY: publish
publish: build
	cd dist/ && npm publish --dry-run
