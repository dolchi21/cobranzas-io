'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _modulesUsersJs = require('./modules/Users.js');

var _modulesUsersJs2 = _interopRequireDefault(_modulesUsersJs);

var reducer = (0, _redux.combineReducers)({
	users: _modulesUsersJs2['default']
});

exports['default'] = reducer;
module.exports = exports['default'];