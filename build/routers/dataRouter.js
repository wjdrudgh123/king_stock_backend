"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _realTimeSearching = require("../controllers/realTimeSearching");

var _searchController = require("../controllers/searchController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dataRouter = _express["default"].Router();

dataRouter.get(_routes["default"].realtime, _realTimeSearching.transferData);
dataRouter.post(_routes["default"].search, _searchController.postSearch);
var _default = dataRouter;
exports["default"] = _default;