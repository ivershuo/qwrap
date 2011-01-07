/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/

/**
 * @class ClassH 为function提供强化的原型继承能力
 * @singleton 
 * @namespace QW
 * @helper
 */
(function(){

var ClassH = {
	/**
	 * <p>为类型动态创建一个实例，它和直接new的区别在于instanceof的值</p>
	 * <p><strong>第二范式：new T <=> T.apply(T.getPrototypeObject())</strong></p>
	 * @method createInstance
	 * @static
	 * @prarm {function} cls 要构造对象的类型（构造器）
	 * @return {object} 这个类型的一个实例
	 */
	createInstance : function(cls){
		var T = function(){};
		T.prototype = cls.prototype;
		var p = new T();
		cls.apply(p,[].slice.call(arguments,1));
		return p;
	},

	/**
	 * 函数包装器 extend
	 * <p>改进的对象原型继承，延迟执行参数构造，并在子类的实例中添加了$super和$class引用</p>
	 * @method extend
	 * @static
	 * @param {function} cls 产生子类的原始类型
	 * @param {function} p 父类型
	 * @return {function} 返回以自身为构造器继承了p的类型
	 * @throw {Error} 不能对继承返回的类型再使用extend
	 */
	extend : function(cls,p){
		var wrapped = function()	//创建构造函数
		{   
			this.$super = p;		//在构造器内可以通过this.$super来执行父类构造
			var ret = cls.apply(this, arguments);
			delete this.$super;

			return ret;
		}
		wrapped.toString = function(){
			return cls.toString();
		}
		
		var T = function(){};			//构造prototype-chain
		T.prototype = p.prototype;
		wrapped.prototype = new T();

		wrapped.$class = cls;
		//wrapped.$super = cls.$super = p; //在构造器内可以通过arguments.callee.$super执行父类构造

		wrapped.prototype.constructor = wrapped;

		for(var i in cls.prototype){		//如果原始类型的prototype上有方法，先copy
			if(cls.prototype.hasOwnProperty(i))
				wrapped.prototype[i] = cls.prototype[i];
		}

		wrapped.extend = function(){
			throw new Error("you maynot apply the same wrapper twice.");
		}

		return wrapped;
	}
};

QW.ClassH = ClassH;

})();