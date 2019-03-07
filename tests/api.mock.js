import fetchMock from "fetch-mock";

import APIClient from "../src/api";
import anonymSchema from "./schema.anonymous.json";
import authedSchema from "./schema.authenticated.json";

const schemaUrl = "http://foo.bar/api/v1.0/schema.json";
fetchMock.config.overwriteRoutes = true;

export function mockAPI({ anonymous } = {}) {
  // Mock Schema
  fetchMock.mock(schemaUrl, anonymous ? anonymSchema : authedSchema);

  // Mock Me
  const me = {
    id: 1,
    username: "admin",
    full_name: "Monkey Kong",
    email: "jonas@5monkeys.se",
    is_superuser: true,
    permissions: [],
    groups: [],
  };
  fetchMock
    .get("http://foo.bar/api/v1.0/bananas/me/", { body: me })
    .post("http://foo.bar/api/v1.0/bananas/login/", () => {
      mockAPI(); // Re-mock API as authenticated
      return { body: me };
    });
}

const getAPIClient = ({ anonymous, ...handlers } = {}) => {
  mockAPI({ anonymous });
  return new APIClient({ url: schemaUrl, ...handlers });
};

export default getAPIClient;
