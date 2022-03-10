import "dotenv/config";
import express from "express";

import { configs } from "./configs";
import routes from "./routes";

const app = express();

app.use(routes);

app.listen(configs.PORT, () => {
  console.log(`Running at port ${configs.PORT}`);
});
