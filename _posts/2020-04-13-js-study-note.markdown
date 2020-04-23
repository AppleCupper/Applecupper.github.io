---
layout: post
title:  "ES5学习笔记（一）"
categories: js
tags: js study
author: 果果
description: The more study,the more notes.
---
JS作为一直在用的工具，虽然不是我的主业，但是每每用到总是如鲠在喉，自己写的代码感觉冗余率高，没有高效的解决工作。再次，认认真真学习了一下ES5，虽然有点过时，那就作为学习ES6的前置动作吧。

下文只作为个人笔记，记录常见，但是不为我所知的内容。

#### ES和JS的关系

ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。

#### JS变量

1.变量的提升，JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。所有声明的变量会被提升到头部。

    var a;
    console.log(a);
    a = 1;
    //undefined

2.html注释在js里也属于合法注释；

3.标签label，可以用在循环语句里面和break和continue配合使用，跳出多重循环

    top:
      for (var i = 0; i < 3; i++){
        for (var j = 0; j < 3; j++){
          if (i === 1 && j === 1) break top;
          console.log('i=' + i + ', j=' + j);
        }
      }

也可以用于跳出代码块，有点类似于goto的使用：

    foo: {
      console.log(1);
      break foo;
      console.log('本行不会输出');
    }
    console.log(2);

#### 数据类型概述

1.typeof \ instanceof \ Object.prototype.toString 判断数据类型

typeof 数值、字符串、布尔值分别返回number、string、boolean；
函数返回function；undefined返回undefined；[]和{}返回object；null返回object；

instanceof可以区分对象和数组

2.Number(undefined)//NaN , Number(null)//0

3.praseInt()字符串转化为数组，可以转化进制，parseFloat()转化浮点数

4.利用注释变通法输出多行字符串

    (function () { /*
    line 1
    line 2
    line 3
    */}).toString().split('\n').slice(1, -1).join('\n')
   
5.字符串可以用数组方式操作，拥有length属性不可改变

**6.**base64转码方式

    //ASCII码不能用
    btoa(string);
    atob(base64_string);
    function b64Encode(str) {
      return btoa(encodeURIComponent(str));
    }
    function b64Decode(str) {
      return decodeURIComponent(atob(str));
    }

7.代码块还是表达式，无法确定是对象还是代码块，一律解释为代码块

    eval('{foo: 123}') // 123
    eval('({foo: 123})') // {foo: 123}

**8.**Object.keys(obj).length,可以用这个方式在遍历自己生成的对象提供支持。

9.in操作，使用in操作判断对象里面是否有某个key，以前都是傻傻的用`obj.keys!=undefined`来判断

10.对象遍历，for...in,之前自己不会区分，大部分都在用这个，经常在遍历DOM对象的时候出问题，for..in在遍历数组时会遍历非整数键，不推荐用这个遍历数组。

    for (var key in person) {
      if (person.hasOwnProperty(key)) {
        console.log(key);
      }
    }

11.with可以操作同一对象的多个属性，**with区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。**

    var obj = {};
    with (obj) {
      p1 = 4;
      p2 = 5;
    }

12.函数声明方式

    1.function print(s) {
      console.log(s);
    }
    2.var print = function(s) {
      console.log(s);
    };
    3.var print = function x(){//x仅能内部使用
      console.log(typeof x);
    };
    4.var f = function f() {};//和第一种的区别在于分号

函数声明可以多次，后面覆盖前面的，函数名也会提升。

    {
        f();
        var f = function (){};
    }
    ===//这2种等价
    {
        var f;
        f();
        f = function () {};
    }

13.函数的属性，name , length(传参的个数) , toString(源码)

14.传参对象arguments，函数的传参可以多余默认，也可以少于默认f(a,b)=>使用f(1)||f(1,2,3)

    function f(a, a) {
        console.log(arguments[0]);
    }

15.长得像数组的对象，里面有length属性，这种对象转化为数组去使用

    var args = Array.prototype.slice.call(arguments);//arrayLike to array
    Array.prototype.forEach.call(arrayLike, print);//用数组的方法遍历arrayLike

建议如果需要遍历的话，先转化为数组，再使用forEach遍历，会快一点。

**16.**闭包，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁，用途：

    1.可以读取函数内部的变量
    2.让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在
    3.是封装对象的私有属性和私有方法

**17.**立即调用函数表达式IIFE，分号不可省略

