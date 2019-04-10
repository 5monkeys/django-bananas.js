.PHONY: build
build:
	npm run test

.PHONY: publish
publish: build
	cd dist/ && \
		sed -i 's/"private": true,/"private": false,/' package.json && \
		npm publish
