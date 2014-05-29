define(['chartTool', 'container'], function (chartTool, DataContainer) {
	'use strict';

	function DetailPageHandler(targetDOM, fileName) {
		this.target = targetDOM;
		this.testFileName = fileName;
		this.container = new DataContainer($(targetDOM).find("table.tb_header"));
	}

	DetailPageHandler.prototype = {
		drawChart: function (data) {
			var tempDates = [],
				tempErrorCounts = [],
				i,
				max = data.length;

			for (i = 0; i < max; i += 1) {
				tempDates.push(data[i].date);
				tempErrorCounts.push(data[i].error);
			}

			chartTool.drawChart($(this.target).find("canvas.chart_table"), {
				dates : tempDates,
				errorCounts : tempErrorCounts
			});

			//Temp codes for testing.
			$.each(data, function (index, value) {
				delete value.name;
			});
			this.container.appendData(data);
		}
	}

	return DetailPageHandler;
});