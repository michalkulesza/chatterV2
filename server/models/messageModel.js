const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { RoomModel } = require("./roomModel");
const { TempRoomModel } = require("./tempRoomModel");

const messageSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	author: {
		name: String,
		picture: String,
	},
	content: String,
	created: String,
	deleted: Boolean,
	reactions: {
		"+1": Number,
		heart: Number,
		rolling_on_the_floor_laughing: Number,
		slightly_frowning_face: Number,
	},
	image: String | null,
	giphyID: String | null,
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
						deleted: this.deleted,
						reactions: this.reactions,
						image: this.image,
						giphyID: this.giphyID,
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
			{ _id: roomName },
			{
				$push: {
					messages: {
						_id: this._id,
						author: this.author,
						content: this.content,
						created: this.created,
						deleted: this.deleted,
						reactions: this.reactions,
						image: this.image,
						giphyID: this.giphyID,
					},
				},
			}
		);
	} catch (error) {
		console.error(error.message);
	}
};

const MessageModel = mongoose.model("message", messageSchema);

module.exports = { MessageModel, messageSchema };
