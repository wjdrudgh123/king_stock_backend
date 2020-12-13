import "./dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import schedule from "node-schedule";
import { localsMiddleware } from "./middleware";
import adminRouter from "./routers/adminRouter";
import dataRouter from "./routers/dataRouter";
import routes from "./routes";
import path from "path";
import { realTimeSearch } from "./controllers/realTimeSearching";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000 * 60 * 5,
    },
  })
);

// 실시간 검색 스케쥴러
const getRealTimeSearchingJob = schedule.scheduleJob(
  "00 */10 * * * 1-5",
  realTimeSearch
);

app.use(localsMiddleware);
app.use(routes.home, adminRouter);
app.use(routes.data, dataRouter);
export default app;
