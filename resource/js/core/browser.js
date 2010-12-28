/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: yingjiakuan@baidu.com
*/


/**
 * @class Browser js的运行环境，浏览器以及版本信息
 * @singleton 
 * @namespace QW 
 */
QW.Browser=function(){
	var na=window.navigator,ua = na.userAgent.toLowerCase();
	// 判断浏览器的代码,部分来自JQuery,致谢!
	var b= {
		platform: na.platform,
		//mozilla: /mozilla/.test( ua ) && !/(compatible|webkit|firefox)/.test( ua ),//废弃
		msie: /msie/.test( ua ) && !/opera/.test( ua ),
		opera: /opera/.test( ua ),
		//gecko: /gecko/.test( ua ) && /khtml/.test( ua ),//废弃
		safari: /webkit/.test( ua ) && !/chrome/.test( ua ),
		firefox: /firefox/.test( ua ) ,
		chrome: /chrome/.test( ua )
	};
	var vMark="";
	for(var i in b){
		if(b[i]) vMark=i;
	}
	if(b.safari) vMark="version";
	b.version=(ua.match( new RegExp("(?:"+vMark+")[\\/: ]([\\d.]+)") ) || [])[1];
	b.ie=b.msie;
	b.ie6=b.msie && parseInt(b.version)==6;
	b.ie7=b.msie && parseInt(b.version)==7;
	b.ie8=b.msie && parseInt(b.version)==8;
	try{b.maxthon=b.msie && !!external.max_version;} catch(ex){}
	return b;
}();
if(QW.Browser.ie){try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}}
