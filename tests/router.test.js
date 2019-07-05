import { createMemoryHistory } from "history";
import Logger from "js-logger";

import Router from "../src/router";
import getAPIClient from "./api.mock";

Logger.get("bananas").setLevel(Logger.OFF);
const nofAPIRoutes = 13;
const nofInternalRoutes = 1;

const getRouter = async ({ anonymous } = {}) => {
  const router = new Router({ history: createMemoryHistory() });
  const api = await getAPIClient({ anonymous });
  router.initialize(api);
  return router;
};

test("Can prefix location paths", () => {
  /*
   * NOTE: This test is using browser history since memory history
   *       does not support basename prefix.
   */
  Object.defineProperty(global.window, "location", {
    value: { pathname: "/prefix", search: "", hash: "" },
  });
  const router = new Router({ prefix: "/prefix/" });
  const { history } = router;

  expect(history.createHref({})).toBe("/prefix/");
  expect(history.createHref({ pathname: "/bar" })).toBe("/prefix/bar");
});

test("Can handle logged out API schema", async () => {
  const router = await getRouter({ anonymous: true });

  expect(router.routes).toHaveLength(2);
  expect(Object.keys(router.reverseRoutes)).toHaveLength(2 * 2);
  expect(router.navigationRoutes).toHaveLength(0);
  expect(router.routes[0]).toMatchObject({
    id: "bananas.i18n:list",
  });
  expect(router.routes[1]).toMatchObject({
    id: "bananas.login:create",
  });
});

test("Has routes", async () => {
  const router = await getRouter();

  expect(router.routes).toHaveLength(nofAPIRoutes + nofInternalRoutes);
  expect(router.routes[router.routes.length - 1]).toMatchObject({
    id: "home", // Assert url patterns sort order, home (/) shold be last
  });
});

test("Has reverse routes", async () => {
  const router = await getRouter();

  expect(Object.keys(router.reverseRoutes)).toHaveLength(
    nofAPIRoutes * 2 + nofInternalRoutes
  );
});

test("Has navigation routes", async () => {
  const router = await getRouter();

  expect(router.navigationRoutes).toHaveLength(2);

  // Assert navigation sort order
  expect(router.navigationRoutes[0]).toMatchObject({
    id: "home",
  });
  expect(router.navigationRoutes[1]).toMatchObject({
    id: "example.user:list",
  });
});

test("Can lookup route by id", async () => {
  const router = await getRouter();

  expect(router.getRoute("foobar")).toBeUndefined();
  expect(router.getRoute("example.user:list")).toEqual({
    id: "example.user:list",
    operationId: "example_user_list",
    path: "/example/user/",
    action: "list",
    template: "example/user/list.js",
    app: "example",
    title: "Användare",
    navigation: true,
    parameters: {
      names: [],
      types: {},
    },
    pattern: /^\/example\/user\/$/,
  });
});

test("Can lookup template by route id", async () => {
  const router = await getRouter();

  expect(router.getOperationTemplate("foobar")).toBeUndefined();
  expect(router.getOperationTemplate("home")).toBe("index.js");
});

test("Can resolve route", async () => {
  const router = await getRouter();

  expect(router.resolve("/foo/bar/")).toBeNull();

  expect(router.resolve("/example/user/")).toEqual({
    id: "example.user:list",
    operationId: "example_user_list",
    path: "/example/user/",
    app: "example",
    action: "list",
    title: "Användare",
    params: null,
    template: "example/user/list.js",
  });

  expect(router.resolve("/example/user/1/")).toEqual({
    id: "example.user:read",
    operationId: "example_user_read",
    path: "/example/user/1/",
    app: "example",
    action: "read",
    title: "Användare",
    params: {
      id: 1,
    },
    template: "example/user/read.js",
  });
});

test("Can reverse route", async () => {
  const router = await getRouter();

  expect(router.reverse("foobar", {})).toBeNull();

  expect(router.reverse("example.user:list")).toEqual({
    id: "example.user:list",
    operationId: "example_user_list",
    path: "/example/user/",
    app: "example",
    action: "list",
    title: "Användare",
    params: null,
    template: "example/user/list.js",
  });

  expect(router.reverse("example.user:read", { id: 2 })).toEqual({
    id: "example.user:read",
    operationId: "example_user_read",
    path: "/example/user/2/",
    app: "example",
    action: "read",
    title: "Användare",
    params: {
      id: 2,
    },
    template: "example/user/read.js",
  });
});

