const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempRoomSchema = new Schema({
	_id: String,
	users: Array,
	type: String,
	locked: Boolean,
	messages: Array,
});

const TempRoomModel = mongoose.model("tempRoom", tempRoomSchema);

module.exports = { TempRoomModel };
