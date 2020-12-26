const reservedNames = ["admin"];

const isUsernameReserved = username => reservedNames.includes(username);

module.exports = { isUsernameReserved };