test("Can route by path", async () => {
  const router = await getRouter();

  const r1 = router.route("/example/user/");
  expect(r1.action).toBe("PUSH");
  expect(r1.location).toMatchObject({
    pathname: "/example/user/",
    search: "",
    hash: "",
    state: {
      route: {
        id: "example.user:list",
        params: null,
        query: null,
        hash: null,
      },
    },
  });

  const r2 = router.route({
    path: "/example/user/123",
    query: "?foo=bar",
    hash: "#baz",
  });
  expect(r2.action).toBe("PUSH");
  expect(r2.location).toMatchObject({
    pathname: "/example/user/123/",
    search: "?foo=bar",
    hash: "#baz",
    state: {
      route: {
        id: "example.user:read",
        params: { id: 123 },
        query: { foo: "bar" },
        hash: "baz",
      },
    },
  });

  const r3 = router.route("../../..");
  expect(r3.action).toBe("PUSH");
  expect(r3.location).toMatchObject({
    pathname: "/",
    state: { route: { id: "home" } },
  });
});

test("Can route by id", async () => {
  const router = await getRouter();

  const r1 = router.route({ id: "example.user:read", params: { id: 3 } });
  expect(r1.action).toBe("PUSH");
  expect(r1.location).toMatchObject({
    pathname: "/example/user/3/",
    search: "",
    hash: "",
    state: {
      route: {
        id: "example.user:read",
        params: { id: 3 },
        query: null,
        hash: null,
      },
    },
  });

  const r2 = router.route({
    id: "example.user:read",
    params: { id: 4 },
    query: "?foo=bar",
    hash: "#baz",
  });
  expect(r2.action).toBe("PUSH");
  expect(r2.location).toMatchObject({
    pathname: "/example/user/4/",
    search: "?foo=bar",
    hash: "#baz",
    state: {
      route: {
        id: "example.user:read",
        params: { id: 4 },
        query: { foo: "bar" },
        hash: "baz",
      },
    },
  });

  const r3 = router.route({
    id: "example.user:read",
    params: { id: 4 },
    hash: "ham",
  });
  expect(r3.action).toBe("PUSH");
  expect(r3.location).toMatchObject({
    pathname: "/example/user/4/",
    search: "",
    hash: "#ham",
    state: {
      route: {
        id: "example.user:read",
        params: { id: 4 },
        query: null,
        hash: "ham",
      },
    },
  });
});

test("Can re-route", async () => {
  const router = await getRouter();

  router.route({ id: "home" });
  router.route({ id: "example.user:list", query: "?foo=bar", hash: "#baz" });

  const r1 = router.reroute();
  expect(r1.action).toBe("REPLACE");
  expect(r1.location).toMatchObject({
    pathname: "/example/user/",
    search: "?foo=bar",
    hash: "#baz",
    state: {
      route: {
        id: "example.user:list",
        query: { foo: "bar" },
        hash: "baz",
      },
      referer: { pathname: "/" },
    },
  });

  const r2 = router.reroute({ id: "example.user:read", params: { id: 1 } });
  expect(r2.action).toBe("REPLACE");
  expect(r2.location).toMatchObject({
    pathname: "/example/user/1/",
    state: {
      route: { id: "example.user:read" },
      referer: { pathname: "/" }, // Re-routed to "new" page, but referer kept
    },
  });
});

test("Routes keep track of referral page", async () => {
  const router = await getRouter();

  const r1 = router.route({ id: "home" });
  expect(r1.location.state.referer).toMatchObject({});

  const r2 = router.route({ id: "example.user:list" });
  expect(r2.location.state.referer).toMatchObject({
    pathname: "/",
  });

  const r3 = router.route({ id: "example.user:list", query: { foo: "bar" } });
  expect(r3.location.state.referer).toMatchObject({
    pathname: "/", // Routed to "same" page, referer unchanged
  });

  const r4 = router.route({ id: "example.user:read", params: { id: 1 } });
  expect(r4.location.state.referer).toMatchObject({
    pathname: "/example/user/",
  });

  const r5 = router.route({ id: "home" });
  expect(r5.location.state.referer).toMatchObject({
    pathname: "/example/user/1/",
  });
});

