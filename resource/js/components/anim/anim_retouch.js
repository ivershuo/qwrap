/*
 *	Copyright (c) QWrap
 *	version: $version$ $release$ released
 *	author:Jerry(屈光宇)、JK（加宽）
 *  description: Anim推荐retouch....
*/

(function() {
	var NodeH = QW.NodeH,
		g = NodeH.g,
		show = NodeH.show,
		hide = NodeH.hide,
		isVisible = NodeH.isVisible,
		getStyle = NodeH.getCurrentStyle,
		getSize = NodeH.getSize,
		setStyle = NodeH.setStyle;

	function newAnim(el, attrs, callback, dur, easing) {
		el = g(el);
		var preAnim = el.__preAnim;
		preAnim && preAnim.isPlaying() && preAnim.pause();

		var anim = new QW.ElAnim(el, attrs, dur || 400, easing);
		if (callback) {
			anim.on("end", function() {
				callback.call(el, null);
			});
		}
		anim.play();
		el.__preAnim = anim;
		return anim;
	}

	var AnimElH = {
		/**
		 * [animate 通用的动画函数]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Object]}   attrs  动画改变的属性
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		animate: function(el, attrs, dur, callback, easing) {
			return newAnim(el, attrs, callback, dur, easing);
		},

		/**
		 * [fadeIn 淡入]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		fadeIn: function(el, dur, callback, easing) {
			show(el);
			return newAnim(el, {
				"opacity": {
					to: el.__animOpacity || 1
				}
			}, callback, dur, easing);
		},

		/**
		 * [fadeOut 淡出]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		fadeOut: function(el, dur, callback, easing) {
			callback = callback || function() {
				hide(el);
			};
			el.__animOpacity = el.__animOpacity || getStyle(el, 'opacity');
			return newAnim(el, {
				"opacity": {
					to: 0
				}
			}, callback, dur, easing);
		},

		/**
		 * [fadeToggle 淡入/淡出切换]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		fadeToggle: function(el, dur, callback, easing) {
			return AnimElH[isVisible(el) ? 'fadeOut' : 'fadeIn'](el, dur, callback, easing);
		},

		/**
		 * [slideUp 收起]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		slideUp: function(el, dur, callback, easing) {
			var from = getSize(el).height;

			callback = callback || function() {
				hide(el);
			};

			el.__animHeight = el.__animHeight || from;

			return newAnim(el, {
				"height": {
					from :from,
					to: 0
				}
			}, callback, dur, easing);
		},

		/**
		 * [slideDown 展开]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		slideDown: function(el, dur, callback, easing) {
			var from = 0;

			if(!isVisible(el)) {
				show(el);
			} else {
				from = getSize(el).height;
			}

			return newAnim(el, {
				"height": {
					from:from,
					to: el.__animHeight || getSize(el).height
				}
			}, callback, dur, easing);
		},

		/**
		 * [slideToggle 收起/展开切换]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		slideToggle: function(el, dur, callback, easing) {
			return AnimElH[isVisible(el) ? 'slideUp' : 'slideDown'](el, dur, callback, easing);
		},

		/**
		 * [shine4Error 颜色渐变，用于表单提示]
		 * @param  {[Element]}   el    动画作用的元素
		 * @param  {[Int]}   dur       动画时长，毫秒
		 * @param  {Function} callback 动画运行完回调
		 * @param  {Function}   easing 动画算子
		 * @return ElAnim
		 */
		shine4Error: function(el, dur, callback, easing) {
			return newAnim(el, {
				"backgroundColor": {
					from: "#f33",
					to: "#fff",
					end: ""
				}
			}, callback, dur, easing);
		}
	};

	QW.NodeW.pluginHelper(AnimElH, 'operator');
	if (QW.Dom) {
		QW.ObjectH.mix(QW.Dom, AnimElH);
	}
}());