"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
/* eslint-disable max-len */

var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(4).required(),
    email: _joi["default"].string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
    phoneNo: _joi["default"].string().min(1000000000).max(9999999999).optional(),
    password: _joi["default"].string().pattern(new RegExp('^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&#^()_+=-])[A-Za-z\\d@$!%?&#^()_+=-]{6,}$')).required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};