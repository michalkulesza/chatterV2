const mongoose = require("mongoose");
const { addGlobalUser, removeGlobalUser, getGlobalUsers } = require("../helpers/users");

const { getRoomData } = require("../models/roomModel");
const { getUserRooms } = require("../models/userModel");
const { MessageModel } = require("../models/messageModel");

const INIT_ROOM = "Main";

const handleSocket = io => {
	io.on("connection", socket => {
		let currentRoom;
		let user;

		console.log(`Socket ${socket.id} connected`);

		socket.on("initialize", async username => {
			socket.join(INIT_ROOM);

			currentRoom = INIT_ROOM;
			user = username;

			addGlobalUser({ id: socket.id, name: user });

			const userRoomsData = await getUserRooms(user);
			const roomData = await getRoomData(currentRoom);

			socket.emit("initialData", {
				_id: currentRoom,
				type: "room",
				messages: roomData && roomData[0] && roomData[0].messages,
			});

			socket.to(currentRoom).emit("message", {
				_id: mongoose.Types.ObjectId(),
				author: "admin",
				created: new Date().toISOString(),
				content: `${user} joined`,
			});

			socket.emit("message", {
				_id: mongoose.Types.ObjectId(),
				author: "admin",
				created: new Date().toISOString(),
				content: `You have joined`,
			});

			socket.emit("userRooms", userRoomsData && userRoomsData.rooms);
			io.in(currentRoom).emit("userList", getGlobalUsers());
		});

		socket.on("message", async ({ author, created, content, room }) => {
			const _id = mongoose.Types.ObjectId();

			const message = new MessageModel({
				_id,
				author,
				created,
				content,
			});

			socket.to(room).emit("message", { ...message.toObject(), _id });
			await message.addMessage(room);
		});

		socket.on("disconnect", () => {
			socket.leave(currentRoom);
			removeGlobalUser(user);

			io.in(currentRoom).emit("userList", getGlobalUsers());

			socket.to(currentRoom).emit("message", {
				_id: mongoose.Types.ObjectId(),
				author: "admin",
				created: new Date().toISOString(),
				content: `${user} left`,
			});

			console.log(`Socket ${socket.id} disconnected`);
		});
	});
};

module.exports = handleSocket;
