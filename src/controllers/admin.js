import { chkAdmin } from "../middleware";
import Issues from "../models/Issues";
import Companies from "../models/Companies";
import routes from "../routes";

export const getAdminHome = async (req, res) => {
  const {
    session: { flag },
  } = req;
  try {
    const issues = await Issues.find({});
    res.render("admin", { flag, issues });
  } catch (e) {
    console.log(`${e}`);
    res.render("admin", { issues: [] });
  }
};

export const postAdminLogin = (req, res) => {
  const { session } = req;
  session.flag = true;
  if (res.locals.adminLogin) {
    res.redirect("admin");
  } else {
    res.redirect("admin");
  }
};

export const getEditAdmin = (req, res) => {
  const {
    session: { flag },
  } = req;
  if (flag) {
    res.render("editPage", { flag });
  } else {
    res.redirect("admin");
  }
};

export const postInput = async (req, res) => {
  const {
    body: { issue, name },
  } = req;

  const companyName = name.split(" ");

  try {
    let qryIssue = await Issues.findOne({ name: issue });
    if (qryIssue === null) {
      // 재료가 없을 때 생성
      const issueName = await Issues.create({
        name: issue,
      });
    }
    qryIssue = await Issues.findOne({ name: issue });
    const arrCompany = qryIssue.companies;
    // 재료가 있을 때
    for (let i = 0; i < companyName.length; i++) {
      console.log(`${i}: ${companyName[i]}`);
      if (companyName[i] !== "" && companyName[i] !== undefined) {
        let qryCompany = await Companies.findOne({ name: companyName[i] });

        if (qryCompany === null) {
          // 회사가 등록 안되어 있을 때
          const company = await Companies.create({
            name: companyName[i],
          }); // 회사 생성
          qryCompany = await Companies.findOne({ name: companyName[i] });
        }
        const arrIssues = qryCompany.issues;
        // 회사 issues에 재료 있음 continue
        //재료 companies에 회사 있음 continue
        if (
          arrIssues.indexOf(issue) !== -1 &&
          arrCompany.indexOf(qryCompany.name) !== -1
        ) {
          continue;
        }

        await qryCompany.issues.push(qryIssue.name); // 재료 추가
        await qryCompany.save();
        await qryIssue.companies.push(qryCompany.name); // 회사명 추가
        await qryIssue.save();
      }
    }
  } catch (e) {
    console.log(`insert 도중 오류: ${e}`);
  }
  res.redirect(routes.admin);
};

// 메인에서 재료 눌렀을 때 ajax
export const postMainSearchAjax = async (req, res) => {
  const {
    body: { issue },
    session: { flag },
  } = req;
  if (flag) {
    try {
      const companyList = await Issues.findOne({
        name: issue,
      });
      res.send(JSON.stringify(companyList.companies));
    } catch (e) {
      console.log(`Error after click issues: ${e}`);
    }
  } else {
    res.redirect(routes.admin);
  }
};

// 메인에서 회사 눌러서 회사 맵핑 삭제
export const postDelAjax = async (req, res) => {
  const {
    body: { name },
    session: { flag },
  } = req;
  if (flag) {
    try {
      const query = name.split(","); // 회사 이름, 재료
      // 재료에서 배열 찾아서 빼고 다시 넣기

      const qryIssue = await Issues.findOne({ name: query[1].trim() });
      let arrCompany = await qryIssue.companies; // 재료 관련된 회사
      if (arrCompany.length <= 1 || arrCompany === undefined) {
        // 재료가 1개이하 일 때
        arrCompany = [];
      } else {
        arrCompany.splice(arrCompany.indexOf(query[0]), 1); // 삭제
      }

      await Issues.updateOne({ _id: qryIssue.id }, { companies: arrCompany });

      // 회사 document에서 재료 빼기
      const qryCompany = await Companies.findOne({ name: query[0].trim() });
      let arrIssue = await qryCompany.issues; // 재료 관련된 회사
      if (arrIssue.length <= 1 || arrIssue === undefined) {
        arrIssue = [];
      } else {
        arrIssue.splice(arrIssue.indexOf(query[1]), 1); // 삭제
      }

      await Companies.updateOne({ _id: qryCompany.id }, { issues: arrIssue });

      res.send(JSON.stringify("success"));
    } catch (e) {
      console.log(`Error update issues&company: ${e}`);
      res.send(JSON.stringify("error"));
    }
  } else {
    res.redirect(routes.admin);
  }
};

export const getLogout = (req, res) => {
  req.session.destroy();
  res.redirect(routes.admin);
};
