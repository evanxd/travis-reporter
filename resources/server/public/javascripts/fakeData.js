// Only for testing.
define(function() {
	return {
		generateFakeTest: function(options) {
			var count = 10;
			var result = new Array();
			if(options['count'] != null && options['count'] != undefined) {
				count = options['count'];
			}

			for(var i=0; i<count; i++) {
				var bar = {
					"id": this.randomInt(100),
					"component": this.randomComponent(),
					"name": this.randomName(),
					"date": this.randomDate(),
					"error": this.randomError()
				};

				if(options != null && options != undefined) {
					for(var key in options) {
						if(key in bar && options[key] != null && options[key] != undefined) {
							bar[key] = options[key];
						}
					}
				}

				result[i] = bar;
			}
			
			return result;
		},

		randomInt: function (input) {
			return Math.floor(Math.random()*input);
		},
		
		randomComponent: function () {
			var num = this.randomInt(24);
			switch(num) {
				case 0:	
					return 'bluetooth';
				case 1:
					return 'browser';
				case 2:
					return 'calendar';
				case 3:
					return 'camera';
				case 4:
					return 'clock';
				case 5:
					return 'communications';
				case 6:
					return 'costcontrol';
				case 7:
					return 'email';
				case 8:
					return 'fl';
				case 9:
					return 'fm';
				case 10:
					return 'gallery';
				case 11:
					return 'homescreen';
				case 12:
					return 'keyboard';
				case 13:
					return 'music';
				case 14:
					return 'pdfjs';
				case 15:
					return 'ringtones';
				case 16:
					return 'search';
				case 17:
					return 'setringtone';
				case 18:
					return 'settings';
				case 19:
					return 'sms';
				case 20:
					return 'system';
				case 21:
					return 'video';
				case 22:
					return 'wallpaper';
				case 23:
					return 'wappush';
				default:
					alert('info_container.js: function randomComponent error!\n');
					return null;
			}
		},
			
		randomName: function () {
			var num = this.randomInt(9);
			switch(num) {
				case 0:
					return 'Test file A.js';
				case 1:
					return 'Test file B.js';
				case 2:
					return 'Test file C.js';
				case 3:
					return 'Test file D.js';
				case 4:
					return 'Test file E.js';
				case 5:
					return 'Test file F.js';
				case 6:
					return 'Test file G.js';
				case 7:
					return 'Test file H.js';
				case 8:
					return 'Test file I.js';
				case 9:
					return 'Test file J.js';
				default:
					alert('info_container.js: function randomName error!\n');
					return null;
			}
		},
		
		randomDate: function () {
			var num = this.randomInt(9);
			switch(num) {
				case 0:
					return '2013/04/22';
				case 1:
					return '2014/04/03';
				case 2:
					return '2013/02/28';
				case 3:
					return '2013/05/05';
				case 4:
					return '2013/07/07';
				case 5:
					return '2013/10/24';
				case 6:
					return '2013/11/24';
				case 7:
					return '2013/12/24';
				case 8:
					return '2013/12/25';
				case 9:
					return '2014/01/01';
				default:
					alert('info_container.js: function randomDate error!\n');
					return null;
			}
		},
		
		randomError: function () {
			return this.randomInt(2000);
		}
	};
});