
(function(){
var ObjectH=QW.ObjectH;
describe('ObjectH', {
	'ObjectH Members': function() {
		value_of('测试FunctionH拥有的属性').log();
	},
	'Object': function(){
		var a = {x:1, y:2, z:3};

		value_of(ObjectH.keys(a)).log("keys");
		value_of(ObjectH.values(a)).log("values");

		var b = ObjectH.flatCopy(a);
		value_of(b).log("copied");
	},
	'getType': function() {
		value_of(ObjectH.getType(null)).should_be("null"); //null
		value_of(ObjectH.getType(undefined)).should_be("undefined"); //undefined
		value_of(ObjectH.getType("")).should_be("string"); //string
		value_of(ObjectH.getType([])).should_be("array"); //array
		value_of(ObjectH.getType(true)).should_be("boolean"); //boolean
		value_of(ObjectH.getType({})).should_be("object"); //object
		value_of(ObjectH.getType(new Date())).should_be("date"); //date
		//value_of(ObjectH.getType(/a/)).should_be("regexp"); //regexp//在Chrome/Safari下，这个type是function
		value_of(ObjectH.getType({}.constructor)).should_be("function"); //function	
	},	
	'mix': function() {
		var el={};
		ObjectH.mix(el,{name:'JK'});
		value_of(el.name).should_be('JK');
		ObjectH.mix(el,{name:'Tom'});
		value_of(el.name).should_be('JK');
		ObjectH.mix(el,{name:'Tom'},true);
		value_of(el.name).should_be('Tom');
	},	
	'dump': function(){
		var a = ObjectH.dump({x:1, y:2, z:3},["x","y"]);
		value_of(a.x).should_be(1);
		value_of(a.z).should_be(undefined);
		var el={name:'JK',age:100};
		var el2={name:'Tom'};
		var el3=ObjectH.dump(el,['name']);
		value_of(el3.name).should_be('JK');
		value_of(el3.age).should_be(undefined);

		ObjectH.dump(el,['name'],el2);
		value_of(el2.name).should_be('Tom');
		ObjectH.dump(el,['name'],el2,true);
		value_of(el3.name).should_be('JK');
	},
	'keys': function(){
		var el={name:'JK',age:100};
		value_of(ObjectH.keys(el)).property_should_be('length',2);
	},
	'setEx': function(){
		var el={name:'JK',age:100,friend:{}};
		ObjectH.setEx(el,'friend.name','Tom');
		value_of(el.friend.name).should_be('Tom');
	},
	'getEx': function(){
		var el={name:'JK',age:100,friend:{}};
		value_of(ObjectH.getEx(el,'name')).should_be('JK');
	},
	'setEx & getEx & dump & fold & expand': function(){
		var el={id:"ok",style:{},firstChild:{}};
		ObjectH.setEx(el,"id","aaaa");
		ObjectH.setEx(el,{className:"cn1", 
			"style.display":"block",
			"style.width":"8px"
		});
		ObjectH.setEx(el.style, ["width", "hehigth"], ["100px","110px"]);	
		value_of(el).log();

		var a = ObjectH.getEx(el,"style"); 
		var b = ObjectH.getEx(el,"style.display"); 
		var c = ObjectH.getEx(el,["id","className"]); 
		var d = ObjectH.getEx(el,["style.display", "className"]); 
		var e = ObjectH.getEx([1,2,3,4,5,6,7,8],[0,2,4,6]);

		value_of(a).log();
		value_of(b).log();
		value_of(c).log();
		value_of(d).log();
		value_of(e).log();

		var f = ObjectH.dump(el, ["style.display", "className"]);
		value_of(f).log();
		value_of(ObjectH.fold(f)).log();
		value_of(ObjectH.expand(el)).log();
	},
	'stringify': function(){
		var json={"cardNo":"bbbb1234","history":[1,2]};
		value_of(ObjectH.stringify(json)).should_be('{"cardNo":"bbbb1234","history":[1,2]}');
	}
});

})();