import createHistory from "history/createMemoryHistory";
import Logger from "js-logger";

import Router from "../src/router";
import swagger from "./swagger.mock";

Logger.get("bananas").setLevel(Logger.WARN);
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

test("Can re-route", () => {
  const router = getRouter();

  router.route({ id: "home" });
  router.route({ id: "example.user:list" });

  const r1 = router.reroute();
  expect(r1.action).toBe("REPLACE");
  expect(r1.location).toMatchObject({
    pathname: "/example/user/",
    state: {
      route: { id: "example.user:list" },
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

test.todo("Can patch location parts");
test.todo("Can update state");
test.todo("Preserves scroll position when rewinding");
test.todo("Can subscribe to routeWillUpdate events");
test.todo("Can subscribe to routeDidUpdate event");
