import "@testing-library/jest-dom";

import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  await waitFor(() => window.bananas);
  const app = window.bananas;
  const { container, getByText, getByLabelText } = helpers;

  if (anonymous) {
    const loginSubmitButton = () => getByLabelText("login");
    await waitFor(loginSubmitButton, { container });
  } else {
    const profileMenuItem = () => getByText(user.full_name);
    await waitFor(profileMenuItem, { container });
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
  const username = screen.getByLabelText("Username", { selector: "input" });
  const password = screen.getByLabelText("Password", { selector: "input" });
  await userEvent.type(username, "admin");
  await userEvent.type(password, "test");

  // Click login submit button
  const loginSubmitButton = screen.getByLabelText("login");
  await userEvent.click(loginSubmitButton);

  // screen.getByText(user.full_name);
  expect(await screen.findByText(user.full_name, {})).toBeVisible();
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
  await userEvent.click(usersMenuItem);

  // Wait for user list page to be rendered
  await waitFor(() => getByText(`${userListRoute.title} (users)`), {
    container,
  });

  // Expect a listed user link to be rendered
  const user1Link = getByText(users[0].username);
  expect(user1Link).toBeTruthy();

  // Click one of the users and expect page template not to implemented
  await userEvent.click(user1Link);
  await waitFor(() => getByText("Status: 501"), { container });

  // Click profile menu item
  const profileMenuItem = getByText(user.full_name);
  await userEvent.click(profileMenuItem);

  // Wait for password form and therefore profile page to be rendered
  const changePasswordRoute = app.router.getRoute(
    "bananas.change_password:create"
  );
  await waitFor(() => getByText(changePasswordRoute.title), {
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
  await waitFor(() => getByLabelText("login"), { container });
});

test("Handles unauthorized page load", async () => {
  const { app, container, getByText } = await renderApp();
  const userListRoute = app.router.getRoute("example.user:list");

  fetchMock.get(`http://foo.bar/api/v1.0${userListRoute.path}`, {
    body: {},
    status: 403,
  });

  app.router.route(userListRoute.path);
  await waitFor(() => getByText("Status: 403"), { container });
  expect(getByText(/You are authenticated as admin/)).toBeDefined();
});

test("Handles 404", async () => {
  const { app, container, getByText } = await renderApp();
  app.router.route("/foobar/");
  await waitFor(() => getByText("Status: 404"), { container });
});

test("Handles 501", async () => {
  const { app, container, getByText } = await renderApp();
  app.router.route({ id: "bananas.i18n:list" });
  await waitFor(() => getByText("Status: 501"), { container });
});

test("Handles 500", async () => {
  // Mute console.error
  const error = jest.spyOn(console, "error");
  error.mockImplementation();

  // Render app and route to a failing page
  const { app, getByText } = await renderApp();
  app.router.route({ id: "example.user:bar", params: { id: 1 } });

  // Expect 500 error page to be shown and the error logged to console
  await waitFor(() => getByText("Status: 500"));
  expect(error).toBeCalled();

  // TODO: Currently needed to prevent real async console.error's after unmocked
  app.router.route({ id: "home" });
  await waitFor(() => getByText("Dashboard Test Page"));

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
  const { app, container, getByText, getAllByTestId, queryByTestId } =
    await renderApp();

  // Expect no messages showing
  expect(queryByTestId("Message")).toBeNull();

  app.admin.success("SUCCESS_MSG");
  await waitFor(() => getByText("SUCCESS_MSG"), { container });

  app.admin.info("INFO_MSG");
  await waitFor(() => getByText("INFO_MSG"), { container });

  app.admin.warning("WARNING_MSG");
  await waitFor(() => getByText("WARNING_MSG"), { container });

  app.admin.error("ERROR_MSG");
  await waitFor(() => getByText("ERROR_MSG"), { container });

  // Click X icon and expect error message to go away, the other ones goes away by clickAway
  const closeButton = getAllByTestId("message-close-button")[0];
  await userEvent.click(closeButton);
  await waitFor(
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
  await waitFor(() => getByText("AlertMessageOnly"), { container });
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
  await waitFor(() => getByText("AlertTitle"), { container });

  const agreeButton = getByText("AlertAgree");
  const dismissButton = getByText("AlertDismiss");
  expect(getByText("AlertMessage")).toBeTruthy();
  expect(agreeButton).toBeTruthy();
  expect(dismissButton).toBeTruthy();

  // Click dismiss button and expect onDismiss callback to been called
  await userEvent.click(dismissButton);
  await waitFor(() => expect(dismissed).toHaveBeenCalledTimes(1));

  // Show and wait for another alert
  app.admin.alert(alert);
  await waitFor(() => getByText("AlertTitle"), { container });

  // Click agree button and expect onAgree callback to been called
  await userEvent.click(getByText("AlertAgree"));
  await waitFor(() => expect(agreed).toHaveBeenCalledTimes(1));
});

test("Can show simple confirm", async () => {
  const { app, container, getByText } = await renderApp();

  app.admin.confirm("ConfirmMessageOnly");
  await waitFor(() => getByText("Är du säker?"), { container });
  expect(getByText("ConfirmMessageOnly")).toBeTruthy();
});

test("Can show configured confirm", async () => {
  const { app, container, getByText } = await renderApp();

  app.admin.confirm({ message: "ConfirmMessageOnly", agree: "ConfirmAgree" });
  await waitFor(() => getByText("Är du säker?"), { container });
  expect(getByText("ConfirmMessageOnly")).toBeTruthy();
  expect(getByText("ConfirmAgree")).toBeTruthy();
});

test("Can change settings", async () => {
  const { getByTestId, queryByTestId, getByText, getByLabelText } =
    await renderApp();

  expect(getByTestId("navbar-drawer")).toBeTruthy();
  expect(queryByTestId("navbar-appbar")).toBeFalsy();

  // Click profile menu item
  const profileMenuItem = getByText(user.full_name);
  await userEvent.click(profileMenuItem);

  // Wait for settings to be rendered and click one of them
  await waitFor(() => getByText("Settings"));
  const horizontal = getByLabelText("Horizontal Layout");
  await userEvent.click(horizontal);

  // Expect layout to change
  await waitFor(() => getByTestId("navbar-appbar"));
  expect(queryByTestId("navbar-drawer")).toBeFalsy();

  // Click reset button
  const resetButton = getByText("Reset");
  await userEvent.click(resetButton);

  // Expect layout to change back
  await waitFor(() => getByTestId("navbar-drawer"));
  expect(queryByTestId("navbar-appbar")).toBeFalsy();
});

test("Can change password", async () => {
  const { container, getByText, getByLabelText, getByTestId } =
    await renderApp();

  // Click profile menu item
  const profileMenuItem = getByText(user.full_name);
  await userEvent.click(profileMenuItem);

  // Wait for submit button and therefore change passsword form rendered
  const submitButton = await waitFor(
    () => getByText("Change my password").closest("button"),
    {
      container,
    }
  );
  expect(submitButton).toBeDisabled();

  // Fill form
  const form = getByTestId("change-password-form");
  const old = getByLabelText("Gammalt l\u00f6senord", { selector: "input" });
  const new1 = getByLabelText("Nytt l\u00f6senord", { selector: "input" });
  const new2 = getByLabelText("Bekr\u00e4fta nytt l\u00f6senord", {
    selector: "input",
  });
  await userEvent.type(old, "old");
  await userEvent.type(new1, "new");
  await userEvent.type(new2, "new");

  // Wait for submit button to be enabled (valid filled fields)
  await waitFor(() => expect(submitButton).toBeEnabled());

  // Mock fail endpoint and click submit
  fetchMock.post("http://foo.bar/api/v1.0/bananas/change_password/", {
    status: 400,
    body: {},
  });
  // TODO: Click button instead of submiting form; await userEvent.click(submitButton);
  fireEvent.submit(form);

  // Expect error message to show
  await waitFor(() => getByText("Incorrect authentication credentials."));

  // Mock success endpoint and click submit, again
  fetchMock.post("http://foo.bar/api/v1.0/bananas/change_password/", {
    status: 204,
    body: "",
  });
  fireEvent.submit(form);

  // Expect success message to show
  await waitFor(() => getByText("Password changed successfully."));
});

test("A hash change will trigger rerender", async () => {
  const { app, container, getByText } = await renderApp({ anonymous: false });

  // Mock Users API call
  const userListRoute = app.router.getRoute("example.user:list");
  fetchMock.mock(`http://foo.bar/api/v1.0${userListRoute.path}`, { body: [] });

  app.router.reroute({ id: "example.user:list" });
  await waitFor(() => getByText("Hash: none"), { container });

  app.router.reroute({ id: "example.user:list", hash: "#foo" });
  await waitFor(() => getByText("Hash: foo"), { container });

  app.router.reroute({ id: "example.user:list", hash: "#bar" });
  await waitFor(() => getByText("Hash: bar"), { container });
});

test("Can customize menu", async () => {
  const { getByTestId, queryAllByTestId } = await renderApp({
    props: {
      nav: {
        "example.user:list": null,
        home: function TC() {
          return <span data-testid="CustomMenuItemIcon" />;
        },
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
  const TestIcon = () => <div>{"testIcon"}</div>;
  const { getAllByTestId, getByText } = await renderApp({
    props: {
      nav: { "example.user:list": { icon: TestIcon } },
    },
  });

  const items = getAllByTestId("MenuItemText").map(
    element => element.textContent
  );

  expect(getByText("testIcon")).toBeTruthy();
  expect(items[0]).toBe("Dashboard");
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

test("Can hide menu items", async () => {
  const { getAllByTestId } = await renderApp({
    props: {
      nav: {
        "example.user:list": {
          hidden: true,
        },
      },
    },
  });
  const items = getAllByTestId("MenuItemText").map(
    element => element.textContent
  );
  expect(items.indexOf("Användare")).toBe(-1);
});

const TestLogo = () => {
  return <div data-testid="custom_logo">Logo as component</div>;
};

test("Can render logo as component", async () => {
  const { getByTestId } = await renderApp({
    props: {
      logo: <TestLogo />,
    },
  });

  expect(getByTestId("custom_logo")).toBeTruthy();
});

const TestContainer = ({ children }) => {
  return <div data-testid="custom_container">{children}</div>;
};

test("Can render using an app container", async () => {
  const { getByTestId } = await renderApp({
    props: {
      container: TestContainer,
    },
  });

  expect(getByTestId("custom_container")).toBeTruthy();
});
