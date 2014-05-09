'use strict';

$(document).ready(require(['button', 'container'], function(button, Container) {
    // Variable initialization.
    var test_container = new Container($("table.tb_header"));
	test_container.init();
	test_container.sort('error');

	// Button action binding.
	// Binding feedback actions.
	button.addButtonFeedbackAction('button, th.tb_header');

	// Binding searching action to search tools (pull-down menus).
	$('select').change(function() {
		button.searchToolButtonAction($(this), test_container);
	});
	
	// Binding sorting action to the headers of data bars.
	$('th.tb_header').click(function() {
		button.headerButtonAction($(this), test_container);
	});

	// Binding home page action to home page button.
	$('button#bt_home').click(function() {
		button.homePageButtonAction(test_container);
	});
}));