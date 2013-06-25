	// JavaScript Document

	id = function(o) {
		return document.getElementById(o);
	}
	
	px = function (x) {
		return ''.concat(Math.round(x), 'px');
	}
	
	pxLeft = function(o) {
		for (var x = 0; o != null; o = o.offsetParent) x += o.offsetLeft;
		return x;
	}
	
	pxTop = function(o) {
		for (var x = 0; o != null; o = o.offsetParent) x += o.offsetTop;
		return x;
	}
	
	/* ==== DOM 2 add event ==== */
	addEvent = function (o, e, f) {
		var r = false;
		if (window.addEventListener) {
			o.addEventListener(e, f, false);
			r = true;
		} else if (window.attachEvent) {
			r = o.attachEvent('on' + e, f);
		}
		return r;
	}