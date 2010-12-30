
(function(){

describe('QW', {
	'QW Members': function() {
		value_of("测试QW拥有的属性").log();

		value_of(QW.ObjectH.isPlainObject(QW)).should_be(true);
		value_of(typeof QW.VERSION).should_be('string');
		value_of(typeof QW.RELEASE).should_be('string');

		value_of("测试QW拥有的方法").log();

		value_of(QW).should_have_method('provide');
		value_of(QW).should_have_method('noConflict');

		value_of(QW.PATH).log();
		
	},
	'QW.provide': function(){
		value_of("QW.provide向QW provide变量").log();

		QW.provide("testtest1",'value1');
		value_of(QW.testtest1).should_be("value1");
		QW.provide({testtest2:'value2'});
		value_of(QW.testtest2).should_be("value2");
	}
});

})();