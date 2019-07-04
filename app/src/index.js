/* eslint-disable no-unused-vars */
import { blue } from "@material-ui/core/colors";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AppleIcon from "@material-ui/icons/Lens";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import Bananas from "django-bananas";
import { django } from "django-bananas/colors";
import themes from "django-bananas/themes";
import React from "react";
import ReactDOM from "react-dom";

import Gravatar from "./Gravatar";
import settings from "./bananas.settings";

const exampleAppTheme = themes.default.extend({
  palette: {
    primary: {
      // main: blue[500],
    },
  },
  overrides: {
    BananasNavBar: {
      header: {
        /* Example: Change NavBar header color */
        //   background: "#181818",
        /* Example: Make NavBar header striped */
        //   backgroundColor: django[700],
        //   background: "repeating-linear-gradient( 45deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 10px, transparent 10px, transparent 20px)",
      },
      drawer: {
        /* Example: Change drawer width */
        //   width: 350,
      },
    },
    BananasTitleBar: {
      colorPrimary: {
        /* Example: Change primary colored TitleBar's */
        //   background: blue[500],
      },
    },
    /*
    BananasContainer: {
      root: {
        // Example: Center components using the Container
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
    nav={{
      // home: DashboardIcon,
      "bananas.me:list": Gravatar,
      // "bananas.me:list": SettingsIcon,
      "fruit.banana:list": undefined,
      "fruit.apple:list": AppleIcon,
      "example.user:list": PeopleIcon,
    }}
    editableSettings
    {...settings}
  />,
  document.getElementById("root")
);
