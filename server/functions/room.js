const { RoomModel } = require("../models/roomModel");

const roomExists = async roomName => {
	return RoomModel.exists({ _id: roomName });
};

const getRoomData = async roomName => {
	return RoomModel.find({ _id: roomName }).select({ _id: 1, messages: 1 });
};

const getRoomUsers = async roomName => {
	return RoomModel.find({ _id: roomName }).select({ users: 1, _id: 0 });
};

module.exports = { getRoomData, roomExists, getRoomUsers };
