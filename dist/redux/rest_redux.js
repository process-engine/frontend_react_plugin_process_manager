'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('isomorphic-fetch');

var _reduxApi = require('redux-api');

var _reduxApi2 = _interopRequireDefault(_reduxApi);

var _fetch = require('redux-api/lib/adapters/fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _rest_reducer = require('./rest_reducer');

var _rest_reducer2 = _interopRequireDefault(_rest_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('es6-promise').polyfill();


var reduxApiImpl = (0, _reduxApi2.default)(_rest_reducer2.default);
reduxApiImpl.use('fetch', (0, _fetch2.default)(fetch));
exports.default = reduxApiImpl;
module.exports = exports['default'];
