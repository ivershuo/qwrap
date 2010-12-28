(function(){
var QW=window.QW,
	mix=QW.ObjectH.mix;

var CustEventTarget=QW.CustEventTarget=function(){
	this.__custListeners={};
};

QW.HelperH.methodizeTo(QW.CustEventTargetH, CustEventTarget.prototype,null, {on:'operator',un:'operator'}); //将Helper方法变成prototype方法，同时修改on/un的返回值

QW.CustEvent.createEvents = CustEventTarget.createEvents = function(target,types){
	QW.CustEventTargetH.createEvents(target, types);
	return mix(target,CustEventTarget.prototype);//尊重对象本身的on。
};
})();