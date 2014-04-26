// JavaScript Document
function InfoContainer(target, dataStructure) {
	this.target = target;
	this.dataCount = 100;
	this.data = new Array(this.dataCount);
	this.dataStructure = dataStructure;
	
	this.init = function() {
		var temp;
		for(var i=0; i<this.dataCount; i++) {
			this.data[i] = new Array();
			for(var j=0; j<this.dataStructure.length; j++) {
				this.data[i][this.dataStructure[j]] = null;
			}
			
			for(var key in this.data[i]) {
				switch(key) {
					case 'component':
						this.data[i]['component'] = this.randomComponent();
						break;
					case 'name':
						this.data[i]['name'] = this.randomName();
						break;
					case 'date_range':
						this.data[i]['date_range'] = this.randomDate();
						break;
					case 'error_count':
						this.data[i]['error_count'] = this.randomError();
						break;
					default:
						alert('info_container.js: function init() error at line 16.');
				}
			}
			
			this.appendData(i);
		}
	}
	
	this.appendData = function(index) {
		var temp = '<tr id="info_bar_no' + index + '" class="tb_info_bar">';
		
		for(var i=0; i<this.dataStructure.length; i++) {
			temp = temp + '<td class="tb_info_bar_' + this.dataStructure[i] + '">' + this.data[index][this.dataStructure[i]] + '</td>';
		}
		
		temp = temp + '</tr>';
		
		$(this.target).append(temp);
	}
	//====================================================
	this.setRestriction = function(name, value) {
		switch(name) {
			case 'none':
				break;
			case 'component':
				this.detachByName(name, value);
				break;
			case 'date_range':
			case 'error_count':
				this.detachByRange(name, value);
				break;
			case 'display_count':
				break;
			default:
				alert('info_container.js: function setRestriction() error at line 51.');
				break;
		}
	}
	
	this.detachByName = function (name, value) {
		for(var i=0; i<this.data.length; i++) {
			if(this.data[i][name] != value) {
				$('#info_bar_no' + i).hide();
			}
		}
	}
	
	this.detachByRange = function (name, value) {
		for(var i=0; i<this.data.length; i++) {
			if(this.data[i][name] > value) {
				$('#info_bar_no' + i).hide();
			}
		}
	}
	
	this.smallToLargeSorting = function(option) {
		var hasChange = true;
		while(hasChange) {
			hasChange = false;
			for(var i=0; i<this.data.length-1; i++) {
				if(this.data[i][option] > this.data[i+1][option]) {
					hasChange = true;
					this.dataSwap(i);
				}
			}
		}
	}
	
	this.largeToSmallSorting = function(option) {
		var hasChange = true;
		while(hasChange) {
			hasChange = false;
			for(var i=0; i<this.data.length-1; i++) {
				if(this.data[i][option] < this.data[i+1][option]) {
					hasChange = true;
					this.dataSwap(i);
				}
			}
		}
	}
	
	this.dataSwap = function (index) {
		var temp = this.data[index];
		this.data[index] = this.data[index+1];
		this.data[index+1] = temp;
		
		var nextIndex = index + 1;
		var element01 = $('#info_bar_no' + index);
		var element02 = $('#info_bar_no' + nextIndex);
		
		element01.attr('id', 'info_bar_no' + nextIndex);
		element02.attr('id', 'info_bar_no' + index);
		
		element02.after(element01.detach());
	}
	
	this.randomInt = function (input) {
		return Math.floor(Math.random()*input);
	}
	
	this.randomComponent = function () {
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
	}
		
	this.randomName = function () {
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
	}
	
	this.randomDate = function () {
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
	}
	
	this.randomError = function () {
		return this.randomInt(2000);
	}
}

