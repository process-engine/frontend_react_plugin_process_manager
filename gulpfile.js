'use strict';

const gulptraum = require('gulptraum');
const gulp = require('gulp');

const buildSystemConfig = {
  releasePnpBuildCommand: 'grunt'
};

const buildSystem = new gulptraum.BuildSystem(buildSystemConfig);
buildSystem.config = buildSystemConfig;

buildSystem
  .registerTasks(gulp);
