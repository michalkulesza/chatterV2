const mongoose = require("mongoose");
const { addGlobalUser, removeGlobalUser, getGlobalUsers, findGlobalUser } = require("../helpers/users");

const { getRoomData, roomExists, RoomModel } = require("../models/roomModel");
const { getUserRooms, userExists, addRoomToUser } = require("../models/userModel");
const { MessageModel } = require("../models/messageModel");

const INIT_ROOM = "Main";

const handleSocket = io => {
	io.on("connection", socket => {
		let currentRoom;
		let user;

		console.log(`Socket ${socket.id} connected`);

		socket.on("initialize", async (username, registered) => {
			socket.join(INIT_ROOM);

			currentRoom = INIT_ROOM;
			user = username;

			removeGlobalUser(user);
			addGlobalUser({ id: socket.id, name: user, registered });

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

			if (registered && userRoomsData) socket.emit("userRooms", userRoomsData.rooms);
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

		socket.on("joinRoom", roomName => socket.join(roomName));

		socket.on("joinPrivate", async arrayOfNames => {
			const roomName = [...arrayOfNames].sort().join("");
			const privateRoomExists = await roomExists(roomName);
			let messages = [];
			const bothUsersAreRegistered = (await userExists(arrayOfNames[0])) && (await userExists(arrayOfNames[1]));

			if (!privateRoomExists) {
				const room = await new RoomModel({
					_id: roomName,
					type: "private",
					users: arrayOfNames,
					messages,
				}).save();

				socket.join(roomName);
				const secondUser = findGlobalUser(arrayOfNames.filter(name => name !== user)[0]);
				io.to(secondUser.id).emit("requestToJoinRoom", roomName);

				socket.emit("addUserRoom", roomName);
				io.to(secondUser.id).emit("addUserRoom", roomName);

				if (bothUsersAreRegistered) {
					const roomCopy = room.toObject();
					delete roomCopy["messages"];

					addRoomToUser(user, roomCopy);
					addRoomToUser(secondUser.name, roomName);
				} else {
				}
			} else {
				messages = await getRoomData(roomName);
				socket.join(roomName);
			}

			socket.emit("initialData", {
				_id: roomName,
				type: "private",
				messages: messages[0].messages,
				users: arrayOfNames,
			});
		});

		socket.on("disconnect", () => {
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
