# django-bananas.js

[![Build Status](https://travis-ci.com/5monkeys/django-bananas.js.svg?branch=master)](https://travis-ci.com/5monkeys/django-bananas.js)
[![Coverage Status](https://coveralls.io/repos/github/5monkeys/django-bananas.js/badge.svg?branch=master)](https://coveralls.io/github/5monkeys/django-bananas.js?branch=master)
![npm](https://img.shields.io/npm/v/django-bananas.svg)

```
npm install django-bananas react react-dom @material-ui/core @material-ui/icons final-form final-form-arrays react-final-form react-final-form-arrays
```

``` jsx
import Bananas from "django-bananas";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <Bananas.App
    api="http://localhost:8000/api"
    pages={route => import(`./pages/${route}`)}
  />,
  document.getElementById("root")
);
```

## Settings

| Property | Type | Default | Choices |
|:-|:-|:-|:-|
| **api** | String, Object | **Required** ||
| **pages** | Function | **Required** ||
| **title** | String | *Bananas* ||
| **logo** | Function, String, Boolean | true ||
| **branding** | String | *Bananas* ||
| **version** | String | *v1.0.0* ||
| **theme** | Object | *[django-bananas/themes].default (light)* ||
| **pageTheme** | Object | *undefined* ||
| **nav** | Object, Boolean | *{"home": ..., "bananas.me:list": ...}* ||
| **layout** | String | *horizontal* | horizontal, vertical |
| **permanent** | Boolean | *false* ||
| **collapsed** | Boolean | *false* ||
| **dense** | Boolean | *false* ||
| **editableSettings** | Boolean | *false* ||
| **loginForm** | Function | *undefined* ||
| **logLevel** | String, Object | *WARN* | INFO, DEBUG, WARN, ERROR, OFF |
| **prefix** | String | *""* ||
| **customizeContext** | Function | *undefined* ||

### api
Base API URL.

``` jsx
<Bananas.App
  // ...
  api="http://localhost:8000/api"
/>
```

Alternatively, you can pass an object of extra [swagger-js](https://github.com/swagger-api/swagger-js) options. For example, you could add a custom header:

``` jsx
<Bananas.App
  // ...
  api={{
    url: "http://localhost:8000/api",
    requestInterceptor: request => {
      request.headers.Authorization = "secret";
      return request;
    },
  }}
/>
```

### pages
A function that dynamically imports pages. A page file should `export default` a React component to render for the given route.

```js
route => import(`./pages/${route}`)
```

Make sure that the directory containing your page files exists (even if it’s empty)! (`./pages/` in the above example.) Otherwise your build tool might throw an error.

### title
Sets trailing part of the document title: `<current page title> | My Admin-App Title`.

### logo
Use *boolean* `false` to not render a logo, or `true` to show the default *Bananas* logo.
Use a *string* for an image URL or a *function/component* for full control.

``` jsx
<Bananas.App
  // ...
  logo={true|false}
  logo={"https://foo.bar/logo.svg"}
  logo={<MyLogo />}
/>
```

### branding & version
Shown in the navigation header next to the logo.

### theme & pageTheme
`theme` and `pageTheme` are *Material UI* theme objects, either partially or fully created. `pageTheme` is only needed if you want a specific theme for the page area, other than the navigation, boot and login screen.

``` jsx
<Bananas.App
  // ...
  theme={themes.dark}
  pageTheme={themes.light}
/>
```

### nav
The `nav` setting lets you define the order of items in the navigation, as well as icons for each item. It is a mapping between navigation endpoints *(operation-id)* and icons, or an array of navigation endpoints if you want to define order but not icons. Items not mentioned in the mapping or array are put last in alphabetical order, with a fallback icon (if needed).

``` jsx
<Bananas.App
  // ...
  nav={{
    // "home": MyCustomDashboardIcon,
    // "bananas.me:list": MyCustomUserIcon,
    "example.user:list": PeopleIcon,
  }}
/>
```

### layout
Defines location of the app navigation. Use `horizontal` layout for a side drawer, or `vertical` for a top bar.

### permanent & collapsed
The `permanent` and `collapsed` settings is only applicable for `horizontal` layout. Permanent makes the drawer non-collapsable, and collapsable defines the initial state of the drawer.

### dense
Set `dense={true}` for smaller fonts/icons in the navigation.

### loginForm
Set `loginForm` to a react component if you need a custom login form other than the built-in default form/endpoint.

### logLevel
Global log level:
``` jsx
<Bananas.App
  // ...
  logLevel="DEBUG",
/>
```

Log level per application label:
``` jsx
<Bananas.App
  // ...
  logLevel={{
    bananas: "WARN",
    myapp: "DEBUG",
  }}
/>
```

### prefix
Prefix sets the base url for the router. Use this if the admin app is mounted on a sub-path, i.e. `/bananas/`.

### customizeContext
A function that receives the standard `AdminContext` and returns a new context object.

## Browser support

The code shipped to npm uses modern JavaScript, supported natively by all evergreen browsers. If you need deeper browser support, you need to configure your build system to transpile and polyfill `node_modules/` code.

If you use [Create React App](https://facebook.github.io/create-react-app/), which runs Babel on code from npm packages, you can get IE11 support by adding the following to your main entrypoint:

```js
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
```

## Example app

This repo contains an example app in the `app/` folder.

1. Set up and start the backend: [django-bananas](https://github.com/5monkeys/django-bananas).

2. Copy the sample settings:

   ```
	 cp app/src/_bananas.settings.js app/src/bananas.settings.js
   ```

   You can then play around with different settings in `bananas.settings.js`.

3. Start the example app:

   ```
   docker-compose up -d
   ```

   Alternatively, you could run outside docker:

   ```
   npm ci
   npm start
   ```

(If you develop on this package, you need to run `npm ci` and run tests outside docker. See package.json.)
