const list = document.querySelector("#issueList");
const rightSide = document.querySelector("#rightSide");

// ajax로 받아온 값 메인에 보이기
const addChildNode = (companies, name) => {
  const parentNode = document.querySelector(".right-side");

  parentNode.innerHTML = "";
  for (let i = 0; i < companies.length; i++) {
    const outerDiv = document.createElement("div");
    const companyNameSpan = document.createElement("span");
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

const handleClickCaltayst = (e) => {
  const { target } = e;
  const name = target.dataset.issue;

  const httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
    return false;
  }
  httpRequest.open("POST", "/main");
  httpRequest.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );
  httpRequest.responseType = "json";
  httpRequest.send("issue=" + encodeURIComponent(name));

  httpRequest.onload = function () {
    var companies = httpRequest.response;
    addChildNode(companies, name);
  };
};

const handleDeleteCompany = async (e) => {
  const {
    target: {
      dataset: { name, issue },
    },
  } = await e;
  const query = `${name},${issue}`;
  console.log(query);
  const flag = confirm("삭제??");
  if (flag) {
    const httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ");
      return false;
    }
    httpRequest.open("POST", "/del");
    httpRequest.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    httpRequest.responseType = "json";
    httpRequest.send("name=" + encodeURIComponent(query));

    httpRequest.onload = function () {
      var res = httpRequest.response;
      if (res === "success") {
        location.reload();
      }
    };
  }
};

const init = () => {
  list.addEventListener("click", handleClickCaltayst);
  rightSide.addEventListener("click", handleDeleteCompany);
};

init();
