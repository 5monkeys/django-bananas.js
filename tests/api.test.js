import fetchMock from "fetch-mock";

import getAPIClient from "./api.mock";

const { Response } = fetchMock.config;
const nofAPIEndpoints = 14;

test("Client is NOT authenticated", async () => {
  const client = await getAPIClient({ anonymous: true });
  expect(client.isAuthenticated).toBe(false);
});

test("Client IS authenticated", async () => {
  const client = await getAPIClient();
  expect(client.isAuthenticated).toBe(true);
});

test("Has flattened operations", async () => {
  const client = await getAPIClient();

  expect(Object.keys(client.operations)).toHaveLength(nofAPIEndpoints * 2);

  expect(Object.keys(client.operations)).toContain(
    "bananas_change_password_create"
  );
  expect(Object.keys(client.operations)).toContain(
    "bananas.change_password:create"
  );
});

test("Operations has attached OPTIONS method call", async () => {
  const client = await getAPIClient();
  const operation = client.operations["example.user:list"];

  fetchMock.once("http://foo.bar/api/v1.0/example/user/", "{}");

  await expect(operation.options()).resolves.toMatchObject({ ok: true });
});

test("Operations has attached schema spec", async () => {
  const client = await getAPIClient();
  const operation = client.operations["bananas.change_password:create"];
  expect(operation.schema).toMatchObject({
    data: {
      old_password: { required: true },
      new_password1: { required: true },
      new_password2: { required: true },
    },
  });
});

test("Can subscribe to progress events", async () => {
  const progress = jest.fn();
  const client = await getAPIClient({
    progressHandler: progress,
  });

  fetchMock.once(
    "http://foo.bar/api/v1.0/bananas/logout/",
    new Response("", { status: 204 })
  );

  await client.operations["bananas.logout:create"]();
  expect(progress).toHaveBeenCalledTimes(2);
  expect(progress).toHaveBeenNthCalledWith(1, { done: false });
  expect(progress).toHaveBeenNthCalledWith(2, { done: true });
});

test("Can subscribe to error events", async () => {
  const error = jest.fn();
  const client = await getAPIClient({
    errorHandler: error,
  });

  fetchMock.post("http://foo.bar/api/v1.0/bananas/logout/", {
    body: { detail: "Custom error message" },
    status: 403,
  });

  await expect(client.operations["bananas.logout:create"]()).rejects.toThrow(
    "Forbidden"
  );

  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenCalledWith("Custom error message");
});

test("Can handle unreachable endpoint", async () => {
  const error = jest.fn();
  const client = await getAPIClient({
    errorHandler: error,
  });

  fetchMock.post("http://foo.bar/api/v1.0/bananas/logout/", 523);

  await expect(client.operations["bananas.logout:create"]()).rejects.toThrow();

  expect(error).toHaveBeenCalledTimes(1);
  expect(error).toHaveBeenCalledWith("API Unreachable");
});
