// JavaScript Document
$(document).ready(function() {
    var line_chart_container = new InfoContainer($("table.tb_header"), new Array('status', 'build', 'message', 'commit', 'committer', 'duration', 'finished'));
	line_chart_container.init();
	
	$('select').change(function() {
		test_case_container.setRestriction($(this).attr('name'), $(this).val());
	});
});