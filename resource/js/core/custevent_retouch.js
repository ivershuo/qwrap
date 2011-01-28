(function(){
var mix=QW.ObjectH.mix;

var CustEventTarget=QW.CustEventTarget=function(){
	this.__custListeners={};
};

var methodized = QW.HelperH.methodize(QW.CustEventTargetH,null, {on:'operator',un:'operator'}); //将Helper方法变成prototype方法，同时修改on/un的返回值
mix(CustEventTarget.prototype, methodized);

QW.CustEvent.createEvents = CustEventTarget.createEvents = function(target,types){
	QW.CustEventTargetH.createEvents(target, types);
	return mix(target,CustEventTarget.prototype);//尊重对象本身的on。
};
})();