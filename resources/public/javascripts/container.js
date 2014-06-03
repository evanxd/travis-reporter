/**
 * This Javascript file returns "Container" as a class.
 * This class provides API to perform manipulation of test file bars
 * such as appending, detaching, and sorting test file bars on Travis-reporter.
 */
define(["dataBar"], function (DataBar) {
	'use strict';
	/**
	 * @private Private variables.
	 */

	var large_to_small = true;

	/**
	 * @class Container
	 * @constructor
	 * @param {DOM} target The target DOM which the test bar to be appended to.
	 */
	function Container (inputTarget) {
		/**
		 * The target DOM object to be manipulated, the manipulations includes
		 * appending and showing data, sorting data, and removing data from it.
		 */
		this.target = inputTarget;

		/**
		 * The dataBars to be shown on Travis-reporter.
		 */
		this.dataBars = [];

		/**
		 * Deciding:
		 * type: current data sorting type.
		 * option: what option data will sort by.
		 */
		this.sortConfigure = {
			"type": large_to_small,
			"option": null
		};
	};

	/**
	 * @public The following functions and variables are public.
	 */
	Container.prototype = {		
		/**
		 * Append data to Travis-reporter as a bar.
		 * @param {JSON} data The data to be appended to target DOM.
		 */
		appendData: function (data) {
			var i,
				max = data.length,
				$bar = null,
				$column = null,
				$btDetail = null,
				key = null;

			for (i = 0; i < max; i += 1) {
				$bar = $("<tr>");
				$bar.attr("id", "info_bar_no" + data[i].id);
				$bar.attr("class", "tb_info_bar");

				$btDetail = $("<button>");
				$btDetail.attr("id", "bt_detail_no" + data[i].id);
				$btDetail.attr("class", "bt_detail bt");
				$btDetail.append("Detail");

				for (key in data[i]) {
					if(key !== 'id') {
						$column = $("<td>");
						$column.attr("class", key);
						$column.append(data[i][key]);
						$bar.append($column);
					}
				}
			
				$column = $("<td>");
				$column.attr("class", "tb_last");
				$column.append($btDetail);
			
				$bar.append($column);

				$(this.target).append($bar);
	
				this.dataBars.push(new DataBar($("#info_bar_no" + data[i].id)));
			}
		},

		/**
		 * Get the specific data bar with the given value.
		 * @param {String} name The certain column of the data bar.
		 * @param {String} value The corresponding value of the column.
		 * @returns {DOM} A whole data bar DOM.
		 */
		getData: function (name, value) {
			var result = [],
				i,
				max = this.dataBars.length;

			for (i = 0; i < max; i += 1) {
				if (this.dataBars[i].getInfo(name) === value) {
					result.push(this.dataBars[i].get());
				}
			}

			return result;
		},
		
		/**
		 * Sort data which are children of target DOM by specific option.
		 * @param {String} option Data will sorted by this argument.
		 * @returns {Boolean} True for sorting data from large to small, false otherwise.
		 */
		sort: function (option) {
			var i, max;

			if (option === undefined && this.sortConfigure.option === undefined) {
				console.log('container.js function sort() error.');
			}
			else {
				// Configuring the sorting type and option.
				if (this.sortConfigure.option === option) {
					this.sortConfigure.type = !this.sortConfigure.type;
				}
				else {
					this.sortConfigure.option = option;
					this.sortConfigure.type = large_to_small;
				}
				
				// Choose sorting function and execute it.
				if (this.sortConfigure.type === large_to_small) {
					this.sortingL2S();
				}
				else {
					this.sortingS2L(this.dataBars, option);
				}
			}

			// Actions after sorting.
			// Clear data in target container.
			$('.tb_info_bar').detach();

			// Then add sorted data on to target container.
			max = this.dataBars.length;
			for (i = 0; i < max; i += 1) {
				$(this.target).append(this.dataBars[i].get());
			}

			return this.sortConfigure.type;
		},

		/**
		 * Sort data from large to small.
		 */
		sortingL2S: function () {
			var hasChange = true,
				value01,
				value02,
				i = 0,
				max = this.dataBars.length-1;

			while (hasChange) {
				hasChange = false;
				for (i = 0; i < max; i += 1) {
					value01 = this.dataBars[i].getInfo(this.sortConfigure.option);
					value02 = this.dataBars[i + 1].getInfo(this.sortConfigure.option);
					
					if($.isNumeric(value01)) {
						value01 = Number(value01);
						value02 = Number(value02);
					}
					else {
						value01 = value01.toLowerCase();
						value02 = value02.toLowerCase();
					}

					if(value01 < value02) {
						this.dataSwap(i, i + 1);
						hasChange = true;
					}
				}
			}
		},

		/**
		 * Sort data from small to large.
		 */
		sortingS2L: function () {
			var hasChange = true,
				value01,
				value02,
				i = 0,
				max = this.dataBars.length-1;

			while (hasChange) {
				hasChange = false;
				for (i = 0; i < max; i += 1) {
					value01 = this.dataBars[i].getInfo(this.sortConfigure.option);
					value02 = this.dataBars[i + 1].getInfo(this.sortConfigure.option);
					
					if($.isNumeric(value01)) {
						value01 = Number(value01);
						value02 = Number(value02);
					}
					else {
						value01 = value01.toLowerCase();
						value02 = value02.toLowerCase();
					}

					if(value01 > value02) {
						this.dataSwap(i, i + 1);
						hasChange = true;
					}
				}
			}
		},
		
		/**
		 * Swap two data bars in this object but not actually swap two
		 * DOM data bar on the target container.
		 * @param {Integer} index01 First data bar to be swaped.
		 * @param {Integer} index02 Second data bar to be swaped.
		 */
		dataSwap: function (index01, index02) {
			var temp = this.dataBars[index01];
			this.dataBars[index01] = this.dataBars[index02];
			this.dataBars[index02] = temp;
		},

		/**
		 * Clear all data appended to target.
		 */
		clear: function () {
			$('.tb_info_bar').detach();
			this.dataBars = [];
		}
	};

	return Container;
});