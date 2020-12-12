"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _admin = require("../controllers/admin");

var _middleware = require("../middleware");

var _searchController = require("../controllers/searchController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adminRouter = _express["default"].Router(); //adminRouter.get(routes.home, postSearch);


adminRouter.get(_routes["default"].admin, _admin.getAdminHome);
adminRouter.get(_routes["default"].logout, _admin.getLogout);
adminRouter.get(_routes["default"].edit, _admin.getEditAdmin);
adminRouter.post(_routes["default"].login, _middleware.chkAdmin, _admin.postAdminLogin);
adminRouter.post(_routes["default"].input, _admin.postInput);
adminRouter.post(_routes["default"].main, _admin.postMainSearchAjax); // 메인에서 재료 눌렀을 때 서치

adminRouter.post(_routes["default"].del, _admin.postDelAjax);
var _default = adminRouter;
exports["default"] = _default;