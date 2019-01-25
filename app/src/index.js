import PeopleIcon from "@material-ui/icons/People";
import Bananas from "django-bananas";
import React from "react";
import ReactDOM from "react-dom";

import settings from "./bananas.settings";

ReactDOM.render(
  <Bananas.App
    {...settings}
    pages={route => import(`./pages/${route}`)}
    logLevel={{
      bananas: "INFO",
      example: "DEBUG",
    }}
    // layout="vertical" // horizontal|vertical
    title="Example"
    // branding="Admin"
    // version="v0.1"
    // logo={true} // true|URL|node
    navigationProps={
      {
        // permanent: true,
        // dense: true,
      }
    }
    icons={{
      "example.user:list": PeopleIcon,
    }}
  />,
  document.getElementById("root")
);
