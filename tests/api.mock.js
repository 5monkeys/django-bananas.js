import fetchMock from "fetch-mock";

import APIClient from "../src/api";
import anonymSchema from "./schema.anonymous.json";
import authedSchema from "./schema.authenticated.json";

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

export function mockAPI({ anonymous, schema } = {}) {
  // Mock Schema
  fetchMock.mock(
    schemaUrl,
    schema || (anonymous ? anonymSchema : authedSchema)
  );

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
  mockAPI({ anonymous, schema });
  return new APIClient({ url: schemaUrl, ...handlers });
};

export default getAPIClient;
