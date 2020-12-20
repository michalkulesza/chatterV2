const mongoose = require("mongoose");
const { addGlobalUser, removeGlobalUser, getGlobalUsers, findGlobalUser } = require("../functions/globalUsers");

const { RoomModel } = require("../models/roomModel");
const { MessageModel } = require("../models/messageModel");
const { TempRoomModel } = require("../models/tempRoomModel");

const { getUserRooms, userExists, addRoomToUser } = require("../functions/user");
const { getRoomData, roomExists, getRoomUsers } = require("../functions/room");
const { getTempRoomsWithUser, removeUserFromTempRoom, deleteTempRoom } = require("../functions/tempRoom");

const INIT_ROOM = "Main";

const handleSocket = io => {
	io.on("connection", socket => {
		let currentRoom;
		let user;
		let roomMessages;

		console.log(`Socket ${socket.id} connected`);

		socket.on("initialize", async (username, registered) => {
			try {
				socket.join(INIT_ROOM);

				currentRoom = INIT_ROOM;
				user = username;

				removeGlobalUser(user);
				addGlobalUser({ id: socket.id, name: user, registered });

				const userRoomsData = await getUserRooms(user);
				roomMessages = await getRoomData(currentRoom);

				socket.emit("initialData", {
					_id: currentRoom,
					type: "room",
					messages: roomMessages && roomMessages[0] ? roomMessages[0].messages : [],
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
			} catch (error) {
				console.error(error);
			}
		});

		socket.on("message", async ({ author, created, content, room }) => {
			try {
				const _id = mongoose.Types.ObjectId();

				const message = new MessageModel({
					_id,
					author,
					created,
					content,
				});

				socket.to(room).emit("message", { ...message.toObject(), _id });
				await message.addMessage(room);
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("joinRoom", roomName => socket.join(roomName));

		socket.on("joinPrivate", async arrayOfNames => {
			try {
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
						locked: false,
					}).save();

					socket.join(roomName);
					const secondUser = findGlobalUser(arrayOfNames.filter(name => name !== user)[0]);

					const roomCopy = room.toObject();
					delete roomCopy["messages"];

					if (bothUsersAreRegistered) {
						await addRoomToUser(user, roomCopy);
						await addRoomToUser(secondUser.name, roomCopy);
					} else {
						await new TempRoomModel({
							name: roomName,
							users: arrayOfNames,
						}).save();
					}
					socket.emit("addUserRoom", roomCopy);
					io.to(secondUser.id).emit("addUserRoom", roomCopy);
				} else {
					messages = await getRoomData(roomName);
					socket.join(roomName);
				}

				socket.emit("initialData", {
					_id: roomName,
					type: "private",
					messages: messages[0].messages,
					users: arrayOfNames,
					locked: false,
				});
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("switchRooms", async room => {
			try {
				socket.leave(currentRoom);
				currentRoom = room;
				roomMessages = await getRoomData(currentRoom);
				const roomUsers = await getRoomUsers(currentRoom);

				socket.emit("initialData", {
					_id: currentRoom,
					type: "private",
					messages: roomMessages && roomMessages[0] && roomMessages[0].messages,
					users: roomUsers[0].users,
				});

				socket.join(currentRoom);
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("disconnect", async () => {
			removeGlobalUser(user);
			io.in(currentRoom).emit("userList", getGlobalUsers());

			socket.to(currentRoom).emit("message", {
				_id: mongoose.Types.ObjectId(),
				author: "admin",
				created: new Date().toISOString(),
				content: `${user} left`,
			});

			const usersTempRooms = await getTempRoomsWithUser(user);
			let roomsToLockAndLeave = [];
			let roomsToDelete = [];

			usersTempRooms.forEach(room => {
				if (room.users.length === 2) roomsToLockAndLeave = [...roomsToLockAndLeave, room.name];
				if (room.users.length < 2) roomsToDelete = [...roomsToDelete, room.name];
			});

			roomsToLockAndLeave.forEach(async room => {
				io.in(room).emit("lockRoom", room);
				io.in(room).emit("message", {
					_id: mongoose.Types.ObjectId(),
					author: "admin",
					created: new Date().toISOString(),
					content: `Chat has been locked. You can no longer send messages.`,
				});
				io.in(room).emit("message", {
					_id: mongoose.Types.ObjectId(),
					author: "admin",
					created: new Date().toISOString(),
					content: `After this session messages will be permanently deleted.`,
				});
				await removeUserFromTempRoom(user, room);
			});

			roomsToDelete.forEach(async room => {
				await deleteTempRoom(room);
			});

			console.log(`Socket ${socket.id} disconnected`);
		});
	});
};

module.exports = handleSocket;
