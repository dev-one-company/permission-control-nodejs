import type { Config } from "@jest/types";

const configs: Config.InitialOptions = {
  verbose: true,
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
};

export default configs;
