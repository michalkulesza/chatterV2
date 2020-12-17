let globalUsers = [];

const addGlobalUser = user => (globalUsers = [...globalUsers, user]);

const removeGlobalUser = user => globalUsers.splice(globalUsers.indexOf(user), 1);

const getGlobalUsers = () => globalUsers;

module.exports = { addGlobalUser, removeGlobalUser, getGlobalUsers };
