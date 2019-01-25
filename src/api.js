import Logger from "js-logger";
import Swagger from "swagger-client";

import { getCookie } from "./utils";

const logger = Logger.get("bananas");

class APIClient extends Swagger {
  constructor(url, opts = {}) {
    if (!opts.errorHandler) {
      opts.errorHandler = logger.error;
    }
    super(url, opts);
  }

  http(request) {
    const csrftoken = getCookie("csrftoken");
    return super.http({
      ...request,
      headers: {
        "X-CSRFToken": csrftoken == null ? "" : csrftoken,
        ...request.headers,
      },
    });
  }

  execute(argHash) {
    return super
      .execute({
        ...argHash,
        requestInterceptor: request => {
          // Intercept request to support OPTIONS http method
          if (argHash && argHash.parameters && argHash.parameters.__method__) {
            argHash.method = argHash.parameters.__method__;
            request.method = argHash.method;
            delete argHash.parameters.__method__;
          }
          return request;
        },
        responseInterceptor: response => {
          // Intercept response and catch API errors
          if (response.status >= 403) {
            const { operationId } = argHash;
            logger.debug("Catched API Response:", operationId, response);

            const message =
              response.obj && response.obj.detail
                ? response.obj.detail
                : `API ${response.statusText}`;

            this.errorHandler(message);
          }
        },
      })
      .catch(error => {
        // Connection error
        if (!error.response) {
          logger.error("API Connection Error!", error);
          this.errorHandler("API Connection Error!");
        }
        throw error;
      });
  }
}

/* Both of these are needed to pass along session cookies */
APIClient.http.withCredentials = true;
APIClient.prototype.http.withCredentials = true;

/* Extend swagger client props */
const { makeApisTagOperation } = Swagger;
Swagger.makeApisTagOperation = client => {
  const interfaces = makeApisTagOperation(client);
  const { apis } = interfaces;

  // operationId -> originalOperationId mapping
  const operationIdMap = Object.values(client.spec.paths).reduce(
    (result, specs) => ({
      ...result,
      ...Object.values(specs)
        .filter(spec => spec.operationId)
        .reduce(
          (mapping, spec) => ({
            ...mapping,
            [spec.operationId]: spec.__originalOperationId,
          }),
          {}
        ),
    }),
    {}
  );

  // Expose flattened operations
  interfaces.operations = Object.keys(apis)
    .filter(tag => tag.startsWith("app:"))
    .reduce((calls, app) => {
      return {
        ...calls,
        // operationId keys, i.e. foo_bar_read
        ...apis[app],
        // original operationId keys, i.e. foo.bar:read
        ...Object.entries(apis[app]).reduce(
          (originals, [operationId, call]) => {
            call.options = parameters =>
              call({ ...parameters, __method__: "OPTIONS" });
            return {
              ...originals,
              [operationIdMap[operationId]]: call,
            };
          },
          {}
        ),
      };
    }, {});
  //
  // Add auth helper flag
  // Shema does NOT contain login endpoint -> User IS authenticated
  interfaces.isAuthenticated = !interfaces.operations["bananas.login:create"];

  return interfaces;
};

export default APIClient;
