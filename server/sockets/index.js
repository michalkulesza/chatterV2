const { getRoomMessages } = require("../helpers/index");

const INIT_ROOM = "Main";

const handleSocket = io => {
	let currentRoom;

	io.on("connection", socket => {
		console.log(`Socket ${socket.id} connected`);

		socket.on("initialize", () => {
			socket.join(INIT_ROOM);
			currentRoom = INIT_ROOM;
			console.log(`Joined ${INIT_ROOM}`);

			socket.emit("initialData", { _id: currentRoom, type: "room", messages: getRoomMessages(currentRoom) });
		});

		socket.on("disconnect", () => {
			socket.leave(currentRoom);
			currentRoom = undefined;
			console.log(`Socket ${socket.id} disconnected`);
		});
	});
};

module.exports = handleSocket;
