const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { RoomModel } = require("./roomModel");

const messageSchema = new Schema({
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
