const PROD = "https://xcxz-chatterv2.herokuapp.com/";
const DEV = "http://localhost:8888";

const PATH = process.env.NODE_ENV === "production" ? PROD : DEV;

export default PATH;
