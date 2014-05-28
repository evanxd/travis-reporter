define(function (require) {
	'use strict';

	var bt = require('button');
	var Con = require('container');

	function DetailPageHandler(targetDOM) {
		this.target = targetDOM;

		this.test_container = new Con($(this.target).find("table.tb_header"));

		bt.addButtonFeedbackAction($(this.target).find('button, th.tb_header'));
	}

	return DetailPageHandler;
});