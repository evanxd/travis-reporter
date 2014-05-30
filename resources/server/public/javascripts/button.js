define(['queryTool', 'detail'], function (queryTool, DetailPageHandler) {
	'use strict';

	var detailPageHandlers = [];

	/**
	 * Add actions to target button when the mouse roll in, roll out from it.
	 * Roll in action: Highlight the target button.
	 * Roll out action: Change the color of target button back to normal.
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
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function toggleHoverFeedback(target) {
		$(target).hover(
			function() {
				var classAttr = $(this).attr('class');
				if(classAttr.indexOf('.bt_pressed') === -1) {
					$(this).addClass('bt_hover');
				}
			},
			function() {
				var classAttr = $(this).attr('class');
				if(classAttr.indexOf('.bt_pressed') === -1) {
					$(this).removeClass('bt_hover');
				}
			}
		);
	}

	/**
	 * Add actions to target button when the mouse pressed on the target.
	 * Action: Make the pressed button darker and set the other pressed
	 * button in the same group back to default status.
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function togglePressedFeedback(target) {
		$(target).mousedown(function() {
			if($(this).attr('class') !== '.bt_pressed') {
				$(this.tagName.toLowerCase() + '.bt_pressed').removeClass('bt_pressed');
				$(this).addClass('bt_pressed');
			}
		});
	}

	return {
		/**
		 * Add actions to target button when user performs mouse actions on it.
		 * The actions added to button is to give user an appropriate feedback when mouse
		 * rolls in, rolls out, presses, and releases on the target button.
		 * @param {DOM} target The target DOM object to be bound to these feedback actions.
		 */
		addButtonFeedbackAction: function (target) {
			hoverFeedback(target);
			pressFeedback(target);
			releaseFeedback(target);
		},

		/**
		 * Add actions to target button when user performs mouse actions on it.
		 * The actions added to button is to give user an appropriate feedback when mouse
		 * rolls in, rolls out, presses, and releases on the target button in the same group.
		 * @param {DOM} target The target DOM object to be bound to these feedback actions.
		 */
		addToggleFeedbackAction: function (target) {
			toggleHoverFeedback(target);
			togglePressedFeedback(target);
		},

		/**
		 * Remove all feedback action bound to the target button.
		 * @param {DOM} target The target DOM object to remove the feedback actions.
		 */
		removeButtonFeedbackAction: function (target) {
			$(target).removeClass();
		},

		/**
		 * The corresponding function of home page button: Lead user back to default
		 * view of data.
		 * @param {Object} targetController The object handling the data to be shown.
		 */
		homePageButtonAction: function (targetController) {
			queryTool.resetOptions();
			$("select").val("null");
			queryTool.setOptions("count", 10);
			targetController.clear();
			targetController.appendData(queryTool.query());
			$('.img_sort').hide();

			$('div.display').hide();
			$('div#display0').show();

			$("p.bt_pressed").removeClass('bt_pressed');
			$("#tab0").addClass('bt_pressed');
		},

		/**
		 * The corresponding function of the clicked header buttons: Ask targetController
		 * to sort data by the property of clicked header.
		 * @param {DOM} clickedDOM The clicked header element.
		 * @param {Object} targetController The object handling the data to be shown.
		 */
		headerButtonAction: function (clickedDOM, targetController) {
			var sortingType = targetController.sort($(clickedDOM).attr("axis")),
				arrowToShown = null;
			
			if(sortingType === true) { // Large to small.
				arrowToShown = $(clickedDOM).children(".down");
			}
			else {
				arrowToShown = $(clickedDOM).children(".up");
			}

			$(".img_sort").hide();
			$(arrowToShown).slideToggle("fast");
		},

		/**
		 * The corresponding function of the changed pull-down menus: Ask targetContainer
		 * to sort data by the property of the changed pull-down menu.
		 * @param {DOM} clickedDOM The clicked pull-down menu element.
		 * @param {Object} targetController The object handling the data to be shown.
		 */
		searchToolButtonAction: function (name, value, targetController) {
			queryTool.setOptions(name, value);
			targetController.clear();
			targetController.appendData(queryTool.query());
			this.addButtonFeedbackAction($("button.bt_detail"));
		},

		detailButtonAction: function (fileName, targetTabContainer, targetContainer, targetController, callback) {
			var $tab = $('<span>'),
				$content = $('<p>'),
				count = $(targetTabContainer).children().last().children().attr('id'),
				callbackFunc = this.tabButtonAction;
			
			count = Number(count.substr(count.length - 1)) + 1;

			$content.attr('id', 'tab' + count);
			$content.attr('class', 'tab');
			$content.attr('class', 'bt_pressed');
			$content.append(fileName);

			$("p.tab").removeClass('bt_pressed');

			$tab.append($content);
			this.addToggleFeedbackAction($content);
			
			$content.click(function() {
				callbackFunc(this);
			});
			
			$(targetTabContainer).append($tab);
			
			$.ajax({
				url: '/detail',
				type: 'get'
			}).done(function(data) {
				var $detail = $('<div>');
				
				$detail.attr('id', 'display' + count);
				$detail.attr('class', 'display');

				$detail.append(data);
				$(targetContainer).children('div.display').hide();
				$(targetContainer).append($detail);
				
				callback($('div#display' + count).find('button, th.tb_header'));

				queryTool.resetOptions();
				queryTool.setOptions("name", fileName);
				detailPageHandlers.push(new DetailPageHandler($detail, fileName).drawChart(queryTool.query()));
			});
		},

		tabButtonAction: function (thisDOM) {
			$('div.display').not(":hidden").hide();

			var count = $(thisDOM).attr('id');
			count = count.substr(count.length - 1);

			$('div#display' + count).show();
		}
	};
});