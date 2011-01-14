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
	 * 获得一个命名空间
	 * @method namespace
	 * @static
	 * @param { String } sSpace 命名空间符符串。如果是以“.”打头，则是表示以QW为根，否则以window为根。如果没有，则自动创建。
	 * @return {any} 返回命名空间对应的对象 
	 */		
	namespace: function(sSpace) {
		var root=window,
			arr=sSpace.split('.'),
			i=0;
		if(sSpace.indexOf('.')==0){
			i=1;
			root=QW;
		}
		for(;i<arr.length;i++){
			root=root[arr[i]] || (root[arr[i]]={});
		}
		return root;
	},
	
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
	 * 异步加载脚本
	 * @method loadJs
	 * @static
	 * @param { String } url Javascript文件路径
	 * @param { Function } onsuccess (Optional) Javascript加载后的回调函数
	 * @param { Option } options (Optional) 配置选项，例如charset
	 */
	loadJs: function(url,onsuccess,options){
		options = options || {};
		var head = document.getElementsByTagName('head')[0] || document.documentElement,
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
		head.insertBefore( script, head.firstChild );
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
* @class Wrap Wrap包装器。在对象的外面加一个外皮
* @namespace QW
* @param {any} core 被包装对象  
* @return {Wrap} 
*/
/*
QW.Wrap=function(core) {
	this.core=core;
};
*/

window.QW = QW;
})();