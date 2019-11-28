import {
  cleanup,
  fireEvent,
  render,
  wait,
  waitForElement,
} from "@testing-library/react";
import fetchMock from "fetch-mock";
import Logger from "js-logger";
import React from "react";

import Bananas from "../src";
import { PageNotFoundError, PageNotImplementedError } from "../src/errors";
import { mockAPI, user } from "./api.mock";

Logger.get("bananas").setLevel(Logger.OFF);

const renderApp = async ({ anonymous = false, props = {} } = {}) => {
  mockAPI({ anonymous });

  const helpers = render(
    <Bananas.App
      api="http://foo.bar/api"
      pages={route => import(`./pages/${route}`)}
      logLevel="OFF"
      title="Test Title"
      branding="Test Branding"
      version="v1.2.3"
      editableSettings
      {...props}
    />
  );

  await wait(() => window.bananas);
  const app = window.bananas;
  const { container, getByText, getByLabelText } = helpers;

  if (anonymous) {
    const loginSubmitButton = () => getByLabelText("login");
    await waitForElement(loginSubmitButton, { container });
  } else {
    const profileMenuItem = () => getByText(user.full_name);
    await waitForElement(profileMenuItem, { container });
  }

  return { ...helpers, app };
};

afterEach(() => {
  // Make sure that we always start on the dashboard page
  window.history.pushState({}, "", "/");
  fetchMock.reset();
  cleanup();
});

test("Has App", () => {
  expect(Bananas.App).toBeDefined();
  expect(typeof Bananas.App).toBe("function");
});

test("Can unmount", async () => {
  const { app } = await renderApp({ anonymous: true });
  expect(window.bananas).toBeDefined();

  cleanup();

  expect(window.bananas).toBeUndefined();
  expect(app.router).toBeUndefined();
  expect(app.swagger).toBeUndefined();
  expect(app.api).toBeUndefined();
});

test("Can boot and login", async () => {
  const { container, getByText, getByLabelText } = await renderApp({
    anonymous: true,
  });

  // Fill login form and
  const username = getByLabelText("Username", { selector: "input" });
  const password = getByLabelText("Password", { selector: "input" });
  fireEvent.change(username, { target: { value: "admin" } });
  fireEvent.change(password, { target: { value: "test" } });

  // Click login submit button
  const loginSubmitButton = getByLabelText("login");
  fireEvent.click(loginSubmitButton);

  // Wait for logged in username to be rendered, i.e. NavBar is rendered
  const profileMenuItem = () => getByText(user.full_name);
  await waitForElement(profileMenuItem, { container });
});

test("Can shutdown", async () => {
  const { app, queryByTestId } = await renderApp({ anonymous: true });
  expect(queryByTestId("bootscreen")).toBeFalsy();

  await app.shutdown();
  expect(queryByTestId("bootscreen")).toBeTruthy();
});

test("Can render dashboard and navigate using menu", async () => {
  const { app, container, getByText, queryAllByText } = await renderApp();

  // Expect branding etc to rendered
  expect(document.title).toBe("Dashboard | Test Title");
  expect(getByText("Test Branding")).toBeTruthy();
  expect(getByText("v1.2.3")).toBeTruthy();

  // Expect dashboard page to be rendered
  expect(getByText("Dashboard Test Page")).toBeTruthy();

  // Expect users menu item to be rendered
  const userListRoute = app.router.getRoute("example.user:list");
  const usersMenuItem = getByText(userListRoute.title);
  expect(usersMenuItem).toBeTruthy();

  // Mock Users API call
  const users = [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
  ];
  fetchMock.mock(`http://foo.bar/api/v1.0${userListRoute.path}`, {
    body: users,
  });

  // Click Users menu item
  fireEvent.click(usersMenuItem);

  // Wait for user list page to be rendered
  await waitForElement(() => getByText(`${userListRoute.title} (users)`), {
    container,
  });

  // Expect a listed user link to be rendered
  const user1Link = getByText(users[0].username);
  expect(user1Link).toBeTruthy();

  // Click one of the users and expect page template not to implemented
  fireEvent.click(user1Link);
  await waitForElement(() => getByText("Status: 501"), { container });

  // Click profile menu item
  const profileMenuItem = getByText(user.full_name);
  fireEvent.click(profileMenuItem);

  // Wait for password form and therefore profile page to be rendered
  const changePasswordRoute = app.router.getRoute(
    "bananas.change_password:create"
  );
  await waitForElement(() => getByText(changePasswordRoute.title), {
    container,
  });

  // Expect logged in username to rendered twice (menu and page title)
  expect(queryAllByText(user.full_name)).toHaveLength(2);
});

