const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRoomsSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ["room", "private"],
		required: true,
	},
	users: Array,
	tempRooms: Array,
	locked: Boolean,
});

const userSchema = new Schema({
	name: String,
	password: String,
	lastSeen: String,
	rooms: [userRoomsSchema],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
