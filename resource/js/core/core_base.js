/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/


/**
 * @singleton 
 * @class QW QW是QWrap的默认域，所有的核心Class都应定义在QW的域下
 */
(function(){
var _previousQW=window.QW;

var QW = {
	/**
	 * @property {string} VERSION 脚本库的版本号
	 * @default $version$
	 */
	VERSION: "$version$",
	/**
	 * @property {string} RELEASE 脚本库的发布号（小版本）
	 * @default $release$
	 */
	RELEASE: "$release$",
	/**
	 * @property {string} PATH 脚本库的运行路径
	 * @type string
	 */
	PATH: (function(){
		var sTags=document.getElementsByTagName("script");
		return  sTags[sTags.length-1].src.replace(/\/[^\/]+\/[^\/]+$/,"/");
	})(),
	/**
	 * QW无冲突化，还原可能被抢用的window.QW变量
	 * @method noConflict
	 * @static
	 * @return {json} 返回QW的命名空间 
	 */		
	noConflict: function() {
		window.QW=_previousQW;
		return QW;
	},
	/**
	 * 向QW这个命名空间里设变量
	 * @method provide
	 * @static
	 * @param {string|Json} key 如果类型为string，则为key，否则为Json，表示将该Json里的值dump到QW命名空间
	 * @param {any} value (Optional)值
	 * @return {void} 
	 */		
	provide: function(key, value){
		if(arguments.length==1 && typeof key=='object'){
			for(var i in key){
				QW.provide(i,key[i]);
			}
			return;
		}
		var domains=QW.provideDomains;
		for(var i=0;i<domains.length;i++){
			if(!domains[i][key]) domains[i][key]=value;
		}
	},
	/**
	 * 异步加载脚本
	 * @method getScript
	 * @static
	 * @param { String } url Javascript文件路径
	 * @param { Function } onsuccess (Optional) Javascript加载后的回调函数
	 * @param { Option } options (Optional) 配置选项，例如charset
	 */
	getScript: function(url,onsuccess,options){
		options = options || {};
		var head = document.getElementsByTagName('head')[0],
			script = document.createElement('script'),
			done = false;
		script.src = url;
		if( options.charset )
			script.charset = options.charset;
		script.onerror = script.onload = script.onreadystatechange = function(){
			if ( !done && (!this.readyState ||
					this.readyState == "loaded" || this.readyState == "complete") ) {
				done = true;
				onsuccess && onsuccess();
				script.onerror = script.onload = script.onreadystatechange = null;
				head.removeChild( script );
			}
		};
		head.appendChild(script);

	},
	/**
	 * 抛出异常
	 * @method error
	 * @static
	 * @param { obj } 异常对象
	 * @param { type } Error (Optional) 错误类型，默认为Error
	 */
	error: function(obj, type){
		type = type || Error;
		throw new type(obj);
	}
};
/**
 * @property {Array} provideDomains provide方法针对的命名空间
 * @type string
 */
QW.provideDomains=[QW];

/**
* @class Wrap Wrap包装器。在对象的外面加一个外皮
* @namespace QW
* @param {any} core 被包装对象  
* @return {Wrap} 
*/
QW.Wrap=function(core) {
	this.core=core;
};


window.QW = QW;
})();