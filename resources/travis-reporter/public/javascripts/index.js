// JavaScript Document
$(document).ready(function() {
    var test_case_container = new InfoContainer($("table.tb_header"), new Array('component', 'name', 'date_range', 'error_count'));
	test_case_container.init();
	
	$('select').change(function() {
		test_case_container.setRestriction($(this).attr('name'), $(this).val());
	});
	
	$('th.tb_header').mousedown(function() {
		test_case_container.largeToSmallSorting($(this).attr('axis'));
	});
});