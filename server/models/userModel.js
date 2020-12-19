const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	password: String,
	lastSeen: String,
	rooms: Object,
});

const getUserRooms = async username => {
	return await UserModel.findOne({ name: username }).select({ rooms: 1 });
};

const userExists = async username => {
	return await UserModel.exists({ name: username });
};

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel, getUserRooms, userExists };
