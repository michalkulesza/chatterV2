const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { RoomModel } = require("./roomModel");
const { TempRoomModel } = require("./tempRoomModel");

const messageSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	author: String,
	content: String,
	created: String,
});

messageSchema.methods.addMessage = async function (roomName) {
	try {
		await RoomModel.updateOne(
			{ _id: roomName },
			{
				$push: {
					messages: {
						_id: this._id,
						author: this.author,
						content: this.content,
						created: this.created,
					},
				},
			}
		);
	} catch (error) {
		console.error(error.message);
	}
};

messageSchema.methods.addTempMessage = async function (roomName) {
	try {
		await TempRoomModel.updateOne(
			{ name: roomName },
			{
				$push: {
					messages: {
						_id: this._id,
						author: this.author,
						content: this.content,
						created: this.created,
					},
				},
			}
		);
	} catch (error) {
		console.error(error.message);
	}
};

const MessageModel = mongoose.model("message", messageSchema);

module.exports = { MessageModel };
