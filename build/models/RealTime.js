"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var RealTimeSchema = new _mongoose["default"].Schema({
  site: {
    type: String,
    required: "Site Name is required"
  },
  companies: [String]
});

var model = _mongoose["default"].model("RealTime", RealTimeSchema);

var _default = model;
exports["default"] = _default;