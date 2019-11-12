import { MuiThemeProvider } from "@material-ui/core/styles";
import { Playground } from "docz";
import PropTypes from "prop-types";
import React from "react";

import themes, { createBananasTheme } from "../src/themes";

const BananasPlayground = ({ theme, contain, height, ...props }) => {
  let playgroundTheme = themes[theme];
  if (contain) {
    playgroundTheme = playgroundTheme.extend({
      overrides: {
        BananasContainer: {
          root: {
            width: "100%",
            maxWidth: contain,
            margin: "0 auto",
          },
        },
      },
    });
  }
  return (
    <MuiThemeProvider theme={createBananasTheme(playgroundTheme)}>
      <Playground
        style={{
          minHeight: height,
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
        {...props}
      />
    </MuiThemeProvider>
  );
};
BananasPlayground.propTypes = {
  theme: PropTypes.string,
  contain: PropTypes.number,
  height: PropTypes.number,
  // children: PropTypes.oneOfType([
  // PropTypes.arrayOf(PropTypes.node),
  // PropTypes.node,
  // ]).isRequired,
};
BananasPlayground.defaultProps = {
  theme: "default",
  contain: undefined,
  height: undefined,
};

const DefaultTheme = ({ children }) => (
  <MuiThemeProvider theme={createBananasTheme(themes.default)}>
    {children}
  </MuiThemeProvider>
);
DefaultTheme.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { BananasPlayground as Playground };
