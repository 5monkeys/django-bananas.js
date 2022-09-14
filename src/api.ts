import SwaggerParser from "@apidevtools/swagger-parser";
import { OpenAPI } from "openapi-types";
import { getCookie } from "./util/get_cookie";

export class ApiOperation {
  readonly id: string;
  readonly tags: string[];
  readonly server: string;
  readonly endpoint: string;
  readonly method: string;
  readonly request: OpenAPI.Request;
  readonly summary?: string;
  readonly description?: string;

  constructor(
    id: string,
    tags: string[],
    server: string,
    endpoint: string,
    method: string,
    request: OpenAPI.Request,
    summary?: string,
    description?: string,
  ) {
    this.id = id;
    this.tags = tags;
    this.server = server;
    this.endpoint = endpoint;
    this.method = method;
    this.request = request;
    this.summary = summary;
    this.description = description;
  }

  async call(request?: OpenAPI.Request, init?: RequestInit) {
    let endpoint = this.endpoint;
    const csrftoken = getCookie("csrftoken");

    init ??= {};
    init.method ??= this.method;
    init.headers = new Headers(init.headers);
    if (csrftoken !== undefined) init.headers.append("X-CSRFToken", csrftoken);
    init.credentials = "include";

    // Add body to request
    if (request?.body !== undefined) {
      init.body ??= JSON.stringify(request?.body);
    }

    // Add params to url
    if (request?.params !== undefined) {
      for (const [name, value] of Object.entries(request.params)) {
        endpoint = endpoint.replace(`{${name}}`, value);
      }
    }

    const url = new URL(this.server + endpoint);

    // Add query to url
    if (request?.query !== undefined) {
      for (const [name, value] of Object.entries(request.query)) {
        url.searchParams.append(name, value);
      }
    }

    return await fetch(url, init);
  }
}

export class ApiClient {
  readonly document: OpenAPI.Document;
  readonly operations: Record<string, ApiOperation> = {};

  static async load(source: string | URL, server?: string | URL) {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Could not load schema from ${source}`);
    }
    const schema = await response.json().catch((e) => {
      throw e;
    });

    const document = await SwaggerParser.dereference(schema);
    return new ApiClient(document, server);
  }

  constructor(document: OpenAPI.Document, server?: string | URL) {
    this.document = document;

    // If the document uses servers and it is not manually set this will be prepended to path later
    if (
      "servers" in this.document && this.document.servers !== undefined &&
      this.document.servers.length >= 1
    ) {
      server ??= this.document.servers.pop()!.url;
    }

    // Make sure the server variable is an URL
    if (server !== undefined && !(server instanceof URL)) {
      server = new URL(server);
    }

    // Build operations
    for (
      const [path, definition] of Object.entries(
        this.document.paths ?? {},
      ) as [string, Record<string, OpenAPI.Operation>][]
    ) {
      for (const [method, operation] of Object.entries(definition)) {
        // All operations require an operation id
        if (!operation.operationId) {
          break;
        }

        // Check if an tag starting with `app:` exists on the operation
        if (!operation.tags?.some((tag) => tag.startsWith("app:"))) {
          break;
        }

        const request: OpenAPI.Request = {};

        // Fill the request object with `path`, `query` and `body` data which may be provided
        for (
          const parameter of operation.parameters ?? [] as OpenAPI.Parameter[]
        ) {
          if ("in" in parameter) {
            switch (parameter.in) {
              case "body": {
                request["body"] = {
                  required: parameter.required ?? false,
                  schema: parameter.schema,
                };
                break;
              }

              case "path": {
                request["params"] ??= {};
                request["params"][parameter.name] = {
                  // Path parameters are always required: https://swagger.io/docs/specification/describing-parameters/#path-parameters
                  required: true,
                  schema: parameter.schema,
                };
                break;
              }

              case "query": {
                request["query"] ??= {};
                request["query"][parameter.name] = {
                  required: parameter.required ?? false,
                  schema: parameter.schema,
                };
              }
            }
          }
        }

        // If `requestBody` exists then add it to the request objects body object
        if ("requestBody" in operation && operation.requestBody !== undefined) {
          if ("content" in operation.requestBody) {
            const schema =
              operation.requestBody.content["application/json"].schema;
            const required = operation.requestBody.required ?? false;

            request["body"] = {
              schema,
              required,
            };
          }
        }

        // Combine base url and path
        server = server ? server.toString() : "";
        if (server.endsWith("/")) {
          server = server.slice(0, -1);
        }

        const endpoint = path.startsWith("/") ? path : "/" + path;

        // Create a new `ApiOperation` with the relevant information
        this.operations[operation.operationId] = new ApiOperation(
          operation.operationId,
          operation.tags,
          server,
          endpoint,
          method,
          request,
          operation.summary,
          operation.description,
        );
      }
    }
  }

  async isAuthenticated() {
    try {
      const response = await this.operations["bananas.me:list"].call();
      return response.ok;
    } catch {
      return false;
    }
  }
}
