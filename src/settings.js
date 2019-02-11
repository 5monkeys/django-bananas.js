import Logger from "js-logger";

const logger = Logger.get("bananas");

class Settings {
  constructor(settings, callback) {
    this.callback = callback;
    this.defaults = settings;
    this.settings = settings;

    logger.debug("Default Settings:", this.defaults);

    this.load(Object.keys(this.settings));
    this.clean();

    logger.debug("Final Settings:", this.settings);
  }

  clean() {
    const { settings } = this;

    if (settings.collapsable && (!settings.horizontal || !settings.icons)) {
      if (settings.horizontal) {
        logger.error("No icons provided for collapsable navbar");
      }
      logger.warn("Forcing permanent navbar");
      settings.collapsable = false;
    }

    if (settings.collapsed && !settings.collapsable) {
      logger.warn("Expanding collapsed permanent navbar");
      settings.collapsed = false;
    }
  }

  load(settingNames) {
    const loaded = settingNames
      .map(setting => [
        setting,
        JSON.parse(window.localStorage.getItem(setting)),
      ])
      .filter(([_, value]) => ![null, undefined].includes(value))
      .reduce(
        (settings, [setting, value]) => ({
          ...settings,
          [setting]: value,
        }),
        {}
      );

    this.settings = { ...(this.settings || {}), ...loaded };
  }

  save(settings) {
    for (const setting of Object.keys(settings)) {
      window.localStorage.setItem(setting, settings[setting]);
      logger.debug("Saving Setting:", setting, settings[setting]);
    }
  }

  delete() {
    for (const setting of Object.keys(this.settings)) {
      window.localStorage.removeItem(setting);
    }
  }

  configure(newSettings) {
    this.settings = {
      ...this.settings,
      ...newSettings,
    };

    this.clean();
    this.save(newSettings);
    this.callback(this.settings);
  }

  reset() {
    this.settings = this.defaults;
    this.clean();
    this.delete();
  }
}

export default Settings;
