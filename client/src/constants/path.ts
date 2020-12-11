const DEV_PATH = "http://localhost:8888";
const PROD_PATH = "http://localhost:8888";

export const PATH = process.env.NODE_ENV === "development" ? DEV_PATH : PROD_PATH;
