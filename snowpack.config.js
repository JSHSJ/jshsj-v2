// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  alias: {
    "@root": "./src",
    "@config": "./src/config",
    "@components": "./src/components",
    "@layouts": "./src/layouts",
    "@pages": "./src/pages",
    "@content": "./src/content",
    "@scripts": "./src/scripts",
    "@public": "./src/public",
  }
};
