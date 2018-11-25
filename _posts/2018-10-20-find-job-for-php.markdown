---
layout: post
title:  "面试小计"
categories: study class
tags: php
author: 果果
description: I want to find the lighting further.
---

从8月20到现在10月20已经整整2个月了，面试了大概10个左右的单位吧，效率有点低。个人也是不怎么成熟去应对这些，从知识层次，面试经历，面前准备都做得不是很好。给自己总结一下把。好久之前的东西了，好多东西都不是记在脑子里，面试的时候真的很麻烦哎。很多都是很简单的问题，不过这都成为过去式了，好好工作吧！

小目录：

1.面试经历知识总结<br>
2.网上搜索来的面试相关知识

## 面试经历知识总结
	
### 自己遇到的面试问题

	索引的数据结构
	反向代理或者负载均衡的配置
	explain mysql的具体结果
	数据表分区具体如何实现
	如何查看SQL是否使用索引 explain

#### PHP

1.经常栽在这个上面，时间函数

	1.在PHP.INI中设置时区，date.timezone = PRC
	2.在代码中设置时区 
		date_default_timezone_set('Asia/Shanghai');//'Asia/Shanghai' 亚洲/上海   ini_set('date.timezone','Asia/Shanghai');
		date_default_timezone_set('PRC');//其中PRC为“中华人民共和国”   ini_set('date.timezone','PRC');
	3.检查日期的合理性 checkdate(mouth,day,year)
	4.date() 显示服务器时间，将服务器时间格式化 date("Y-m-d H:i:s", xxx) xxx可以换成strtotime( 0 day   -1 mouth); 例如：显示上个月最后一天 date("Y-m-01", strtotime(' -1 mouth'))
	5.获取两个日期之间的天数，$d1=strtotime(d1);$d2=strtotime(d2);abs($d1-$d2)/3600/24;
	6.time返回当前的时间戳，mktime取得一个时间戳mktime(hour,minute,second,mouth,day,year)
	

#### MySQL

**1.地址三级级联**

	问题：表一addr有id name parentid type 4个字段，表二是accout表 id name（人名） country province city4个字段（百秋）
	三级级联查出国省市
	select ad1.name,ad2.name,ad3.name from addr ad1,addr ad2,addr ad3 where ad1.id=ad2.parentid and ad2.id=ad3.parentid(应该是错的，之后在整理)
	已知一个用户查找他城市名字
	select name from addr where id in(select )(好吧，暂时没想好)

## 网上搜索来的面试相关知识

### 考察知识点

#### PHP

	1：变量的传值与引用。
	2：变量的类型转换和判断类型的方法。
	3：PHP运算符优先级，一般是写出运算符的运算结果。
	4：PHP中函数传参，必报，判断输出的echo，print是不是函数等。
	5：PHP数组，数组函数，数组遍历，预定义数组^。
	6：PHP面向对象、魔术方法，封装、继承、多态，设计模式，包括（单利、工厂、迭代器、装饰、命令、策略）。
	7：正则表达式，每个标号含义，邮箱、网址、标签匹配，正则函数^。
	8：PHP异常处理（级别，错误日志，控制错误输出）^。
	9：PHP时间函数，日期计算函数。
	10：文件系统，记录日志、目录、文件的遍历、上传、多方法得到文件扩展名、文件引用方式、引用函数区别^。
	11：会话控制，主要说原理。session与cookie在分布式应用中出现的问题的解决方案。
	12：PHP模板引擎，常用模板引擎特点，MVC好与不好的地方。
	13：PHP字符串的处理，包括转义（安全）、编码、截取、定位、与数组件的转换、处理函数等^。
	14:MXL的应用。
	15：PHP安全处理，过滤函数。
	16：Socket编码，各种协议，head头，curl参数的含义。
	17：网络状态码含义，常用（204,304,404,504,502）。
	18：Apache配置未见，PHP配置文件，各个含义字段的含义。
	19：网络各种攻击的名词含义（SQL攻击、XSS、CSRF、DDos），防止措施。
	20：url的处理函数，得到url指定的部分。
	