因为`function`写在行首会被认为是函数定义表达式

    (function(){ /* code */ }());
    (function(){ /* code */ })();
    var i = function(){ return 10; }();
    true && function(){ /* code */ }();
    0, function(){ /* code */ }();
    !function () { /* code */ }();
    ~function () { /* code */ }();
    -function () { /* code */ }();
    +function () { /* code */ }();

常用匿名函数来做IIFE，避免污染全局变量

    (function () {
      var tmp = newData;
      processData(tmp);
      storeData(tmp);
    }());

18.数组的length变短可以用来删除数组后面的元素，也可以用来增加后面多个undefined为值的元素

19.数组遍历使用forEach，array.forEach(function(){});

**20.**使用forEach , for..in , Object.keys遍历数组遇到空位都会跳过，也就是说，使用delete删除掉某个数组的内容，就不会遍历到。

数组空位的值相当于undefined，但是不等于undefined，如果值为undefined的话会被遍历到。

21.算数运算符

| 加 | 减 | 乘 | 除 | 指 | 余 |
|----|----|----|----|----|----|
| + | - | * | / | ** | % |

22.将一个值转化为bool值，简便写法

    !!x==Boolean(x)

23.表达式写if语句，这个在php里也可以这么用

    i && doSomething(); //前面是true才会依次执行后面的
    true || (x = 2)  //前面的如果是true,就不会执行后面的

24.二进制~可以2次使用表达取整效果，最快的方式
    
    ~~2.9 //2

25.使用二进制异或可以快速互换2个变量的值

    var a = 10;
    var b = 99;
    a ^= b, b ^= a, a ^= b;

26.使用void实现点击执行操作不跳转

    <a href="javascript: void(document.form.submit())">

27.打印有格式的console.log 

    console.log('%cThis text is styled!','color: red; background: yellow; font-size: 24px;')

28.浏览器命令工具的使用，关于console和一些其他好用的命令

[console对象的使用](https://wangdoc.com/javascript/features/console.html)

#### 标准库，JS内置对象的功能

##### Object 对象

1.object有2种方法，一种是Object原生方法，一种是实例方法可以被实例直接使用。

    Object.print = function (o) { console.log(o) };
    var obj = new Object();
    obj.print() // Object

在`Object.prototype`对象上面的属性和方法，将被所有实例对象共享就可以了

2.Object的静态方法：
    
* Object.keys() //返回可枚举的属性名
* Object.getOwnPropertyNames() //获取自身属性的名称，返回不可枚举的属性名

对象属性模型的相关方法  

* Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
* Object.defineProperty()：通过描述对象，定义某个属性。
* Object.defineProperties()：通过描述对象，定义多个属性。

控制对象状态的方法  

* Object.preventExtensions()：防止对象扩展。
* Object.isExtensible()：判断对象是否可扩展。
* Object.seal()：禁止对象配置。
* Object.isSealed()：判断一个对象是否可配置。
* Object.freeze()：冻结一个对象。
* Object.isFrozen()：判断一个对象是否被冻结。

原型链相关方法

* Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
* Object.getPrototypeOf()：获取对象的Prototype对象。
* Object.setPrototypeOf(a,b)：将a的原型设置为对象b。

3.实例方法，了解这些方法方便修改方法返回值得到想要的内容

* Object.prototype.valueOf()：返回当前对象对应的值。
* Object.prototype.toString()：返回当前对象对应的字符串形式。
* Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
* Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
* Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
* Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举,是否可以遍历。

使用Object.prototype.toString写出一个比typeof运算符更准确的类型判断函数

    //替代typeof
    var type = function (o){
      var s = Object.prototype.toString.call(o);
      return s.match(/\[object (.*?)\]/)[1].toLowerCase();
    };
    //生成type.isNull等属性，返回true||false
    ['Null',
     'Undefined',
     'Object',
     'Array',
     'String',
     'Number',
     'Boolean',
     'Function',
     'RegExp'
    ].forEach(function (t) {
      type['is' + t] = function (o) {
        return type(o) === t.toLowerCase();
      };
    });

4.冻结对象，让对象只读防篡改

* Object.preventExtensions() //使得一个对象无法再添加新的属性
* Object.seal() //使得一个对象既无法添加新属性，也无法删除旧属性
* Object.freeze() //修改属性、新增属性、删除属性都无效了

对应的验证冻结的属性分别是Object.isExtensible() \ Object.isSealed() \ Object.isFrozen()

这里的冻结属于浅冻结，不过目前还没有遇到需要冻结的实例，之后遇到了再说。

##### Array 对象

1.Array.isArray(arr)用来判断数组，代替typeof 的不足

2.arr.push(a,b) , arr.pop() , arr.shift() , arr.unshift(a,b)

* push和pop组成后进先出堆栈
* push和shift组成先进先出队列，同理unshift和pop也可以

3.数组变字符串join和PHP的join功能一样，输入数组返回字符串

    var a = [1, 2, 3, 4];
    a.join(' ') // '1 2 3 4'

4.数组方法

    arr.concat() 用于多数组合并 //返回软拷贝；
    arr.reverse()用于颠倒数组排序 //颠倒排列数组元素；

    arr.slice(start,end) 提取目标数组的一部分 [start,end),省略end直接输出start到最后，
    用于将类数组对象变为真正的数组
    Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })；

    arr.splice(start, count, addElement1, addElement2, ...) 在指定位置start删除部分元素count个，添加新的元素，返回被删除元素，改变原数组
    1.可以用来返回指定区间的元素，截取元素，获得子数组arr.splice(start,useful)
    2.可以删除数组中不需要的部分arr.splice(start,unused)
    3.可以在数组指定位置插入数值arr.splice(start,0,x1,x2...)
    4.可以将一个数组拆成2个数组，arr.splice(start) =>[1,2],[3,4]

    arr.sort() 默认字典排序，可以自定义，如
    arr.sort(function (a,b){return a-b;}) //返回值大于0，[b,a],数值大的靠后
    arr.sort((a, b) => a - b) //都应该返回数值而不是布尔型

