define(function () {
	'use strict';

	/**
	 * @class DataBar
	 * @constructor
	 * @param {DOM} target The target DOM for this object to handle.
	 */
	function DataBar(target) {
		/**
	 	 * The target DOM object to be manipulated, manipulations includes
	 	 * getting informations from it.
	 	 */
		this.targetDOM = $(target);
		this.columns = [];

		var temp = $(target).children(),
			i,
			max = temp.length - 1; //Ignore tb_last

		for (i = 0; i < max; i += 1) {
			this.columns[$(temp[i]).attr("class")] = $(temp[i]).text();
		}
	}

	/**
	 * @public The following functions and variables are public.
	 */
	DataBar.prototype = {
		/**
		 * Get certain information of this data bar.
		 * @param {String} column The certain column name of this
		 * data bar.
		 * @returns {String} The corresponding information.
		 */
		getInfo: function (column) {
			return this.columns[column];
		},

		/**
		 * Get whole data bar.
		 * @returns {DOM} The whole data bar DOM object.
		 */
		get: function () {
			return this.targetDOM;
		}
	};

	return DataBar;
});