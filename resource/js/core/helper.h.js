/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: yingjiakuan@baidu.com
*/

/**
 * Helper管理器，核心模块中用来管理Helper的子模块
 * @module core
 * @beta
 * @submodule core_HelperH
 */

/**
 * @class HelperH
 * <p>一个Helper是指同时满足如下条件的一个对象：</p>
 * <ol><li>Helper是一个不带有可枚举proto属性的简单对象（这意味着你可以用for...in...枚举一个Helper中的所有属性和方法）</li>
 * <li>Helper可以拥有属性和方法，但Helper对方法的定义必须满足如下条件：</li>
 * <div> 1). Helper的方法必须是静态方法，即内部不能使用this。</div>
 * <div> 2). 同一个Helper中的方法的第一个参数必须是相同类型或相同泛型。</div>
 * <li> Helper类型的名字必须以Helper或大写字母H结尾。 </li>
 * <li> 对于只满足第一条的JSON，也算是泛Helper，通常以“U”（util）结尾。 </li>
 * <li> 本来Util和Helper应该是继承关系，但是JavaScript里我们把继承关系简化了。</li>
 * </ol>
 * @singleton
 * @namespace QW
 * @helper
 */

(function(){

var FunctionH = QW.FunctionH,
	mix = QW.ObjectH.mix;

var HelperH = {
	/**
	* 对于需要返回wrap对象的helper方法，进行结果包装
	* @method rwrap
	* @static
	* @param {Helper} helper Helper对象
	* @param {Class} wrapper 将返回值进行包装时的包装器(WrapClass)
	* @param {Object} wrapConfig 需要返回Wrap对象的方法的配置
	* @return {Object} 方法已rwrap化的<strong>新的</strong>Helper
	*/
	rwrap: function(helper, wrapper, wrapConfig){
		var ret = {};
		if(null == wrapConfig) wrapConfig = {};

		for(var i in helper){
			var wrapType=wrapConfig;
			if (typeof wrapType != 'string') {
				wrapType=wrapConfig[i] || '';
			}
			if(/queryer/.test(wrapType)){
				ret[i] = FunctionH.rwrap(helper[i], wrapper, -1);//对返回值进行包装
			}
			else if('operator'==wrapType){
				ret[i] = FunctionH.rwrap(helper[i], wrapper, 0);//对第一个参数进行包装
			}
			else ret[i] = helper[i]; //不作变幻
		}
		return ret;
	},

	/**
	* 根据配置，产生gsetter新方法，它根椐参数的长短来决定调用getter还是setter
	* @method gsetter
	* @static
	* @param {Helper} helper Helper对象
	* @param {Object} gsetterConfig 需要返回Wrap对象的方法的配置
	* @return {Object} 方法已gsetter化的<strong>新的</strong>helper
	*/
	gsetter: function(helper,gsetterConfig){
		var ret = mix({}, helper);
		gsetterConfig=gsetterConfig||{};
		for(var i in gsetterConfig){
			ret[i]=function(config){
				return function(){return ret[config[Math.min(arguments.length,config.length)-1]].apply(null,arguments);}
			}(gsetterConfig[i]);
		}
		return ret;
	},
	
	/**
	* 对helper的方法，进行mul化，使其在第一个参数为array时，结果也返回一个数组
	* @method mul
	* @static
	* @param {Helper} helper Helper对象
	* @param {boolean} recursive (Optional)是否递归
	* @param {json|string} mulConfig mulConfig，
	* @return {Object} 方法已mul化的<strong>新的</strong>Helper
	*/
	mul: function (helper, recursive,wrapConfig){ 
		wrapConfig =wrapConfig ||{};
		var ret = {};
		for(var i in helper){
			if(typeof helper[i] == "function"){
				var wrapType=wrapConfig;
				if (typeof wrapType != 'string') {
					wrapType=wrapConfig[i] || '';
				}
				ret[i] = FunctionH.mul(helper[i], recursive, wrapType=='getter_first');
			}
			else
				ret[i] = helper[i];
		}
		return ret;
	},
	/**
	* 将一个Helper应用到某个Object上，Helper上的方法作为静态函数，即：extend(obj,helper)
	* @method applyTo
	* @static
	* @param {Helper} helper Helper对象，如DateH
	* @param {Object} obj 目标对象.
	* @return {Object} 应用Helper后的对象 
	*/
	applyTo: function(helper,obj){
		return mix(obj, helper);  //复制属性
	},
	/**
	* 对helper的方法，进行methodize化，使其的第一个参数为this，或this[attr]。
	* <strong>methodize方法会抛弃掉helper上的非function类成员以及命名以下划线开头的成员（私有成员）</strong>
	* @method methodize
	* @static
	* @param {Helper} helper Helper对象，如DateH
	* @param {optional} attr (Optional)属性
	* @param {optional} wrapConfig (Optional) 方法类型配置
	* @return {Object} 方法已methodize化的对象
	*/
	methodize: function(helper, attr, wrapConfig){
		wrapConfig=wrapConfig||{};
		var ret = {};
		for(var i in helper){
			var wrapType=wrapConfig;
			if (typeof wrapType != 'string') {
				wrapType=wrapConfig[i] || '';
			}
			if(typeof helper[i] == "function" && !/^_/.test(i)){
				ret[i] = FunctionH.methodize(helper[i], attr, wrapType=='operator'); 
			}
		}
		return ret;
	},
	/**
	* <p>将一个Helper应用到某个Object上，Helper上的方法作为对象方法</p>
	* @method methodizeTo
	* @static
	* @param {Helper} helper Helper对象，如DateH
	* @param {Object} obj  目标对象.
	* @param {string} attr (Optional)包装对象的core属性名称。如果为空，则用this，否则用this[attr]，当作Helper方法的第一个参数
	* @param {json|string} wrapConfig (Optional) 方法类型配置
	* @return {Object} 应用Helper后的对象
	*/
	methodizeTo: function(helper, obj, attr, wrapConfig){
		helper = HelperH.methodize(helper,attr, wrapConfig);	//方法化
		return mix(obj, helper);  //复制属性		 
	}
	//,
	/*
	* 得到一个HelperWrap
	* @method wrap
	* @static
	* @param {Helper} h1 Helper对象，如DateH
	* @param {Helper} h2 (Optional) 可以有多个Helper.
	* @return {HelperW} 返回一个Helper的Wrap对象
	*/
	/*wrap: function(){
		var helper = mix({},[].slice.call(arguments));
		function HWrap(helper){
			this.core = helper;
		};
		var h = HelperH.rwrap(HelperH, HWrap, 'operator,queryer');
		HelperH.methodizeTo(h, HWrap.prototype, "core");
		return new HWrap(helper);
	}*/

};

QW.HelperH = HelperH;
})();