test("Handles unauthenticated page load", async () => {
  const { app, container, getByLabelText } = await renderApp();
  const userListRoute = app.router.getRoute("example.user:list");

  mockAPI({ anonymous: true });
  fetchMock.get(`http://foo.bar/api/v1.0${userListRoute.path}`, {
    body: {},
    status: 403,
  });

  app.router.route(userListRoute.path);
  await waitForElement(() => getByLabelText("login"), { container });
});

test("Handles unauthorized page load", async () => {
  const { app, container, getByText } = await renderApp();
  const userListRoute = app.router.getRoute("example.user:list");

  fetchMock.get(`http://foo.bar/api/v1.0${userListRoute.path}`, {
    body: {},
    status: 403,
  });

  app.router.route(userListRoute.path);
  await waitForElement(() => getByText("Status: 403"), { container });
  expect(getByText(/You are authenticated as admin/)).toBeDefined();
});

test("Handles 404", async () => {
  const { app, container, getByText } = await renderApp();
  app.router.route("/foobar/");
  await waitForElement(() => getByText("Status: 404"), { container });
});

test("Handles 501", async () => {
  const { app, container, getByText } = await renderApp();
  app.router.route({ id: "bananas.i18n:list" });
  await waitForElement(() => getByText("Status: 501"), { container });
});

test("Handles 500", async () => {
  // Mute console.error
  const error = jest.spyOn(console, "error");
  error.mockImplementation();

  // Render app and route to a failing page
  const { app, getByText } = await renderApp();
  app.router.route({ id: "example.user:bar", params: { id: 1 } });

  // Expect 500 error page to be shown and the error logged to console
  await waitForElement(() => getByText("Status: 500"));
  expect(error).toBeCalled();

  // TODO: Currently needed to prevent real async console.error's after unmocked
  app.router.route({ id: "home" });
  await waitForElement(() => getByText("Dashboard Test Page"));

  await app.shutdown();
  error.mockRestore();
});

test("Handles missing route", async () => {
  const { app } = await renderApp({ anonymous: true });
  await expect(app.loadPage(document.location, null)).rejects.toThrow(
    PageNotFoundError
  );
});

test("Handles missing page file", async () => {
  const { app } = await renderApp({ anonymous: true });
  await expect(app.loadPageComponent("foobar.js")).rejects.toThrow(
    PageNotImplementedError
  );
});

test("Can show and dismiss messages", async () => {
  const {
    app,
    container,
    getByText,
    getAllByTestId,
    queryByTestId,
  } = await renderApp();

  // Expect no messages showing
  expect(queryByTestId("Message")).toBeNull();

  app.admin.success("SUCCESS_MSG");
  await waitForElement(() => getByText("SUCCESS_MSG"), { container });

  app.admin.info("INFO_MSG");
  await waitForElement(() => getByText("INFO_MSG"), { container });

  app.admin.warning("WARNING_MSG");
  await waitForElement(() => getByText("WARNING_MSG"), { container });

  app.admin.error("ERROR_MSG");
  await waitForElement(() => getByText("ERROR_MSG"), { container });

  // Click X icon and expect error message to go away, the other ones goes away by clickAway
  const closeButton = getAllByTestId("message-close-button")[0];
  fireEvent.click(closeButton);
  await wait(
    () =>
      expect(
        app.controllers.MessagesController.current.state.messages
      ).toHaveLength(3) // non closed success, info and warning messages
  );
  expect(queryByTestId("ERROR_MSG")).toBeNull();
});

