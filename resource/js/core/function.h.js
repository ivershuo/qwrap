/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/

/**
 * @class FunctionH 核心对象Function的扩展
 * @singleton 
 * @namespace QW
 * @helper
 */
(function(){

var FunctionH = {
	/**
	 * 函数包装器 methodize，对函数进行methodize化，使其的第一个参数为this，或this[attr]。
	 * @method methodize
	 * @static
	 * @param {function} func要方法化的函数
	 * @optional {string} attr 属性
	 * @return {function} 已方法化的函数
	 */
	methodize: function(func,attr){
		if(attr) return function(){
			var ret = func.apply(null,[this[attr]].concat([].slice.call(arguments)));
			return ret;
		};
		return function(){
			var ret = func.apply(null,[this].concat([].slice.call(arguments)));
			return ret;
		};
	},
   /** 对函数进行集化，使其第一个参数可以是数组
	* @method mul
	* @static
	* @param {function} func
	* @param {bite} opt 操作配置项，缺省表示默认，
					1 表示getFirst将只操作第一个元素，
					2 表示joinLists，如果第一个参数是数组，将操作的结果扁平化返回
	* @return {Object} 已集化的函数
	*/
	mul: function(func, opt){
		
		var getFirst = opt == 1, joinLists = opt == 2;

		if(getFirst){
			return function(){
				var list = arguments[0];
				if(!(list instanceof Array)) return func.apply(this,arguments);
				if(list.length) {
					var args=[].slice.call(arguments,0);
					args[0]=list[0];
					return func.apply(this,args);
				}
			}
		}

		return function(){
			var list = arguments[0];
			if(list instanceof Array){
				var ret = [];
				var moreArgs = [].slice.call(arguments,0);
				for(var i = 0, len = list.length; i < len; i++){
					moreArgs[0]=list[i];
					var r = func.apply(this, moreArgs);
					if(joinLists) r && (ret = ret.concat(r));
					else ret.push(r); 	
				}
				return ret;
			}else{
				return func.apply(this, arguments);
			}
		}
	},
	/**
	 * 函数包装变换
	 * @method rwrap
	 * @static
	 * @param {func} 
	 * @return {Function}
	 */
	rwrap: function(func,wrapper,idx){
		idx=idx|0;
		return function(){
			var ret = func.apply(this, arguments);
			if(idx>=0) ret=arguments[idx];
			return wrapper ? new wrapper(ret) : ret;
		}
	},
	/**
	 * 绑定
	 * @method bind
	 * @via https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
	 * @compatibile ECMA-262, 5th (JavaScript 1.8.5)
	 * @static
	 * @param {func} 要绑定的函数
	 * @obj {object} this_obj
	 * @optional [, arg1 [, arg2 [...] ] ] 预先确定的参数
	 * @return {Function}
	 */
	bind: function(func, obj/*,[, arg1 [, arg2 [...] ] ]*/){
		var slice = [].slice,
			args = slice.call(arguments, 2),
			nop = function(){},
			bound = function(){
				return func.apply(this instanceof nop?this:(obj||{}),
								args.concat(slice.call(arguments)));
			};

		nop.prototype = func.prototype;

		bound.prototype = new nop();

		return bound;
	}
};


QW.FunctionH=FunctionH;

})();