bd.slide.Slide03 = function() {
	this.init.apply(this, arguments);
};

bd.slide.Slide03.prototype = {
	isReady: false,
	
	init: function() {
		bd.util.addCss(bindobj.moduleroot + '/slide/_common/bdSlideHorizontal/jquery.bdSlideHorizontal.css');
		jQuery.ajax({
			url: bindobj.moduleroot + '/slide/_common/bdSlideHorizontal/jquery.bdSlideHorizontal.js',
			dataType: 'script',
			context: this,
			success: this.callback
		});
	},
	
	callback: function() {
		this.isReady = true;
	},
	
	render: function( elem, autost, loop ) {
		jQuery(elem).bdSlideHorizontal({'autostart':autost, 'loop':loop});
	}
};
