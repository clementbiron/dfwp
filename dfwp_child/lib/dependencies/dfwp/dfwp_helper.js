/**
 * Static helper functions 
 */
var DFWP_Helper = function(){};

/**
 * camelize str
 * @param {Object} str
 */
DFWP_Helper.camelize = function(str)
{
	return (str + "").replace(/-\D/g, function(match) {
		return match.charAt(1).toUpperCase();
	});
};

/**
 * capitalize first letter of string
 * @param {Object} str
 */
DFWP_Helper.capitaliseFirstLetter = function(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1);
};
