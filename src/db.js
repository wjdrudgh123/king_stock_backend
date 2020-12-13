import mongoose from "mongoose";
import "./models/Companies";
import "./models/Issues";

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log(`### Conneced to DB`);
const handleError = (error) =>
  console.log(`### Error on DB connection: ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