#### MySQL基础

	1：基础SQL语句的书写，一般会让写关联查询，或者子查询
	2：索引的创建，优缺点，最左原则
	3：存储殷勤，常用的几个，优缺点，差别，原理^
	4：MySQL处理函数（PHP中封装的）
	5：PDO的使用方法，为什么会使用
	6：SQL注入的处理方法
	7：MySQL的优化，表拆分等
	8：事务处理，SQL语句的处理效率等
	9：数据表字段的类型，同类型间的区别，该如何选取，int(10)与int(11)的区别
	10：数据库索引使用的那种数据结构，画出数据结构
	
#### Linux

	1：常用命令的使用，vim编辑器的使用。
	2：进程，cpu等信息的查看命令。
	3：文件内查看命令（主要涉及统计功能）
	4：shell的使用，命令操作。
	5：awk的用法
	6：shell杀掉所有的php-fpm进程
	
#### nosql

	1：redis的应用场景，结合微博业务说出他的具体应用
	2：Redis与mc支持数据的不同点，两者都支持那些数据结构的存储，写越多越好。
	3：Redis持久化存储的原理，与Mysql的应用区别。怎样保持持久化数据与内存数据同步的关系（Redis同步机制）
	4：Redis与MC在并发状态下的性能比较。
	5：MC的内存管理机制，当一个数据需要存储的时候怎样分配内存空间
	6：Redis的内存管理机制，与MC有哪些不同点。
	
#### 开发环境

	1：PHP7中的新特性与废弃的特性
	2：为什么要使用PHP7，PHP7快在哪里
	3：PHP7中对异常和错误的理解
	
#### 版本控制

	1：git的使用命令，例如：写出版本回退命令。
	2：git与svn的区别。
	3：如何进行多分支开发，包括多人开发协同，分段测试，上线。
	
### 具体的试题

#### PHP部分

**1.HTTP Keep-Alive的作用**

作用：keep-alive：是客户端到服务器端的链接持续有效，当出现对服务器的后继请求是，keep-alive功能避免了建立或者重新简历链接。Web服务器，基本上豆鸡翅HTTP Keep-alive。

缺点：对于提供静态内容的网站来说，这个功能通常很有用。但是，对于负担较重的网站来说，虽然为客户保留打开的链接有一定好处，但是它同样影响了性能，因为在处理暂停期间，本来可以释放的资源仍然被占用。当Web服务器和应用服务器在同一台机器上运行时，Keep-alive功能对资源利用的影响尤其突出。

解决：keep-alive：timeout=5，max=100
timeout：过期时间5秒（对应httpd.conf里的参数是：keepAliveTimeout（），max是最多一百次请求，强制断掉链接。就是在timeout时间内又有新的链接过来，同时max会自动减1，直到0，强制断掉。

**2.PHP数字函数常见的哪些？**

一、数组遍历函数

	1 list();  //不是真正的函数，而是PHP的语言结构，用于给一组变量赋值，仅能用于索引数组
	2 each();  //返回数组当前元素的键值对，并将指针移动到下一个元素位置
	3 while(); //可配合list或each使用：while(list($key, $value) = each($arr)){each $key, $value; }
	
二、数组内部指针控制

	1 current();  //读取指针位置的内容
	2 key();      //读取当前指针指向内容的索引值
	3 next();     //将数组中的内部指针指向下一单元
	4 prev();     //将数组内部指针倒回一位
	5 end();      //将数组内部指针指向最后一个元素
	6 reset();    //将目前指针指向第一个索引位置

三、数组键值操作函数

	1 array_values($arr);       //获得数组的值
	2 array_keys($arr);         //获得数组的键名
	3 array_flip($arr);         //数组中的值与键名互换（如果有重复前面的会被后面的覆盖）
	4 array_search('PHP',$arr); //检索给定的值，加true则是严格类型检查
	5 array_reverse($arr);      //将数组中的元素翻转(前后顺序)
	6 in_array("apple", $arr);  //在数组中检索apple
	7 array_key_exists("apple", $arr); // 检索给定的键名是否存在数组中
	8 array_count_values($arr);        // 统计数组中所有值出现的次数
	9 array_unique($arr);              // 删除数组中重复的值
	
