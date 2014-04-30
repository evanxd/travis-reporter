'use strict';
define(function () {
	function hoverAction(target) {
		$(target).hover(
			function() {
				$(this).addClass('bt_hover');
			},
			function() {
				$(this).removeClass('bt_hover');	
				$(this).removeClass('bt_pressed');
			}
		);
	}

	function pressAction(target) {
		$(target).mousedown(function() {
			$(this).removeClass('bt_hover');
			$(this).addClass('bt_pressed');
		});
	}

	function releaseAction(target) {
		$(target).mouseup(function() {
			$(this).removeClass('bt_pressed');
			$(this).addClass('bt_hover');
		});
	}

	return {
		init: function() {
			hoverAction('button, th.tb_header');
			pressAction('button, th.tb_header');
			releaseAction('button, th.tb_header');
		},

		addButtonAction: function(target) {
			if(target == null) {
				target = $('button, th.tb_header');
			}
			
			hoverAction(target);
			pressAction(target);
			releaseAction(target);
		},

		removeButtonAction: function(target) {
			if(target == null) {
				target = $('button, th.tb_header');
			}

			$(target).removeClass();
		}
	};
});