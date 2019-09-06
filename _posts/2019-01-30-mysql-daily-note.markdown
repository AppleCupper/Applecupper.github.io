---
layout: post
title:  "mysql的日常笔记"
categories: mysql daily 
tags: mysql note
author: 果果
description: To get more knowledge.
---
数据库常用操作
___
很多数据库的操作都是重复的，无法避免的使用sql语句，为什么不记下来呢，方便又好用。还能巩固记忆，一举多得。:smile:感觉基本是在抄w3c，抄就抄吧，总能记点东西。

### 数据库点滴积累

#### 新建数据库配置

	mysqld.conf
	sql_mode = "STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"

	SELECT @@GLOBAL.sql_mode;
	set GLOBAL sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION ';

	SELECT @@SESSION.sql_mode;
	set SESSION sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION ';

	STRICT_TRANS_TABLES： 在该模式下，如果一个值不能插入到一个事务表中，则中断当前的操作，对非事务表不做限制
	NO_ZERO_IN_DATE： 在严格模式下，不允许日期和月份为零
	NO_ZERO_DATE： 设置该值，mysql数据库不允许插入零日期，插入零日期会抛出错误而不是警告。
	ERROR_FOR_DIVISION_BY_ZERO：在INSERT或UPDATE过程中，如果数据被零除，则产生错误而非警告。如 果未给出该模式，那么数据被零除时MySQL返回NULL
	NO_AUTO_CREATE_USER： 禁止GRANT创建密码为空的用户
	NO_ENGINE_SUBSTITUTION： 如果需要的存储引擎被禁用或未编译，那么抛出错误。不设置此值时，用默认的存储引擎替代，并抛出一个异常
	PIPES_AS_CONCAT： 将"||"视为字符串的连接操作符而非或运算符，这和Oracle数据库是一样的，也和字符串的拼接函数Concat相类似
	ANSI_QUOTES： 启用ANSI_QUOTES后，不能用双引号来引用字符串，因为它被解释为识别符
	NO_AUTO_VALUE_ON_ZERO： 该值影响自增长列的插入。默认设置下，插入0或NULL代表生成下一个自增长值。如果用户 希望插入的值为0，而该列又是自增长的，那么这个选项就有用了。

#### replace into语句

replace into 跟 insert 功能类似，不同点在于：replace into 首先尝试插入数据到表中， 1. 如果发现表中已经有此行数据（根据主键或者唯一索引判断）则先删除此行数据，然后插入新的数据。 2. 否则，直接插入新数据。

要注意的是：插入数据的表必须有主键或者是唯一索引！否则的话，replace into 会直接插入数据，这将导致表中出现重复的数据。

	MySQL replace into 有三种形式：
	1. replace into tbl_name(col_name, ...) values(...)
	2. replace into tbl_name(col_name, ...) select ...
	3. replace into tbl_name set col_name=value, ...

第一种形式类似于insert into的用法，

第二种replace select的用法也类似于insert select，这种用法并不一定要求列名匹配，事实上，MYSQL甚至不关心select返回的列名，它需要的是列的位置。例如，replace into tb1( name, title, mood) select rname, rtitle, rmood from tb2;?这个例子使用replace into从?tb2中将所有数据导入tb1中。

第三种replace set用法类似于update set用法，使用一个例如“SET col_name = col_name + 1”的赋值，则对位于右侧的列名称的引用会被作为DEFAULT(col_name)处理。因此，该赋值相当于SET col_name = DEFAULT(col_name) + 1

#### 数据库按照指定顺序排序

    order by FIELD(value ,order1,order2,order3...)

#### 查找json内部字段

    select param->$.type as type...

#### case when语句使用

可以用来将同一列的不同数据分列，也可以生成数字值用来排序

    select 
        case type
            when 1 then 'a'
            when 2 then 'b'
            else result
        end

    例：
    select uid，
        sum(case cse_name where '数学' then `score` else 0 end) math,
        sum(case cse_name where '英语' then `score` else 0 end) english,
        sum(case cse_name where '语文' then `score` else 0 end) chinese,
    from
        course
    group by 
        uid


