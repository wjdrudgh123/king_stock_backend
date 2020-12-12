"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var IssuesSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: "Company Name is required"
  },
  companies: [{
    type: _mongoose["default"].Schema.Types.String,
    ref: "Companies"
  }]
});

var model = _mongoose["default"].model("Issue", IssuesSchema);

var _default = model;
exports["default"] = _default;