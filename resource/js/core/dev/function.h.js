/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/

/*
 * @class FunctionH 核心对象Function的扩展
 * @singleton 
 * @namespace QW
 * @helper
 */
(function(){
var FunctionH = {
	/*
	 * 函数包装器 defer
	 * <p>让被包装方法总是被异步调用</p>
	 * <p>方法被包装后，调用时，第一个参数总是一个延时毫秒数，默认为0，后续是原方法的参数，返回值是setTimeout的id</p>
	 * @method defer
	 * @static
	 * @param {function} func 被包装的函数
	 * @return {function} 被包装defer的方法
	 */
	defer : function(func){
		return function(ims){
			ims = ims || 0;
			var args = [].slice.call(arguments,1);
			var me = this;

			var tid = setTimeout(
				function(){
					func.apply(me, args)
				},ims
			);
			return tid;
		}
	},
	/*
	* 懒惰执行某函数：一直到不得不执行的时候才执行。
	* @method lazyApply
	* @static
	* @param {Function} fun  调用函数
	* @param {Object} thisObj  相当于apply方法的thisObj参数
	* @param {Array} argArray  相当于apply方法的argArray参数
	* @param {int} ims  interval毫秒数，即window.setInterval的第二个参数.
	* @param {Function} checker  定期运行的判断函数，传给它的参数为：checker.call(thisObj,argArray,ims,checker)。<br/>
		对于不同的返回值，得到不同的结果：<br/>
			返回true或1，表示需要立即执行<br/>
			返回-1，表示成功偷懒，不用再执行<br/>
			返回其它值，表示暂时不执行<br/>
	@return {int}  返回interval的timerId
	*/
	lazyApply:function(fun,thisObj,argArray,ims,checker){
		var timer=function(){
			var verdict=checker.call(thisObj,argArray,ims,timerId);
			if(verdict==1){
				fun.apply(thisObj,argArray||[]);
			}
			if(verdict==1 || verdict==-1){
				clearInterval(timerId);
			}
		};
		var timerId=setInterval(timer,ims);
		return timerId;
	}
};

QW.ObjectH.mix(QW.FunctionH,FunctionH);

})();