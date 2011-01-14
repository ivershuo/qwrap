
(function(){

describe('QW', {
	'QW Members': function() {
		value_of("测试QW拥有的属性").log();

		value_of(QW.ObjectH.isPlainObject(QW)).should_be(true);
		value_of(typeof QW.VERSION).should_be('string');
		value_of(typeof QW.RELEASE).should_be('string');

		value_of("测试QW拥有的方法").log();

		value_of(QW).should_have_method('noConflict');

		value_of(QW.PATH).log();
		
	},
	'namespace': function() {
		var a=QW.namespace('.Students');
		a.jk='JK';
		value_of(QW.Students.jk).should_be('JK');

		var b=QW.namespace('QW.Students');
		value_of(QW.Students.jk).should_be('JK');
		
		delete QW.Students;
	}
});

})();