test("Can show simple alert", async () => {
  const { app, container, getByText } = await renderApp();

  app.admin.alert("AlertMessageOnly");
  await waitForElement(() => getByText("AlertMessageOnly"), { container });
});

test("Can show configured alert", async () => {
  const { app, container, getByText } = await renderApp();

  const agreed = jest.fn();
  const dismissed = jest.fn();

  const alert = {
    title: "AlertTitle",
    message: "AlertMessage",
    agree: "AlertAgree",
    dismiss: "AlertDismiss",
    onAgree: agreed,
    onDismiss: dismissed,
  };

  // Show and wait for alert
  app.admin.alert(alert);
  await waitForElement(() => getByText("AlertTitle"), { container });

  const agreeButton = getByText("AlertAgree");
  const dismissButton = getByText("AlertDismiss");
  expect(getByText("AlertMessage")).toBeTruthy();
  expect(agreeButton).toBeTruthy();
  expect(dismissButton).toBeTruthy();

  // Click dismiss button and expect onDismiss callback to been called
  fireEvent.click(dismissButton);
  await wait(() => expect(dismissed).toHaveBeenCalledTimes(1));

  // Show and wait for another alert
  app.admin.alert(alert);
  await waitForElement(() => getByText("AlertTitle"), { container });

  // Click agree button and expect onAgree callback to been called
  fireEvent.click(getByText("AlertAgree"));
  await wait(() => expect(agreed).toHaveBeenCalledTimes(1));
});

test("Can show simple confirm", async () => {
  const { app, container, getByText } = await renderApp();

  app.admin.confirm("ConfirmMessageOnly");
  await waitForElement(() => getByText("Är du säker?"), { container });
  expect(getByText("ConfirmMessageOnly")).toBeTruthy();
});

test("Can show configured confirm", async () => {
  const { app, container, getByText } = await renderApp();

  app.admin.confirm({ message: "ConfirmMessageOnly", agree: "ConfirmAgree" });
  await waitForElement(() => getByText("Är du säker?"), { container });
  expect(getByText("ConfirmMessageOnly")).toBeTruthy();
  expect(getByText("ConfirmAgree")).toBeTruthy();
});

test("Can change settings", async () => {
  const {
    getByTestId,
    queryByTestId,
    getByText,
    getByLabelText,
  } = await renderApp();

  expect(getByTestId("navbar-drawer")).toBeTruthy();
  expect(queryByTestId("navbar-appbar")).toBeFalsy();

  // Click profile menu item
  const profileMenuItem = getByText(user.full_name);
  fireEvent.click(profileMenuItem);

  // Wait for settings to be rendered and click one of them
  await waitForElement(() => getByText("Settings"));
  const horizontal = getByLabelText("Horizontal Layout");
  fireEvent.click(horizontal);

  // Expect layout to change
  await waitForElement(() => getByTestId("navbar-appbar"));
  expect(queryByTestId("navbar-drawer")).toBeFalsy();

  // Click reset button
  const resetButton = getByText("Reset");
  fireEvent.click(resetButton);

  // Expect layout to change back
  await waitForElement(() => getByTestId("navbar-drawer"));
  expect(queryByTestId("navbar-appbar")).toBeFalsy();
});

test("Can change password", async () => {
  const {
    container,
    getByText,
    getByLabelText,
    getByTestId,
  } = await renderApp();

  // Click profile menu item
  const profileMenuItem = getByText(user.full_name);
  fireEvent.click(profileMenuItem);

  // Wait for submit button and therefore change passsword form rendered
  const submitButton = await waitForElement(
    () => getByText("Change my password"),
    { container }
  );
  expect(submitButton).toBeDisabled();

  // Fill form
  const form = getByTestId("change-password-form");
  const old = getByLabelText("Gammalt l\u00f6senord", { selector: "input" });
  const new1 = getByLabelText("Nytt l\u00f6senord", { selector: "input" });
  const new2 = getByLabelText("Bekr\u00e4fta nytt l\u00f6senord", {
    selector: "input",
  });
  fireEvent.change(old, { target: { value: "old" } });
  fireEvent.change(new1, { target: { value: "new" } });
  fireEvent.change(new2, { target: { value: "new" } });

  // Wait for submit button to be enabled (valid filled fields)
  await wait(() => expect(submitButton).toBeEnabled());

  // Mock fail endpoint and click submit
  fetchMock.post("http://foo.bar/api/v1.0/bananas/change_password/", {
    status: 400,
    body: {},
  });
  // TODO: Click button instead of submiting form; fireEvent.click(submitButton);
  fireEvent.submit(form);

  // Expect error message to show
  await waitForElement(() =>
    getByText("Incorrect authentication credentials.")
  );

  // Mock success endpoint and click submit, again
  fetchMock.post("http://foo.bar/api/v1.0/bananas/change_password/", {
    status: 204,
    body: "",
  });
  fireEvent.submit(form);

  // Expect success message to show
  await waitForElement(() => getByText("Password changed successfully."));
});

