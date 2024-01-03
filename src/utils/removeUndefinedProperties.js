function removeUndefinedProperties(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

module.exports = removeUndefinedProperties;
