"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var list = document.querySelector("#issueList");
var rightSide = document.querySelector("#rightSide"); // ajax로 받아온 값 메인에 보이기

var addChildNode = function addChildNode(companies, name) {
  var parentNode = document.querySelector(".right-side");
  parentNode.innerHTML = "";

  for (var i = 0; i < companies.length; i++) {
    var outerDiv = document.createElement("div");
    var companyNameSpan = document.createElement("span");
    companyNameSpan.innerText = companies[i];
    companyNameSpan.setAttribute("data-name", companies[i]);
    companyNameSpan.setAttribute("data-issue", name);
    outerDiv.appendChild(companyNameSpan);
    outerDiv.classList.add("companies");
    outerDiv.setAttribute("data-name", companies[i]);
    outerDiv.setAttribute("data-issue", name);
    parentNode.appendChild(outerDiv);
  }
};

var handleClickCaltayst = function handleClickCaltayst(e) {
  var target = e.target;
  var name = target.dataset.issue;
  var httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
    return false;
  }

  httpRequest.open("POST", "/main");
  httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  httpRequest.responseType = "json";
  httpRequest.send("issue=" + encodeURIComponent(name));

  httpRequest.onload = function () {
    var companies = httpRequest.response;
    addChildNode(companies, name);
  };
};

var handleDeleteCompany = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
    var _yield$e, _yield$e$target$datas, name, issue, query, flag, httpRequest;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return e;

          case 2:
            _yield$e = _context.sent;
            _yield$e$target$datas = _yield$e.target.dataset;
            name = _yield$e$target$datas.name;
            issue = _yield$e$target$datas.issue;
            query = "".concat(name, ",").concat(issue);
            console.log(query);
            flag = confirm("삭제??");

            if (!flag) {
              _context.next = 19;
              break;
            }

            httpRequest = new XMLHttpRequest();

            if (httpRequest) {
              _context.next = 14;
              break;
            }

            alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
            return _context.abrupt("return", false);

          case 14:
            httpRequest.open("POST", "/del");
            httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpRequest.responseType = "json";
            httpRequest.send("name=" + encodeURIComponent(query));

            httpRequest.onload = function () {
              var res = httpRequest.response;

              if (res === "success") {
                location.reload();
              }
            };

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleDeleteCompany(_x) {
    return _ref.apply(this, arguments);
  };
}();

var init = function init() {
  list.addEventListener("click", handleClickCaltayst);
  rightSide.addEventListener("click", handleDeleteCompany);
};

init();