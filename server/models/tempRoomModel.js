const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempRoomSchema = new Schema({
	name: String,
	users: Array,
});

const TempRoomModel = mongoose.model("tempRoom", tempRoomSchema);

module.exports = { TempRoomModel };
