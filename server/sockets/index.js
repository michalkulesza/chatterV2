const { addGlobalUser, removeGlobalUser, getGlobalUsers } = require("../helpers/users");
const { getRoomData } = require("../models/roomModel");
const { getUserRooms } = require("../models/userModel");

const INIT_ROOM = "Main";

const handleSocket = io => {
	io.on("connection", socket => {
		let currentRoom;
		let user;

		console.log(`Socket ${socket.id} connected`);

		socket.on("initialize", async ({ username }) => {
			socket.join(INIT_ROOM);
			currentRoom = INIT_ROOM;
			user = username;
			addGlobalUser({ id: socket.id, name: user });
			console.log(`Joined ${INIT_ROOM}`);

			const userRoomsData = await getUserRooms(user);
			const roomData = await getRoomData(currentRoom);

			socket.emit("initialData", { _id: currentRoom, type: "room", messages: roomData });
			socket.emit("userRooms", userRoomsData && userRoomsData.rooms);
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
