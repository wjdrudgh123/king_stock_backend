import app from "./src/app";
import "./db";

const PORT = 4000 || process.env.PORT;

const handleListening = () => {
  console.log(`### Server Listening on: http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
