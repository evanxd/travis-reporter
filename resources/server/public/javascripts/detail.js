define(['chartTool', 'container'], function (chartTool, DataContainer) {
	'use strict';

	function DetailPageHandler(targetDOM, fileName) {
		this.target = targetDOM;
		this.testFileName = fileName;
		this.container = new DataContainer($(targetDOM).find("table.tb_header"));
	}

	DetailPageHandler.prototype = {
		drawChart: function (data) {
			$.each(data, function (index, value) {
				console.log(index, value.length);
			});

			chartTool.drawChart($(this.target).find(".chart_table"), {
				dates : ["day1", "day2", "day3", "day4", "day5", "day5", "day5", "day5"],
				errorCounts : [10, 40, 50, 20, 30, 60, 90, 20]
			});
		}
	}

	return DetailPageHandler;
});