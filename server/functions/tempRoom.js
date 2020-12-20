const { TempRoomModel } = require("../models/tempRoomModel");

const getTempRoomsWithUser = async username => {
	return TempRoomModel.find({
		users: {
			$all: [username],
		},
	});
};

const removeUserFromTempRoom = async (username, roomname) => {
	await TempRoomModel.findOneAndUpdate(
		{ name: roomname },
		{
			$pull: {
				users: username,
			},
		}
	);
};

const deleteTempRoom = async roomname => {
	await TempRoomModel.findOneAndRemove({ name: roomname });
};

const lockTempRoom = async roomname => {
	await TempRoomModel.findOneAndUpdate(
		{ name: roomname },
		{
			$set: {
				locked: true,
			},
		}
	);
};

const isTempRoom = async roomname => {
	return TempRoomModel.exists({ name: roomname });
};

const getTempRoomMessages = async roomname => {
	return TempRoomModel.findOne({ name: roomname }).select({ messages: 1, _id: 0 });
};

const getTempRoomUsers = async roomname => {
	return TempRoomModel.findOne({ name: roomname }).select({ users: 1, _id: 0 });
};

const isTempRoomLocked = async roomname => {
	return TempRoomModel.findOne({ name: roomname }).select({ locked: 1, _id: 0 });
};

module.exports = {
	getTempRoomsWithUser,
	removeUserFromTempRoom,
	deleteTempRoom,
	lockTempRoom,
	isTempRoom,
	getTempRoomMessages,
	getTempRoomUsers,
	isTempRoomLocked,
};
