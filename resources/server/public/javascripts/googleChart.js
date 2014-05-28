define(function () {
	var options = {
		title: 'Error count history',
		lineWidth: 2,
		colors: ['red'],
		fontName: "Arial Black",
		hAxis: { title: 'Year',  titleTextStyle: {color: 'black'}, baselineColor: 'black', textStyle: {color: 'black'}, gridlines: { color: 'black', count: 5 } },
		vAxis: { title: 'Error count', titleTextStyle: {color: 'black'}, minValue: 0, baselineColor: 'black', textStyle: {color: 'black'}, gridlines: { color: 'black', count: 10 } },
		backgroundColor: 'transparent'
	};

	var baseData = [
		['Date', 'Error count']
	];

	function GoogleChart(targetDOM) {
		this.target = targetDOM;
		this.data = [];

		//google.load("visualization", "1", {packages:["corechart"]});
		//google.setOnLoadCallback(this.prototype.drawChart);
	}

	GoogleChart.prototype = {
		addData: function (date, errorCount) {
			this.data.push([date, Number(errorCount)]);
		},

		clearData: function () {
			this.data = [];
		},

		drawChart: function () {
			var chart = new google.visualization.AreaChart($(this.target)),
				dataToBeDrawn = google.visualization.arrayToDataTable(baseData.push(this.data));
			
			chart.draw(dataToBeDrawn, options);
		}
	};

	return GoogleChart;
});