const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  localePath: path.resolve("../../packages/translations"),
  react: { useSuspense: false },
};
