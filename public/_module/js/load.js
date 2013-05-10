/* load.js
  - Loading order
--------------------------------------------------------- */
jQuery.noConflict();
jQuery.ajaxSetup({scriptCharset:'utf-8'});

// domready
jQuery(document).ready(function() {
	// cssskin
	if (typeof(bdCssNames) != 'undefined') {
		var len = bdCssNames.area.length;
		for (var i=0; i<len; i++) bd.util.addCss(bindobj.siteroot + bdCssNames.area[ i ]);
		len = bdCssNames.block.length;
		for (var i=0; i<len; i++) bd.util.addCss(bindobj.siteroot + bdCssNames.block[ i ]);
	}
	
	////////// parts
	if (bindobj.printstate) Bindprint.control();
	else Bindprint.set();
	
	////////// blockeditor
	if (bindobj.isLocal && !bindobj.ie52) BindApp.onload();
	
	////////// fx
	if (!bindobj.printstate) initFx();
	
});

// onload
jQuery(window).load(function(){
	////////// for legacy browser
	legacyCheck();
	
	////////// set footer
	Bindfooter.set();
	
	// reload
	setTimeout(function(){bd.util.bdRefresh()}, 400);
});
