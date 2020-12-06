import express from "express";
import routes from "../routes";
import { transferData } from "../controllers/realTimeSearching";
import { postSearch } from "../controllers/searchController";

const dataRouter = express.Router();
dataRouter.get(routes.realtime, transferData);
dataRouter.post(routes.search, postSearch);

export default dataRouter;
