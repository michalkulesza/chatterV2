const PROD = "";
const DEV = "http://localhost:8888";

const PATH = process.env.NODE_ENV === "production" ? PROD : DEV;

export default PATH;
