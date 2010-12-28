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
var QW=window.QW,
	getType=QW.ObjectH.getType,
	map=QW.ArrayH.map;

var FunctionH = {
	/**
	 * 函数包装器 curry
	 * <p>将一个方法的任意参数固化，传递给它一组参数，这组参数中不为undefined的值被固化，返回固化后的新方法</p>
	 * @method curry
	 * @static
	 * @param {function} func 被包装的函数
	 * @param {array} curryArgs 柯里化(固化)参数
	 * @return {function} 被curry的方法
	 */
	curry : function(func, curryArgs){
		curryArgs = curryArgs || [];
		return function(){
			var args = [];
			var newArgs = [].slice.call(arguments);

			for(var i = 0, len = curryArgs.length; i < len; i++){
				if(i in curryArgs){
					args.push(curryArgs[i]);
				}else{
					if(newArgs.length){
						args.push(newArgs.shift());
					}
				}
			}

			args = args.concat(newArgs);
			return func.apply(this, args);
		}
	},
	/**
	 * 函数包装器 methodize，对函数进行methodize化，使其的第一个参数为this，或this[attr]。
	 * @method methodize
	 * @static
	 * @param {function} func要方法化的函数
	 * @optional {string} attr 属性
	 * @optional {boolean} chain 串化，如果串化，返回this，否则返回原来的函数返回值 
	 * @return {function} 已方法化的函数
	 */
	methodize: function(func,attr,chain){
		if(attr) return function(){
			alert[attr,this[attr]];
			var ret = func.apply(null,[this[attr]].concat([].slice.call(arguments)));
			return chain?this:ret;
		};
		return function(){
			var ret = func.apply(null,[this].concat([].slice.call(arguments)));
			return chain?this:ret;
		};
	},
	/**
	 * 函数参数重载方法 overload，对函数参数进行模式匹配。默认的dispatcher支持*和...以及?，"*"表示一个任意类型的参数，"..."表示多个任意类型的参数，"?"一般用在",?..."表示0个或任意多个参数
	 * @method overload
	 * @static
	 * @param {function} func如果匹配不成功，默认执行的方法
	 * @param {json} func_maps 根据匹配接受调用的函数列表
	 * @optional {function} dispatcher用来匹配参数负责派发的函数
	 * @return {function} 已重载化的函数
	 */
	overload: function(func, func_maps, dispatcher){
		if(!dispatcher){
			dispatcher = function(){
				var args = [].slice.call(arguments);
				return map(args, function(o){return getType(o)}).join();
			}
		}

		return function(){
			var key = dispatcher.apply(this, arguments);
			for(var i in func_maps){
				var pattern = new RegExp("^"+i.replace("*","[^,]*").replace("...",".*")+"$");
				if(pattern.test(key)){
					return func_maps[i].apply(this, arguments);
				}
			}
			return func.apply(this, arguments);
		};
	},
   /**
	* 对函数进行集化，使其在第一个参数为array时，结果也返回一个数组
	* @method mul
	* @static
	* @param {function} func
	* @param {boolean} recursive 是否递归
	* @param {boolean} onlyGetFirst 是否只是getFirst
	* @return {Object} 已集化的函数
	*/
	mul: function(func, recursive,onlyGetFirst){
		if(onlyGetFirst){
			return function(){
				var list = arguments[0];
				if(!list instanceof Array) return func.apply(this,arguments);
				if(!recursive){ //不需要递归
					if(list.length) {
						var args=[].slice.call(arguments,0);
						args[0]=list[0];
						return func.apply(this,args);
					}
					else {
						throw 'Fail to run getter. there is no any element.';
					}
				}
				//以下代码，递归回溯寻找第一个元素，例如[[[],[]],[[],[el]]] 会找到el，再去执行func
				var firstOne;
				function findFirst(list){
					if(!(list instanceof Array)) {
						firstOne=[list];
						return;
					}
					for(var i=0;i<list.length;i++){
						if(firstOne) return;
						findFirst(list[i]);
					}
				};
				findFirst(list);
				if(firstOne) {
					var args=[].slice.call(arguments,0);
					args[0]=firstOne[0];
					return func.apply(this,args);
				}
				throw 'Fail to run getter. there is no any element.';
			}
		}
		var newFunc = function(){
			var list = arguments[0], fn = recursive ? newFunc : func;
			if(list instanceof Array){
				var ret = [];
				var moreArgs = [].slice.call(arguments,0);
				for(var i = 0, len = list.length; i < len; i++){
					moreArgs[0]=list[i];
					var r = fn.apply(this, moreArgs);
					ret.push(r); 	
				}
				return ret;
			}else{
				return func.apply(this, arguments);
			}
		}
		return newFunc;
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
	 * @static
	 * @param {func} 
	 * @return {Function}
	 */
	bind: function(func, thisObj){
		return function(){
			return func.apply(thisObj, arguments);
		}
	}
};


QW.FunctionH=FunctionH;

})();