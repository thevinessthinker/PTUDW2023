const bcrypt = require('bcrypt');

const encode = async (rawPassword) => {
    const strength = 10;
    return await bcrypt.hash(rawPassword, strength);
};
const matches = async (rawPassword, encodedPassword) => {
    return await bcrypt.compare(rawPassword, encodedPassword);
};

module.exports = {
    encode,
    matches,
};
