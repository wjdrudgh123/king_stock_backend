"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CompaniesSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: "Company Name is required"
  },
  issues: [{
    type: _mongoose["default"].Schema.Types.String,
    ref: "Issues"
  }]
});

var model = _mongoose["default"].model("Company", CompaniesSchema);

var _default = model;
exports["default"] = _default;