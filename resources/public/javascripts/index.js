$(document).ready(require(['button', 'dataController'], function (Button, DataController) {
	'use strict';

	// Variable initialization.
	var test_container = new DataController($("table.tb_header")),
		button = new Button();

	button.homePageButtonAction(test_container);
	test_container.sort('error');

	// Button action binding.
	// Binding feedback actions.
	button.addButtonFeedbackAction($('button, th.tb_header, #title'));
	button.addToggleFeedbackAction($('.tab'));

	// Initializes home page tab to pressed.
	$("#tab0").addClass('bt_pressed');

	// Binding searching action to search tools (pull-down menus).
	$('select').change(function () {
		button.searchToolButtonAction($(this).attr('name'), $(this).val(), test_container);
		$('button.bt_detail').click(function () {
			button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'));
		});
	});
	
	// Binding searching action to search button.
	$('button#bt_search').click(function () {
		button.searchToolButtonAction("name", $("input#search").attr("value"), test_container);
		$('button.bt_detail').click(function () {
			button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'));
		});
	});

	// Binding sorting action to the headers of data bars.
	$('th.tb_header').click(function () {
		button.headerButtonAction($(this), test_container);
	});

	// Binding home page action to home page button.
	$('#title').click(function () {
		button.homePageButtonAction(test_container);
		button.addButtonFeedbackAction($("button.bt_detail"));
		$('button.bt_detail').click(function () {
			button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'));
		});
	});

	// Binding tab action to tabs to switch between information pages.
	$('p.tab').click(function () {
		button.tabButtonAction($(this), test_container);
		if($(this).attr('id') === 'display0') {
			button.homePageButtonAction(test_container);
			button.addButtonFeedbackAction($("button.bt_detail"));
			$('button.bt_detail').click(function () {
				button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'));
			});
		}
	});

	/* Binding detail action to detail button to generate new tabs and
	information areas. */
	$('button.bt_detail').click(function() {
		button.detailButtonAction($(this).parent().parent().children('.name').text(), $('div#info_box_tab'), $('div#info_box_in_index'));
	});
}));