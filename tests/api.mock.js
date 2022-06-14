import fetchMock from "fetch-mock";

import APIClient from "../src/api";
import anonymSchema2 from "./schema.anonymous.2.json";
import anonymSchema3 from "./schema.anonymous.3.json";
import authedSchema2 from "./schema.authenticated.2.json";
import authedSchema3 from "./schema.authenticated.3.json";

const schemaUrl = "http://foo.bar/api/v1.0/schema.json";
fetchMock.config.overwriteRoutes = true;

export const user = {
  id: 1,
  username: "admin",
  full_name: "Monkey Kong",
  email: "jonas@5monkeys.se",
  is_superuser: true,
  permissions: [],
  groups: [],
};

export function mockAPI({ anonymous, schema, version2 } = {}) {
  schema ??= version2
    ? anonymous
      ? anonymSchema2
      : authedSchema2
    : anonymous
    ? anonymSchema3
    : authedSchema3;

  // Mock Schema
  fetchMock.mock(schemaUrl, schema);

  const translations = {
    catalog: {
      "Are you sure?": "Är du säker?",
      "Yes, I'm sure": "Ja, jag är säker",
      "No, take me back": "Nej, ta mig tillbaka",
    },
    formats: {
      DATETIME_FORMAT: "j F Y H:i",
    },
    plural: "(n != 1)",
  };

  // Mock i18n, me and login
  fetchMock
    .get("http://foo.bar/api/v1.0/bananas/i18n/", { body: translations })
    .get(
      "http://foo.bar/api/v1.0/bananas/me/",
      anonymous ? 403 : { body: user }
    )
    .post("http://foo.bar/api/v1.0/bananas/login/", () => {
      mockAPI(); // Re-mock API as authenticated
      return { body: user };
    });
}

const getAPIClient = ({ anonymous, schema, ...handlers } = {}) => {
  mockAPI({ anonymous: true, schema, version2: false });
  return new APIClient({ url: schemaUrl, ...handlers });
};

export default getAPIClient;
