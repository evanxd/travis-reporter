'use strict';
define(function () {
	var defaultTarget = 'button, th.tb_header, .tab';

	/**
	 * Add actions to target button when the mouse roll in, roll out from it.
	 * Roll in action: Highlight the target button.
	 * Roll out action: Change the color of target button back to normal.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function hoverFeedback(target) {
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

	/**
	 * Add actions to target button when the mouse press on it.
	 * Action: Make the target button darker.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function pressFeedback(target) {
		$(target).mousedown(function() {
			$(this).removeClass('bt_hover');
			$(this).addClass('bt_pressed');
		});
	}

	/**
	 * Add actions to target button when the mouse pressed, and then releases on it.
	 * Action: Highlight the target button.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function releaseFeedback(target) {
		$(target).mouseup(function() {
			$(this).removeClass('bt_pressed');
			$(this).addClass('bt_hover');
		});
	}

	/**
	 * Add actions to target button when the mouse presses between it.
	 * Action: Highlight the target button if it is not on pressed status
	 * currently, and set the other buttons in the same group back to
	 * default status.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function toggleHoverFeedback(target) {
		$(target).hover(
			function() {
				var classAttr = $(this).attr('class');
				if(classAttr.indexOf('.bt_pressed') == -1) {
					$(this).addClass('bt_hover');
				}
			},
			function() {
				var classAttr = $(this).attr('class');
				if(classAttr.indexOf('.bt_pressed') == -1) {
					$(this).removeClass('bt_hover');
				}
			}
		);
	}

	/**
	 * Add actions to target button when the mouse pressed on the target.
	 * Action: Make the pressed button darker and set the other pressed
	 * button in the same group back to default status
	 *
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function togglePressedFeedback(target) {
		$(target).mousedown(function() {
			if($(this).attr('class') != '.bt_pressed') {
				$(this.tagName.toLowerCase() + '.bt_pressed').removeClass('bt_pressed');
				$(this).addClass('bt_pressed');
			}
		});
	}

	return {
		addButtonFeedbackAction: function(target) {
			if(target == null) {
				target = defaultTarget;
			}

			hoverFeedback(target);
			pressFeedback(target);
			releaseFeedback(target);
		},

		addToggleFeedbackAction: function(target) {
			if(target == null) {
				target = defaultTarget;
			}

			toggleHoverFeedback(target);
			togglePressedFeedback(target);
		},

		removeButtonFeedbackAction: function(target) {
			if(target == null) {
				target = defaultTarget;
			}

			$(target).removeClass();
		}
	};
});