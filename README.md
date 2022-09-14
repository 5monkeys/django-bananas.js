# Bananas-commerce-admin

Bananas-commerce-admin is an new and updated version of
[django-bananas.js](https://github.com/5monkeys/django-bananas.js) operating
with the same routing and apis, but updated to use typescript and react hooks as
much as possible. It still contains some legacy code and logic from the old
admin but is much more user friendly and looks just about the same.

## Development

In the tld run:

```sh
$ npm ci && npm run build:esm:watch
```

And in the example project run:

```sh
$ npm ci && npm link ../node_modules/react && npm run start
```

Due to npm being weird and duplicating dependencies, you need to run:
`npm link ../node_modules/react` for it to work properly with the example app,
although this is only as long as it is during local development.
