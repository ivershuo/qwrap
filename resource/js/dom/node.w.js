/*
	Copyright (c) 2010, Baidu Inc.  http://www.youa.com; http://www.QWrap.com
	author: JK
	author: wangchen
*/
/** 
* @class NodeW HTMLElement对象包装器
* @namespace QW
*/
(function () {
	var ObjectH = QW.ObjectH,
		mix = ObjectH.mix,
		getType = ObjectH.getType,
		push = Array.prototype.push,
		NodeH = QW.NodeH,
		$ = NodeH.$,
		query = NodeH.query,
		one = NodeH.one;


	var NodeW=function(core) {
		if(!core) return null;//用法：var w=NodeW(null);	返回null
		var arg1=arguments[1];
		if(getType(core)=='string'){//用法：var w=NodeW(sSelector); 
			return new NodeW(query(arg1,core));
		}
		else {
			core=$(core,arg1);
			if(this instanceof NodeW){
				this.core=core;
				if(getType(core)=='array'){//用法：var w=NodeW(elementsArray); 
					this.length=0;
					push.apply( this, core );
				}
				else{//用法：var w=new NodeW(element)//不推荐; 
					this.length=1;
					this[0]=core;
				}
			}
			else return new NodeW([core]);//用法：var w=NodeW(element); 
		}
	};

	NodeW.one=function(core){
		if(!core) return null;//用法：var w=NodeW.one(null);	返回null
		var arg1=arguments[1];
		if(getType(core)=='string'){//用法：var w=NodeW.one(sSelector); 
			return new NodeW(query(arg1,core)[0]);
		}
		else {
			core=$(core,arg1);
			if(getType(core)=='array'){//用法：var w=NodeW.one(array); 
				return new NodeW(core[0]);
			}
			else{
				return new NodeW(core);//用法：var w=NodeW.one(element); 
			}
		}
	}

	/** 
	* 在NodeW中植入一个针对Node的Helper
	* @method	pluginHelper
	* @static
	* @param	{helper} helper 必须是一个针对Node（元素）的Helper	
	* @param	{string|json} wrapConfig	wrap参数
	* @param	{json} gsetterConfig	(Optional) gsetter 参数
	* @return	{NodeW}	
	*/

	NodeW.pluginHelper =function (helper, wrapConfig, gsetterConfig) {
		var HelperH=QW.HelperH;
		helper=HelperH.mul(helper,true,wrapConfig);	//支持第一个参数为array
		helper=HelperH.rwrap(helper,NodeW,wrapConfig);	//对返回值进行包装处理
		var helper2= gsetterConfig ? HelperH.gsetter(helper,gsetterConfig) : helper; //如果有gsetter，需要对表态方法gsetter化
		HelperH.applyTo(helper2,NodeW);	//应用于NodeW的静态方法

		var pro=HelperH.methodize(helper,'core',wrapConfig);
		if(gsetterConfig){
			for(var i in gsetterConfig){
				pro[i]=function(config){
					return function(){
						return pro[config[Math.min(arguments.length,config.length)]].apply(this,arguments);
					}
				}(gsetterConfig[i]);
			}
		}
		mix(NodeW.prototype,pro);
		//HelperH.methodizeTo(helper,NodeW.prototype,'core',wrapConfig);	//应用于NodeW的原型方法
	};

	mix(NodeW.prototype,{
		/** 
		* 返回NodeW的第0个元素的包装
		* @method	first
		* @return	{NodeW}	
		*/
		first:function(){
			return NodeW(this[0]);
		},
		/** 
		* 返回NodeW的最后一个元素的包装
		* @method	last
		* @return	{NodeW}	
		*/
		last:function(){
			return NodeW(this[this.length-1]);
		},
		/** 
		* 返回NodeW的第i个元素的包装
		* @method	last
		* @param {int}	i 第i个元素
		* @return	{NodeW}	
		*/
		item:function(i){
			return NodeW(this[i]);
		}
	});

	QW.NodeW=NodeW;
})();