test("Referer only nest once", async () => {
  const router = await getRouter();

  router.route({ id: "home" });
  const route = router.route({ id: "example.user:list" });

  expect(route.location.state.referer).toBeDefined();
  expect(route.location.state.referer.state.referer).toBeUndefined();
});

test("Can patch location parts", async () => {
  const router = await getRouter();

  router.route({ id: "home", query: { foo: "bar" }, hash: "baz" });

  const r1 = router.route({ id: "home", hash: "ham" }, { patch: true });
  expect(r1.location.state.route).toMatchObject({
    query: { foo: "bar" },
    hash: "ham",
  });

  const r2 = router.route({ id: "home", hash: "ham" }, { patch: true });
  expect(r2.location.state.route).toMatchObject({
    query: { foo: "bar" },
    hash: "ham",
  });

  const r3 = router.route(
    { id: "home", query: { bar: "baz" } },
    { patch: true }
  );
  expect(r3.location.state.route).toMatchObject({
    query: { bar: "baz" },
    hash: "ham",
  });
});

test("Can update current location's state", async () => {
  const router = await getRouter();
  const { history } = router;

  router.route({ id: "home" });
  expect(history).toHaveLength(1);
  expect(history.location).toMatchObject({
    state: { scroll: 0 },
  });

  router.updateState({ scroll: 123 });
  expect(history).toHaveLength(1);
  expect(history.location).toMatchObject({
    state: { scroll: 123 },
  });
});

test("Preserves scroll position when rewinding", async () => {
  const router = await getRouter();

  router.route({ id: "example.user:list", hash: "#foo" });
  router.updateState({ scroll: 123 });
  router.route({ id: "example.user:read", params: { id: 1 } });

  const route = router.route({ path: ".." }, { patch: true });
  expect(route.location).toMatchObject({
    pathname: "/example/user/",
    search: "",
    hash: "#foo",
    state: {
      scroll: 123,
      route: {
        id: "example.user:list",
        query: null,
        hash: "foo",
      },
    },
  });
});

test("Can subscribe to events", async () => {
  const router = await getRouter();

  let off = router.on("routeWillUpdate", "not a function");
  expect(off).toBeNull();

  off = router.on("invalidEventName", jest.fn());
  expect(off).toBeNull();

  off = router.on("routeWillUpdate", jest.fn());
  expect(typeof off).toBe("function");
});

test("Can subscribe to routeWillUpdate event", async () => {
  const router = await getRouter();
  const willUpdate = jest.fn();

  let off = router.on("routeWillUpdate", null);
  expect(off).toBeNull();

  off = router.on("invalidEventName", willUpdate);
  expect(off).toBeNull();

  off = router.on("routeWillUpdate", willUpdate);
  expect(typeof off).toBe("function");

  const route = router.route("/");
  expect(willUpdate).toHaveBeenCalledTimes(1);
  expect(willUpdate).toHaveBeenCalledWith(route.location, route.action);

  router.route("/example/user");
  expect(willUpdate).toHaveBeenCalledTimes(2);

  off();
  router.route("/example/user/1/");
  expect(willUpdate).toHaveBeenCalledTimes(2);
});

test("Can subscribe to routeDidUpdate event", async () => {
  const router = await getRouter();
  const { history } = router;

  const didUpdate = jest.fn();
  const off = router.on("routeDidUpdate", didUpdate);

  router.route("/");
  expect(didUpdate).toHaveBeenCalledTimes(1);
  expect(didUpdate).toHaveBeenCalledWith(history.location, history.action);

  router.route("/example/user");
  expect(didUpdate).toHaveBeenCalledTimes(2);

  off();
  router.route("/example/user/1/");
  expect(didUpdate).toHaveBeenCalledTimes(2);
});
