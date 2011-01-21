
(function(){
var FunctionH=QW.FunctionH,ObjectH=QW.ObjectH;
//JK begin-----
describe('FunctionH', {
	'FunctionH Members': function() {
		value_of('测试FunctionH拥有的属性').log();
	},

	'bind': function() {
		var bind = FunctionH.bind;

		var test=function(){
			return this.length;
		};
		var testHello = bind(test,'hello');
		value_of(testHello()).should_be(5);

		x = 9,  //window.x
			module = {
				getX: function(){
					return this.x;
				},
				x:81
			};
		
		value_of(module.getX()).should_be(81);
		var getX = module.getX;
		value_of(getX()).should_be(9);

		var boundGetX = bind(getX, module);
		value_of(boundGetX()).should_be(81);
		
		function List(){
			var a = [];

			for(var i = 0; i < arguments.length; i++){
				a.push(arguments[i]);
			}

			return a;
		}

		var listOne = List(1,2,3);

		value_of(listOne).log();
		
		var leadingZeroList = bind(List, null, 0);
		
		value_of(leadingZeroList()).log();
		value_of(leadingZeroList(1)).log();
		value_of(leadingZeroList(1,2)).log();

		value_of(leadingZeroList(1,2)).should_have_property(0);

		function Point(x,y){
			this.x = x;
			this.y = y;
		}

		Point.prototype.toString = function(){
			return this.x + "," + this.y;
		};
		
		var p = new Point(1,2);

		value_of(p.toString()).should_be("1,2");

		var YAxisPoint = bind(Point, null, 0 /*x=0*/);

		var axisPoint = new YAxisPoint(5);

		value_of(axisPoint.toString()).should_be("0,5");

		value_of(axisPoint instanceof Point).should_be(true);
		value_of(axisPoint instanceof YAxisPoint).should_be(true);
		value_of(p instanceof YAxisPoint).should_be(false);
	},	
	'methodize': function() {
		var setName=function(el,name){
			el.name=name;
		};
		var el={};
		el.setName=FunctionH.methodize(setName);
		el.setName('JK');
		value_of(el.name).should_be('JK');
	},	
	/*'unmethodize': function(){
		var setName=FunctionH.unmethodize(
			function(name){
				this.name=name;
			}
		);
		var el={};
		setName(el,'JK');
		value_of(el.name).should_be('JK');
	},*/
	'mul': function(){
		var setName=function(el,name){
			el.name=name;
		};
		var setElsName=FunctionH.mul(setName);
		var els=[{},{}];
		setElsName(els,'JK');
		value_of(els[0].name).should_be('JK');
		value_of(els[1].name).should_be('JK');

		var numbers=[1,2,3,4];
		var pair = function(x){
		    return [x, -x];
		}
		var pairAll = FunctionH.mul(pair); //非扁平化
		numbers = pairAll(numbers);
		value_of(numbers[1][0]).should_be(2);
		value_of(numbers[1][1]).should_be(-2);

		var numbers=[1,2,3,4];
		var pairAllFlat = FunctionH.mul(pair,2); //扁平化
		numbers = pairAllFlat(numbers);
		value_of(numbers[1]).should_be(-1);
		value_of(numbers[2]).should_be(2);
	},
	/*'rwrap': function(){
		function Wrap(core){this.core=core};
		var setName = function(el,name){
			el.name=name;
		}
		var setNameRWrap=FunctionH.rwrap(setName,Wrap,0);
		var el={};
		var elw=setNameRWrap(el,'JK');
		value_of(elw.core).should_be(el);	
		value_of(el.name).should_be('JK');	
	},


	'defer': function(){
		var a = FunctionH.defer(function(x,y){
			//alert(x+y);
		});

		var id = a(1000,10,20);
		value_of(id).log();
	},


	'currying': function(){
		String.prototype.splitBySpace = FunctionH.curry(String.prototype.split,[' ']);

		value_of("a b c".splitBySpace()).log();

		var f = FunctionH.curry(function(a,b,c,d){
			return [a,b,c,d];
		},[1,,3]);

		value_of(f(2,4)).log();
	},

	'overload': function(){
		var f = FunctionH.overload(
			function(){return "..."},
			{
				"number" : function(a){
					return "number";
				},
				"string,..." : function(a){
					return "string,...";
				},
				"string" : function(a){
					return "string";
				},
				"*,string" : function(a,b){
					return ",string";
				},
				"...,string" : function(a,b){
					return "...,string";
				},
				"number,number,?...": function(a,b){
					return "number, number, ?...";
				}
			}
		);
		value_of(f(10)).log();
		value_of(f("a")).log();
		value_of(f(10,"a")).log();
		value_of(f(10,10,"a")).log();
		value_of(f("a",10)).log();
		value_of(f(10,10)).log();
		value_of(f(10,10,"string",10)).log();
		
		var g = FunctionH.overload(
			function(){
				return "...";
			},
			{
				"b is number" : function(a,b,c){
					return "b is number";
				},
				"b is string" : function(a,b,c){
					return "b is string";
				}
			},			
			function(args){ //dispatcher
				return "b is " + typeof(args[1]);
			}
		);
		value_of(g(1,2,3)).log();
		value_of(g(1,"2",3)).log();

	}*/
});

})();