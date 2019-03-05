const swagger = {
  url: "http://lundberg:8001/api/v1.0/schema.json",
  spec: {
    swagger: "2.0",
    info: {
      title: "Django Bananas Admin API Schema",
      description: "API for django-bananas.js",
      version: "v1.0",
    },
    host: "lundberg:8001",
    schemes: ["http"],
    basePath: "/api/v1.0",
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: { Basic: { type: "basic" } },
    security: [{ Basic: [] }],
    paths: {
      "/bananas/change_password/": {
        post: {
          operationId: "bananas_change_password_create",
          summary: "Ändra lösenord",
          description: "Change password for logged in django staff user",
          parameters: [
            {
              name: "data",
              in: "body",
              required: true,
              schema: {
                required: ["old_password", "new_password1", "new_password2"],
                type: "object",
                properties: {
                  old_password: {
                    title: "Gammalt lösenord",
                    type: "string",
                    minLength: 1,
                  },
                  new_password1: {
                    title: "Nytt lösenord",
                    description:
                      "['Ditt lösenord kan inte vara alltför lik din personliga information.', 'Ditt lösenord måste innehålla minst 8 tecken.', 'Ditt lösenord kan inte vara ett allmänt använt lösenord.', 'Ditt lösenord kan inte bara vara numeriskt.']",
                    type: "string",
                    minLength: 1,
                  },
                  new_password2: {
                    title: "Bekräfta nytt lösenord",
                    type: "string",
                    minLength: 1,
                  },
                },
                $$ref: "#/definitions/PasswordChange",
              },
            },
          ],
          responses: { "204": { description: "" } },
          tags: ["app:bananas"],
          __originalOperationId: "bananas.change_password:create",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [],
      },
      "/bananas/i18n/": {
        get: {
          operationId: "bananas_i18n_list",
          summary: "Translation catalog",
          description: "Retrieve the translation catalog.",
          parameters: [],
          responses: { "200": { description: "" } },
          tags: ["app:bananas"],
          __originalOperationId: "bananas.i18n:list",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [],
      },
      "/bananas/logout/": {
        post: {
          operationId: "bananas_logout_create",
          summary: "Logga ut",
          description: "Log out django staff user",
          parameters: [],
          responses: { "204": { description: "" } },
          tags: ["app:bananas"],
          __originalOperationId: "bananas.logout:create",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [],
      },
      "/bananas/me/": {
        get: {
          operationId: "bananas_me_list",
          summary: "Me",
          description: "Retrieve logged in user info",
          parameters: [],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:bananas"],
          __originalOperationId: "bananas.me:list",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [],
      },
      "/example/user/": {
        get: {
          operationId: "example_user_list",
          summary: "Användare",
          description: "",
          parameters: [
            {
              name: "username",
              in: "query",
              required: false,
              type: "string",
              minLength: 1,
            },
          ],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "array",
                items: {
                  required: ["username"],
                  type: "object",
                  properties: {
                    id: { title: "ID", type: "integer", readOnly: true },
                    url: {
                      title: "Url",
                      type: "string",
                      format: "uri",
                      readOnly: true,
                    },
                    username: {
                      title: "Användarnamn",
                      description:
                        "Obligatoriskt. 150 tecken eller färre. Endast bokstäver, siffror och @/./+/-/_.",
                      type: "string",
                      pattern: "^[\\w.@+-]+$",
                      maxLength: 150,
                      minLength: 1,
                    },
                    full_name: {
                      title: "Full name",
                      type: "string",
                      readOnly: true,
                      minLength: 1,
                    },
                    email: {
                      title: "E-postadress",
                      type: "string",
                      format: "email",
                      maxLength: 254,
                    },
                    is_staff: {
                      title: "Personalstatus",
                      description:
                        "Avgör om användaren kan logga in på denna adminsida.",
                      type: "boolean",
                    },
                  },
                  $$ref: "#/definitions/UserDetails",
                },
              },
            },
          },
          tags: ["app:example", "navigation", "crud"],
          __originalOperationId: "example.user:list",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        post: {
          operationId: "example_user_create",
          summary: "Lägg till användare",
          description: "",
          parameters: [
            {
              name: "data",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          ],
          responses: {
            "201": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:create",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [],
      },
      "/example/user/foo/": {
        get: {
          operationId: "example_user_foo",
          summary: "Foo",
          description: "",
          parameters: [],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { title: "ID", type: "integer", readOnly: true },
                    username: {
                      title: "Username",
                      type: "string",
                      readOnly: true,
                      minLength: 1,
                    },
                    full_name: {
                      title: "Full name",
                      description:
                        "Falls back to username, if not implemented or empty",
                      type: "string",
                      readOnly: true,
                      minLength: 1,
                    },
                    email: {
                      title: "Email",
                      type: "string",
                      readOnly: true,
                      minLength: 1,
                    },
                    is_superuser: {
                      title: "Is superuser",
                      type: "boolean",
                      readOnly: true,
                    },
                    permissions: {
                      description:
                        "Permissions that the user has, both through group and user permissions.",
                      type: "array",
                      items: { type: "string" },
                      readOnly: true,
                    },
                    groups: {
                      type: "array",
                      items: { type: "string" },
                      readOnly: true,
                    },
                  },
                  $$ref: "#/definitions/User",
                },
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:foo",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [],
      },
      "/example/user/{id}/": {
        get: {
          operationId: "example_user_read",
          summary: "Användare",
          description: "",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
          ],
          responses: {
            "200": {
              description: "",
              schema: {
                required: ["username"],
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  url: {
                    title: "Url",
                    type: "string",
                    format: "uri",
                    readOnly: true,
                  },
                  username: {
                    title: "Användarnamn",
                    description:
                      "Obligatoriskt. 150 tecken eller färre. Endast bokstäver, siffror och @/./+/-/_.",
                    type: "string",
                    pattern: "^[\\w.@+-]+$",
                    maxLength: 150,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "E-postadress",
                    type: "string",
                    format: "email",
                    maxLength: 254,
                  },
                  is_staff: {
                    title: "Personalstatus",
                    description:
                      "Avgör om användaren kan logga in på denna adminsida.",
                    type: "boolean",
                  },
                },
                $$ref: "#/definitions/UserDetails",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:read",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        put: {
          operationId: "example_user_update",
          summary: "Användare",
          description: "",
          parameters: [
            {
              name: "data",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
          ],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:update",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        patch: {
          operationId: "example_user_partial_update",
          summary: "Användare",
          description: "",
          parameters: [
            {
              name: "data",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
          ],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:partial_update",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        delete: {
          operationId: "example_user_delete",
          summary: "Användare",
          description: "",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
          ],
          responses: { "204": { description: "" } },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:delete",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [
          {
            name: "id",
            in: "path",
            description: "A unique integer value identifying this användare.",
            required: true,
            type: "integer",
          },
        ],
      },
      "/example/user/{id}/bar/": {
        get: {
          operationId: "example_user_bar",
          summary: "Bar",
          description: "",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
          ],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:bar",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [
          {
            name: "id",
            in: "path",
            description: "A unique integer value identifying this användare.",
            required: true,
            type: "integer",
          },
        ],
      },
      "/example/user/{id}/baz/{x}/ham/{y}/": {
        get: {
          operationId: "example_user_baz",
          summary: "Baz",
          description: "",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
            { name: "x", in: "path", required: true, type: "string" },
            { name: "y", in: "path", required: true, type: "string" },
          ],
          responses: {
            "200": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:baz",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [
          {
            name: "id",
            in: "path",
            description: "A unique integer value identifying this användare.",
            required: true,
            type: "integer",
          },
          { name: "x", in: "path", required: true, type: "string" },
          { name: "y", in: "path", required: true, type: "string" },
        ],
      },
      "/example/user/{id}/send_activation_email/": {
        post: {
          operationId: "example_user_send_activation_email",
          summary: "Send activation e-mail",
          description: "",
          parameters: [
            {
              name: "data",
              in: "body",
              required: true,
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
            {
              name: "id",
              in: "path",
              description: "A unique integer value identifying this användare.",
              required: true,
              type: "integer",
            },
          ],
          responses: {
            "201": {
              description: "",
              schema: {
                type: "object",
                properties: {
                  id: { title: "ID", type: "integer", readOnly: true },
                  username: {
                    title: "Username",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  full_name: {
                    title: "Full name",
                    description:
                      "Falls back to username, if not implemented or empty",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  email: {
                    title: "Email",
                    type: "string",
                    readOnly: true,
                    minLength: 1,
                  },
                  is_superuser: {
                    title: "Is superuser",
                    type: "boolean",
                    readOnly: true,
                  },
                  permissions: {
                    description:
                      "Permissions that the user has, both through group and user permissions.",
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                  groups: {
                    type: "array",
                    items: { type: "string" },
                    readOnly: true,
                  },
                },
                $$ref: "#/definitions/User",
              },
            },
          },
          tags: ["app:example", "crud"],
          __originalOperationId: "example.user:send_activation_email",
          consumes: ["application/json"],
          produces: ["application/json"],
          security: [{ Basic: [] }],
        },
        parameters: [
          {
            name: "id",
            in: "path",
            description: "A unique integer value identifying this användare.",
            required: true,
            type: "integer",
          },
        ],
      },
    },
    definitions: {
      PasswordChange: {
        required: ["old_password", "new_password1", "new_password2"],
        type: "object",
        properties: {
          old_password: {
            title: "Gammalt lösenord",
            type: "string",
            minLength: 1,
          },
          new_password1: {
            title: "Nytt lösenord",
            description:
              "['Ditt lösenord kan inte vara alltför lik din personliga information.', 'Ditt lösenord måste innehålla minst 8 tecken.', 'Ditt lösenord kan inte vara ett allmänt använt lösenord.', 'Ditt lösenord kan inte bara vara numeriskt.']",
            type: "string",
            minLength: 1,
          },
          new_password2: {
            title: "Bekräfta nytt lösenord",
            type: "string",
            minLength: 1,
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { title: "ID", type: "integer", readOnly: true },
          username: {
            title: "Username",
            type: "string",
            readOnly: true,
            minLength: 1,
          },
          full_name: {
            title: "Full name",
            description: "Falls back to username, if not implemented or empty",
            type: "string",
            readOnly: true,
            minLength: 1,
          },
          email: {
            title: "Email",
            type: "string",
            readOnly: true,
            minLength: 1,
          },
          is_superuser: {
            title: "Is superuser",
            type: "boolean",
            readOnly: true,
          },
          permissions: {
            description:
              "Permissions that the user has, both through group and user permissions.",
            type: "array",
            items: { type: "string" },
            readOnly: true,
          },
          groups: { type: "array", items: { type: "string" }, readOnly: true },
        },
      },
      UserDetails: {
        required: ["username"],
        type: "object",
        properties: {
          id: { title: "ID", type: "integer", readOnly: true },
          url: { title: "Url", type: "string", format: "uri", readOnly: true },
          username: {
            title: "Användarnamn",
            description:
              "Obligatoriskt. 150 tecken eller färre. Endast bokstäver, siffror och @/./+/-/_.",
            type: "string",
            pattern: "^[\\w.@+-]+$",
            maxLength: 150,
            minLength: 1,
          },
          full_name: {
            title: "Full name",
            type: "string",
            readOnly: true,
            minLength: 1,
          },
          email: {
            title: "E-postadress",
            type: "string",
            format: "email",
            maxLength: 254,
          },
          is_staff: {
            title: "Personalstatus",
            description: "Avgör om användaren kan logga in på denna adminsida.",
            type: "boolean",
          },
        },
      },
    },
    $$normalized: true,
  },
  errors: [],
  apis: { "app:bananas": {}, "app:example": {}, navigation: {}, crud: {} },
  operations: {},
  isAuthenticated: true,
};

export default swagger;
