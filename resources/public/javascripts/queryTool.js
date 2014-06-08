/**
 * This Javascript file returns a QueryTool class providing APIs
 * to send request to restfulAPI to query and get data from it.
 */
define(function () {
	'use strict';	
	/**
	 * @private
	 * A JSON object to match options between this tool and back-end tool.
	 */
	var	optionMatcher = {
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
	function request(reqUrl, options) {
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
	 * @public
	 * @constructor
	 */
	function QueryTool() {
		this.options = {};
	}

	QueryTool.prototype = {
		/**
		 * Set the options for data querying.\
		 * @param {String} name The name (key) of the restriction to be set.
		 * @param {String or Integer} value The content of certain restriction.
		 */
		setOptions: function(name, value) {
			if(name !== undefined) {
				if(value !== "null") {
					this.options[optionMatcher[name]] = value;
				}
				else {
					delete this.options[optionMatcher[name]];
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
			this.options = {};
		},

		/**
		 * Querying data through restful API from back-end server with some options.
		 * This fucntion is used for home page purpose.
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		query: function () {
			var data = null,
				result = [],
				length = 0,
				i;

			if(this.options.length === 0) {
				this.options = {};
			}

			data = request("/data", this.options);

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
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		queryDetail: function () {
			var data = null,
				result = [],
				length = 0,
				i;

			if(this.options.length === 0) {
				this.options = {};
			}

			data = request("/data/detail", this.options);

			length = data.length;

			for (i = 0; i < length; i += 1) {
				result[i] = [];
				result[i].job = data[i][optionMatcher.job];
				result[i].date = data[i][optionMatcher.date];
			}

			return result;
		}
	};

	return QueryTool;
});