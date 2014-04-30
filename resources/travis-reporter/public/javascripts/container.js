'use strict';

/**
 * This class provides API to perform manipulation of test file bars
 * such as appending, detaching, and sorting test file bars on Travis-reporter.
 */
define(function(require) {
	var testGenerator = require('fakeData');

	/**
	 * @private This is a private function.
	 * Swap two DOM which are children of target DOM.
	 * @param {DOM} element01 The first DOM to be swaped.
	 * @param {DOM} element02 The second DOM to be swaped.
	 */
	function dataSwap(element01, element02) {
		$(element02).after($(element01).detach());
	}

	/**
	 * @private Private variables.
	 */

	const large_to_small = true;

	var sortConfigure = {
		"type": large_to_small,
		"option": null
	};

	var target = null;

	var restriction = new Array();

	/**
	 * @constructor
	 * @param {DOM} target The target DOM which the test bar to be appended to.
	 */
	return function(inputTarget) {
		target = inputTarget;
		
		/**
		 * This is an init function to give Travis-reporter an initial view
		 * of test files.
		 */
		this.init = function() {
			this.setRestriction('count', 10);
			this.clear();
			this.appendData(this.query());
		}
		
		/**
		 * Append data to Travis-reporter as a bar.
		 *
		 * @param {JSON} data The data to be appended to target DOM.
		 */
		this.appendData = function(data) {
			for(var i=0; i<data.length; i++) {
				var bar = '<tr id="info_bar_no' + data[i]['id'] + '" class="tb_info_bar">';
				var btDetail = '<button id="bt_detail_no' + data[i]['id'] + '" class="bt_detail">Detail</button>';

				for(var key in data[i]) {
					if(key != 'id') {
						bar = bar + '<td class="' + key + '">' + data[i][key] + '</td>';
					}
				}
			
				bar = bar + '<td class="tb_last">' + btDetail + '</td>';
				bar = bar + '</tr>';
			
				$(target).append(bar);
			}
		}
		
		/**
		 * Set the restriction for data querying.
		 *
		 * @param {String} name The name (key) of the restriction to be set.
		 * @param {String or Integer} value The content of certain restriction.
		 */
		this.setRestriction = function(name, value) {
			if(name != null) {
				if(value != 'null') {
					restriction[name] = value;
				}
				else {
					restriction[name] = null;
				}
			}
			else {
				console.log('container.js function setRestriction() error.');
			}
		}

		/**
		 * Reset the restriction for data querying.
		 */
		this.resetRestriction = function() {
			restriction = [];
		}

		/**
		 * Querying data through restful API from back-end server with some options.
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		this.query = function() {
			var result = new Array();
			result = testGenerator.generateFakeTest(restriction);
			
			return result;
		}

		/**
		 * Set total count to be shown to the user.
		 * 
		 * @param {Integer} count The count to be set.
		 */
		this.setCount = function(count) {
			this.dataCount = count;
		}
		
		/**
		 * Sort data which are children of target DOM by specific option.
		 * @param {String} option Data will sorted by this argument.
		 */
		this.sort = function(option) {
			if(option == null && sortConfigure['option'] == null) {
				console.log('container.js function sort() error.');
			}
			else {
				//Configuring the sorting type and option.
				if(sortConfigure['option'] == option) {
					sortConfigure['type'] = !sortConfigure['type'];
				}
				else {
					sortConfigure['option'] = option;
					sortConfigure['type'] = large_to_small;
				}

				//Here starts the sorting.
				var hasChange = true;
				var data = $('.tb_info_bar');
				var value01, value02;
				var isDigit = $.isNumeric($('.tb_info_bar').children('.' + option).text());
		
				while(hasChange) {
					hasChange = false;
					for(var i=0; i<data.length-1; i++) {
						value01 = $(data[i]).children('.' + option).text();
						value02 = $(data[i+1]).children('.' + option).text();
				
						if(isDigit) {
							value01 = parseInt(value01);
							value02 = parseInt(value02);
						}
						
						if(sortConfigure['type'] == large_to_small) {
							if(value01 < value02) {
								dataSwap(data[i], data[i+1]);
								hasChange = true;
							}
						}
						else {
							if(value01 > value02) {
								dataSwap(data[i], data[i+1]);
								hasChange = true;
							}
						}

						var temp = data[i];
						data[i] = data[i+1];
						data[i+1] = temp;
					}
				}
			}
		}
		
		/**
		 * Swap two DOM which are children of target DOM.
		 * @param {DOM} element01 The first DOM to be swaped.
		 * @param {DOM} element02 The second DOM to be swaped.
		 */
		this.dataSwap = function (element01, element02) {
			$(element02).after($(element01).detach());
		}

		/**
		 * Clear all data appended to target.
		 */
		this.clear = function() {
			$('.tb_info_bar').detach();
		}
	};
});