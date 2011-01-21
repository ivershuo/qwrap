
(function(){
var queryer = 'queryer',
	operator = 'operator',
	getter_all = 'getter_all',
	getter_first = 'getter_first',
	getter_first_all = 'getter_first_all'	

QW.NodeC = {
	getterType : getter_first,
	arrayMethods : 'map,forEach,filter,toArray'.split(','),//部分Array的方法也会集成到NodeW里
	wrapMethods : { 
		//queryer “返回值”的包装结果
		//operator 如果是静态方法，返回第一个参数的包装，如果是原型方法，返回本身
		//getter_all 如果是array，则每一个执行，并返回
		//getter_first 如果是array，则返回第一个执行的返回值
		//getter_first_all 同getter，产出两个方法，一个是getterFirst，一个是getterAll

		//NodeH系列
		$ : queryer ,
		one : queryer ,
		query : queryer ,
		getElementsByClass : queryer ,
		outerHTML : getter_first ,
		hasClass : getter_first ,
		addClass : operator ,
		removeClass : operator ,
		replaceClass : operator ,
		toggleClass : operator ,
		show : operator ,
		hide : operator ,
		toggle : operator ,
		isVisible : getter_first ,
		getXY : getter_first ,
		setXY : operator ,
		setSize : operator ,
		setInnerSize : operator ,
		setRect : operator ,
		setInnerRect : operator ,
		getSize : getter_first ,
		getRect : getter_first ,
		nextSibling : queryer ,
		previousSibling : queryer ,
		ancestorNode : queryer ,
		parentNode : queryer ,
		firstChild : queryer ,
		lastChild : queryer ,
		contains : getter_first ,
		insertAdjacentHTML : operator ,
		insertAdjacentElement : operator ,
		appendChild : operator ,
		insertSiblingBefore : operator ,
		insertSiblingAfter : operator ,
		insertBefore : operator ,
		insertAfter : operator ,
		replaceNode : operator ,
		replaceChild : operator ,
		removeNode : operator ,
		removeChild : operator ,
		get : getter_first ,
		set : operator ,
		getAttr : getter_first ,
		setAttr : operator ,
		removeAttr : operator ,
		getValue : getter_first ,
		setValue : operator ,
		getHtml : getter_first ,
		setHtml : operator ,
		encodeURIForm : getter_first ,
		isFormChanged : getter_first ,
		cloneNode : operator ,
		getStyle : getter_first ,
		getCurrentStyle : getter_first ,
		setStyle : operator ,
		borderWidth : getter_first ,
		paddingWidth : getter_first ,
		marginWidth : getter_first,

		//TargetH系列
		//……

		//JssTargetH系列
		getOwnJss : getter_first,
		getJss : getter_first,
		setJss : operator,
		removeJss : operator,

		//ArrayH系列
		forEach : operator,
		filter : queryer
	},
	gsetterMethods : { //在此json里的方法，会是一个getter与setter的混合体
		val : ['getValue','setValue'],
		html : ['getHtml','setHtml'],
		attr : ['','getAttr','setAttr'],
		css : ['','getCurrentStyle','setStyle'],
		size : ['getSize', 'setSize'],
		xy : ['getXY', 'setXY']
	}
};

})();