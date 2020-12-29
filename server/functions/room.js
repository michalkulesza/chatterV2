const { RoomModel } = require("../models/roomModel");

const roomExists = async roomName => {
	return RoomModel.exists({ _id: roomName });
};

const getRoomData = async (roomName, page = 0, results = 10) => {
	const messages = await RoomModel.aggregate([
		{ $match: { _id: roomName } },
		{ $unwind: "$messages" },
		{
			$sort: { "messages.created": -1 },
		},
		{ $skip: page * results },
		{ $limit: results },
		{
			$sort: { "messages.created": 1 },
		},
		{ $group: { _id: "$_id", messages: { $push: "$messages" } } },
	]);

	const messagesArr = await RoomModel.findOne({ _id: roomName }).select({ messages: 1, _id: 0 });
	const pagesLeft = Math.floor((messagesArr.messages.length - page * results + 1) / 10);

	return { messages, pagesLeft };
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

module.exports = {
	getRoomData,
	roomExists,
	getRoomUsers,
	addTempUserToRoom,
	removeTempUserToRoom,
};
