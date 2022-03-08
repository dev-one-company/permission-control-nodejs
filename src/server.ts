import express from "express";
import { config } from "dotenv";
import { configs } from "./configs";

config();

const app = express();

app.listen(configs.PORT, () => {
  console.log(`Running at port ${configs.PORT}`);
});