### 导入导出数据库也很常用啊

导出：
    
    SELECT ... INTO OUTFILE：和LOAD DATA INFILE互逆

    mysql>select * from table into outfile '/root/dir/file.txt'将数据导出到文件

    mysql>select * from table into outfile '/root/dir/file.txt'
        ->fields terminated by ',' enclosed by '"'
        ->lines terminated by '\r\n';//将数据导出为csv格式

    mysqldump：

    $ mysqldump -u root -p --no-create-info \ --tab=/tmp RUNOOB runoob_tbl

    $ mysqldump -u root -p database table > dump.sql 导出表和数据
    password ******

    $ mysqldump -u root -p -d database table > dump.sql 仅仅导出表结构
    password ******

    $ mysqldump -u root -p RUNOOB > database_dump.txt //导出整个数据库数据
    password ******

    $ mysqldump -u root -p --all-databases > database_dump.txt 
    password ******             //备份数据库策略

导入：

    1、mysql 命令导入
    $ mysql -uroot -p123456 < runoob.sql

    2、source 命令导入
    mysql> use database;
    mysql> source /home/abc/abc.sql

    3、使用 LOAD DATA 导入数据,指定LOCAL关键词，则表明从客户主机上按路径读取文件,没有指定，则文件在服务器上按路径读取文件。
    mysql> LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl;

    mysql> LOAD DATA LOCAL INFILE 'dump.txt' INTO TABLE mytbl
      -> FIELDS TERMINATED BY ':'
      -> LINES TERMINATED BY '\r\n';

    mysql> LOAD DATA LOCAL INFILE 'dump.txt' //指定插入顺序
    -> INTO TABLE mytbl (b, c, a);

    4、使用 mysqlimport 导入数据
    $ mysqlimport -u root -p --local database_name dump.txt
    password *****

    $ mysqlimport -u root -p --local --fields-terminated-by=":" \
    --lines-terminated-by="\r\n"  database_name dump.txt
    password *****

    $ mysqlimport -u root -p --local --columns=b,c,a \
    database_name dump.txt
    password *****

### mysql show命令

常用简单的问题：

    show databases,show tables,show columns from table,show index from table

    查询问题3剑客
    show profile(s);默认关闭需要打开set profiling=1;
    show status; -- 显示一些系统特定资源的信息，例如，正在运行的线程数量。
    show processlist; -- 显示系统中正在运行的所有进程

### 删库跑路 Drop、Truncate & delete

删除三兄弟，当不需要一个表的时候就drop；当仍要保留该表，但要删除所有记录是，用truncate；当你要删除部分记录时，用delete。

Drop：删除有外键的关系表时，要先删子表（从表），后删主表
    
    Drop database [if exists] dbname;//删除数据库，判断是否存在，不存在抛出异常
    Drop table [if exists] tbname;//删除数据表
    alter table tbname Drop colname;//删除数据表中的字段
    alert table tbname drop foreign key forkeyname;//删除外键，也要一并删除索引
    alert table tbname drop index forkeyname;//删除外键创建时生成的索引

Truncate：清空表，并让自增id重置,和不加where的delete一样，比delete快

    Truncate table tbname;//表结构及其字段、约束、索引保持不变

Delete:删除操作,删除指定行，特定操作
    
    delete from tbname where key=value;

Drop、Truncate & delete的区别
    
    1.drop语句将删除表的结构、被依赖的约束(constrain)、触发器 (trigger)、索引(index);依赖于该表的存储过程/函数将保留,但是变为invalid状态。   
    2.delete语句是DML语言,这个操作会放在rollback segement中,事物提交后才生效;如果有相应的触发器(trigger),执行的时候将被触发。truncate、drop是DDL语言,操作后即生效,原数据不会放到rollback中,不能回滚,操作不会触发trigger。
    3.效率方面:drop > truncate > delete
    4.TRUNCATE TABLE 不能使用由 FOREIGN KEY束引用的表，不能用于参与了索引视图的表。

