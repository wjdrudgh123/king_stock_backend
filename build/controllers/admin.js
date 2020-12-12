"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogout = exports.postDelAjax = exports.postMainSearchAjax = exports.postInput = exports.getEditAdmin = exports.postAdminLogin = exports.getAdminHome = void 0;

var _middleware = require("../middleware");

var _Issues = _interopRequireDefault(require("../models/Issues"));

var _Companies = _interopRequireDefault(require("../models/Companies"));

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAdminHome = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var flag, issues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            flag = req.session.flag;
            _context.prev = 1;
            _context.next = 4;
            return _Issues["default"].find({});

          case 4:
            issues = _context.sent;
            res.render("admin", {
              flag: flag,
              issues: issues
            });
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log("".concat(_context.t0));
            res.render("admin", {
              issues: []
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getAdminHome(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAdminHome = getAdminHome;

var postAdminLogin = function postAdminLogin(req, res) {
  var session = req.session;
  session.flag = true;

  if (res.locals.adminLogin) {
    res.redirect("admin");
  } else {
    res.redirect("admin");
  }
};

exports.postAdminLogin = postAdminLogin;

var getEditAdmin = function getEditAdmin(req, res) {
  var flag = req.session.flag;

  if (flag) {
    res.render("editPage", {
      flag: flag
    });
  } else {
    res.redirect("admin");
  }
};

exports.getEditAdmin = getEditAdmin;

var postInput = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, issue, name, companyName, qryIssue, issueName, arrCompany, i, qryCompany, company, arrIssues;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, issue = _req$body.issue, name = _req$body.name;
            companyName = name.split(" ");
            _context2.prev = 2;
            _context2.next = 5;
            return _Issues["default"].findOne({
              name: issue
            });

          case 5:
            qryIssue = _context2.sent;

            if (!(qryIssue === null)) {
              _context2.next = 10;
              break;
            }

            _context2.next = 9;
            return _Issues["default"].create({
              name: issue
            });

          case 9:
            issueName = _context2.sent;

          case 10:
            _context2.next = 12;
            return _Issues["default"].findOne({
              name: issue
            });

          case 12:
            qryIssue = _context2.sent;
            arrCompany = qryIssue.companies; // 재료가 있을 때

            i = 0;

          case 15:
            if (!(i < companyName.length)) {
              _context2.next = 45;
              break;
            }

            console.log("".concat(i, ": ").concat(companyName[i]));

            if (!(companyName[i] !== "" && companyName[i] !== undefined)) {
              _context2.next = 42;
              break;
            }

            _context2.next = 20;
            return _Companies["default"].findOne({
              name: companyName[i]
            });

          case 20:
            qryCompany = _context2.sent;
            console.log("".concat(i, ": ").concat(qryCompany));

            if (!(qryCompany === null)) {
              _context2.next = 30;
              break;
            }

            _context2.next = 25;
            return _Companies["default"].create({
              name: companyName[i]
            });

          case 25:
            company = _context2.sent;
            _context2.next = 28;
            return _Companies["default"].findOne({
              name: companyName[i]
            });

          case 28:
            qryCompany = _context2.sent;
            console.log("".concat(i, ": ").concat(qryCompany));

          case 30:
            arrIssues = qryCompany.issues;
            console.log("".concat(i, ": ").concat(arrIssues)); // 회사 issues에 재료 있음 continue
            //재료 companies에 회사 있음 continue

            if (!(arrIssues.indexOf(issue) !== -1 && arrCompany.indexOf(qryCompany.name) !== -1)) {
              _context2.next = 34;
              break;
            }

            return _context2.abrupt("continue", 42);

          case 34:
            _context2.next = 36;
            return qryCompany.issues.push(qryIssue.name);

          case 36:
            _context2.next = 38;
            return qryCompany.save();

          case 38:
            _context2.next = 40;
            return qryIssue.companies.push(qryCompany.name);

          case 40:
            _context2.next = 42;
            return qryIssue.save();

          case 42:
            i++;
            _context2.next = 15;
            break;

          case 45:
            _context2.next = 50;
            break;

          case 47:
            _context2.prev = 47;
            _context2.t0 = _context2["catch"](2);
            console.log("insert \uB3C4\uC911 \uC624\uB958: ".concat(_context2.t0));

          case 50:
            res.redirect(_routes["default"].admin);

          case 51:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 47]]);
  }));

  return function postInput(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // 메인에서 재료 눌렀을 때 ajax


exports.postInput = postInput;

var postMainSearchAjax = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var issue, flag, companyList;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            issue = req.body.issue, flag = req.session.flag;
            console.log("\uAC80\uC0C9\uD68C\uC0AC: ".concat(issue));

            if (!flag) {
              _context3.next = 15;
              break;
            }

            _context3.prev = 3;
            _context3.next = 6;
            return _Issues["default"].findOne({
              name: issue
            });

          case 6:
            companyList = _context3.sent;
            res.send(JSON.stringify(companyList.companies));
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            console.log("Error after click issues: ".concat(_context3.t0));

          case 13:
            _context3.next = 16;
            break;

          case 15:
            res.redirect(_routes["default"].admin);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 10]]);
  }));

  return function postMainSearchAjax(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // 메인에서 회사 눌러서 회사 맵핑 삭제


exports.postMainSearchAjax = postMainSearchAjax;

var postDelAjax = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var name, flag, query, qryIssue, arrCompany, qryCompany, arrIssue;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            name = req.body.name, flag = req.session.flag;

            if (!flag) {
              _context4.next = 35;
              break;
            }

            _context4.prev = 2;
            query = name.split(","); // 회사 이름, 재료
            // 재료에서 배열 찾아서 빼고 다시 넣기

            _context4.next = 6;
            return _Issues["default"].findOne({
              name: query[1].trim()
            });

          case 6:
            qryIssue = _context4.sent;
            console.log("qryIssue: ".concat(qryIssue));
            _context4.next = 10;
            return qryIssue.companies;

          case 10:
            arrCompany = _context4.sent;
            // 재료 관련된 회사
            console.log("arrCompany: ".concat(arrCompany));

            if (arrCompany.length <= 1 || arrCompany === undefined) {
              // 재료가 1개이하 일 때
              arrCompany = [];
            } else {
              arrCompany.splice(arrCompany.indexOf(query[0]), 1); // 삭제
            }

            _context4.next = 15;
            return _Issues["default"].updateOne({
              _id: qryIssue.id
            }, {
              companies: arrCompany
            });

          case 15:
            _context4.next = 17;
            return _Companies["default"].findOne({
              name: query[0].trim()
            });

          case 17:
            qryCompany = _context4.sent;
            console.log("qryCompany: ".concat(qryCompany));
            _context4.next = 21;
            return qryCompany.issues;

          case 21:
            arrIssue = _context4.sent;
            // 재료 관련된 회사
            console.log("arrIssue: ".concat(arrIssue));

            if (arrIssue.length <= 1 || arrIssue === undefined) {
              arrIssue = [];
            } else {
              arrIssue.splice(arrIssue.indexOf(query[1]), 1); // 삭제
            }

            _context4.next = 26;
            return _Companies["default"].updateOne({
              _id: qryCompany.id
            }, {
              issues: arrIssue
            });

          case 26:
            res.send(JSON.stringify("success"));
            _context4.next = 33;
            break;

          case 29:
            _context4.prev = 29;
            _context4.t0 = _context4["catch"](2);
            console.log("Error update issues&company: ".concat(_context4.t0));
            res.send(JSON.stringify("error"));

          case 33:
            _context4.next = 36;
            break;

          case 35:
            res.redirect(_routes["default"].admin);

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 29]]);
  }));

  return function postDelAjax(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postDelAjax = postDelAjax;

var getLogout = function getLogout(req, res) {
  req.session.destroy();
  res.redirect(_routes["default"].admin);
};

exports.getLogout = getLogout;