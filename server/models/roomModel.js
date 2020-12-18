const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: String,
	type: String,
	users: Array,
	messages: Array,
});

roomSchema.methods.addRoom = async roomName => {
	const addRoom = async () => {
		await RoomModel.create({ _id: roomName, type: "room", messages: [] });
	};

	addRoom().catch(err => console.error(err));
};

roomSchema.methods.addPrivateRoom = async roomName => {
	const addPrivateRoom = async () => {
		await RoomModel.create({ _id: roomName, type: "private", users: [], messages: [] });
	};

	addPrivateRoom().catch(err => console.error(err));
};

const getRoomData = async roomName => {
	return RoomModel.find({ _id: roomName }).select({ _id: 0, messages: 1 });
};

const RoomModel = mongoose.model("room", roomSchema);

module.exports = { RoomModel, getRoomData };
