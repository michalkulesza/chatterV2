const { getRoomMessages } = require("../helpers/index");
const { addGlobalUser, removeGlobalUser, getGlobalUsers } = require("../helpers/users");

const INIT_ROOM = "Main";

const handleSocket = io => {
	io.on("connection", socket => {
		let currentRoom;
		let user;

		console.log(`Socket ${socket.id} connected`);

		socket.on("initialize", ({ username }) => {
			socket.join(INIT_ROOM);
			currentRoom = INIT_ROOM;
			user = username;
			addGlobalUser({ id: socket.id, name: user });
			console.log(`Joined ${INIT_ROOM}`);

			socket.emit("initialData", { _id: currentRoom, type: "room", messages: getRoomMessages(currentRoom) });
			socket.emit("userList", getGlobalUsers());
		});

		socket.on("disconnect", () => {
			socket.leave(currentRoom);
			removeGlobalUser(user);
			console.log(`Socket ${socket.id} disconnected`);
		});
	});
};

module.exports = handleSocket;