test("A hash change will trigger rerender", async () => {
  const { app, container, getByText } = await renderApp({ anonymous: false });

  // Mock Users API call
  const userListRoute = app.router.getRoute("example.user:list");
  fetchMock.mock(`http://foo.bar/api/v1.0${userListRoute.path}`, { body: [] });

  app.router.reroute({ id: "example.user:list" });
  await waitForElement(() => getByText("Hash: none"), { container });

  app.router.reroute({ id: "example.user:list", hash: "#foo" });
  await waitForElement(() => getByText("Hash: foo"), { container });

  app.router.reroute({ id: "example.user:list", hash: "#bar" });
  await waitForElement(() => getByText("Hash: bar"), { container });
});

test("Can customize menu", async () => {
  const { getByTestId, queryAllByTestId } = await renderApp({
    props: {
      nav: {
        "example.user:list": null,
        home: () => <span data-testid="CustomMenuItemIcon" />,
      },
    },
  });

  expect(getByTestId("CustomMenuItemIcon")).toBeTruthy();
  const items = queryAllByTestId("MenuItemText").map(
    element => element.textContent
  );
  expect(items[0]).toBe("Användare");
  expect(items[1]).toBe("Dashboard");
});

test("Can customize menu with array", async () => {
  const { getByTestId, queryAllByTestId } = await renderApp({
    props: {
      nav: ["example.user:list"],
    },
  });

  expect(getByTestId("MenuItemIcon")).toBeTruthy();
  const items = queryAllByTestId("MenuItemText").map(
    element => element.textContent
  );
  expect(items[0]).toBe("Användare");
});

test("Can customize menu with with settings object", async () => {
  const { findByText, queryAllByTestId } = await renderApp({
    props: {
      nav: [{ "example.user:list": { icon: <div>{"testIcon"}</div> } }],
    },
  });

  const items = queryAllByTestId("MenuItemText").map(
    element => element.textContent
  );
  expect(findByText("testIcon")).toBeTruthy();
  expect(items[0]).toBe("Användare");
});

test("Can customize HTTP headers", async () => {
  await renderApp({
    anonymous: false,
    props: {
      api: {
        url: "http://foo.bar/api",
        requestInterceptor: request => {
          request.headers.Authorization = "secret";
          return request;
        },
      },
    },
  });

  expect(fetchMock.called()).toBe(true);
  fetchMock.calls().forEach(([, options]) => {
    expect(options.headers.Authorization).toBe("secret");
  });
});

test("Can customize context", async () => {
  const websocketClient = {};

  await renderApp({
    anonymous: false,
    props: {
      customizeContext: context => ({
        ...context,
        userFullName: context.user.full_name,
        websocketClient,
      }),
    },
  });

  // `./pages/index.js` sets `window.__adminContext` to the current `AdminContext`.
  expect(window.__adminContext.userFullName).toBe("Monkey Kong");
  expect(window.__adminContext.websocketClient).toBe(websocketClient);
});

test("Can customize user", async () => {
  await renderApp({
    anonymous: false,
    props: {
      customizeUser: usr => ({
        ...usr,
        newFunction: () => {
          return "Monkey business.";
        },
      }),
    },
  });
  // `./pages/index.js` sets `window.__adminContext` to the current `AdminContext`.
  expect(window.__adminContext.user.newFunction()).toBe("Monkey business.");
});
