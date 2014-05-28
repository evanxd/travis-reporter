define(['googleChart', 'container'], function (GoogleChart, Container) {
	'use strict';

	function DetailPageHandler(targetDOM) {
		this.target = targetDOM;
		this.container = new Container($(this.target).find("table.tb_header"));
		this.chartTool = new GoogleChart($(this.target).find("td.chart_table"));
	}

	DetailPageHandler.prototype = {
		drawChart: function (data) {

		}
	}

	return DetailPageHandler;
});