四、数组回调函数

	1 array_filter(); //使用回调函数过滤数组中的元素，如果回调返回true则当前的元素被包含到返回数组中
	2 array_walk();   //回调函数处理数组，自定义函数要有两个参数，本函数第三个参数可以作为回调第三个参数返回
	3 array_map();    //可以处理多个数组，每个数组的长度应该相同，传入数组的个数和回调函数参数个数应该一致

五、数组的分段与填充

	1 array_slice($arr, 0, 3);    //将数组中的一段取出，此函数忽略键名（数组的分段）
	2 array_splice($arr, 0, 3，array("black","maroon"));    //将数组中的一段取出，返回的序列从原数组中删除
	3 array_chunk($arr, 3, TRUE);   //将一个数组分割成多个，TRUE为保留原数组的键名（分割多个数组）
	
六、数组与栈、队列

	1 array_push($arr, "apple", "pear");    //将一个或多个元素压入数组栈的末尾（入栈），返回入栈元素的个数
	2 array_pop($arr);    // 将数组栈的最后一个元素弹出（出栈）
	3 array_shift($arr);   //数组中第一个元素移出并返回（长度减1，其他元素向前移动一位，数字键名改为从零计数，文字键名不变）
	4 array_unshift($arr,"a",array(1,2));  //在数组的开头插入一个或多个元素

七、数组的排序

	1 sort($arr);      //由小到大，忽略键名
	2 rsort($arr);     //由大到小，忽略键名

	3 asort($arr);     //由小到大，保留键名
	4 arsort($arr);    //由大到小，保留键名

	5 ksort($arr);     //按照键名正序排序
	6 krsort($arr);    //按照键名逆序排序
	
八、数组的计算

	1 array_sum($arr);   //对数组内部的所有元素做求和运算（数组元素的求和）
	2 array_merge($arr1, $arr2); //合并两个或多个（相同字符串键名，后面覆盖前面，相同的数字键名，后面的附加到后面）
	3  
	4 array_diff($arr1, $arr2);       //返回差集结果数组   array_diff_assoc($arr1, $arr2, $arr3);  //返回差集结果数组，键名也做比较
	5 array_intersect($arr1, $arr2);  //返回交集结果数组    array_intersect_assoc($arr1, $arr2);   //返回交集结果数组，键名也做比较

九、其他数组函数

	1 array_unique($arr);   //移除数组中重复的值，新的数组中会保留原始的键名
	2 shuffle($arr);        // 将数组的顺序打乱
	
**3.PHP中几个输出函数echo，print，print_r,sprintf,var_dump的区别**

	1：echo：是语句不是函数，没有返回值，可输出多个变量值，不需要圆括号。不能输出数组和对象，只能打印简单类型(如int,string)。

	2：print：是语句不是函数，有返回值 1 ，只能输出一个变量，不需要圆括号。不能输出数组和对象，只能打印简单类型(如int,string)。

	3：print_r：是函数，可以打印复合类型，例如：stirng、int、float、array、object等，输出array时会用结构表示，而且可以通过print_r($str,true)来使print_r不输出而返回print_r处理后的值

	4：printf：是函数，有返回值，返回值是打印内容的长度，把文字格式化以后输出（参看C语言）

	5：sprintf：是函数，跟printf相似，但不打印，而是返回格式化后的文字（该函数把格式化的字符串写写入一个变量中，而不是输出来），其    他的与printf一样。 
	
**4.不用新变量直接交换现有的两个变量的值**

	1： 
		list($a, $b) = array($b, $a);
	2： 
		$a = $a . $b;
		$b = strlen( $b );
		$b = substr( $a, 0, (strlen($a) – $b ) );
		$a = substr( $a, strlen($b) );

	3:(必须用一个两个字符串都都不能出现的字符做为分隔符)
		$a = $b.','.$a ;
		$a = explode(',', $a);
		$b = $a[1];
		$a = $a[0];

	4：这个是当两个数都是数字的时候:
		$a = $a + $b;
		$b = $a – $b;
		$a = $a – $b;

	5：借助数组
		$a = array($a,$b);
		$b = $a[0];
		$a = $a[1];
		
