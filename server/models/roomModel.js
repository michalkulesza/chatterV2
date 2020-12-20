const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: String,
	type: String,
	users: Array,
	messages: Array,
});

const roomExists = async roomName => {
	return RoomModel.exists({ _id: roomName });
};

const getRoomData = async roomName => {
	return RoomModel.find({ _id: roomName }).select({ _id: 1, messages: 1 });
};

const getRoomUsers = async roomName => {
	return RoomModel.find({ _id: roomName }).select({ users: 1, _id: 0 });
};

const RoomModel = mongoose.model("room", roomSchema);

module.exports = { RoomModel, getRoomData, roomExists, getRoomUsers };