5.可以遍历数组的方法

    arr.map(function (elem,index,arr){retrun elem+1}); 返回新的数组，原数组不变
    回调函数3个传参"元素本身，位置，原数组"
    arr.map(fun,arr2),接受第二个参数来绑定fun里的this变量，即this==arr2

    arr.forEach(function (elem,index.arr))用法和map一样，可没有返回值；
    forEach方法不能中断执行，如希望中断使用for来循环；
    和map一样都会跳过空位

    arr.filter(function (elem,index.arr)) 同上，有第二个参数绑定this。不改变原数组，返回值为true的值，作为新数组的成员返回。

    arr.some(function (elem, index, arr),thisarr) 返回值有一个为true,那么返回值为true
    arr.every(function (elem, index, arr),thisarr) 所有返回值为true,那么返回值为true

    arr.reduce(function (prev,cur,index,arr)) 从左到右遍历,可以把上次计算的结果放在prev里面处理
    arr.reduceRight(function (prev,cur,index,arr))从右到左遍历

    arr.indexOf('b'),arr.lastIndexOf('b') 查找开始的位置，没有返回-1，用来判断数组中是否有某数据

##### Number 对象 

通过`var aaa=new Number(222);`可以生成一个number对象。如果相对数字使用Number对象函数时，数字要加括号。

* (222).toString(n),将10进制数字转化为n进制，10['toString'](2)同理，而parseInt(),是将其他进制转化为10进制
* (10).toFixed(2)，转为指定的小数，保留几位小数，并且四舍五入
* (10).toExponential(n)转为科学计数法，保留0-100位小数
* (12.34).toPrecision(1) 保留几位有效数字，区分toFixed（只保留小数）

可以给Number自定义对象，可以被Number的实例继承，如

    Number.prototype.add = function (x) {
      return this + x;
    };

##### String 对象

静态方法

    String.fromCharCode()可以转换0xFFFF小于这个的编码

实例属性

    'a'.charCodeAt(n) 返回第n个位置的Unicode码，大于0xFFFF的必须连续使用2次

    s1.concat(s2,...) 返回连接2个字符串的值,s1保持不变

    str.slice() string是类数组的对象可以使用slice，和数组的用法一样

    str.substring 是加强版的slice，大小可颠倒，负数变为0

    str.substr(start,count) 指定位置截取定长

    str.indexOf(),str.lastIndexOf() 同数组

    str.trim() 去除2端空格符

    toLowerCase()，toUpperCase() 转大小写

下面的参数接受正则

    match()，search()，replace(old,new) 匹配match返回非null，search返回非-1，replace返回替换完的数据

    split() 分割成数组，和join相反

##### math 对象

这些方法都要Math.开头