**5.Heredoc**

	Heredoc在正规的PHP文档中和技术书籍中一般没有详细讲述。他是一种Perl风格的字符串输出技术。使用heredoc技术可以实现界面与代码的准分离，比如phpwind模板。

	heredoc的语法是用”<<<”加上自己定义成对的标签，在标签范围內的文字视为一个字符串

	规则如下：

	1、以<<<End开始标记开始，以End结束标记结束，结束标记必须顶头写，不能有缩进和空格，且在结束标记末尾要有分号 。开始标记和开始标记相同，比如常用大写的EOT、EOD、EOF来表示，也可以使用其他标记，只要保证开始标记和结束标记不在正文中出现就行。

	2、位于开始标记和结束标记之间的变量可以被正常解析，但是函数则不可以。
	
**6.写个函数来解决多线程同事读写一个文件的问题**

	<?php
		$fp=fopen(xxx.txt,w+)；
		if(flock($fp,LOCK_EX)){
			fwrite($fp,"xxx");
			flock($fp,LOCK_UN);
		}else{
			echo "Could not lock the file";
		}
		fclose($fp);
		
**7.禁掉cookie的session使用方案，设置session过期的方法，对应函数**

1.通过 url 传值，把session id附加到url上（缺点：整个站点中不能有纯静态页面，因为纯静态页面session id 将无法继续传到下一页面）

2.通过隐藏表单，把session id 放到表单的隐藏文本框中同表单一块提交过去（缺点：不适用<a>标签这种直接跳转的非表单的情况）

3.直接配置php.ini文件,将php.ini文件里的session.use_trans_sid= 0设为1,（好像在win上不支持）
用文件、数据库等形式保存Session ID，在跨页过程中手动调用

**8.json格式数据有哪些特点**	

JSON 一种轻量级的数据交换格式。它基于ECMAScript的一个子集。 JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C、C++、C#、Java、JavaScript、Perl、 Python等）。这些特性使JSON成为理想的数据交换语言。 易于人阅读和编写，同时也易于机器解析和生成(网络传输速率)。

JSON的结构基于下面两点

1. "名称/值"对的集合 不同语言中，它被理解为对象(object)，记录(record)，结构(struct)，字典(dictionary)，哈希表(hash table)，键列表(keyed list)等

2. 值的有序列表 多数语言中被理解为数组(array)

**9.php获取文件内容的方法，对应的函数**	

	1：file_get_contents得到文件的内容（可以以get和post的方式获取），整个文件读入一个字符串中
	2：用fopen打开url, 以get方式获取内容（借助fgets()函数）
	3：用fsockopen函数打开url（可以以get和post的方式获取），以get方式获取完整的数据，包括header和body
	4：使用curl库获取内容，使用curl库之前，需要查看php.ini，查看是否已经打开了curl扩展
	
