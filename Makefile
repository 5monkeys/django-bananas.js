.PHONY: build dist publish
build:
	npm run test

BRANCH := dist/master
dist: build
	rm -rf node_modules/gh-pages/.cache
	./node_modules/.bin/gh-pages --dist dist --branch ${BRANCH}

publish: build
	cd dist/ && npm publish
