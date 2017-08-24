'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ProcessDefinitions = require('./container/ProcessDefinitions/ProcessDefinitions');

Object.defineProperty(exports, 'ProcessDefinitions', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ProcessDefinitions).default;
  }
});

var _ProcessDefinition = require('./container/ProcessDefinition/ProcessDefinition');

Object.defineProperty(exports, 'ProcessDefinition', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ProcessDefinition).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
