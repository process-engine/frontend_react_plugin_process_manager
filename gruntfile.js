const fs = require('fs');
const path = require('path');
const nconf = require('nconf');

const appRoot = path.normalize(process.cwd());
const filePath = path.resolve(appRoot, 'config/build/config.json');

const configProvider = nconf.argv()
  .env()
  .file(filePath);
const buildConfig = configProvider.get();

module.exports = function(grunt) {
  "use strict";

  require('load-grunt-tasks')(grunt);

  let schemaHelperPath = null;
  if (fs.existsSync(path.resolve(buildConfig.graphQLSchemaPath, buildConfig.graphQLSchemaFileName))) {
    schemaHelperPath = path.resolve(buildConfig.graphQLSchemaPath, buildConfig.graphQLSchemaFileName);
  }

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: [
              "**/*.ttf",
              "**/*.scss",
              "**/*.less",
              "**/*.json",
              "**/*.json.checksum",
              "**/*.graphql",
              "static/**/*"
            ],
            dest: 'dist'
          }
        ]
      }
    },
    babel: {
      options: {
        "presets": ["react", "es2015", "stage-0"],

        "plugins": [
          ["relay", {
            "schema": schemaHelperPath
          }],
          "add-module-exports",
          "transform-decorators-legacy",
          "transform-react-display-name",
          "syntax-async-functions",
          "transform-regenerator",
          "material-ui",
          "lodash",
          [
            "transform-runtime",
            {
              "polyfill": true,
              "regenerator": true
            }
          ]
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "src",
          src: ["**/*.js", "!**/static/**/*"],
          dest: "dist"
        }]
      }
    },
    watch: {
      babel: {
        files: ["src/**/*.js", "src/**/*.scss", "src/**/*.html"],
        tasks: ["changed:babel:dist", "changed:copy:main"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks('grunt-changed');

  grunt.registerTask("default", [
    "babel:dist",
    "copy:main"
  ]);
};