**10.php魔术方法与魔术常量**

	类方法：
	1、__construct(); 
	　　说明：具有构造函数的类会在每次创建新对象时先调用此方法，适合在使用对象之前做一些初始化工作。如果子类中定义了构造函数则不会隐式调用其父类的构造函数。要执行父类的构造函数，需要在子类的构造函数中调用 parent::__construct()。如果子类没有定义构造函数则会如同一个普通的类方法一样从父类继承。
	2、__destruct(); 
	　　说明：析构函数会在到某个对象的所有引用都被删除或者当对象被显式销毁时执行。
	 
	方法重载：
	3、__call();
	　　说明：在对象中调用一个不可访问方法时，__call(); 方法会被调用。
	4、__callStatic();
	　　说明：用静态方式中调用一个不可访问方法时，__callStatic(); 方法会被调用。
	 
	属性重载：(只对类中私有受保护的成员属性有效)
	5、__get();
	　　说明：读取不可访问属性的值时，__get() 会被调用。
	6、__set();
	　　说明：在给不可访问属性赋值时，__set() 会被调用。
	7、__isset();
	　　说明：当对不可访问属性调用 isset() 或 empty() 时，__isset() 会被调用。
	8、__unset();
	　　说明：当对不可访问属性调用 unset() 时，__unset() 会被调用。
	 
	序列化相关：
	9、__sleep();
	　　说明：序列化时调用，serialize() 函数会检查类中是否存在该魔术方法。如果存在，该方法会先被调用，然后才执行序列化操作。
	10、__wakeup();
	　　说明：unserialize() 会检查是否存在一个 __wakeup() 方法。如果存在，则会先调用该方法，用在反序列化操作中，例如重新建立数据库连接，或执行其它初始化操作
	 
	操作类和对象方法：
	11、__toString();
	　　说明：方法用于一个类被当成字符串时调用，例如把一个类当做字符串进行输出
	12、__invoke()；
	　　说明：当尝试以调用函数的方式调用一个对象时，__invoke() 方法会被自动调用。
	13、__set_state()；
	　　说明：当调用 var_export() 导出类时，此静态 方法会被调用。 本方法的唯一参数是一个数组
	14、__clone();
	　　说明：当复制完成时，如果定义了 __clone() 方法，则新创建的对象（复制生成的对象）中的 __clone() 方法会被调用，可用于修改属性的值。
	15、__autoload();
	　　说明：该方法可以自动实例化需要的类。当程序要用一个类但没有被实例化时，改方法在指定路径下查找和该类名称相同的文件。否则报错。
	16 __debugInfo();
	　　说明：php5.6增加的特性，var_dump()一个类时触发，返回一个包含对象属性的数组
	　　
	说明：PHP 将所有以 __（两个下划线）开头的类方法保留为魔术方法。所以在定义类方法时，除了上述魔术方法，建议不要以 __ 为前缀。在命名自己的类方法时不能使用这些方法名，除非是想使用其魔术功能。
	 
	常量：
	__LINK__      //文件中的当前行号。
	__FILE__       //文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。
	__DIR__       //文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录，它等价于 dirname(__FILE__)。
	 
	__FUNCTION__       //函数名称。自 PHP 5 起本常量返回该函数被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。
	__CLASS__              //类的名称。自 PHP 5 起本常量返回该类被定义时的名字（区分大小写）。在 PHP 4 中该值总是小写字母的。
	__METHOD__         //类的方法名（PHP 5.0.0 新加）。返回该方法被定义时的名字（区分大小写）。
	__NAMESPACE__   //当前命名空间的名称（大小写敏感）。这个常量是在编译时定义的（PHP 5.3.0 新增）
	 
**11.PHP 如何获取客户端的IP地址**	 

用$_SERVER获取的IP地址有什么问题？

$_SERVER['REMOTE_ADDR'] ;   通过全局数组来获得 

getenv('REMOTE_ADDR') ; 通过环境变量来获得

当客户机使用代理的时候获取不到真实的IP地址

**12.写一个函数，可以遍历文件夹下的所有文件和文件夹**	 

	<php
		function get_dir_info($path){
			$handle=opendir($path);
			while(($content=readdir($handle))!==false){
				$new_dir=$path.DIRECTORY_SEPARATOR.$content;
				if($content!='..'&&$content!='.'){
					if(is_dir($new_dir)){
						echo "目录";
						get_dir_info($new_dir);
					}else{
						echo "文件";
					}
				}
			}
		}	
		
**13.PHP缓存技术有哪些? tp是局部还是完全缓存?**	

	1. 全页面静态化缓存，也就是将页面全部生成html静态页面，用户访问时直接访问的静态页面，而不会去走php服务器解析的流程
	2. 页面部分缓存，将一个页面中不经常变的部分进行静态缓存，而经常变化的块不缓存，最后组装在一起显示
	3. 数据缓存，通过一个id进行请求的数据,将数据缓存到一个php文件中,id和文件是对应的,下次通过这个id进行请求时 直接读php文件
	4. 查询缓存，和数据缓存差不多,根据查询语句进行缓存;
	5. 常用的缓存技术有：redis和memcache
	个人认为tp应该是全局缓存 因为：tp缓存实在本地生成一个php文件来存储数据库中读取出来的数据
	
**14.strlen()与mb_strlen的作用与区别**	

在PHP中，strlen与mb_strlen是求字符串长度的函数
PHP内置的字符串长度函数strlen无法正确处理中文字符串，它得到的只是字符串所占的字节数。对于GB2312的中文编码，strlen得到的值是汉字个数的2倍，而对于UTF-8编码的中文，就是3倍（在 UTF-8编码下，一个汉字占3个字节）。
 
