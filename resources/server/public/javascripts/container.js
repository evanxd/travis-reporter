/**
 * This class provides API to perform manipulation of test file bars
 * such as appending, detaching, and sorting test file bars on Travis-reporter.
 */
define(function () {
	'use strict';
	/**
	 * @private Private variables.
	 */

	var large_to_small = true,

	/**
	 * Deciding:
	 * type: current data sorting type.
	 * option: what option data will sort by.
	 */
		sortConfigure = {
			"type": large_to_small,
			"option": null
		},

	/**
	 * The target DOM object to be manipulated, the contains of manipulations
	 * including such as appending and showing data, sorting data, and removing
	 * data from it.
	 */
		target = null;

	/**
	 * @private This is a private function.
	 * Swap two DOM which are children of target DOM.
	 * @param {DOM} element01 The first DOM to be swaped.
	 * @param {DOM} element02 The second DOM to be swaped.
	 */
	function dataSwap(element01, element02) {
		$(element02).after($(element01).detach());
	}

	function sortingL2S (data, option) {
		var hasChange = true,
			value01,
			value02,
			isDigit = $.isNumeric($(data).children('.' + option).text()),
			i = 0,
			max = data.length-1,
			temp = null;

		while (hasChange) {
			hasChange = false;
			for (i = 0; i < max; i += 1) {
				value01 = $(data[i]).children('.' + option).text().toLowerCase();
				value02 = $(data[i+1]).children('.' + option).text().toLowerCase();

				if (isDigit) {
					value01 = Number(value01);
					value02 = Number(value02);
				}
				
				if(value01 < value02) {
					dataSwap(data[i], data[i+1]);
					hasChange = true;
				}

				temp = data[i];
				data[i] = data[i+1];
				data[i+1] = temp;
			}
		}
	}

	function sortingS2L (data, option) {
		var hasChange = true,
			value01,
			value02,
			isDigit = $.isNumeric($(data).children('.' + option).text()),
			i = 0,
			max = data.length-1,
			temp = null;

		while (hasChange) {
			hasChange = false;
			for (i = 0; i < max; i += 1) {
				value01 = $(data[i]).children('.' + option).text().toLowerCase();
				value02 = $(data[i+1]).children('.' + option).text().toLowerCase();

				if (isDigit) {
					value01 = Number(value01);
					value02 = Number(value02);
				}
				
				if(value01 > value02) {
					dataSwap(data[i], data[i+1]);
					hasChange = true;
				}

				temp = data[i];
				data[i] = data[i+1];
				data[i+1] = temp;
			}
		}
	}

	/**
	 * @constructor
	 * @param {DOM} target The target DOM which the test bar to be appended to.
	 */
	function Container (inputTarget) {
		target = inputTarget;
	}

	/**
	 * @public The following functions and variables are public.
	 */
	Container.prototype = {		
		/**
		 * Append data to Travis-reporter as a bar.
		 *
		 * @param {JSON} data The data to be appended to target DOM.
		 */
		appendData: function (data) {
			var i,
				max = data.length,
				bar = null,
				btDetail = null,
				key = null;

			for(i = 0; i < max; i += 1) {
				bar = '<tr id="info_bar_no' + data[i].id + '" class="tb_info_bar">';
				btDetail = '<button id="bt_detail_no' + data[i].id + '" class="bt_detail">Detail</button>';

				for(key in data[i]) {
					if(key !== 'id') {
						bar = bar + '<td class="' + key + '">' + data[i][key] + '</td>';
					}
				}
			
				bar = bar + '<td class="tb_last">' + btDetail + '</td>';
				bar = bar + '</tr>';
			
				$(target).append(bar);
			}
		},

		getData: function (name, value) {
			var data = $('tr.tb_info_bar').children('td.' + name).find(':contains("' + value + '")'),
				columns = null,
				result = [],
				i, j,
				max = data.length,
				max2 = null;

			for(i = 0; i < max; i += 1) {
				columns = $(data[i]).children();
				max2 = columns.length;
				for(j = 0; j < max2; j += 1) {
					result[i][$(columns[j]).attr('class')] = $(columns[j]).text();
				}
			}

			return result;
		},
		
		/**
		 * Sort data which are children of target DOM by specific option.
		 *
		 * @param {String} option Data will sorted by this argument.
		 * @return {Boolean} True for sorting data from large to small, false otherwise.
		 */
		sort: function (option) {
			if (option === undefined && sortConfigure.option === undefined) {
				console.log('container.js function sort() error.');
			}
			else {
				//Configuring the sorting type and option.
				if (sortConfigure.option === option) {
					sortConfigure.type = !sortConfigure.type;
				}
				else {
					sortConfigure.option = option;
					sortConfigure.type = large_to_small;
				}
		
				if (sortConfigure.type === large_to_small) {
					sortingL2S($('.tb_info_bar'), option);
				}
				else {
					sortingS2L($('.tb_info_bar'), option);
				}
			}

			return sortConfigure.type;
		},
		
		/**
		 * Swap two DOM which are children of target DOM.
		 * @param {DOM} element01 The first DOM to be swaped.
		 * @param {DOM} element02 The second DOM to be swaped.
		 */
		dataSwap: function (element01, element02) {
			$(element02).after($(element01).detach());
		},

		/**
		 * Clear all data appended to target.
		 */
		clear: function () {
			$('.tb_info_bar').detach();
		}
	};

	return Container;
});