/**
 * @Singleton This is a singletion class.
 * This Javascript file returns "Button" as a class.
 * This class provides APIs to perform actions which is corresponding to
 * one specific button or HTML element clicked.
 */
define(['queryTool', 'detail'], function (queryTool, DetailPageHandler) {
	'use strict';

	var detailPageHandlers = [],
		Button = null;

	/**
	 * Add actions to target button when the mouse roll in, roll out from it.
	 * Roll in action: Highlight the target button.
	 * Roll out action: Change the color of target button back to normal.
	 * @param {DOM} target The target DOM object to be bound to this feedback action.
	 */
	function hoverFeedback(target) {
		target.hover(
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
		target.mousedown(function() {
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
		target.mouseup(function() {
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
		target.hover(
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
		target.mousedown(function() {
			if($(this).attr('class') !== '.bt_pressed') {
				$(this.tagName.toLowerCase() + '.bt_pressed').removeClass('bt_pressed');
				$(this).addClass('bt_pressed');
			}
		});
	}

	/**
	 * Lock the screen by covering all HTML element by a div except for body element.
	 */
	function lockScreen() {
		var $lockScreenDiv = $("<div>");

		$lockScreenDiv.attr("id", "lockScreen");
		$(document.body).append($lockScreenDiv);
		$lockScreenDiv.fadeIn();
	}

	/**
	 * Unlock the screen by removing the div element on the top.
	 */
	function unlockScreen() {
		var del = function () {
			$("#lockScreen").detach();
		};

		$("#lockScreen").fadeOut(del);

		del = null;
	}

	/**
	 * Produce a self defining page.
	 * @param {String} name The option user want to set.
	 * @returns {DOM} The self defining page gotten from server.
	 */
	function produceSelfDefinePage(name) {
		var bodyTag = $(document.body),
			selfDefinePage = null;

		$.ajax({
			url: "/selfDefine",
			type: "get",
			async: false
		}).done(function (data) {
			selfDefinePage = $(data);
		});

		selfDefinePage.find(".header").append(name + " defining");

		bodyTag.append(selfDefinePage);

		return selfDefinePage;
	}

	/**
	 * Delete the self defining page on the top.
	 */
	function deleteSelfDefinePage() {
		$("#selfDefine").detach();
	}

	// Here starts definding the singleton object.
	(function () {
		var instance;

		/**
		 * @class Button
		 * @constructor
		 */
		Button = function Button() {
			if(instance) {
				return instance;
			}

			instance = this;	
		}

		Button.prototype = {
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

				// Reset all pull-down menu to "none".
				$("select").val("null");

				// Initializes the "count" pull-down menu to "10".
				$("select[name='count']").val(10);
				
				// Update the test file container and show data to user.
				instance.searchToolButtonAction("count", 10, targetController);

				// Reset arrows on headers.
				$('.img_sort').hide();

				// Reset to home page.
				$('div.display').hide();
				$('div#display0').show();

				// Reset all tabs and let home page tab be pressed.
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
				var pressedColumn = clickedDOM.attr("axis"),
					sortingType = null,
					arrowToShown = null;
				
				sortingType = targetController.sort(pressedColumn);

				if(sortingType === true) { // Large to small.
					arrowToShown = clickedDOM.children(".down");
				}
				else {
					arrowToShown = clickedDOM.children(".up");
				}

				// Hide shown arrow on header.
				$(".img_sort").hide();

				// Display the appropriate arrow in header.
				arrowToShown.slideToggle("fast");
			},

			/**
			 * The corresponding function of the changed pull-down menus: Ask targetController
			 * to sort data by the property of the changed pull-down menu.
			 * @param {DOM} clickedDOM The clicked pull-down menu element.
			 * @param {Object} targetController The object handling the data to be shown.
			 */
			searchToolButtonAction: function (name, value, targetController) {
				var selfDefinePage = null;
				if(value === "selfDefine") {
					// Enter self defining option mode.
					lockScreen();
					selfDefinePage = produceSelfDefinePage(name);
					instance.addButtonFeedbackAction(selfDefinePage.find("button"));

					// Pop out the self defining page.
					selfDefinePage.slideDown();

					// Add action to button on self defining page.
					selfDefinePage.find("button").click(function () {
						var inputValue = selfDefinePage.find("input").attr("value");
						
						if(inputValue !== "") {
							// Call myself (search the data).
							instance.searchToolButtonAction(name, inputValue, targetController);
						}
						
						// Hide self defining page and delete it.
						selfDefinePage.slideUp(deleteSelfDefinePage);

						unlockScreen();
					});
				}
				else {
					queryTool.setOptions(name, value);
					targetController.clear();
					targetController.appendData(queryTool.query());
					instance.addButtonFeedbackAction($("button.bt_detail"));
				}
			},

			/**
			 * The corresponding function of the clicked detail button.
			 * This function will generate a new tab with the title which is the same as the
			 * test file clicked, also generate a new div place to show the detail information
			 * of the clicked test file.
			 * @param {String} fileName The file name of clicked test file.
			 * @param {DOM} tabBar The DOM element which is used to store tabs.
			 * @param {DOM} informationArea The DOM element which is used to display test file
			 * or detail charts and history.
			 */
			detailButtonAction: function (fileName, tabBar, informationArea) {
				var $tab = $('<span>'),
					$content = $('<p>'),
					count = tabBar.children().last().children().attr('id');
				
				// Retrieve the number of the id of ckicked tab.
				// Example: tab1 -> 1.
				count = Number(count.substr(count.length - 1)) + 1;

				$content.attr('id', 'tab' + count);
				$content.attr('class', 'tab');
				$content.attr('class', 'bt_pressed');
				$content.append(fileName);

				// Reset all tabs to unclicked.
				$("p.tab").removeClass('bt_pressed');

				$tab.append($content);

				// Enable the new tab to perform feedbacks.
				instance.addToggleFeedbackAction($content);

				// Bind the new tab to appropriate function when clicked.
				$content.click(function() {
					instance.tabButtonAction($(this));
				});

				// Add this new tab to tab bar.
				tabBar.append($tab);
			
				$.ajax({
					url: '/detail',
					type: 'get'
				}).done(function(data) {
					var $detail = $('<div>');
					
					$detail.attr('id', 'display' + count);
					$detail.attr('class', 'display');

					$detail.append(data);
					$(informationArea).children('div.display').hide();
					$(informationArea).append($detail);
				
					instance.addButtonFeedbackAction($('div#display' + count).find('button, th.tb_header'));

					queryTool.resetOptions();
					queryTool.setOptions("name", fileName);
					detailPageHandlers.push(new DetailPageHandler($detail, $tab, fileName, queryTool.queryDetail()));
					
					detailPageHandlers[detailPageHandlers.length - 1].drawChart();
					$("div#display" + count).find("th.tb_header").click(function() {
						instance.headerButtonAction($(this), detailPageHandlers[detailPageHandlers.length - 1].getController());
					});
				});
			},

			/**
			 * The corresponding function of the clicked tab.
			 * This function is used to switch the display area corresponds to the
			 * clicked tab DOM.
			 * @param {DOM} cliekedTab the clicked tab.
			 */
			tabButtonAction: function (cliekedTab) {
				// Hide all unhided display area.
				$('div.display').not(":hidden").hide();

				var count = cliekedTab.attr('id');

				// Retrieve the number of the id of ckicked tab.
				// Example: tab1 -> 1.
				count = count.substr(count.length - 1);

				// Show the corresponding information area to the clicked tab.
				$('div#display' + count).show();
			}
		};
	}());

	return Button;
});