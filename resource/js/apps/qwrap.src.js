(function() {
	var els = document.getElementsByTagName('script'),
		srcPath = '';
	for (var i = 0; i < els.length; i++) {
		var src = els[i].src.split(/apps[\\\/]/g);
		if (src[1]) {
			srcPath = src[0];
			break;
		}
	}

	document.write('<script type="text/javascript" src="' + srcPath + 'core/core_base.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/module.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/browser.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/string.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/array.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/object.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/hashset.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/date.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/function.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/class.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/helper.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'core/custevent.js"><\/script>');

	document.write('<script type="text/javascript" src="' + srcPath + 'dom/selector.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/dom.u.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/node.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/node.w.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/event.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/eventtarget.h.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/jss.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/node.c.js"><\/script>');

	document.write('<script type="text/javascript" src="' + srcPath + 'core/core_retouch.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'dom/dom_retouch.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'apps/common_retouch.js"><\/script>');

	document.write('<script type="text/javascript" src="' + srcPath + 'components/async/async.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'components/config/config.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'components/ajax/ajax.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'components/twitter/twitter.js"><\/script>');
	document.write('<script type="text/javascript" src="' + srcPath + 'components/animation/anim.js"><\/script>');

	document.write('<script type="text/javascript" src="' + srcPath + 'apps/modules_config.js"><\/script>');
}());