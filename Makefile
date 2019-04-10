.PHONY: build dist publish
build:
	npm run test

BRANCH:=dist
dist: build
	./node_modules/.bin/gh-pages --dist dist --branch ${BRANCH}

publish: build
	cd dist/ && npm publish --dry-run
