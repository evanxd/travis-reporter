$(document).ready(require(['button', 'container', 'detail'], function (button, Container, DetailPageHandler) {
	'use strict';

	// Variable initialization.
	var test_container = new Container($("table.tb_header")),
		detailPageHandlers = [];
	
	button.homePageButtonAction(test_container);
	test_container.sort('error');

	// Button action binding.
	// Binding feedback actions.
	button.addButtonFeedbackAction('button, th.tb_header');
	button.addToggleFeedbackAction('.tab');

	// Initializes home page tab to pressed.
	$("#tab0").addClass('bt_pressed');

	// Binding searching action to search tools (pull-down menus).
	$('select').change(function() {
		button.searchToolButtonAction($(this), test_container);
		$('button.bt_detail').click(function() {
			button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'), test_container);
			detailPageHandlers.push(new DetailPageHandler($("div.display").last()));
		});
	});
	
	// Binding sorting action to the headers of data bars.
	$('th.tb_header').click(function() {
		button.headerButtonAction($(this), test_container);
	});

	// Binding home page action to home page button.
	$('button#bt_home').click(function() {
		button.homePageButtonAction(test_container);
		button.addButtonFeedbackAction($("button.bt_detail"));
		$('button.bt_detail').click(function() {
			button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'), test_container);
			detailPageHandlers.push(new DetailPageHandler($("div.display").last()));
		});
	});

	$('p.tab').click(function() {
		button.tabButtonAction($(this), test_container);
		if($(this).attr('id') === 'display0') {
			button.homePageButtonAction(test_container);
			button.addButtonFeedbackAction($("button.bt_detail"));
			$('button.bt_detail').click(function() {
				button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'), test_container);
				detailPageHandlers.push(new DetailPageHandler($("div.display").last()));
			});
		}
	});

	$('button.bt_detail').click(function() {
		button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'), test_container, button.addButtonFeedbackAction);
		detailPageHandlers.push(new DetailPageHandler($("div.display").last(), Container));
	});
}));