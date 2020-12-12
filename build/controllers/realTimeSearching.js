"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferData = exports.realTimeSearch = void 0;

var _seleniumWebdriver = require("selenium-webdriver");

var _chrome = _interopRequireWildcard(require("selenium-webdriver/chrome"));

var _RealTime = _interopRequireDefault(require("../models/RealTime"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * http://finance.daum.net/domestic
 * https://finance.naver.com/sise/
 */
var POPULAR_SEARCH = {};

var init = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var driverPath, serviceBuilder, options, driver;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            driverPath = _path["default"].join(__dirname, "../../chromedriver");
            serviceBuilder = new _chrome.ServiceBuilder(driverPath);
            options = new _chrome["default"].Options();
            options.addArguments("headless", "disable-gpu", "no-sandbox", "disable-dev-shm-usage");
            _context.next = 6;
            return new _seleniumWebdriver.Builder().forBrowser("chrome").setChromeOptions(options).setChromeService(serviceBuilder).build();

          case 6:
            driver = _context.sent;
            return _context.abrupt("return", driver);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

var naverSearch = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var driver, layout, layoutList, naver, i, companyName, qryNaver;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("START NAVER REAL TIME SEARCHING");
            _context2.next = 3;
            return init();

          case 3:
            driver = _context2.sent;
            _context2.next = 6;
            return driver.get("https://finance.naver.com/sise/");

          case 6:
            _context2.next = 8;
            return driver.manage().window().maximize();

          case 8:
            _context2.prev = 8;
            _context2.next = 11;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath("//*[@id='popularItemList']")), 10000);

          case 11:
            layout = _context2.sent;
            _context2.next = 14;
            return layout.findElements(_seleniumWebdriver.By.xpath("./li"));

          case 14:
            layoutList = _context2.sent;
            naver = [];
            i = 0;

          case 17:
            if (!(i < layoutList.length)) {
              _context2.next = 27;
              break;
            }

            _context2.next = 20;
            return layoutList[i].findElement(_seleniumWebdriver.By.xpath("./a"));

          case 20:
            _context2.next = 22;
            return _context2.sent.getText();

          case 22:
            companyName = _context2.sent;
            naver.push(companyName);

          case 24:
            i++;
            _context2.next = 17;
            break;

          case 27:
            console.log(naver);
            _context2.next = 30;
            return _RealTime["default"].findOne({
              site: "naver"
            });

          case 30:
            qryNaver = _context2.sent;

            if (!(qryNaver === null)) {
              _context2.next = 36;
              break;
            }

            _context2.next = 34;
            return _RealTime["default"].create({
              site: "naver",
              companies: naver
            });

          case 34:
            _context2.next = 38;
            break;

          case 36:
            _context2.next = 38;
            return _RealTime["default"].update({
              site: "naver"
            }, {
              companies: naver
            });

          case 38:
            console.log("END NAVER REAL TIME SEARCHING");
            _context2.next = 44;
            break;

          case 41:
            _context2.prev = 41;
            _context2.t0 = _context2["catch"](8);
            console.log("Error for Searching RealTime Naver: ".concat(_context2.t0));

          case 44:
            _context2.next = 46;
            return driver.quit();

          case 46:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 41]]);
  }));

  return function naverSearch() {
    return _ref2.apply(this, arguments);
  };
}();

var daumSearch = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var driver, layout, layoutList, daum, i, tmpCompanyName, companyName, qryDaum;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("START DAUM REAL TIME SEARCHING");
            _context3.next = 3;
            return init();

          case 3:
            driver = _context3.sent;
            _context3.next = 6;
            return driver.get("http://finance.daum.net/domestic");

          case 6:
            _context3.next = 8;
            return driver.manage().window().maximize();

          case 8:
            _context3.prev = 8;
            _context3.next = 11;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath("//*[@id='boxRightSidebar']/div[3]/div/div[1]/ul")), 10000);

          case 11:
            layout = _context3.sent;
            _context3.next = 14;
            return layout.findElements(_seleniumWebdriver.By.xpath("./li"));

          case 14:
            layoutList = _context3.sent;
            daum = [];
            i = 0;

          case 17:
            if (!(i < layoutList.length)) {
              _context3.next = 30;
              break;
            }

            _context3.next = 20;
            return layoutList[i].findElement(_seleniumWebdriver.By.xpath("./a"));

          case 20:
            _context3.next = 22;
            return _context3.sent.getText();

          case 22:
            tmpCompanyName = _context3.sent;
            _context3.next = 25;
            return tmpCompanyName.split("\n");

          case 25:
            companyName = _context3.sent;
            daum.push(companyName[1]);

          case 27:
            i++;
            _context3.next = 17;
            break;

          case 30:
            _context3.next = 32;
            return _RealTime["default"].findOne({
              site: "daum"
            });

          case 32:
            qryDaum = _context3.sent;

            if (!(qryDaum === null)) {
              _context3.next = 38;
              break;
            }

            _context3.next = 36;
            return _RealTime["default"].create({
              site: "daum",
              companies: daum
            });

          case 36:
            _context3.next = 40;
            break;

          case 38:
            _context3.next = 40;
            return _RealTime["default"].update({
              site: "daum"
            }, {
              companies: daum
            });

          case 40:
            console.log("END DAUM REAL TIME SEARCHING");
            _context3.next = 46;
            break;

          case 43:
            _context3.prev = 43;
            _context3.t0 = _context3["catch"](8);
            console.log("Error for Searching RealTime Daum: ".concat(_context3.t0));

          case 46:
            _context3.next = 48;
            return driver.quit();

          case 48:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[8, 43]]);
  }));

  return function daumSearch() {
    return _ref3.apply(this, arguments);
  };
}();

var realTimeSearch = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return naverSearch();

          case 2:
            _context4.next = 4;
            return daumSearch();

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function realTimeSearch() {
    return _ref4.apply(this, arguments);
  };
}();

exports.realTimeSearch = realTimeSearch;

var transferData = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var naver, daum, realTime;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _RealTime["default"].findOne({
              site: "naver"
            });

          case 3:
            naver = _context5.sent;
            _context5.next = 6;
            return _RealTime["default"].findOne({
              site: "daum"
            });

          case 6:
            daum = _context5.sent;

            if (!(naver === null || daum === null)) {
              _context5.next = 18;
              break;
            }

            _context5.next = 10;
            return naverSearch();

          case 10:
            _context5.next = 12;
            return daumSearch();

          case 12:
            _context5.next = 14;
            return _RealTime["default"].findOne({
              site: "naver"
            });

          case 14:
            naver = _context5.sent;
            _context5.next = 17;
            return _RealTime["default"].findOne({
              site: "daum"
            });

          case 17:
            daum = _context5.sent;

          case 18:
            realTime = {
              naver: naver.companies,
              daum: daum.companies
            };
            res.send(JSON.stringify({
              realtime: realTime
            }));
            _context5.next = 26;
            break;

          case 22:
            _context5.prev = 22;
            _context5.t0 = _context5["catch"](0);
            console.log("Error on transferData RealTime : ".concat(_context5.t0));
            res.send(JSON.stringify({
              realtime: {}
            }));

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 22]]);
  }));

  return function transferData(_x, _x2) {
    return _ref5.apply(this, arguments);
  };
}();

exports.transferData = transferData;