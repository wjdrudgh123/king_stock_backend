"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogout = exports.postDelAjax = exports.postMainSearchAjax = exports.postInput = exports.getEditAdmin = exports.postAdminLogin = exports.getAdminHome = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _middleware = require("../middleware");

var _Issues = _interopRequireDefault(require("../models/Issues"));

var _Companies = _interopRequireDefault(require("../models/Companies"));

var _routes = _interopRequireDefault(require("../routes"));

var getAdminHome = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var flag, issues;
    return _regenerator["default"].wrap(function _callee$(_context) {
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, issue, name, companyName, qryIssue, issueName, arrCompany, i, qryCompany, company, arrIssues;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
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
              _context2.next = 42;
              break;
            }

            console.log("".concat(i, ": ").concat(companyName[i]));

            if (!(companyName[i] !== "" && companyName[i] !== undefined)) {
              _context2.next = 39;
              break;
            }

            _context2.next = 20;
            return _Companies["default"].findOne({
              name: companyName[i]
            });

          case 20:
            qryCompany = _context2.sent;

            if (!(qryCompany === null)) {
              _context2.next = 28;
              break;
            }

            _context2.next = 24;
            return _Companies["default"].create({
              name: companyName[i]
            });

          case 24:
            company = _context2.sent;
            _context2.next = 27;
            return _Companies["default"].findOne({
              name: companyName[i]
            });

          case 27:
            qryCompany = _context2.sent;

          case 28:
            arrIssues = qryCompany.issues; // 회사 issues에 재료 있음 continue
            //재료 companies에 회사 있음 continue

            if (!(arrIssues.indexOf(issue) !== -1 && arrCompany.indexOf(qryCompany.name) !== -1)) {
              _context2.next = 31;
              break;
            }

            return _context2.abrupt("continue", 39);

          case 31:
            _context2.next = 33;
            return qryCompany.issues.push(qryIssue.name);

          case 33:
            _context2.next = 35;
            return qryCompany.save();

          case 35:
            _context2.next = 37;
            return qryIssue.companies.push(qryCompany.name);

          case 37:
            _context2.next = 39;
            return qryIssue.save();

          case 39:
            i++;
            _context2.next = 15;
            break;

          case 42:
            _context2.next = 47;
            break;

          case 44:
            _context2.prev = 44;
            _context2.t0 = _context2["catch"](2);
            console.log("insert \uB3C4\uC911 \uC624\uB958: ".concat(_context2.t0));

          case 47:
            res.redirect(_routes["default"].admin);

          case 48:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 44]]);
  }));

  return function postInput(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // 메인에서 재료 눌렀을 때 ajax


exports.postInput = postInput;

var postMainSearchAjax = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var issue, flag, companyList;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            issue = req.body.issue, flag = req.session.flag;

            if (!flag) {
              _context3.next = 14;
              break;
            }

            _context3.prev = 2;
            _context3.next = 5;
            return _Issues["default"].findOne({
              name: issue
            });

          case 5:
            companyList = _context3.sent;
            res.send(JSON.stringify(companyList.companies));
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            console.log("Error after click issues: ".concat(_context3.t0));

          case 12:
            _context3.next = 15;
            break;

          case 14:
            res.redirect(_routes["default"].admin);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 9]]);
  }));

  return function postMainSearchAjax(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // 메인에서 회사 눌러서 회사 맵핑 삭제


exports.postMainSearchAjax = postMainSearchAjax;

var postDelAjax = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var name, flag, query, qryIssue, arrCompany, qryCompany, arrIssue;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            name = req.body.name, flag = req.session.flag;

            if (!flag) {
              _context4.next = 31;
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
            _context4.next = 9;
            return qryIssue.companies;

          case 9:
            arrCompany = _context4.sent;

            // 재료 관련된 회사
            if (arrCompany.length <= 1 || arrCompany === undefined) {
              // 재료가 1개이하 일 때
              arrCompany = [];
            } else {
              arrCompany.splice(arrCompany.indexOf(query[0]), 1); // 삭제
            }

            _context4.next = 13;
            return _Issues["default"].updateOne({
              _id: qryIssue.id
            }, {
              companies: arrCompany
            });

          case 13:
            _context4.next = 15;
            return _Companies["default"].findOne({
              name: query[0].trim()
            });

          case 15:
            qryCompany = _context4.sent;
            _context4.next = 18;
            return qryCompany.issues;

          case 18:
            arrIssue = _context4.sent;

            // 재료 관련된 회사
            if (arrIssue.length <= 1 || arrIssue === undefined) {
              arrIssue = [];
            } else {
              arrIssue.splice(arrIssue.indexOf(query[1]), 1); // 삭제
            }

            _context4.next = 22;
            return _Companies["default"].updateOne({
              _id: qryCompany.id
            }, {
              issues: arrIssue
            });

          case 22:
            res.send(JSON.stringify("success"));
            _context4.next = 29;
            break;

          case 25:
            _context4.prev = 25;
            _context4.t0 = _context4["catch"](2);
            console.log("Error update issues&company: ".concat(_context4.t0));
            res.send(JSON.stringify("error"));

          case 29:
            _context4.next = 32;
            break;

          case 31:
            res.redirect(_routes["default"].admin);

          case 32:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 25]]);
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