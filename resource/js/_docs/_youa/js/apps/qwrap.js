/*
	Copyright (c) Baidu Youa Wed QWrap
	version: 1.1.0 2012-02-23 released
	author: 月影、JK
*/

/*
 * @class ObjectH 核心对象Array的扩展
 * @singleton 
 * @namespace QW
 * @helper
 */
(function() {
	var ObjectH = {
		/**
		 * 将一个扁平化的对象展“折叠”一个深层次对象，其中包含"."的属性成为深层属性
		 * @method fold
		 * @static
		 * @param obj {Object} 要折叠的对象
		 * @return {Object} 折叠后的对象
		 */
		fold: function(obj) {
			var ret = {};
			for (var prop in obj) {
				var keys = prop.split(".");

				for (var i = 0, o = ret, len = keys.length - 1; i < len; i++) {
					if (!(keys[i] in o)) {o[keys[i]] = {}; }
					o = o[keys[i]];
				}
				o[keys[i]] = obj[prop];
			}
			return ret;
		},
		/**
		 * 将一个对象扁平化，是fold的反向操作
		 * @method expand
		 * @static
		 * @param obj {Object} 要扁平化的对象
		 * @return {Object} 扁平化后的对象
		 */
		expand: function(obj) {
			var ret = {};
			var f = function(obj, profix) {
				for (var each in obj) {
					var o = obj[each];
					var p = profix.concat([each]);
					if (ObjectH.isPlainObject(o)) {
						f(o, p);
					} else {
						ret[p.join(".")] = o;
					}
				}
			};
			f(obj, []);
			return ret;
		},
		/**
		 * 以keys/values数组的方式添加属性到一个对象<br/>
		 * <strong>如果values的长度大于keys的长度，多余的元素将被忽略</strong>
		 * @method fromArray
		 * @static
		 * @param {Object} obj 被操作的对象
		 * @param {Array} keys 存放key的数组
		 * @param {Array} values 存放value的数组
		 * @return {Object} 返回添加了属性的对象
		 */
		fromArray: function(obj, keys, values) {
			values = values || [];
			for (var i = 0, len = keys.length; i < len; i++) {
				obj[keys[i]] = values[i];
			}
			return obj;
		}
	};

	QW.ObjectH.mix(QW.ObjectH, ObjectH);

}());