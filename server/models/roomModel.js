const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
	_id: String,
	type: String,
	users: Array,
	messages: Array,
	locked: Boolean,
});

const RoomModel = mongoose.model("room", roomSchema);

module.exports = { RoomModel };
