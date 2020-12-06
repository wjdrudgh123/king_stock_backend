import mongoose from "mongoose";
import "./src/models/Companies";
import "./src/models/Catalyst";

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
