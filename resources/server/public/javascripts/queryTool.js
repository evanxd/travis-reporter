define(function () {
	'use strict';

	/**
	 * @private Private variables.
	 */

	/**
	 * The querying options.
	 */
	var options = {},

	/**
	 * A JSON object to match options between this tool and back-end tool.
	 */
		optionMatcher = {
			"id": "_id",
			"name": "fileName",
			"date": "date",
			"error": "errCount",
			"count": "count"
		};

	/**
	 * @public The following functions and variables are public.
	 */
	return {
		/**
		 * Set the options for data querying.
		 *
		 * @param {String} name The name (key) of the restriction to be set.
		 * @param {String or Integer} value The content of certain restriction.
		 */
		setOptions: function(name, value) {
			if(name !== undefined) {
				if(value !== "null") {
					options[optionMatcher[name]] = value;
				}
				else {
					delete options[optionMatcher[name]];
				}
			}
			else {
				console.log('container.js function setRestriction() error.');
			}
		},

		/**
		 * Reset the options for data querying.
		 */
		resetOptions: function() {
			$.each(options, function (index) {
				delete options[index];
			});
		},

		/**
		 * Querying data through restful API from back-end server with some options.
		 *
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		query: function () {
			var result = [],
				option;

			if(options.length !== 0) {
				option = options;
			}
			else {
				option = {};
			}

			$.ajax({
				url: "/data",
				type: "GET",
				data: option,
				async: false,
				success: function (data) {
					var length = data.length,
						i = 0;

					for (i = 0; i < length; i += 1) {
						result[i] = [];
						result[i].id = data[i][optionMatcher.id];
						result[i].name = data[i][optionMatcher.name];
						result[i].date = data[i][optionMatcher.date];
						result[i].error = data[i][optionMatcher.error];
					}
				}
			});

			return result;
		}
	};
});