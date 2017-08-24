'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxAsyncConnect = require('redux-async-connect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var combinedReducers = function combinedReducers(reducers) {
    return (0, _redux.combineReducers)((0, _assign2.default)({
        routing: _reactRouterRedux.routerReducer,
        reduxAsyncConnect: _reduxAsyncConnect.reducer
    }, reducers));
};

exports.default = combinedReducers;
module.exports = exports['default'];