采用mb_strlen函数可以较好地解决这个问题。mb_strlen的用法和strlen类似，只不过它有第二个可选参数用于指定字符编码。例如得到UTF-8的字符串str长度，可以用mbstrlen(str,'UTF-8')。如果省略第二个参数，则会使用PHP的内部编码。内部编码可以通过 mb_internal_encoding()函数得到。

需要注意的是，mb_strlen并不是PHP核心函数，使用前需要确保在php.ini中加载了php_mbstring.dll，即确保“extension=php_mbstring.dll”这一行存在并且没有被注释掉，否则会出现未定义函 数的问题。

**15.写一个函数，尽可能高效的从一个标准url中取出扩展名**	

	$arr = parse_url('http://www.sina.com.cn/abc/de/fg.php?id=1');
	result=pathinfo(arr['path']);var_dump($arr);
	var_dump($result['extension']);
	
**16.php.ini 中safe mod关闭 影响哪些函数和参数，至少写6个**	

	move_uploaded_file()        exec()
	system()                              passthru()
	popen()                              fopen()
	mkdir()                               rmdir()
	rename()                            unlink()
	copy()                                 chgrp()
	chown()                              chmod()
	touch()                               symlink()
	link()                                   parse_ini_file()
	set_time_limit()                  max_execution_time mail()
	
**17.约瑟夫环**	

	<？php
	function fuhuan($allnum, $ti){
		$arr=range(0,$allnum);
	
		$nums = 1;
		while(count($arr) > 1){
			foreach ($arr as $key => $value) {
				if($nums == $ti){
					unset($arr[$key]);
					$nums = 1;
				}else{
					$nums++;
				}
			}
		}
		$new_arr = array_values($arr);
		var_dump($new_arr[0] + 1);
	}
	
**18.isset() 、empty()与is_null的区别**	

	1、当变量未定义时，is_null() 和“参数本身”是不允许作为参数判断的，会报Notice警告错误；

	2、empty , isset首先都会检查变量是否存在，然后对变量值进行检测。而is_null 和 “参数本身”只是直接检查变量值，是否为null，因此如果变量未定义就会出现错误！

	3、isset()：仅当null和未定义，返回false；

	4、empty()：""、0、"0"、NULL、FALSE、array(),未定义，均返回true；

	5、is_null()：仅判断是否为null，未定义报警告；

	6、变量本身作为参数，与empty()一致，但接受未定义变量时，报警告；
	
**19.求两个文件的相对路径(这题没什么实际意义)**	

	getpath('/a/b/c/d/e.php', '/a/d/12/34/c.php');
  
	public function getpath($a, $b)
	{
		 $aarr = explode('/', $a);
		 $barr = explode('/', $b);
		 $count = count($barr) - 2;
		 $pathinfo = '';
		 for($i = 1; $i <= $count; $i++){
			 if($aarr[$i] == $barr[$i]){
				  $pathinfo .= '../';
			 }else{
				  $pathinfo .= $barr[$i] . '/';
			 }
		 }
		 echo $pathinfo;
	}
	
**20.MVC的优缺点**

1、 MVC的优点 
	（1） 可以为一个模型在运行时同时建立和使用多个视图。变化-传播机制可以确保所有相关的视图及时得到模型数据变化，从而使所有关联的视图和控制器做到行为同步。 
	（2） 视图与控制器的可接插性，允许更换视图和控制器对象，而且可以根据需求动态的打开或关闭、甚至在运行期间进行对象替换。 
	（3） 模型的可移植性。因为模型是独立于视图的，所以可以把一个模型独立地移植到新的平台工作。需要做的只是在新平台上对视图和控制器进行新的修改。 
	（4） 潜在的框架结构。可以基于此模型建立应用程序框架，不仅仅是用在设计界面的设计中。 
