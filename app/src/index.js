/* eslint-disable no-unused-vars */
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import Bananas from "django-bananas";
import themes from "django-bananas/themes";
import React from "react";
import ReactDOM from "react-dom";

import Gravatar from "./Gravatar";
import settings from "./bananas.settings";

const exampleAppTheme = themes.default.extend({
  palette: {
    /*
    primary: {
      main: "#00b3a2",
      dark: "#008e80",
      contrastText: "#fff",
    },
    */
  },
  overrides: {
    /*
    BananasContainer: {
      root: {
        maxWidth: 900,
        margin: "0 auto",
        width: "100%",
      },
    },
    */
  },
});

/*
const examplePageTheme = exampleAppTheme.extend({
  palette: {
    primary: {
      main: "#ff5500",
      dark: "#993300",
    },
  },
  overrides: {
    MuiButton: {
      outlined: {
        textTransform: "none",
      },
    },
  },
});
*/

const CustomLoginForm = () => <form>This is a custom login form</form>;

ReactDOM.render(
  <Bananas.App
    {...settings}
    pages={route => import(`./pages/${route}`)}
    // logLevel="DEBUG"
    logLevel={{
      bananas: "INFO",
      example: "DEBUG",
    }}
    // layout="vertical" // horizontal|vertical
    title="Example"
    theme={exampleAppTheme}
    // pageTheme={examplePageTheme}
    // loginForm={CustomLoginForm}
    // branding="Admin"
    // version="v0.1"
    // logo={true} // true|URL|node
    // permanent: true,
    // collapsed: false,
    // dense: true,
    // icons={null}
    icons={{
      // home: DashboardIcon,
      "bananas.me:list": Gravatar,
      // "bananas.me:list": SettingsIcon,
      "example.user:list": PeopleIcon,
    }}
  />,
  document.getElementById("root")
);
