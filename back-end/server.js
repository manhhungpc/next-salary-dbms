import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import dotenv from "dotenv";

const app = express();
const PORT = 8000 || process.env.PORT;

dotenv.config();
app.use(express.json());
app.use(cors());

routes(app);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
