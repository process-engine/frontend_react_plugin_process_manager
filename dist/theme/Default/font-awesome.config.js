"use strict";

/**
 * Configuration file for font-awesome-webpack
 *
 * In order to keep the bundle size low in production,
 * disable components you don't use.
 *
 */

module.exports = {
  styleLoaders: ["style-loader", "css-loader", "sass-loader"],
  styles: {
    mixins: true,
    core: true,
    icons: true,
    larger: true,
    path: true,
    animated: true
  }
};
