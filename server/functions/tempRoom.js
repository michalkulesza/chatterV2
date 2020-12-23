const { TempRoomModel } = require("../models/tempRoomModel");

const getTempRoomsWithUser = async username => {
	return TempRoomModel.find({
		users: {
			$all: [username],
		},
	});
};

const deleteTempRoom = async roomname => {
	return TempRoomModel.findOneAndRemove({ _id: roomname });
};

const lockTempRoom = async roomname => {
	await TempRoomModel.findOneAndUpdate(
		{ _id: roomname },
		{
			$set: {
				locked: true,
			},
		}
	);
};

const isTempRoom = async roomname => {
	return TempRoomModel.exists({ _id: roomname });
};

const getTempRoomMessages = async roomname => {
	return TempRoomModel.findOne({ _id: roomname }).select({ messages: 1, _id: 0 });
};

const getTempRoomUsers = async roomname => {
	return TempRoomModel.findOne({ _id: roomname }).select({ users: 1, _id: 0 });
};

const isTempRoomLocked = async roomname => {
	return TempRoomModel.findOne({ _id: roomname }).select({ locked: 1, _id: 0 });
};

module.exports = {
	getTempRoomsWithUser,
	deleteTempRoom,
	lockTempRoom,
	isTempRoom,
	getTempRoomMessages,
	getTempRoomUsers,
	isTempRoomLocked,
};
