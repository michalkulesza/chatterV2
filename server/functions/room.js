const { RoomModel } = require("../models/roomModel");

const roomExists = async roomName => {
	return RoomModel.exists({ _id: roomName });
};

const getRoomData = async roomName => {
	return RoomModel.findOne({ _id: roomName }).select({ _id: 1, messages: 1 });
};

const getRoomUsers = async roomName => {
	return RoomModel.findOne({ _id: roomName }).select({ users: 1, _id: 0 });
};

const addTempUserToRoom = async (username, roomName) => {
	return RoomModel.findOneAndUpdate(
		{ _id: roomName },
		{
			$push: {
				tempUsers: username,
			},
		}
	);
};

const removeTempUserToRoom = async (username, roomName) => {
	return RoomModel.findOneAndUpdate(
		{ _id: roomName },
		{
			$pull: {
				tempUsers: username,
			},
		}
	);
};

const setMessageAsDeleted = async (roomName, messageID) => {
	const room = await RoomModel.findOne({ _id: roomName }).select({ messages: 1, _id: 0 });

	//Room
	if (room) {
		const messagesArr = room.messages;
		const index = messagesArr.findIndex(message => message._id.toString() === messageID);
		messagesArr[index].deleted = true;

		return await RoomModel.findOneAndUpdate(
			{ _id: roomName },
			{
				$set: {
					messages: messagesArr,
				},
			}
		);
	} else {
		//TempRoom
	}
};

module.exports = {
	getRoomData,
	roomExists,
	getRoomUsers,
	addTempUserToRoom,
	removeTempUserToRoom,
	setMessageAsDeleted,
};
