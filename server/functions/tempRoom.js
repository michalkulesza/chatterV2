const { TempRoomModel } = require("../models/tempRoomModel");

const getTempRoomsWithUser = async username => {
	return TempRoomModel.find({
		users: {
			$all: [username],
		},
	});
};

const removeUserFromTempRoom = async (username, roomname) => {
	await TempRoomModel.findOneAndUpdate(
		{ name: roomname },
		{
			$pull: {
				users: username,
			},
		}
	);
};

const deleteTempRoom = async roomname => {
	await TempRoomModel.findOneAndRemove({ name: roomname });
};

module.exports = { getTempRoomsWithUser, removeUserFromTempRoom, deleteTempRoom };
