bd.slide.PtSliceDown_es = function() {
	this.init.apply(this, arguments);
};

bd.slide.PtSliceDown_es.prototype = {
	slices: 8,
	isReady: false,
	
	init: function() {
		bd.util.addCss(bindobj.moduleroot + '/slide/_common/nivo-slider.css');
		bd.util.addCss(bindobj.moduleroot + '/slide/_common/custom-nivo-slider.css');
		
		jQuery.ajax({
			url: bindobj.moduleroot + '/slide/_common/jquery.nivo.slider.pack.js',
			dataType: 'script',
			context: this,
			success: this.callback
		});
	},
	
	callback: function() {
		this.isReady = true;
	},
	
	render: function( elem, autost, loop ) {
		var el = jQuery(elem);
		var h  = el.height();
		var w = el.width();
		
		var slide = jQuery('<div></div>').css({
			width: w,
			height: h,
			display: 'none',
			marginBottom: 40
		});
		
		var total = 0;
		jQuery('span', el).each(function(i, e) {
			var els = e.childNodes;
			var img = null;
			var anc = null;
			var ttl = '';
			for (var i=0; i < els.length; i++) {
				var e = els[ i ];
				if (e.nodeType == 1) {
					if (e.tagName == 'IMG') {
						img = e;
						total++;
						if (anc != null) anc.append(img);
					} else if (e.tagName == 'A') {
						anc = e;
						total++;
					} else if (e.tagName == 'SPAN') {
						ttl = jQuery(e).text();
						if (img != null) img.title = ttl;
						else if (anc != null) {
							jQuery('img', anc).attr('title', ttl);
						}
					}
				}
			}
			
			if (anc != null) {
				slide.append(anc);
			} else if (img != null) {
				slide.append(img);
			}
		});
		
		slide.insertBefore(elem);
		el.remove();
		
		slide.nivoSlider({
			effect: 'sliceDown',
			slices: this.slices,
			animSpeed:1000,
			pauseTime:6000,
			startSlide:0,
			pauseOnHover: false,
			manualAdvance: bd.util.onEditBlock() || !autost,
			slideshowEnd: function() {
				if (loop==false) slide.data( 'nivo:vars' ).stop = true;
			}
		});
		
		jQuery('.nivo-caption p', slide).css('color', '#ffffff');
		jQuery('a', slide).css({
			'border': 'none',
			'background-color': 'transparent'
		});
		jQuery('a.nivo-nextNav', slide).css({
			'position': 'absolute'
		});
		jQuery('a.nivo-prevNav', slide).css({
			'position': 'absolute'
		});
		
		var navWidth = total * 13;
		jQuery('.nivo-controlNav', slide).css('left', ((w - navWidth) / 2) + 'px');
		
		slide.fadeIn(function(){
			bd.util.bdRefresh();
			Bindfooter.set();
		});
	}
};
