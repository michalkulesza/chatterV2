const mongoose = require("mongoose");
const { addGlobalUser, removeGlobalUser, getGlobalUsers, findGlobalUser } = require("../functions/globalUsers");

const { TempRoomModel } = require("../models/tempRoomModel");
const { MessageModel } = require("../models/messageModel");
const { RoomModel } = require("../models/roomModel");

const {
	getUserRooms,
	userExists,
	addRoomToUser,
	getUserReactions,
	addReactionToUser,
	removeReactionFromUser,
} = require("../functions/user");
const { setMessageAsDeleted, addReactionToMessage, removeReactionFromMessage } = require("../functions/messages");
const { getRoomData, roomExists, getRoomUsers } = require("../functions/room");
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
				currentRoom = INIT_ROOM;
				user = username;

				const userAlreadyConnected = findGlobalUser(user);
				if (!userAlreadyConnected) addGlobalUser({ id: socket.id, name: user, registered });

				const userRooms = await getUserRooms(user);
				const { messages, pagesLeft } = await getRoomData(currentRoom);

				if (registered) {
					userRooms.rooms.forEach(room => socket.join(room._id));
				} else {
					socket.join(currentRoom);
				}

				socket.emit("initialData", {
					_id: currentRoom,
					type: "room",
					messages,
					pagesLeft,
				});

				socket.to(currentRoom).emit("message", {
					room: currentRoom,
					message: {
						_id: mongoose.Types.ObjectId(),
						author: {
							name: "admin",
							picture: "",
						},
						created: new Date().toISOString(),
						content: `${user} joined`,
						image: null,
					},
				});

				socket.emit("message", {
					room: currentRoom,
					message: {
						_id: mongoose.Types.ObjectId(),
						author: {
							name: "admin",
							picture: "",
						},
						created: new Date().toISOString(),
						content: `You have joined`,
					},
				});

				if (registered && userRooms) socket.emit("userRooms", userRooms.rooms);
				if (!userAlreadyConnected) io.in(currentRoom).emit("userList", getGlobalUsers());

				const userReactions = await getUserReactions(user);
				socket.emit("userReactions", userReactions.reactions);
			} catch (error) {
				console.error(error);
			}
		});

		socket.on("getMoreMessages", async ({ page, results }) => {
			try {
				const { messages, pagesLeft } = await getRoomData(currentRoom, page, results);

				socket.emit("moreMessages", {
					messages,
					page,
					pagesLeft,
				});
			} catch (error) {}
		});

		socket.on("message", async ({ room, message }) => {
			try {
				const newMessage = new MessageModel({
					_id: mongoose.Types.ObjectId(),
					author: message.author,
					created: message.created,
					content: message.content,
					deleted: false,
					reactions: {
						"+1": 0,
						heart: 0,
						rolling_on_the_floor_laughing: 0,
						slightly_frowning_face: 0,
					},
					image: message.image,
					giphyID: message.giphyID,
				});

				io.in(currentRoom).emit("message", { room, message: newMessage.toObject() });

				if (await isTempRoom(currentRoom)) {
					await newMessage.addTempMessage(currentRoom);
				} else {
					await newMessage.addMessage(currentRoom);
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
							type: "private",
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
			try {
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

		socket.on("addReaction", async ({ username, room, messageID, reaction }) => {
			try {
				await addReactionToMessage(room, messageID, reaction);
				await addReactionToUser(username, messageID, reaction);

				const userReactions = await getUserReactions(username);
				socket.emit("userReactions", userReactions.reactions);

				io.in(currentRoom).emit("addReaction", { messageID, reaction });
			} catch (error) {
				console.log(error.message);
			}
		});

		socket.on("removeReaction", async ({ username, room, messageID, reaction }) => {
			try {
				await removeReactionFromMessage(room, messageID, reaction);
				await removeReactionFromUser(username, messageID);

				const userReactions = await getUserReactions(username);
				socket.emit("userReactions", userReactions.reactions);

				io.in(currentRoom).emit("removeReaction", { messageID, reaction });
			} catch (error) {
				console.log(error.message);
			}
		});

		socket.on("changeReaction", async ({ username, room, messageID, reactionFrom, reactionTo }) => {
			try {
				await removeReactionFromMessage(room, messageID, reactionFrom);
				await removeReactionFromUser(username, messageID);
				io.in(currentRoom).emit("removeReaction", { messageID, reaction: reactionFrom });

				await addReactionToMessage(room, messageID, reactionTo);
				await addReactionToUser(username, messageID, reactionTo);
				io.in(currentRoom).emit("addReaction", { messageID, reaction: reactionTo });

				const userReactions = await getUserReactions(username);
				socket.emit("userReactions", userReactions.reactions);
			} catch (error) {
				console.log(error.message);
			}
		});

		socket.on("disconnect", async () => {
			try {
				removeGlobalUser(user);
				io.emit("userList", getGlobalUsers());

				socket.to(currentRoom).emit("message", {
					room: currentRoom,
					message: {
						_id: mongoose.Types.ObjectId(),
						author: {
							name: "admin",
							picture: "",
						},
						created: new Date().toISOString(),
						content: `${user} left`,
						image: null,
						giphyID: null,
					},
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
