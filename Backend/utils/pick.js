/**
 * Create an object composed of the picked object properties
 * @param {Object} object - The source object from which to pick properties.
 * @param {string[]} keys - An array of keys (property names) to pick from the source object.
 * @returns {Object} - A new object containing only the selected properties.
 */
const pick = (object, keys) => {
    // Initialize an empty object to store the picked properties.
    return keys.reduce((obj, key) => {
        // Check if the source object is not null or undefined and if it has the specified key.
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // Add the property with the specified key to the new object.
            // eslint-disable-next-line no-param-reassign is used to suppress an ESLint warning.
            obj[key] = object[key];
        }
        return obj; // Return the new object with picked properties.
    }, {});
};

module.exports = pick;
