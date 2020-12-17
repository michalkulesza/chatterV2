const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { RoomModel } = require("./roomModel");

const messageSchema = new Schema({
	author: String,
	content: String,
	created: String,
});

messageSchema.methods.addMessage = async (roomName, message) => {
	const addMessage = async () => {
		await RoomModel.updateOne(
			{ _id: roomName },
			{
				$push: {
					messages: message,
				},
			}
		);
	};

	addMessage().catch(err => console.error(err));
};

const MessageModel = mongoose.model("message", messageSchema);

module.exports = { MessageModel };
