// JavaScript Document
$(document).ready(function() {
	$('button').hover(
		function() {
        	$(this).addClass('bt_hover');
		},
		function() {
			$(this).removeClass('bt_hover');	
			$(this).removeClass('bt_pressed');
		}
	);
	
	$('button').mousedown(function() {
		$(this).removeClass('bt_hover');
		$(this).addClass('bt_pressed');
	});
	
	$('button').mouseup(function() {
		$(this).removeClass('bt_pressed');
		$(this).addClass('bt_hover');
	});
	
	$('th.tb_header').hover(
		function() {
        	$(this).addClass('bt_hover');
		},
		function() {
			$(this).removeClass('bt_hover');	
			$(this).removeClass('bt_pressed');
		}
	);
	
	$('th.tb_header').mousedown(function() {
		$(this).removeClass('bt_hover');
		$(this).addClass('bt_pressed');
	});
	
	$('th.tb_header').mouseup(function() {
		$(this).removeClass('bt_pressed');
		$(this).addClass('bt_hover');
	});
	
	
});