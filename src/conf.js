import merge from "lodash/merge";

const settings = {
  dimensions: {
    appbarHeight: 64,
    drawerWidth: 280,
    containerWidth: false,
  },
};

export function configure(conf) {
  for (const key in conf) {
    const o = conf[key];
    if (typeof o === "object") {
      merge(settings[key], conf[key]);
    } else {
      settings[key] = o;
    }
  }
}

export default settings;
