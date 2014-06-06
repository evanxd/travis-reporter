define(function () {
	'use strict';

	/**
	 * @private Private variables.
	 */

	/**
	 * @private
	 * The querying options.
	 */
	var options = {},

	/**
	 * @private
	 * A JSON object to match options between this tool and back-end tool.
	 */
		optionMatcher = {
			"id": "_id",
			"name": "filePath",
			"date": "date",
			"error": "errCount",
			"count": "count",
			"build": "buildID",
			"job": "jobID"
		};

	/**
	 * @private
	 * Send request to restfulAPI.
	 * @param {String} reqUrl The target URL pointing to appropriate restfulAPI.
	 * @returns {JSON} The response from restfulAPI.
	 */
	function request(reqUrl) {
		var response = null;

		$.ajax({
			url: reqUrl,
			type: "GET",
			data: options,
			async: false
		}).done(function (data) {
			response = data;
		});

		return response;
	}

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
			options = {};
		},

		/**
		 * Querying data through restful API from back-end server with some options.
		 * This fucntion is used for home page purpose.
		 *
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		query: function () {
			var data = null,
				result = [],
				length = 0,
				i;

			if(options.length === 0) {
				options = {};
			}

			data = request("/data");

			length = data.length;

			for (i = 0; i < length; i += 1) {
				result[i] = [];
				result[i].name = data[i][optionMatcher.name];
				result[i].date = data[i][optionMatcher.date];
				result[i].error = data[i][optionMatcher.error];
			}

			return result;
		},

		/**
		 * Querying data through restful API from back-end server with some options.
		 * This fucntion is used for detail page purpose.
		 *
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		queryDetail: function () {
			var data = null,
				result = [],
				length = 0,
				i;

			if(options.length === 0) {
				options = {};
			}

			data = request("/data/detail");

			length = data.length;

			for (i = 0; i < length; i += 1) {
				result[i] = [];
				result[i].job = data[i][optionMatcher.job];
				result[i].date = data[i][optionMatcher.date];
			}

			return result;
		}
	};
});