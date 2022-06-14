import Logger from "js-logger";
import Swagger from "swagger-client";

import { getCookie } from "./utils";

const logger = Logger.get("bananas");

class APIClient extends Swagger {
  constructor(url, opts = {}) {
    const options =
      typeof url === "object" ? { ...url, ...opts } : { url, ...opts };

    if (!options.errorHandler) {
      options.errorHandler = (...args) => logger.error(...args);
    }
    if (!options.progressHandler) {
      options.progressHandler = (...args) => logger.debug(...args);
    }

    logger.debug("Initializing Swagger Client...", options);

    super(options);
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

  execute({ errorHandler, ...argHash }) {
    this.progressHandler({ done: false });

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
          return this.requestInterceptor
            ? this.requestInterceptor(request)
            : request;
        },
        responseInterceptor: response => {
          // Intercept response and catch API errors
          if (response.status >= 403) {
            const handler = () => {
              const { operationId } = argHash;
              logger.debug("Catched API Response:", operationId, response);

              console.log(response);

              const message =
                response.body && response.body.detail
                  ? response.body.detail
                  : `API ${response.statusText}`;

              this.errorHandler(message);
            };

            if (typeof errorHandler === "function") {
              errorHandler(response, handler);
            } else {
              handler();
            }
          } else {
            this.progressHandler({ done: true });
          }

          return this.responseInterceptor
            ? this.responseInterceptor(response)
            : response;
        },
      })
      .catch(error => {
        // Connection error
        if (error.response) {
          this.progressHandler({ done: true });
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
const { makeApisTagOperation } = Swagger;
Swagger.makeApisTagOperation = client => {
  const interfaces = makeApisTagOperation(client);
  const { apis } = interfaces;

  const version3 =
    client.spec.openapi?.startsWith("3") ??
    !client.spec.swagger?.startsWith("2");

  // operationId -> originalOperationId mapping
  const operationIdMap = Object.values(client.spec.paths).reduce(
    (result, specs) => ({
      ...result,
      ...Object.values(specs)
        .filter(spec => spec.operationId)
        .reduce(
          (mapping, spec) => ({
            ...mapping,
            [spec.operationId]: spec,
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
            const spec = operationIdMap[operationId];

            // Shortcut for OPTIONS method call for this endpoint
            call.options = parameters =>
              call({ ...parameters, __method__: "OPTIONS" });

            // Build schema spec for this endpoint
            call.title = spec.summary;

            if (version3) {
              call.schema = {};

              if (spec.requestBody) {
                const requestBody =
                  spec.requestBody.content["application/json"];
                call.schema[spec["x-codegen-request-body-name"] ?? "data"] =
                  Object.fromEntries(
                    Object.entries(requestBody.schema.properties).map(
                      ([name, property]) => {
                        return [
                          name,
                          {
                            ...property,
                            required:
                              requestBody.schema.required.includes(name),
                          },
                        ];
                      }
                    )
                  );
              }

              if (spec.parameters) {
                call.schema = spec.parameters.reduce(
                  (parameters, parameter) => {
                    parameters[parameter.name] = parameter;
                    return parameters;
                  },
                  call.schema
                );
              }
            } else {
              call.schema = spec.parameters.reduce((parameters, parameter) => {
                if (parameter.in === "body") {
                  const required = parameter.schema.required || [];
                  parameters[parameter.name] = Object.entries(
                    parameter.schema.properties
                  ).reduce(
                    (schema, [key, value]) => ({
                      ...schema,
                      [key]: { ...value, required: required.includes(key) },
                    }),
                    {}
                  );
                } else if (parameter.in === "query") {
                  parameters[parameter.name] = parameter;
                }
                return parameters;
              }, {});
              const response200 = spec.responses[200];
              call.response =
                response200 != null && response200.schema != null
                  ? simplifySchema(response200.schema)
                  : undefined;
            }

            return {
              ...originals,
              [spec.__originalOperationId]: call,
            };
          },
          {}
        ),
      };
    }, {});

  // Add auth helper flag
  // Shema does NOT contain login endpoint -> User IS authenticated
  interfaces.isAuthenticated = !interfaces.operations["bananas.login:create"];

  return interfaces;
};

export default APIClient;

function simplifySchema(schema) {
  if (schema.type === "object") {
    return schema.properties;
  }
  if (schema.type === "array") {
    return simplifySchema(schema.items);
  }
  return schema;
}
