(function(){
	var methodizeTo=QW.HelperH.methodizeTo,
		applyTo=QW.HelperH.applyTo,
		mix=QW.ObjectH.mix;
	/**
	 * @class Object 扩展Object，用ObjectH来修饰Object，特别说明，未对Object.prototype作渲染，以保证Object.prototype的纯洁性
	 * @usehelper QW.ObjectH
	 */
	mix(Object,QW.ObjectH);

	/**
	 * @class Array 扩展Array，用ArrayH/HashsetH来修饰Array
	 * @usehelper QW.ArrayH,QW.HashsetH
	 */
	mix(QW.ArrayH, QW.HashSetH);
	applyTo(QW.ArrayH,Array);
	methodizeTo(QW.ArrayH,Array.prototype)

	/**
	 * @class Function 扩展Function，用FunctionH/ClassH来修饰Function
	 * @usehelper QW.FunctionH
	 */
	mix(QW.FunctionH, QW.ClassH);
	applyTo(QW.FunctionH,Function);
	methodizeTo(QW.FunctionH,Function.prototype)

	/**
	 * @class Date 扩展Date，用DateH来修饰Date
	 * @usehelper QW.DateH
	 */
	applyTo(QW.DateH,Date);
	methodizeTo(QW.DateH,Date.prototype)


	/**
	 * @class String 扩展String，用StringH来修饰String
	 * @usehelper QW.StringH
	 */
	applyTo(QW.StringH,String);
	methodizeTo(QW.StringH,String.prototype);
})();