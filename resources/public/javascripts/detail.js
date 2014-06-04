define(['chartTool', 'container'], function (chartTool, DataContainer) {
	'use strict';

	function DetailPageHandler(inputContainer, inputTab, fileName, inputData) {
		this.container = inputContainer;
		this.tab = inputTab;
		this.testFileName = fileName;
		this.data = inputData;
		this.dataContainer = new DataContainer($(inputContainer).find("table.tb_header"));

		// Warning==========================================
		$.each(this.data, function (index, value) {
			delete value.name;
		});

		this.dataContainer.appendData(this.data);
	}

	DetailPageHandler.prototype = {
		drawChart: function () {
			var tempDates = [],
				tempErrorCounts = [],
				i,
				max = this.data.length;

			for (i = 0; i < max; i += 1) {
				tempDates.push(this.data[i].date);
				tempErrorCounts.push(this.data[i].error);
			}

			chartTool.drawChart($(this.container).find("canvas.chart_table"), {
				dates : tempDates,
				errorCounts : tempErrorCounts
			});
		},

		getContainer: function () {
			return this.dataContainer;
		}
	}

	return DetailPageHandler;
});