| 绝对值 | 向上取整 | 向下取整 | 最大值 | 最小值 | 幂运算 | 平方根 | 自然对数 | e的指数 | 四舍五入 | 随机数 |
|----|----|----|----|----|----|----|----|----|----|----|
| abs | ceil | floor | max | min | pow | sqrt | log | exp | round | random |

##### Date 对象

Date() 加参数无效，永远返回当前的时间 Wed Apr 15 2020 14:41:26 GMT+0800 (中国标准时间)

new Date() 可以加参数，至少要有表示年月的参数

    new Date('2013-2-15')
    new Date('2013/2/15')
    new Date('02/15/2013')
    new Date('2013-FEB-15')
    new Date('FEB, 15, 2013')
    new Date('FEB 15, 2013')
    new Date('February, 15, 2013')
    new Date('February 15, 2013')
    new Date('15 Feb 2013')
    new Date('15, February, 2013')

Date类型的实例，转化为数字则为到毫秒数的时间戳，转化为字符串为对应日期字符串

    date1-date2//得到数字
    date1+date2//2个字符串的连接

静态方法

Date.now() 返回当前时间戳
Date.parse() 解析日期字符串为时间戳
Date.UTC() 解析为世界标准时间时间戳

**如果前端需要时间的话，不如直接找辅助插件好用，比如moment.js**

##### RegExp对象

新建正则表达式

    var regex = /xyz/i;
    var regex = new RegExp('xyz', 'i');

实例方法：

    /cat/.test('cats and dogs') 返回是否匹配
    r1.exec(s) 返回匹配结果

#### 面向对象

对象是一个容器，封装了属性（property）和方法（method）

JavaScript 语言使用构造函数（constructor）作为对象的模板，构造函数的特点有两个：

* 函数体内部使用了this关键字，代表了所要生成的对象实例。
* 生成对象的时候，必须使用new命令。

例子：建议使用严格模式，如果直接调用构造函数就会报错

    var Vehicle = function (){
      'use strict';
      this.price = 1000;
    };

构造函数里面如果return了一个对象，那么new返回的结果就是这个对象，否则返回this对象

使用new命令时，它后面的函数依次执行下面的步骤。

  1. 创建一个空对象，作为将要返回的对象实例。
  2. 将这个空对象的原型，指向构造函数的prototype属性。
  3. 将这个空对象赋值给函数内部的this关键字。
  4. 开始执行构造函数内部的代码。

Object.create() 创建实例对象，创建的对象继承原来的属性和方法

##### 绑定this的方法call、apply、bind

call 的参数应该是一个对象，如果参数为空，null，undefined则默认传入全局对象；
如果传入的参数是number,string..则会转为对应类型的对象

    var n = 123;
    var obj = { n: 456 };

    function a() {
      console.log(this.n);
    }

    a.call(window) // 123
    a.call(obj) // 456

func.call(thisValue, arg1, arg2, ...)可以接受多个参数，后面的参数作为传参传入

func.apply(thisValue, [arg1, arg2, ...])和call不同必须接受一个数组

call和apply和bind是将func里的this绑定到thisValue上，前2个会立即执行，bind需要手动调用才行

**如果需要调用对象里的方法*，必须使用这3个函数或者使用that来改变this的指向，否则，方法里的this可能会指向window**

##### 继承

所有的对象都继承原型对象，prototype存放的是对象的属性，修改它就会改变继承的对象实例。

Object.prototype.constructor=>Object,可以使用constructor在对象的方法中调用自身的构造函数。修改原型函数的时候需要修改constructor的指向。

继承方式：
    
    子类继承父类的实例
    function Rectangle() {
      Shape.call(this); // 调用父类构造函数
    }
    子类继承父类的原型
    Rectangle.prototype = Object.create(Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;
    单个方法的继承
    ClassB.prototype.print = function() {
      ClassA.prototype.print.call(this);
      // some code
    }

多重继承
    
    function M1() {
      this.hello = 'hello';
    }

    function M2() {
      this.world = 'world';
    }

    function S() {
      M1.call(this);
      M2.call(this);
    }

    // 继承 M1
    S.prototype = Object.create(M1.prototype);
    // 继承链上加入 M2
    Object.assign(S.prototype, M2.prototype);

    // 指定构造函数
    S.prototype.constructor = S;

    var s = new S();
    s.hello // 'hello'
    s.world // 'world'














    




