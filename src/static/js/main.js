const list = document.querySelector("#catalystList");
const rightSide = document.querySelector("#rightSide");

// ajax로 받아온 값 메인에 보이기
const addChildNode = (companies, name) => {
  const parentNode = document.querySelector(".right-side");

  parentNode.innerHTML = "";
  for (let i = 0; i < companies.length; i++) {
    const outerDiv = document.createElement("div");
    const companyNameSpan = document.createElement("span");
    companyNameSpan.innerText = companies[i];
    outerDiv.appendChild(companyNameSpan);
    outerDiv.classList.add("companies");
    outerDiv.setAttribute("data-name", companies[i]);
    outerDiv.setAttribute("data-catalyst", name);
    parentNode.appendChild(outerDiv);
  }
};

const handleClickCaltayst = (e) => {
  const { target } = e;
  const name = target.dataset.catalyst;

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
  httpRequest.send("catalyst=" + encodeURIComponent(name));

  httpRequest.onload = function () {
    var companies = httpRequest.response;
    addChildNode(companies, name);
  };
};

const handleDeleteCompany = (e) => {
  const { target } = e;
  const name = target.dataset.name;
  const catalyst = target.dataset.catalyst;
  const query = `${name},${catalyst}`;

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
    console.log(res);
  };
};

const init = () => {
  list.addEventListener("click", handleClickCaltayst);
  rightSide.addEventListener("click", handleDeleteCompany);
};

init();
