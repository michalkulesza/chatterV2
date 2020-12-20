const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempRoomSchema = new Schema({
	name: String,
	users: Array,
	locked: Boolean,
	messages: Array,
});

const TempRoomModel = mongoose.model("tempRoom", tempRoomSchema);

module.exports = { TempRoomModel };
