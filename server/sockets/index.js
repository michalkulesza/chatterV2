const mongoose = require("mongoose");
const { addGlobalUser, removeGlobalUser, getGlobalUsers, findGlobalUser } = require("../functions/globalUsers");

const { RoomModel } = require("../models/roomModel");
const { MessageModel } = require("../models/messageModel");
const { TempRoomModel } = require("../models/tempRoomModel");

const { getRoomData, roomExists, getRoomUsers, setMessageAsDeleted } = require("../functions/room");
const { getUserRooms, userExists, addRoomToUser } = require("../functions/user");
const {
	getTempRoomsWithUser,
	deleteTempRoom,
	lockTempRoom,
	isTempRoom,
	getTempRoomMessages,
	getTempRoomUsers,
	isTempRoomLocked,
} = require("../functions/tempRoom");

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
					messages: roomMessages.messages,
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
				const message = new MessageModel({
					_id: mongoose.Types.ObjectId(),
					author,
					created,
					content,
					deleted: false,
				});

				console.log(room);

				io.in(room).emit("message", message.toObject());

				if (await isTempRoom(room)) {
					await message.addTempMessage(room);
				} else {
					await message.addMessage(room);
				}
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("setMessageAsDeleted", async ({ roomName, id }) => {
			try {
				await setMessageAsDeleted(roomName, id);

				socket.to(roomName).emit("setMessageDeleted", id);
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("joinRoom", roomName => socket.join(roomName));

		socket.on("joinPrivate", async arrayOfNames => {
			try {
				const roomName = [...arrayOfNames].sort().join("");
				const privateRoomExists = await roomExists(roomName);
				let messages = { messages: [] };
				const bothUsersAreRegistered = (await userExists(arrayOfNames[0])) && (await userExists(arrayOfNames[1]));
				const secondUser = findGlobalUser(arrayOfNames.filter(name => name !== user)[0]);
				let roomCopy;

				socket.join(roomName);

				if (!privateRoomExists) {
					if (bothUsersAreRegistered) {
						const room = await new RoomModel({
							_id: roomName,
							type: "private",
							users: arrayOfNames,
							messages: messages.messages,
						}).save();

						roomCopy = room.toObject();
						delete roomCopy && roomCopy["messages"] && roomCopy["messages"];

						await addRoomToUser(user, roomCopy);
						await addRoomToUser(secondUser.name, roomCopy);
					} else {
						const room = await new TempRoomModel({
							_id: roomName,
							users: arrayOfNames,
							locked: false,
						}).save();

						roomCopy = room.toObject();
					}
					socket.emit("addUserRoom", roomCopy);
					io.to(secondUser.id).emit("addUserRoom", roomCopy);
				} else {
					messages = await getRoomData(roomName);
				}

				socket.emit("initialData", {
					_id: roomName,
					type: "private",
					messages: messages.messages,
					users: arrayOfNames,
					locked: false,
				});
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("switchRooms", async room => {
			console.log(room);
			try {
				socket.leave(currentRoom);
				currentRoom = room;
				let roomUsers;
				let locked = false;

				if (await isTempRoom(room)) {
					roomMessages = await getTempRoomMessages(currentRoom);
					roomUsers = await getTempRoomUsers(currentRoom);
					const lockedRes = await isTempRoomLocked(currentRoom);
					locked = lockedRes.locked;
				} else {
					roomMessages = await getRoomData(currentRoom);
					roomUsers = await getRoomUsers(currentRoom);
					locked = false;
				}

				socket.emit("initialData", {
					_id: currentRoom,
					type: "private",
					messages: roomMessages && roomMessages.messages,
					users: roomUsers.users,
					locked,
				});

				socket.join(currentRoom);
			} catch (error) {
				console.error(error.message);
			}
		});

		socket.on("disconnect", async () => {
			try {
				removeGlobalUser(user);
				io.emit("userList", getGlobalUsers());

				socket.to(currentRoom).emit("message", {
					_id: mongoose.Types.ObjectId(),
					author: "admin",
					created: new Date().toISOString(),
					content: `${user} left`,
				});

				const usersTempRooms = await getTempRoomsWithUser(user);
				let roomsToLockAndLeave = [];
				let roomsToDelete = [];

				///////////////////
				usersTempRooms.forEach(room => {
					if (room.locked === false) roomsToLockAndLeave = [...roomsToLockAndLeave, room._id];
					if (room.locked === true) roomsToDelete = [...roomsToDelete, room._id];
				});

				roomsToLockAndLeave.forEach(async room => {
					lockTempRoom(room);

					const tempRoomUsers = await getTempRoomUsers(room);
					const otherUserName = tempRoomUsers.users.filter(user => user.name !== user);

					const globalUsers = getGlobalUsers();
					const secondUser = globalUsers.filter(user => user.name === otherUserName[0]);

					io.to(secondUser[0].id).emit("lockRoom", room);
				});

				roomsToDelete.forEach(async room => {
					await deleteTempRoom(room);
				});
				///////////////////
			} catch (error) {
				console.error(error.message);
			}

			console.log(`Socket ${socket.id} disconnected`);
		});
	});
};

module.exports = handleSocket;
