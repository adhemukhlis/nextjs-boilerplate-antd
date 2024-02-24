const { pickBy, isNumber, isFinite, isBoolean, isEmpty } = require('lodash')
/**
 * Removes properties that contain falsy values from an object.
 * @param {Object} obj - The object to compact.
 * @param {boolean} [allowEmpty=false] - Whether to allow empty values.
 * @returns {Object} - The compacted object.
 */

const compactObject = (obj, allowEmpty = false) =>
	pickBy(obj, (v) => (isNumber(v) && isFinite(v)) || isBoolean(v) || !isEmpty(v) || allowEmpty)
export default compactObject
