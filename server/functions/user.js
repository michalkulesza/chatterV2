const { UserModel } = require("../models/userModel");

const getUserRooms = async username => {
	return await UserModel.findOne({ name: username }).select({ rooms: 1 });
};

const userExists = async username => {
	return await UserModel.exists({ name: username });
};

const addRoomToUser = async (username, room) => {
	return await UserModel.findOneAndUpdate(
		{ name: username },
		{
			$push: {
				rooms: room,
			},
		}
	);
};

const updateProfileImage = async (username, profileImage) => {
	return await UserModel.findOneAndUpdate(
		{ name: username },
		{
			$set: {
				profileImage,
			},
		}
	);
};

const getUserReactions = async username => await UserModel.findOne({ name: username }).select({ reactions: 1, _id: 0 });

const addReactionToUser = async (username, messageID, reaction) => {
	return await UserModel.findOneAndUpdate(
		{ name: username },
		{
			$push: {
				reactions: {
					messageID,
					reaction,
				},
			},
		}
	);
};

module.exports = {
	getUserRooms,
	userExists,
	addRoomToUser,
	updateProfileImage,
	getUserReactions,
	addReactionToUser,
};
