import express from "express";
import routes from "../routes";
import {
  getAdminHome,
  getEditAdmin,
  getLogout,
  postAdminLogin,
  postDelAjax,
  postInput,
  postMainSearchAjax,
} from "../controllers/admin";
import { chkAdmin } from "../middleware";

const adminRouter = express.Router();
adminRouter.get(routes.admin, getAdminHome);
adminRouter.get(routes.logout, getLogout);
adminRouter.get(routes.edit, getEditAdmin);
adminRouter.post(routes.login, chkAdmin, postAdminLogin);
adminRouter.post(routes.input, postInput);
adminRouter.post(routes.main, postMainSearchAjax); // 메인에서 재료 눌렀을 때 서치
adminRouter.post(routes.del, postDelAjax);

export default adminRouter;