2、 MVC的不足之处 
	（1） 增加了系统结构和实现的复杂性。对于简单的界面，严格遵循MVC，使模型、视图与控制器分离，会增加结构的复杂性，并可能产生过多的更新操作，降低运行效率。 
	（2） 视图与控制器间的过于紧密的连接。视图与控制器是相互分离，但确实联系紧密的部件，视图没有控制器的存在，其应用是很有限的，反之亦然，这样就妨碍了他们的独立重用。 
	（3） 视图对模型数据的低效率访问。依据模型操作接口的不同，视图可能需要多次调用才能获得足够的显示数据。对未变化数据的不必要的频繁访问，也将损害操作性能。 
	（4） 目前，一般高级的界面工具或构造器不支持MVC模式。改造这些工具以适应MVC需要和建立分离的部件的代价是很高的，从而造成使用MVC的困难。 	
	
**21.session与cookie的联系和区别（运行机制），session共享问题解决方案**

区别与联系：

使用session_start()调用session，服务器端在生成session文件的同时生成session ID哈希值和默认值为PHPSESSID的session name，并向客户端发送变量为PHPSESSID(session name)(默认)值为一个128位的哈希值。服务器端将通过该cookie与客户端进行交互，session变量的值经php内部系列化后保存在服务器 机器上的文本文件中，和客户端的变量名默认情况下为PHPSESSID的coolie进行对应交互，即服务器自动发送了http 头:header(‘Set-Cookie: session_name()=session_id(); path=/’);即setcookie(session_name(),session_id());当从该页跳转到的新页面并调用 session_start()后,PHP将检查与给定ID相关联的服务器端存贮的session数据，如果没找到则新建一个数据集。
	
共享方案：
1：使用数据库保存session， 使用数据库来保存session，就算服务器宕机了也没事，session照样在。
问题：程序需要定制；每次请求都进行数据库读写开销不小，另外数据库是一个单点，可以做数据库的hash来解 决这个问题。       

2：使用 memcached来保存session， 这种方式跟数据库类似，内存存取性能比数据库好很多。

问题：程序需要定制，增加了工作量；存入memcached中的数据都需要序列化，效率较低，断电或者重启电脑容易丢失数据；

3：通过加密的cookie，在A服务器上登录，在用户的浏览器上添加加密的cookie，当用户访问B服务器时，检查有无Session，如果没有，就检验Cookie是否有效，Cookie有效的话就在B服务器上重建session。简单，高效，服务器的压力减小了，因为session数据不存在服务器磁盘上。根本就不会出现session读取不到的问题。

问题：网络请求占用很多。每次请求时，客户端都要通过cookie发送session数据给服务器，session中数据不能太多，浏览器对cookie的大小存在限制。不适合高访问量的情况，因为高访问量的情况下。	

**22.正则表达式**

正则表达式一定要会, 通过正则表达式能很容易的看出一个人的基础

	匹配中文字符的正则表达式： [\u4e00-\u9fa5] 
	匹配双字节字符(包括汉字在内)：[^\x00-\xff] 
	匹配空行的正则表达式：\n[\s| ]*\r <br>
	匹配HTML标记的正则表达式：/<(.*)>.*<\/\1>|<(.*) \/>/ 
	匹配首尾空格的正则表达式：(^\s*)|(\s*$) 
	匹配Email地址的正则表达式：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 
	匹配网址URL的正则表达式：^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$ 
	匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 
	匹配国内电话号码：(\d{3}-|\d{4}-)?(\d{8}|\d{7})? 
	匹配腾讯QQ号：^[1-9]*[1-9][0-9]*$ 	

**23.写一个函数得到header头信息**

	function getHeader()
	{
		$headers = [];
		if (function_exists('getallheaders')) {
			$headers = getallheaders();
		} elseif (function_exists('http_get_request_headers')) {
			$headers = http_get_request_headers();
		} else {
			foreach ($_SERVER as $key => $value) {
				if(strstr($key, 'HTTP_')) {
					$newk = ucwords(strtolower(str_replace('_', '-', substr($key, 5))));
					$headers[$newk] = $value;
				}
			}
		}

		var_dump($headers);
	}
	
#### MySQL部分

1、select * from table where (ID = 10)  or (ID = 32) or (ID = 22)  让结果按10, 32, 22的顺序检索出来？

	Select *
	from user_info
	Where (ID IN (10, 32, 22))

	order BY FIND_IN_SET(ID, '10, 32, 22')
	
#### linux部分

[直接看连接吧，不想复制了](https://www.cnblogs.com/zyf-zhaoyafei/p/4828358.html#tree1)