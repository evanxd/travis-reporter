'use strict';

define(function () {
	/**
	 * Add actions to target button when the mouse roll in, roll out from it.
	 * Roll in action: Highlight the target button.
	 * Roll out action: Change the color of target button back to normal.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function hoverFeedbackAction(target) {
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
	function pressFeedbackAction(target) {
		$(target).mousedown(function() {
			$(this).removeClass('bt_hover');
			$(this).addClass('bt_pressed');
		});
	}

	/**
	 * Add actions to target button when the mouse pressed, then releases on it.
	 * Action: Highlight the target button.
	 * 
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function releaseFeedbackAction(target) {
		$(target).mouseup(function() {
			$(this).removeClass('bt_pressed');
			$(this).addClass('bt_hover');
		});
	}

	return {
		/**
		 * Add actions to target button when user performs mouse actions on it.
		 * The actions added to button is to give user an appropriate feedback when mouse
		 * rolls in, rolls out, presses, and releases on the target button.
		 * 
		 * @param {DOM} target The target DOM object to be bound to these feedback actions.
		 */
		addButtonFeedbackAction: function(target) {
			if(target == null) {
				target = $('button, th.tb_header');
			}
			
			hoverFeedbackAction(target);
			pressFeedbackAction(target);
			releaseFeedbackAction(target);
		},

		/**
		 * Remove all feedback action bound to the target button.
		 *
		 * @param {DOM} target The target DOM object to remove the feedback actions.
		 */
		removeButtonFeedbackAction: function(target) {
			if(target == null) {
				target = $('button, th.tb_header');
			}

			$(target).removeClass();
		},

		/**
		 * The corresponding function of home page button: Lead user back to default
		 * view of data.
		 * 
		 * @param {Object} targetContainer The object handling the data to be shown.
		 */
		homePageButtonAction: function(targetContainer) {
			targetContainer.resetRestriction();
			targetContainer.clear();
			targetContainer.appendData(targetContainer.query());
			this.addButtonFeedbackAction($("button.bt_detail"));
			$('.img_sort').hide();
		},

		/**
		 * The corresponding function of the clicked header buttons: Ask targetContainer
		 * to sort data by the property of clicked header.
		 *
		 * @param {DOM} clickedDOM The clicked header element.
		 * @param {Object} targetContainer The object handling the data to be shown.
		 */
		headerButtonAction: function(clickedDOM, targetContainer) {
			targetContainer.sort($(clickedDOM).attr('axis'));
			$('.img_sort').hide();
			$(clickedDOM).children('.img_sort').slideToggle('fast');
		},

		/**
		 * The corresponding function of the changed pull-down menus: Ask targetContainer
		 * to sort data by the property of the changed pull-down menu.
		 *
		 * @param {DOM} clickedDOM The clicked pull-down menu element.
		 * @param {Object} targetContainer The object handling the data to be shown.
		 */
		searchToolButtonAction: function(clickedDOM, targetContainer) {
			targetContainer.setRestriction($(clickedDOM).attr('name'), $(clickedDOM).val());
			targetContainer.clear();
			targetContainer.appendData(targetContainer.query());
			this.addButtonFeedbackAction($("button.bt_detail"));
		}
	};
});