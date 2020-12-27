const { RoomModel } = require("../models/roomModel");
const { TempRoomModel } = require("../models/tempRoomModel");

const roomExists = async roomName => {
	return RoomModel.exists({ _id: roomName });
};

const getRoomData = async roomName => {
	return RoomModel.findOne({ _id: roomName }).select({ _id: 1, messages: 1 });
};

const getRoomUsers = async roomName => {
	return RoomModel.findOne({ _id: roomName }).select({ users: 1, _id: 0 });
};

const addTempUserToRoom = async (username, roomName) => {
	return RoomModel.findOneAndUpdate(
		{ _id: roomName },
		{
			$push: {
				tempUsers: username,
			},
		}
	);
};

const removeTempUserToRoom = async (username, roomName) => {
	return RoomModel.findOneAndUpdate(
		{ _id: roomName },
		{
			$pull: {
				tempUsers: username,
			},
		}
	);
};

module.exports = {
	getRoomData,
	roomExists,
	getRoomUsers,
	addTempUserToRoom,
	removeTempUserToRoom,
};
