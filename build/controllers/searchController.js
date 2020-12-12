"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postSearch = void 0;

var _seleniumWebdriver = require("selenium-webdriver");

var _chrome = _interopRequireWildcard(require("selenium-webdriver/chrome"));

var _path = _interopRequireDefault(require("path"));

var _middleware = require("../middleware");

var _Issues = _interopRequireDefault(require("../models/Issues"));

var _Companies = _interopRequireDefault(require("../models/Companies"));

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var searchingCompany = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(companies) {
    var returnData, companyData, i, driver, inputField, priceBtn, tmpNowPrice, nowPrice, tradeRate, tradePrice, startPrice, lowPrice, highPrice, tmpPlusOrMinus, plusOrMinus;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 기업들 이름 받아와서 검색 후 저가, 고가, 시가, 거래량, 대금, 시총, 등락률(+, -)
            console.log("START SEARCHING COMPANY");
            _context2.prev = 1;
            returnData = [];
            companyData = {};
            i = 0;

          case 5:
            if (!(i < companies.length)) {
              _context2.next = 91;
              break;
            }

            _context2.next = 8;
            return init();

          case 8:
            driver = _context2.sent;
            _context2.next = 11;
            return driver.get("https://finance.naver.com/sise/");

          case 11:
            _context2.next = 13;
            return driver.manage().window().maximize();

          case 13:
            _context2.next = 15;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 15:
            _context2.next = 17;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="stock_items"]'));

          case 17:
            inputField = _context2.sent;
            //inputField.sendKeys(companies[i], Key.RETURN);
            inputField.sendKeys(companies[i]);
            _context2.next = 21;
            return driver.actions().click(inputField).perform();

          case 21:
            _context2.next = 23;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 23:
            _context2.next = 25;
            return driver.actions().sendKeys(_seleniumWebdriver.Key.ARROW_DOWN).perform();

          case 25:
            _context2.next = 27;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 27:
            _context2.next = 29;
            return driver.actions().sendKeys(_seleniumWebdriver.Key.ARROW_DOWN).perform();

          case 29:
            _context2.next = 31;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 31:
            _context2.next = 33;
            return driver.actions().sendKeys(_seleniumWebdriver.Key.RETURN).perform();

          case 33:
            _context2.next = 35;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 35:
            _context2.next = 37;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath("//*[@id='chart_area']/div[1]/div/p[1]/em/span[1]"), 5000));

          case 37:
            _context2.next = 39;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="content"]/ul/li[2]/a'));

          case 39:
            priceBtn = _context2.sent;
            _context2.next = 42;
            return driver.actions().click(priceBtn).perform();

          case 42:
            _context2.next = 44;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 44:
            _context2.next = 46;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.xpath('//*[@id="_nowVal"]'), 5000));

          case 46:
            tmpNowPrice = _context2.sent;
            _context2.next = 49;
            return tmpNowPrice.getText();

          case 49:
            nowPrice = _context2.sent;
            _context2.next = 52;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="_quant"]'));

          case 52:
            _context2.next = 54;
            return _context2.sent.getText();

          case 54:
            tradeRate = _context2.sent;
            _context2.next = 57;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="_amount"]'));

          case 57:
            _context2.next = 59;
            return _context2.sent.getText();

          case 59:
            tradePrice = _context2.sent;
            _context2.next = 62;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="content"]/div[2]/div[1]/table/tbody/tr[4]/td[2]/span'));

          case 62:
            _context2.next = 64;
            return _context2.sent.getText();

          case 64:
            startPrice = _context2.sent;
            _context2.next = 67;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="_low"]'));

          case 67:
            _context2.next = 69;
            return _context2.sent.getText();

          case 69:
            lowPrice = _context2.sent;
            _context2.next = 72;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="_high"]'));

          case 72:
            _context2.next = 74;
            return _context2.sent.getText();

          case 74:
            highPrice = _context2.sent;
            _context2.next = 77;
            return driver.findElement(_seleniumWebdriver.By.xpath('//*[@id="_rate"]/span'));

          case 77:
            _context2.next = 79;
            return _context2.sent.getText();

          case 79:
            tmpPlusOrMinus = _context2.sent;
            plusOrMinus = "minus";

            if (tmpPlusOrMinus.indexOf("+") !== -1) {
              //+면
              plusOrMinus = "plus";
            }

            companyData = {
              name: companies[i],
              startPrice: startPrice,
              lowPrice: lowPrice,
              highPrice: highPrice,
              nowPrice: nowPrice,
              tradeRate: tradeRate,
              tradePrice: tradePrice,
              plusOrMinus: plusOrMinus
            };
            returnData.push(companyData);
            _context2.next = 86;
            return driver.manage().setTimeouts({
              implicit: 5000
            });

          case 86:
            _context2.next = 88;
            return driver.quit();

          case 88:
            i++;
            _context2.next = 5;
            break;

          case 91:
            console.log(returnData);
            return _context2.abrupt("return", returnData);

          case 95:
            _context2.prev = 95;
            _context2.t0 = _context2["catch"](1);
            console.log("Error on Searchin company: ".concat(_context2.t0));

          case 98:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 95]]);
  }));

  return function searchingCompany(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var postSearch = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var value, issue, temp;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            value = req.body.value;
            _context3.prev = 1;
            _context3.next = 4;
            return _Issues["default"].findOne({
              name: value
            });

          case 4:
            issue = _context3.sent;
            _context3.next = 7;
            return searchingCompany(issue.companies);

          case 7:
            temp = _context3.sent;
            res.send(JSON.stringify({
              companies: temp
            }));
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            console.log("Error on Search Catalyst: ".concat(_context3.t0));
            res.send(JSON.stringify({
              companies: []
            }));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 11]]);
  }));

  return function postSearch(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postSearch = postSearch;