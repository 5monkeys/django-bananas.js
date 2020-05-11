"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsLogger = _interopRequireDefault(require("js-logger"));

var _swaggerClient = _interopRequireDefault(require("swagger-client"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = _jsLogger.default.get("bananas");

class APIClient extends _swaggerClient.default {
  constructor(url) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = typeof url === "object" ? _objectSpread({}, url, {}, opts) : _objectSpread({
      url
    }, opts);

    if (!options.errorHandler) {
      options.errorHandler = function () {
        return logger.error(...arguments);
      };
    }

    if (!options.progressHandler) {
      options.progressHandler = function () {
        return logger.debug(...arguments);
      };
    }

    logger.debug("Initializing Swagger Client...", options);
    super(options);
  }

  http(request) {
    var csrftoken = (0, _utils.getCookie)("csrftoken");
    return super.http(_objectSpread({}, request, {
      headers: _objectSpread({
        "X-CSRFToken": csrftoken == null ? "" : csrftoken
      }, request.headers)
    }));
  }

  execute(argHash) {
    this.progressHandler({
      done: false
    });
    return super.execute(_objectSpread({}, argHash, {
      requestInterceptor: request => {
        // Intercept request to support OPTIONS http method
        if (argHash && argHash.parameters && argHash.parameters.__method__) {
          argHash.method = argHash.parameters.__method__;
          request.method = argHash.method;
          delete argHash.parameters.__method__;
        }

        return this.requestInterceptor ? this.requestInterceptor(request) : request;
      },
      responseInterceptor: response => {
        // Intercept response and catch API errors
        if (response.status >= 403) {
          var {
            operationId
          } = argHash;
          logger.debug("Catched API Response:", operationId, response);
          var message = response.obj && response.obj.detail ? response.obj.detail : "API ".concat(response.statusText);
          this.errorHandler(message);
        } else {
          this.progressHandler({
            done: true
          });
        }

        return this.responseInterceptor ? this.responseInterceptor(response) : response;
      }
    })).catch(error => {
      // Connection error
      if (error.response) {
        this.progressHandler({
          done: true
        });
      } else {
        logger.error("API Connection Error", error);
        this.errorHandler("API Unreachable");
      }

      throw error;
    });
  }

}
/* Both of these are needed to pass along session cookies */


APIClient.http.withCredentials = true;
APIClient.prototype.http.withCredentials = true;
/* Extend swagger client props */

var {
  makeApisTagOperation
} = _swaggerClient.default;

_swaggerClient.default.makeApisTagOperation = client => {
  var interfaces = makeApisTagOperation(client);
  var {
    apis
  } = interfaces; // operationId -> originalOperationId mapping

  var operationIdMap = Object.values(client.spec.paths).reduce((result, specs) => _objectSpread({}, result, {}, Object.values(specs).filter(spec => spec.operationId).reduce((mapping, spec) => _objectSpread({}, mapping, {
    [spec.operationId]: spec
  }), {})), {}); // Expose flattened operations

  interfaces.operations = Object.keys(apis).filter(tag => tag.startsWith("app:")).reduce((calls, app) => {
    return _objectSpread({}, calls, {}, apis[app], {}, Object.entries(apis[app]).reduce((originals, _ref) => {
      var [operationId, call] = _ref;
      var spec = operationIdMap[operationId]; // Shortcut for OPTIONS method call for this endpoint

      call.options = parameters => call(_objectSpread({}, parameters, {
        __method__: "OPTIONS"
      })); // Build schema spec for this endpoint


      call.title = spec.summary;
      call.schema = spec.parameters.reduce((parameters, parameter) => {
        if (parameter.in === "body") {
          var required = parameter.schema.required || [];
          parameters[parameter.name] = Object.entries(parameter.schema.properties).reduce((schema, _ref2) => {
            var [key, value] = _ref2;
            return _objectSpread({}, schema, {
              [key]: _objectSpread({}, value, {
                required: required.includes(key)
              })
            });
          }, {});
        } else if (parameter.in === "query") {
          parameters[parameter.name] = parameter;
        }

        return parameters;
      }, {});
      var response200 = spec.responses[200];
      call.response = response200 != null && response200.schema != null ? simplifySchema(response200.schema) : undefined;
      return _objectSpread({}, originals, {
        [spec.__originalOperationId]: call
      });
    }, {}));
  }, {}); // Add auth helper flag
  // Shema does NOT contain login endpoint -> User IS authenticated

  interfaces.isAuthenticated = !interfaces.operations["bananas.login:create"];
  return interfaces;
};

var _default = APIClient;
exports.default = _default;

function simplifySchema(schema) {
  if (schema.type === "object") {
    return schema.properties;
  }

  if (schema.type === "array") {
    return simplifySchema(schema.items);
  }

  return schema;
}