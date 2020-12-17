const getRoomMessages = room => [
	{
		_id: "dsadsad",
		author: "Michal",
		content: "Test message",
		created: "28.12.2020",
		seenBy: [{ _id: "11111", name: "Michal" }],
	},
	{
		_id: "dsadsad22",
		author: "Admin",
		content: "2222 1212112",
		created: "28.12.2020",
	},
	{
		_id: "dsadsad11",
		author: "Boss",
		content: "Test messagsadsadasde",
		created: "28.12.2020",
		seenBy: [{ _id: "2222", name: "Boss" }],
	},
];

module.exports = { getRoomMessages };
