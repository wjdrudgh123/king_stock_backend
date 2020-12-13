"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./dotenv");

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _middleware = require("./middleware");

var _adminRouter = _interopRequireDefault(require("./routers/adminRouter"));

var _dataRouter = _interopRequireDefault(require("./routers/dataRouter"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

var _realTimeSearching = require("./controllers/realTimeSearching");

var app = (0, _express["default"])();
app.set("view engine", "pug");
app.set("views", _path["default"].join(__dirname, "views"));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("dev"));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000 * 60 * 5
  }
})); // 실시간 검색 스케쥴러

var getRealTimeSearchingJob = _nodeSchedule["default"].scheduleJob("00 */10 * * * 1-5", _realTimeSearching.realTimeSearch);

app.use(_middleware.localsMiddleware);
app.use(_routes["default"].home, _adminRouter["default"]);
app.use(_routes["default"].data, _dataRouter["default"]);
var _default = app;
exports["default"] = _default;