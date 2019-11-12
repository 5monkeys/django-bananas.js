/* eslint-disable no-unused-vars */
import { blue } from "@material-ui/core/colors";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import HomeIcon from "@material-ui/icons/HomeTwoTone";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import TrainIcon from "@material-ui/icons/TrainTwoTone";
import Bananas from "django-bananas";
import { createColor, django } from "django-bananas/colors";
import themes from "django-bananas/themes";
import React from "react";
import ReactDOM from "react-dom";

import Gravatar from "./Gravatar";
import settings from "./bananas.settings";

const mtr = createColor("#ce0506");

const mtrAppTheme = themes.darth.extend({
  palette: {
    primary: mtr,
  },
  overrides: {
    BananasMenuItem: {
      root: {
        "&$selected": {
          backgroundColor: "transparent",
          // backgroundColor: mtr[500],
          boxShadow: `inset 4px 0 0 ${mtr[500]}`,
          "&:hover": {
            // backgroundColor: mtr[500],
          },
        },
      },
    },
  },
});

const mtrPageTheme = themes.light.extend({
  palette: {
    primary: mtr,
  },
  overrides: {
    BananasTitleBar: {
      colorPrimary: {
        background: themes.dark.palette.background.paper,
      },
    },
  },
});

const appTheme = themes.light.extend({
  palette: {
    primary: mtr,
  },
  overrides: {
    BananasNavBar: {
      header: {
        /* Example: Change NavBar header color */
        background: "#111",
        /* Example: Make NavBar header striped */
        //   backgroundColor: django[700],
        //   background:
        //     "repeating-linear-gradient( 45deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 10px, transparent 10px, transparent 20px)",
      },
    },
  },
});

const pageTheme = themes.light.extend({
  palette: {
    primary: mtr,
  },
  overrides: {
    BananasNavBar: {
      header: {
        /* Example: Change NavBar header color */
        // background: "#181818",
        /* Example: Make NavBar header striped */
        //   backgroundColor: django[700],
        //   background:
        //     "repeating-linear-gradient( 45deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12) 10px, transparent 10px, transparent 20px)",
      },
      drawer: {
        /* Example: Change NavBar background color */
        //   background: django[600],
      },
    },
    /*
    BananasContainer: {
      root: {
        maxWidth: 900,
        margin: "0 auto",
        width: "100%",
      },
    },
    */
    BananasTitleBar: {
      colorPrimary: {
        // background: "#333",
        background: appTheme.palette.background.paper,
      },
    },
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
      // bananas: "INFO",
      example: "DEBUG",
    }}
    // layout="vertical" // horizontal|vertical
    title="Example"
    branding="admin"
    theme={mtrAppTheme}
    // theme={themes.darth}
    // pageTheme={themes.default}
    pageTheme={mtrPageTheme}
    // loginForm={CustomLoginForm}
    // branding="Admin"
    // version="v0.1"
    // logo={true} // true|URL|node
    logo="https://mtrexpress.travel/_next/static/images/mtrexpress.0d2b886043efd0ec53c79561baffb2d4.png"
    // permanent: true,
    // collapsed: false,
    // dense: true,
    // icons={null}
    icons={{
      home: HomeIcon,
      // "bananas.me:list": Gravatar,
      // "bananas.me:list": SettingsIcon,
      "example.user:list": PeopleIcon,
      // "travel.booking:list": ConfirmationNumberIcon,
      "travel.booking:list": TrainIcon,
    }}
    editableSettings
  />,
  document.getElementById("root")
);
