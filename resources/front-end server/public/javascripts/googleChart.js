// JavaScript Document
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
	function drawChart() {
		var data = google.visualization.arrayToDataTable([
			['Date', 'Error count'],
			['2013/01/01', 400],
			['2013/01/15', 460],
			['2013/02/01', 1120],
			['2013/02/15', 540],
			['2014/03/01', 580],
			['2013/03/15', 660],
			['2013/04/01', 860],
			['2013/04/15', 1120],
			['2013/05/01', 1520]
		]);

        var options = {
          title: 'Error count history',
		  lineWidth: 2,
		  colors: ['red'],
		  fontName: "Arial Black",
          hAxis: { title: 'Year',  titleTextStyle: {color: 'black'}, baselineColor: 'black', textStyle: {color: 'black'}, gridlines: { color: 'black', count: 5 } },
		  vAxis: { title: 'Error count', titleTextStyle: {color: 'black'}, minValue: 0, baselineColor: 'black', textStyle: {color: 'black'}, gridlines: { color: 'black', count: 10 } },
		  backgroundColor: 'transparent'
        };

		var chart = new google.visualization.AreaChart(document.getElementById('chart_table'));
		chart.draw(data, options);
	}