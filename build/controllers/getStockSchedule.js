"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextSchedule = void 0;

var _seleniumWebdriver = require("selenium-webdriver");

var _chrome = _interopRequireWildcard(require("selenium-webdriver/chrome"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 팍스넷 url
var URL = "http://www.paxnet.co.kr/stock/infoStock/issueCalendarMonth";

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
}(); // 다음 주 구하기


var getDateOfWeeks = function getDateOfWeeks() {
  var d = new Date();
  var currYear = d.getFullYear();
  var currMonth = d.getMonth() + 1;
  var firstDayOfMonth = new Date(currYear, currMonth, 1);
  var firstDay = firstDayOfMonth.getDay();
  var firstDayOfWeek = firstDay === 0 ? 7 : firstDay;
  var todayDate = d.getDate();
  var nextWeekNo = Math.floor((firstDayOfWeek - 1 + todayDate) / 7) + 1;

  if ((firstDay === 5 || firstDay === 6) && nextWeekNo === 6) {
    nextWeekNo = (_readOnlyError("nextWeekNo"), 1);
  }

  return nextWeekNo;
};

var getNextSchedule = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var driver, nextWeek, getWeeks, News, i, moreBtn, popUp, date;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("START GET NEXT SCHEDULE");
            _context2.next = 3;
            return init();

          case 3:
            driver = _context2.sent;
            _context2.next = 6;
            return driver.get(URL);

          case 6:
            _context2.next = 8;
            return driver.manage().window().maximize();

          case 8:
            nextWeek = getDateOfWeeks();
            _context2.next = 11;
            return driver.wait(_seleniumWebdriver.until.elementsLocated(_seleniumWebdriver.By.xpath("//*[@id=\"calendar\"]/div[2]/div/table/tbody/tr/td/div/div/div[".concat(nextWeek, "]/div[2]/table/thead/tr/td"))), 10000);

          case 11:
            getWeeks = _context2.sent;
            News = [];
            i = 0;

          case 14:
            if (!(i < getWeeks.length)) {
              _context2.next = 40;
              break;
            }

            _context2.next = 17;
            return driver.navigate().refresh();

          case 17:
            _context2.next = 19;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath("//*[@id=\"calendar\"]/div[2]/div/table/tbody/tr/td/div/div/div[".concat(nextWeek, "]/div[2]/table/thead/tr/td[").concat(i + 1, "]/button[1]"))), 10000);

          case 19:
            moreBtn = _context2.sent;
            _context2.next = 22;
            return driver.actions().click(moreBtn).perform();

          case 22:
            _context2.next = 24;
            return driver.manage().setTimeouts({
              implicit: 10000
            });

          case 24:
            _context2.next = 26;
            return driver.wait(_seleniumWebdriver.until.elementsLocated(_seleniumWebdriver.By.xpath("//*[@id='calendar']/div[3]/div[2]/div[2]/div/div/ul/li")), 10000);

          case 26:
            popUp = _context2.sent;
            _context2.next = 29;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath("//*[@id='calendar']/div[3]/div[2]/div[1]/p/strong")), 10000).getText();

          case 29:
            date = _context2.sent;
            _context2.t0 = News;
            _context2.t1 = date;
            _context2.next = 34;
            return getNews(popUp);

          case 34:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              date: _context2.t1,
              news: _context2.t2
            };

            _context2.t0.push.call(_context2.t0, _context2.t3);

          case 37:
            i++;
            _context2.next = 14;
            break;

          case 40:
            _context2.next = 42;
            return driver.quit();

          case 42:
            console.log("END GET NEXT SCHEDULE");
            return _context2.abrupt("return", News);

          case 44:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getNextSchedule() {
    return _ref2.apply(this, arguments);
  };
}(); //div[2]/div[2]/div/div/ul/li


exports.getNextSchedule = getNextSchedule;

var getNews = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(popUp) {
    var News, i, title, description;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            News = [];
            i = 0;

          case 2:
            if (!(i < popUp.length)) {
              _context3.next = 13;
              break;
            }

            _context3.next = 5;
            return popUp[i].findElement(_seleniumWebdriver.By.xpath("./p[@class='pop-title']")).getText();

          case 5:
            title = _context3.sent;
            _context3.next = 8;
            return popUp[i].findElement(_seleniumWebdriver.By.xpath("./p[@class='pop-cont']")).getText();

          case 8:
            description = _context3.sent;
            News.push({
              title: title,
              description: description
            });

          case 10:
            i++;
            _context3.next = 2;
            break;

          case 13:
            return _context3.abrupt("return", News);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNews(_x) {
    return _ref3.apply(this, arguments);
  };
}();