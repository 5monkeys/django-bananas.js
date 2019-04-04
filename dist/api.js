"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _swaggerClient = _interopRequireDefault(require("swagger-client"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var logger = _jsLogger.default.get("bananas");

var APIClient =
/*#__PURE__*/
function (_Swagger) {
  _inherits(APIClient, _Swagger);

  function APIClient(url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, APIClient);

    var options = _typeof(url) === "object" ? _objectSpread({}, url, opts) : _objectSpread({
      url: url
    }, opts);

    if (!options.errorHandler) {
      options.errorHandler = function () {
        return logger.error.apply(logger, arguments);
      };
    }

    if (!options.progressHandler) {
      options.progressHandler = function () {
        return logger.debug.apply(logger, arguments);
      };
    }

    logger.debug("Initializing Swagger Client...", options);
    return _possibleConstructorReturn(this, _getPrototypeOf(APIClient).call(this, options));
  }

  _createClass(APIClient, [{
    key: "http",
    value: function http(request) {
      var csrftoken = (0, _utils.getCookie)("csrftoken");
      return _get(_getPrototypeOf(APIClient.prototype), "http", this).call(this, _objectSpread({}, request, {
        headers: _objectSpread({
          "X-CSRFToken": csrftoken == null ? "" : csrftoken
        }, request.headers)
      }));
    }
  }, {
    key: "execute",
    value: function execute(argHash) {
      var _this = this;

      this.progressHandler({
        done: false
      });
      return _get(_getPrototypeOf(APIClient.prototype), "execute", this).call(this, _objectSpread({}, argHash, {
        requestInterceptor: function requestInterceptor(request) {
          // Intercept request to support OPTIONS http method
          if (argHash && argHash.parameters && argHash.parameters.__method__) {
            argHash.method = argHash.parameters.__method__;
            request.method = argHash.method;
            delete argHash.parameters.__method__;
          }

          return request;
        },
        responseInterceptor: function responseInterceptor(response) {
          // Intercept response and catch API errors
          if (response.status >= 403) {
            var operationId = argHash.operationId;
            logger.debug("Catched API Response:", operationId, response);
            var message = response.obj && response.obj.detail ? response.obj.detail : "API ".concat(response.statusText);

            _this.errorHandler(message);
          } else {
            _this.progressHandler({
              done: true
            });
          }
        }
      })).catch(function (error) {
        // Connection error
        if (error.response) {
          _this.progressHandler({
            done: true
          });
        } else {
          logger.error("API Connection Error", error);

          _this.errorHandler("API Unreachable");
        }

        throw error;
      });
    }
  }]);

  return APIClient;
}(_swaggerClient.default);
/* Both of these are needed to pass along session cookies */


APIClient.http.withCredentials = true;
APIClient.prototype.http.withCredentials = true;
/* Extend swagger client props */

var makeApisTagOperation = _swaggerClient.default.makeApisTagOperation;

_swaggerClient.default.makeApisTagOperation = function (client) {
  var interfaces = makeApisTagOperation(client);
  var apis = interfaces.apis; // operationId -> originalOperationId mapping

  var operationIdMap = Object.values(client.spec.paths).reduce(function (result, specs) {
    return _objectSpread({}, result, Object.values(specs).filter(function (spec) {
      return spec.operationId;
    }).reduce(function (mapping, spec) {
      return _objectSpread({}, mapping, _defineProperty({}, spec.operationId, spec));
    }, {}));
  }, {}); // Expose flattened operations

  interfaces.operations = Object.keys(apis).filter(function (tag) {
    return tag.startsWith("app:");
  }).reduce(function (calls, app) {
    return _objectSpread({}, calls, apis[app], Object.entries(apis[app]).reduce(function (originals, _ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          operationId = _ref2[0],
          call = _ref2[1];

      var spec = operationIdMap[operationId]; // Shortcut for OPTIONS method call for this endpoint

      call.options = function (parameters) {
        return call(_objectSpread({}, parameters, {
          __method__: "OPTIONS"
        }));
      }; // Build schema spec for this endpoint


      call.title = spec.summary;
      call.schema = spec.parameters.reduce(function (parameters, parameter) {
        if (parameter.in === "body") {
          var required = parameter.schema.required || [];
          parameters[parameter.name] = Object.entries(parameter.schema.properties).reduce(function (schema, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            return _objectSpread({}, schema, _defineProperty({}, key, _objectSpread({}, value, {
              required: required.includes(key)
            })));
          }, {});
        } else if (parameter.in === "query") {
          parameters[parameter.name] = parameter;
        }

        return parameters;
      }, {});
      return _objectSpread({}, originals, _defineProperty({}, spec.__originalOperationId, call));
    }, {}));
  }, {}); // Add auth helper flag
  // Shema does NOT contain login endpoint -> User IS authenticated

  interfaces.isAuthenticated = !interfaces.operations["bananas.login:create"];
  return interfaces;
};

var _default = APIClient;
exports.default = _default;