/* eslint-disable no-unused-vars */
import AppleIcon from "@mui/icons-material/ColorLens";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FaceIcon from "@mui/icons-material/Face";
import EmotIcon from "@mui/icons-material/InsertEmoticon";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";
import { blue } from "@mui/material/colors";
import Bananas from "django-bananas";
import { django } from "django-bananas/colors";
import themes from "django-bananas/themes";
import React from "react";
import ReactDOM from "react-dom";

import settings from "./bananas.settings";
import Gravatar from "./Gravatar";

const exampleAppTheme = themes.default.extend({
  palette: {
    primary: {
      // main: blue[500],
    },
  },
  overrides: {
    BananasMenuItem: {
      avatar: {
        overflow: "visible",
      },
    },
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

const CustomIconComponent = () => {
  return (
    <Badge color="secondary" badgeContent={4} invisible={false}>
      <MailIcon />
    </Badge>
  );
};

const CustomLoginForm = () => <form>This is a custom login form</form>;

ReactDOM.render(
  <Bananas.App
    pages={route => import(`./pages/${route}`)}
    logLevel="DEBUG"
    layout="vertical" // horizontal|vertical
    title="Example"
    theme={exampleAppTheme}
    // pageTheme={examplePageTheme}
    // loginForm={CustomLoginForm}
    // branding="Admin"
    // version="v0.1"
    // logo={true} // true|URL|node
    // permanent={true}
    // collapsed: false,
    // dense: true,
    nav={{
      "fruit.peach:list": { icon: CustomIconComponent, title: "Custom Peach" },
      "fruit.apple:red_delicious": { icon: FaceIcon, title: "Red apple" },
      "fruit.apple:granny_smith": FaceIcon,
      "fruit.apple:list": AppleIcon,
      "bananas.me:list": Gravatar,
      // home: DashboardIcon,
      // "bananas.me:list": SettingsIcon,
      "fruit.banana:list": { parent: "peach", icon: PeopleIcon },
      "example.user:list": PeopleIcon,
    }}
    editableSettings
    {...settings}
  />,
  document.getElementById("root")
);
