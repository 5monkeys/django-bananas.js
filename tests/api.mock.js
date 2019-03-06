import fetchMock from "fetch-mock";

import APIClient from "../src/api";
import anonymSchema from "./schema.anonymous.json";
import authedSchema from "./schema.authenticated.json";

const schemaUrl = "http://foo.bar/schema.json";
fetchMock.config.overwriteRoutes = true;

const getAPIClient = ({ anonymous, ...handlers } = {}) => {
  fetchMock.mock(schemaUrl, anonymous ? anonymSchema : authedSchema);
  return new APIClient({ url: schemaUrl, ...handlers });
};

export default getAPIClient;
