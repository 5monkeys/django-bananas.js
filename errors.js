"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnonymousUserError = exports.PageNotImplementedError = exports.InternalPageError = exports.PageNotFoundError = exports.PageError = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class PageError extends Error {}

exports.PageError = PageError;

class PageNotFoundError extends PageError {
  constructor() {
    super(...arguments);

    _defineProperty(this, "message", "Page not found");

    _defineProperty(this, "code", 404);
  }

}

exports.PageNotFoundError = PageNotFoundError;

class InternalPageError extends PageError {
  constructor() {
    super(...arguments);

    _defineProperty(this, "message", "Internal page error");

    _defineProperty(this, "code", 500);
  }

}

exports.InternalPageError = InternalPageError;

class PageNotImplementedError extends PageError {
  constructor() {
    super(...arguments);

    _defineProperty(this, "message", "Page not implemented");

    _defineProperty(this, "code", 501);
  }

}

exports.PageNotImplementedError = PageNotImplementedError;

class AnonymousUserError extends Error {}

exports.AnonymousUserError = AnonymousUserError;