'use strict';
$(document).ready(require(['button', 'container'], function(button, Container) {
    var test_container = new Container($("table.tb_header"), 100);
    
	test_container.init();
	button.init();

	$('select').change(function() {
		test_container.setRestriction($(this).attr('name'), $(this).val());
		test_container.clear();
		test_container.appendData(test_container.query());
		button.addButtonAction($("button.bt_detail"));
	});
	
	$('th.tb_header').mousedown(function() {
		test_container.largeToSmallSorting($(this).attr('axis'));
	});

	$('button#bt_home').click(function() {
		test_container.resetRestriction();
		test_container.clear();
		test_container.appendData(test_container.query());
		button.addButtonAction($("button.bt_detail"));
	});
}));