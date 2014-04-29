'use strict';

/**
 * This class provides API to perform manipulation of test file bars
 * such as appending, detaching, and sorting test file bars on Travis-reporter.
 */
define(function(require) {
	var testGenerator = require('fakeData'); 

	/**
	 * @constructor
	 * @param {DOM} target The target DOM which the test bar to be appended to.
	 */
	return function(target) {
		this.target = target;
		this.restriction = new Array();
		this.sortingType = {
			"big_to_small": true,
			"small_to_big": false
		};
		this.sorting = this.sortingType.big_to_small;
		
		/**
		 * This is an init function to give Travis-reporter an initial view
		 * of test files.
		 */
		this.init = function() {
			this.setRestriction('count', 10);
		}
		
		/**
		 * Append a test bar to Travis-reporter.
		 *
		 * @param {JSON} testBar The testBar to be appended to target DOM.
		 */
		this.appendData = function(testBar) {
			var bar = '<tr id="info_bar_no' + testBar['id'] + '" class="tb_info_bar">';
			var btDetail = '<button id="bt_detail_no' + testBar['id'] + '" class="bt_detail">Detail</button>';

			for(var key in testBar) {
				if(key != 'id') {
					bar = bar + '<td class="tb_info_bar_' + key + '">' + testBar[key] + '</td>';
				}
			}
			
			bar = bar + '<td class="tb_last">' + btDetail + '</td>';
			bar = bar + '</tr>';
			
			$(this.target).append(bar);
		}
		
		/**
		 * Set the restriction of the data to be displayed, research the data
		 * matche the restriction, and add it to target for display.
		 *
		 * @param {String} name The name (key) of the restriction to be set.
		 * @param {String or Integer} value The content of certain restriction.
		 */
		this.setRestriction = function(name, value) {
			this.restriction[name] = value;
			var bars = this.search(this.restriction);
			this.clear();
			for(var i=0; i<bars.length; i++) {
				this.appendData(bars[i]);
			}
		}

		/**
		 * Search data through restful API from back-end server with some options.
		 * @param {JSON} options The searching options.
		 * @returns {JSON} A JSON contains the result from restful API.
		 */
		this.search = function(options) {
			var result = new Array();
			result = testGenerator.generateFakeTest(options);
			
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
		
		this.smallToLargeSorting = function(option) {
			var hasChange = true;
			while(hasChange) {
				hasChange = false;
				for(var i=0; i<this.data.length-1; i++) {
					if(this.data[i][option] > this.data[i+1][option]) {
						hasChange = true;
						this.dataSwap(i);
					}
				}
			}
		}
		
		this.largeToSmallSorting = function(option) {
			var hasChange = true;
			while(hasChange) {
				hasChange = false;
				for(var i=0; i<this.data.length-1; i++) {
					if(this.data[i][option] < this.data[i+1][option]) {
						hasChange = true;
						this.dataSwap(i);
					}
				}
			}
		}
		
		this.dataSwap = function (index) {
			var temp = this.data[index];
			this.data[index] = this.data[index+1];
			this.data[index+1] = temp;
			
			var nextIndex = index + 1;
			var element01 = $('#info_bar_no' + index);
			var element02 = $('#info_bar_no' + nextIndex);
			
			element01.attr('id', 'info_bar_no' + nextIndex);
			element02.attr('id', 'info_bar_no' + index);
			
			element02.after(element01.detach());
		}

		/**
		 * Clear all data appended to target.
		 */
		this.clear = function() {
			$('.tb_info_bar').detach();
		}
	};
});