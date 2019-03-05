import createHistory from "history/createMemoryHistory";
import Logger from "js-logger";

import Router from "../src/router";
import swagger from "./swagger.mock";

Logger.get("bananas").setLevel(Logger.OFF);
const nofAPIRoutes = 11;
const nofInternalRoutes = 1;

const getRouter = () => {
  const router = new Router({ history: createHistory() });
  router.initialize(swagger);
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

test("Has routes", () => {
  const router = getRouter();

  expect(router.routes).toHaveLength(nofAPIRoutes + nofInternalRoutes);
  expect(router.routes[router.routes.length - 1]).toMatchObject({
    id: "home", // Assert url patterns sort order, home (/) shold be last
  });
});

test("Has reverse routes", () => {
  const router = getRouter();

  expect(Object.keys(router.reverseRoutes)).toHaveLength(
    nofAPIRoutes * 2 + nofInternalRoutes
  );
});

test("Has navigation routes", () => {
  const router = getRouter();

  expect(router.navigationRoutes).toHaveLength(2);

  // Assert navigation sort order
  expect(router.navigationRoutes[0]).toMatchObject({
    id: "home",
  });
  expect(router.navigationRoutes[1]).toMatchObject({
    id: "example.user:list",
  });
});

test("Can lookup route by id", () => {
  const router = getRouter();

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

test("Can lookup template by route id", () => {
  const router = getRouter();

  expect(router.getOperationTemplate("foobar")).toBeUndefined();
  expect(router.getOperationTemplate("home")).toBe("index.js");
});

test("Can resolve route", () => {
  const router = getRouter();

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

test("Can reverse route", () => {
  const router = getRouter();

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

test("Can route by path", () => {
  const router = getRouter();

  const r1 = router.route("/example/user/3/");
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
    path: "/example/user/4",
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
});

test("Can route by id", () => {
  const router = getRouter();

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

test("Can re-route", () => {
  const router = getRouter();

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

test("Routes keep track of referral page", () => {
  const router = getRouter();

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

test("Referer only nest once", () => {
  const router = getRouter();

  router.route({ id: "home" });
  const route = router.route({ id: "example.user:list" });

  expect(route.location.state.referer).toBeDefined();
  expect(route.location.state.referer.state.referer).toBeUndefined();
});

test("Can patch location parts", () => {
  const router = getRouter();

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

test("Can update state", () => {
  const router = getRouter();
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

test("Preserves scroll position when rewinding", () => {
  const router = getRouter();

  router.route({ id: "home", hash: "#foo" });
  router.updateState({ scroll: 123 });
  router.route({ id: "example.user:list" });

  const route = router.route({ id: "home" }, { patch: true });
  expect(route.location).toMatchObject({
    pathname: "/",
    search: "",
    hash: "#foo",
    state: {
      scroll: 123,
      route: {
        id: "home",
        query: null,
        hash: "foo",
      },
    },
  });
});

test("Can subscribe to events", () => {
  const router = getRouter();

  let off = router.on("routeWillUpdate", "not a function");
  expect(off).toBeNull();

  off = router.on("invalidEventName", jest.fn());
  expect(off).toBeNull();

  off = router.on("routeWillUpdate", jest.fn());
  expect(typeof off).toBe("function");
});

test("Can subscribe to routeWillUpdate event", () => {
  const router = getRouter();
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

test("Can subscribe to routeDidUpdate event", () => {
  const router = getRouter();
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
