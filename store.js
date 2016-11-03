'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducerJs = require('./reducer.js');

var _reducerJs2 = _interopRequireDefault(_reducerJs);

var middleware = (0, _redux.applyMiddleware)(_reduxThunk2['default']);

var store = (0, _redux.createStore)(_reducerJs2['default'], middleware);

exports['default'] = store;
module.exports = exports['default'];