### 创建操作造物主 create

创建一个库 create database dbname [character set utf8]；创建一个表 create table tbname；

看起来没什么问题，那我们继续创建一个带列的表

    create table tbname
        (
            col_1 data_type(size),
            col_2 int(10),
            col_3 varchar(255)
        )engine=innodb;//加上表引擎

加一个自增

    create table tbname
        (
            id int not null auto_increment,...

添加约束，创建索引

    create table tbname
        (
            column_name1 data_type(size) constraint_name,
            P_Id int NOT NULL, //不能为NULL
            City varchar(255) DEFAULT 'Sandnes', //创建默认值约束，也可以用系统函数
            UNIQUE (P_Id),      //创建唯一约束
            PRIMARY KEY (P_Id)  //主键约束
            FOREIGN KEY (P_Id) REFERENCES Persons(P_Id) //外键约束
            CHECK (P_Id>0) //check约束列值的范围

查看一个完整点的例子
    
    SET NAMES utf8mb4;
    SET FOREIGN_KEY_CHECKS = 0;
    -- ----------------------------
    -- Table structure for train
    -- ----------------------------
    DROP TABLE IF EXISTS `train`;
    CREATE TABLE `train`  (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `train_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
      `sn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
      `la` float(10, 6) DEFAULT NULL,
      `lo` float(10, 6) DEFAULT NULL,
      PRIMARY KEY (`id`) USING BTREE
    ) ENGINE = InnoDB AUTO_INCREMENT = 83457 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

创建临时表

    CREATE TEMPORARY TABLE SALESSUMMARY (
    -> product_name VARCHAR(50) NOT NULL
    -> , total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00
    -> , avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00
    -> , total_units_sold INT UNSIGNED NOT NULL DEFAULT 0
    );

创建视图

视图可以保存写好的sql语句，起好名字，方便来查询新进来的数据

    CREATE VIEW view_name AS
    SELECT column_name(s)
    FROM table_name
    WHERE condition

    select * from view_name

    create or replace view view_name as...//更新视图

    drop view view_name

### select、insert & update

其实可以把delete放在一起的，但是嘛大同小异，感觉delete还是单独自己个吧，这边主要的小元素都加到select里面，不用写太长

#### 关键字

用关键字来表示甚好，完美。
    
DISTINCT distinct > SELECT DISTINCT 返回不同的值，就是去重

and or not:not->!=作用一样

order by col_1,col2 asc|desc

top,limit,rownum:用于返回指定数量，mysql就是limit

like % _: _表示1个字符，可以表示一个站位或者一个长度 前%不能使用索引

in:子查询in (select ...) in ('xxx','yyy')不是数组奥

between..and:用在比大小间隔挺好，还可以用来等于2个字符串

join left join right join：连表查询没啥

union，union all：union会去重，需要列数一致

as:起一个别名，空一格也能做到

having:筛选分组，聚合函数在having中使用不能再where中使用
>where>聚合函数(sum,min,max,avg,count)>having

#### 各自的例子

>select * from tbname where X=X group by X,y having X>y order by x, y desc limit 1

>update tbname (t1,tbname t2) set col_1=x ...(t1.x=t2.y) where (t1.id=t2.id)

>insert into tbname (x,x,x) values(),(),() //和数据一样可以省略values前括号

### alter一个多功能的啥

感觉alter能做很多事情，什么都可以来插上一脚，大致列一下

使用 ALTER TABLE 在现有的数据表中添加新列的基本语法如下：
>ALTER TABLE table_name ADD column_name datatype;

使用 ALTER TABLE 在现有的数据表中删除列的基本语法如下：
>ALTER TABLE table_name DROP COLUMN column_name;

使用 ALTER TABLE 更改现有的数据表中列的数据类型的基本语法如下：
>ALTER TABLE table_name MODIFY COLUMN column_name datatype;

使用 ALTER TABLE 给某列添加 NOT NULL 约束 的基本语法如下：
>ALTER TABLE table_name MODIFY column_name datatype NOT NULL;

使用 ALTER TABLE 给数据表添加 唯一约束 的基本语法如下：
>ALTER TABLE table_name 
ADD CONSTRAINT MyUniqueConstraint UNIQUE(column1, column2...);

使用 ALTER TABLE 给数据表添加 CHECK 约束 的基本语法如下：
>ALTER TABLE table_name 
ADD CONSTRAINT MyUniqueConstraint CHECK (CONDITION);

使用 ALTER TABLE 从数据表中 删除约束 的基本语法如下：
>ALTER TABLE table_name 
DROP CONSTRAINT MyUniqueConstraint;

如果你在使用 MySQL，代码应当如下：
>ALTER TABLE table_name 
DROP INDEX MyUniqueConstraint;

修改自增id的默认开始值
>alter table users AUTO_INCREMENT=123456

### 不同语句的组合

SELECT INTO  语句从一个表复制数据，然后把数据插入到另一个新表中

    SELECT * INTO newtable [IN externaldb] FROM table1;

INSERT INTO SELECT 语句从表中复制数据，并将数据插入现有的表中。 table2必须存在

    INSERT INTO table2 SELECT * FROM table1;

create....select组合，复制表->可以有选择的复制，但是不能复制主键类自增
    
    create table tbname_bak select * from tbname;

create....like组合，复制表->可以复制主键和自增等，但是不能指定属性

    create table tbname_bak like tbname;

### sql函数

时间函数

    FROM_UNIXTIME(time, "%Y-%m-%d") 将时间戳换位时间
    UNIX_TIMESTAMP - 转化为时间戳，可以用来计算时间前后
    DATE_ADD(date,INTERVAL expr type) 函数向日期添加指定的时间间隔。
    DATE_SUB(date,INTERVAL expr type) 函数向日期减去指定的时间间隔。
        -SELECT OrderId,DATE_ADD(OrderDate,INTERVAL 45 DAY) AS OrderPayDate FROM Orders

    DATEDIFF(date1,date2) 函数返回两个日期之间的天数。
    DATE_FORMAT(date,format) 函数用于以不同的格式显示日期/时间数据。区别FROM_UNIXTIME，一个参数是日期，一个是时间戳

    NOW() 返回当前的日期和时间。
    CURDATE() 返回当前的日期。
    CURTIME() 返回当前的时间。
    SELECT NOW(),CURDATE(),CURTIME()

    DATE() 函数提取日期或日期/时间表达式的日期部分。
    EXTRACT(unit FROM date) 函数用于返回日期/时间的单独部分，比如年、月、日、小时、分钟


常用计算函数，参数是列中取得的参数，返回单个值
    
    AVG() - 返回平均值
    COUNT() - 返回行数
    FIRST() - 返回第一个记录的值
    LAST() - 返回最后一个记录的值
    MAX() - 返回最大值
    MIN() - 返回最小值
    SUM() - 返回总和

根据输入参数返回值

    UCASE() - 将某个字段转换为大写
    LCASE() - 将某个字段转换为小写
    MID(column_name,start[,length]) - 从某个文本字段提取字符
    LEN() - 返回某个文本字段的长度
    ROUND(column_name,decimals) - 对某个数值字段进行指定小数位数的四舍五入
    NOW() - 返回当前的系统日期和时间
    FORMAT(column_name,format) - 格式化某个字段的显示方式

连接函数

    CONCAT('','') 将两个字符串链接成一个字符串，如有任何一个参数为NULL ，则返回值为 NULL。

    CONCAT_WS(separator,str1,str2,...) separator是分隔符，每个链接中都会添加分隔符。如果，分隔符是null返回null，函数忽略分隔符后面任意为null的参数

    group_concat group_concat([DISTINCT] 要连接的字段 [Order BY ASC/DESC 排序字段] [Separator '分隔符'])默认逗号分隔

    repeat() -复制字符串，select repeat('ab',2);->abab

截取字符串

    left(content,length) -left（被截取字段，截取长度） 从左开始截取字符串 
    right(str, length) -right（被截取字段，截取长度） 从右开始截取字符串 
    substring(str, pos,[length]) substring（被截取字段，从第几位开始截取，截取长度)

其他：

    CHARSET() 查出字符类型

更多函数：

[mysql函数](http://www.runoob.com/mysql/mysql-functions.html)

### 通用数据类型

<table class="reference notranslate">
<tbody><tr>
<th width="25%">数据类型</th>
      <th width="75%">描述</th>
    </tr>
<tr>
<td>CHARACTER(n)</td>
      <td>字符/字符串。固定长度 n。</td>
    </tr>
<tr>
<td>VARCHAR(n) 或<br>CHARACTER VARYING(n)</td>
      <td>字符/字符串。可变长度。最大长度 n。</td>
    </tr>
<tr>
<td>BINARY(n)</td>
      <td>二进制串。固定长度 n。</td>
    </tr>
<tr>
<td>BOOLEAN</td>
      <td>存储 TRUE 或 FALSE 值</td>
    </tr>
<tr>
<td>VARBINARY(n) 或<br>BINARY VARYING(n)</td>
      <td>二进制串。可变长度。最大长度 n。</td>
    </tr>
<tr>
<td>INTEGER(p)</td>
      <td>整数值（没有小数点）。精度 p。</td>
    </tr>
<tr>
<td>SMALLINT</td>
      <td>整数值（没有小数点）。精度 5。</td>
    </tr>
<tr>
<td>INTEGER</td>
      <td>整数值（没有小数点）。精度 10。</td>
    </tr>
<tr>
<td>BIGINT</td>
      <td>整数值（没有小数点）。精度 19。</td>
    </tr>
<tr>
<td>DECIMAL(p,s)</td>
      <td>精确数值，精度 p，小数点后位数 s。例如：decimal(5,2) 是一个小数点前有 3 位数小数点后有 2 位数的数字。</td>
    </tr>
<tr>
<td>NUMERIC(p,s)</td>
      <td>精确数值，精度 p，小数点后位数 s。（与 DECIMAL 相同）</td>
    </tr>
<tr>
<td>FLOAT(p)</td>
      <td>近似数值，尾数精度 p。一个采用以 10 为基数的指数计数法的浮点数。该类型的 size 参数由一个指定最小精度的单一数字组成。</td>
    </tr>
<tr>
<td>REAL</td>
      <td>近似数值，尾数精度 7。</td>
    </tr>
<tr>
<td>FLOAT</td>
      <td>近似数值，尾数精度 16。</td>
    </tr>
<tr>
<td>DOUBLE PRECISION</td>
      <td>近似数值，尾数精度 16。</td>
    </tr>
<tr>
<td>DATE</td>
      <td>存储年、月、日的值。</td>
    </tr>
<tr>
<td>TIME</td>
      <td>存储小时、分、秒的值。</td>
    </tr>
<tr>
<td>TIMESTAMP</td>
      <td>存储年、月、日、小时、分、秒的值。</td>
    </tr>
<tr>
<td>INTERVAL</td>
      <td>由一些整数字段组成，代表一段时间，取决于区间的类型。</td>
    </tr>
<tr>
<td>ARRAY</td>
      <td>元素的固定长度的有序集合</td>
    </tr>
<tr>
<td>MULTISET</td>
      <td>元素的可变长度的无序集合</td>
    </tr>
<tr>
<td>XML</td>
      <td>存储 XML 数据</td>
    </tr>
</tbody></table>








