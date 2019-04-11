"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnonymousUserError = exports.PageNotImplementedError = exports.InternalPageError = exports.PageNotFoundError = exports.PageError = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PageError =
/*#__PURE__*/
function (_Error) {
  _inherits(PageError, _Error);

  function PageError() {
    _classCallCheck(this, PageError);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageError).apply(this, arguments));
  }

  return PageError;
}(_wrapNativeSuper(Error));

exports.PageError = PageError;

var PageNotFoundError =
/*#__PURE__*/
function (_PageError) {
  _inherits(PageNotFoundError, _PageError);

  function PageNotFoundError() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PageNotFoundError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PageNotFoundError)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "message", "Page not found");

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "code", 404);

    return _this;
  }

  return PageNotFoundError;
}(PageError);

exports.PageNotFoundError = PageNotFoundError;

var InternalPageError =
/*#__PURE__*/
function (_PageError2) {
  _inherits(InternalPageError, _PageError2);

  function InternalPageError() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, InternalPageError);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(InternalPageError)).call.apply(_getPrototypeOf3, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "message", "Internal page error");

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "code", 500);

    return _this2;
  }

  return InternalPageError;
}(PageError);

exports.InternalPageError = InternalPageError;

var PageNotImplementedError =
/*#__PURE__*/
function (_PageError3) {
  _inherits(PageNotImplementedError, _PageError3);

  function PageNotImplementedError() {
    var _getPrototypeOf4;

    var _this3;

    _classCallCheck(this, PageNotImplementedError);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(PageNotImplementedError)).call.apply(_getPrototypeOf4, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "message", "Page not implemented");

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "code", 501);

    return _this3;
  }

  return PageNotImplementedError;
}(PageError);

exports.PageNotImplementedError = PageNotImplementedError;

var AnonymousUserError =
/*#__PURE__*/
function (_Error2) {
  _inherits(AnonymousUserError, _Error2);

  function AnonymousUserError() {
    _classCallCheck(this, AnonymousUserError);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnonymousUserError).apply(this, arguments));
  }

  return AnonymousUserError;
}(_wrapNativeSuper(Error));

exports.AnonymousUserError = AnonymousUserError;