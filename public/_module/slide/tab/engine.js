bd.slide.Tab = function() {
	this.init.apply(this, arguments);
};

bd.slide.Tab.prototype = {
	isReady: false,
	
	init: function() {
		bd.util.addCss(bindobj.moduleroot + '/slide/_common/bdSlideTab/jquery.bdSlideTab.css');
		jQuery.ajax({
			url: bindobj.moduleroot + '/slide/_common/bdSlideTab/jquery.bdSlideTab.js',
			dataType: 'script',
			context: this,
			success: this.callback
		});
	},
	
	callback: function() {
		this.isReady = true;
	},
	
	render: function( elem, autost, loop ) {
		jQuery(elem).bdSlideTab({'autostart':autost, 'loop':loop});
	}
};
