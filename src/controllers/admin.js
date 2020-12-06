import { chkAdmin } from "../middleware";
import Catalyst from "../models/Catalyst";
import Companies from "../models/Companies";
import routes from "../routes";

export const getAdminHome = async (req, res) => {
  const {
    session: { flag },
  } = req;
  try {
    const catalyst = await Catalyst.find({});
    res.render("admin", { flag, catalyst });
  } catch (e) {
    console.log(`${e}`);
    res.render("admin", { catalyst: [] });
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
    body: { catalyst, name },
  } = req;

  const companiesName = name.split(" ");

  try {
    let dbCatalyst = await Catalyst.findOne({ name: catalyst });
    if (dbCatalyst === null) {
      // 재료가 없을 때 생성
      const cayalystName = await Catalyst.create({
        name: catalyst,
      });
    }
    dbCatalyst = await Catalyst.findOne({ name: catalyst });
    // 재료가 있을 때
    for (let i = 0; i < companiesName.length; i++) {
      if (companiesName[i] !== "" && companiesName[i] !== undefined) {
        // 회사명이 빈값이 아니면
        let dbCompany = await Companies.findOne({ name: companiesName[i] });
        if (dbCompany === null) {
          // 회사명이 등록 안되어 있을 때
          const company = await Companies.create({
            name: companiesName[i],
          }); // 회사명 생성
          dbCompany = await Companies.findOne({ name: companiesName[i] });
        } else if (dbCompany !== null) {
          const chkDuplicate = await Companies.findOne({
            catalyst: dbCatalyst.id,
          });
          if (chkDuplicate !== null) {
            continue;
          }
        }
        await dbCompany.catalyst.push(dbCatalyst.name); // 재료 추가
        await dbCompany.save();
        await dbCatalyst.items.push(dbCompany.name); // 회사명 추가
        await dbCatalyst.save();
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
    body: { catalyst },
    session: { flag },
  } = req;
  console.log(catalyst);
  if (flag) {
    try {
      const companies = await Catalyst.findOne({
        name: catalyst,
      });
      res.send(JSON.stringify(companies.items));
    } catch (e) {
      console.log(`Error after click catalyst: ${e}`);
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
      const query = name.split(",");
      // 재료에서 배열 찾아서 빼고 다시 넣기
      const catalyst = await Catalyst.findOne({ name: query[1] });

      const arrCompany = catalyst.items;
      arrCompany.splice(arrCompany.indexOf(query[0]), 1);

      // 회사명 추가
      await Catalyst.findOneAndUpdate(
        { _id: catalyst.id },
        { items: arrCompany }
      );
      await catalyst.save();

      res.send(JSON.stringify("success"));
    } catch (e) {
      console.log(`Error after click catalyst: ${e}`);
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
