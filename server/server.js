require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const handleSocket = require("./sockets");
const authRouter = require("./routes/authRouter");
require("./db");

const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(cors());
app.use(function (_req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
	next();
});

app.use("/auth", authRouter);

const server = http.createServer(app);
const options = {
	cors: true,
};
const io = socketio(server, options);

handleSocket(io);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
