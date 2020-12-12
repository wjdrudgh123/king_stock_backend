"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chkAdmin = exports.localsMiddleware = void 0;

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.routes = _routes["default"];
  res.locals.adminLogin = false;
  next();
};

exports.localsMiddleware = localsMiddleware;

var chkAdmin = function chkAdmin(req, res, next) {
  var password = req.body.password;
  var password2 = process.env.ADMIN_PS;

  if (password === password2) {
    res.locals.adminLogin = true;
    next();
  } else {
    res.redirect(_routes["default"].admin);
  }
};

exports.chkAdmin = chkAdmin;