const { RoomModel } = require("../models/roomModel");

const setMessageAsDeleted = async (roomName, messageID) => {
	let room;
	const permanentRoom = await RoomModel.findOne({ _id: roomName }).select({ messages: 1, _id: 0 });

	if (permanentRoom) {
		room = permanentRoom;
	} else {
		const tempRoom = await TempRoomModel.findOne({ _id: roomName });
		room = tempRoom;
	}

	const messagesArr = room.messages;
	const index = messagesArr.findIndex(message => message._id.toString() === messageID);
	messagesArr[index].deleted = true;

	if (permanentRoom) {
		return await RoomModel.findOneAndUpdate(
			{ _id: roomName },
			{
				$set: {
					messages: messagesArr,
				},
			}
		);
	} else {
		return await TempRoomModel.findOneAndUpdate(
			{ _id: roomName },
			{
				$set: {
					messages: messagesArr,
				},
			}
		);
	}
};

const addReactionToMessage = async (room, messageID, reaction) => {
	RoomModel.findOne({ _id: room }, (err, doc) => {
		const index = doc.messages.findIndex(message => message._id.toString() === messageID);

		if (index > -1) {
			doc.messages[index].reactions[reaction] += 1;
			doc.markModified("messages");
			doc.save(err => err && console.log(err));
		}
	});
};

module.exports = { setMessageAsDeleted, addReactionToMessage };
