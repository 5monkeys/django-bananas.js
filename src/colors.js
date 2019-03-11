import {
  darken,
  lighten,
  rgbToHex,
} from "@material-ui/core/styles/colorManipulator";

export const generateColor = base => {
  const color = {
    500: base,
  };
  for (let i = 500; i > 100; i -= 100) {
    color[i - 100] = rgbToHex(lighten(color[i], 0.15));
  }
  for (let i = 500; i < 900; i += 100) {
    color[i + 100] = rgbToHex(darken(color[i], 0.15));
  }
  return color;
};

export const django = {
  100: "#93d0b8",
  200: "#81c8ac",
  300: "#6bbf9e",
  400: "#52b48e",
  500: "#34A77B",
  600: "#2c8d68",
  700: "#257758",
  800: "#1f654a",
  900: "#1a553e",
};
