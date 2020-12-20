let globalUsers = [];

const addGlobalUser = user => (globalUsers = [...globalUsers, user]);

const removeGlobalUser = username => {
	const index = globalUsers.findIndex(user => user.name === username);
	index >= 0 && globalUsers.splice(index, 1);
};

const getGlobalUsers = () => globalUsers;

const findGlobalUser = username => globalUsers.find(user => user.name === username);

module.exports = { addGlobalUser, removeGlobalUser, getGlobalUsers, findGlobalUser };
