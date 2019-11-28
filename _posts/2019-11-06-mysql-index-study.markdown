---
layout: post
title:  "mysql 索引学习"
categories: mysql study 
tags: mysql index
author: 果果
description: I need learn index deeply.
---
数据库索引的学习

___
一点一滴的学习。

### 索引的前置工具

#### show index [from|in] table [from|in] dbname

    *************************** 1. row ***************************
    Table: admin_menus | Table: admin_menus     //表名            
    Non_unique: 0      | Non_unique: 1          //重复1，不0
    Key_name: PRIMARY  | Key_name: pid          //索引名，主键primary
    Seq_in_index: 1    | Seq_in_index: 1        //索引的列序号从几开始  
    Column_name: id    | Column_name: pid       //列名
    Collation: A       | Collation: A           //A升序或NULL未排序
    Cardinality: 66    | Cardinality: 15        //越大使用索引机会越大
    Sub_part: NULL     | Sub_part: NULL         //索引前缀
    Packed: NULL       | Packed: NULL           //密钥的包装方式
    Null:              | Null: YES              //是否有null值
    Index_type: BTREE  | Index_type: BTREE      //类型
    Comment:           | Comment:               //补充信息，disabled禁用
    Index_comment:     | Index_comment:         //注释
    *************************** 2. row ***************************

#### explain sql

通过EXPLAIN，我们可以分析出以下结果：

    表的读取顺序
    数据读取操作的操作类型
    哪些索引可以使用
    哪些索引被实际使用
    表之间的引用
    每张表有多少行被优化器查询

    *************************** 1. row ***************************
    id: 1                       //序号
    select_type: SIMPLE         //查询类型(简单查询、联合、子查询)
    table: admin_menus          //所属表
    partitions: NULL            //匹配的分区
    type: ref                   //索引类型
    possible_keys: pid          //可能使用到的索引
    key: pid                    //使用的索引名，null为没有使用索引
    key_len: 4                  //最长索引宽度，越短越好
    ref: const                  //显示哪个字段与key一起使用
    rows: 1                     //扫描的行数（估算，innodb不准）越少越好
    filtered: 100.00            //按表条件过滤的行百分比
    Extra: NULL                 //十分重要的额外信息

序号id有3中情况：

    id相同执行顺序从上到下
    id不同如果是子查询，id的序号会递增，id值越大优先级越高，越先被执行
    id有相同和不同，相同的自上而下执行，不同的id大的先执行

select_type:

    simple:简单select（不使用union或子查询）。
    primary:最外面的select。
    union:union中的第二个或后面的select语句。
    union result:union的结果。
    dependent union:union中的第二个或后面的select语句，取决于外面的查询。
    subquery:在SELECT或WHERE列表中包含了子查询,子查询中的第一个select,不依赖外部
    dependent subquery:子查询中的第一个select，取决于外面的查询。
    derived:导出表的select（from子句的子查询）。

type:

从最好到最差的连接类型为
>system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL

>const代表一次就命中，ALL代表扫描了全表才确定结果。一般来说，得保证查询至少达到range级别,最好能达到ref

>const 表示通过索引一次就找到了，const用于比较primary key 或者unique索引。因为只匹配一行数据，所以很快。如将主键置于where列表中，MySQL就能将该查询转换为一个常量。

>eq_ref 唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描

>ref 非唯一性索引扫描，返回匹配某个单独值的所有行，本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以他应该属于查找和扫描的混合体。 
>range 只检索给定范围的行，使用一个索引来选择行，key列显示使用了哪个索引，一般就是在你的where语句中出现between、< 、>、in等的查询，这种范围扫描索引比全表扫描要好，因为它只需要开始于索引的某一点，而结束于另一点，不用扫描全部索引

>index Full Index Scan，Index与All区别为index类型只遍历索引树。这通常比ALL快，因为索引文件通常比数据文件小。（也就是说虽然all和Index都是读全表，但index是从索引中读取的，而all是从硬盘读取的） 

Extra

    using index,Using where:不用读取表中所有信息，仅通过索引就可以获取所需数据，这发生在对表的全部的请求列都是同一个索引的部分的时候，表示mysql服务器将在存储引擎检索行后再进行过滤

    Using temporary：表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询，常见 group by ; order by

    Using filesort：当Query中包含 order by 操作，而且无法利用索引完成的排序操作称为“文件排序”

    Using join buffer：改值强调了在获取连接条件时没有使用索引，并且需要连接缓冲区来存储中间结果。如果出现了这个值，那应该注意，根据查询的具体情况可能需要添加索引来改进能。

    Impossible where：这个值强调了where语句会导致没有符合条件的行（通过收集统计信息不可能存在结果）。

    Select tables optimized away：这个值意味着仅通过使用索引，优化器可能仅从聚合函数结果中返回一行

    No tables used：Query语句中使用from dual 或不含任何from子句

别人的总结：

    • EXPLAIN不会告诉你关于触发器、存储过程的信息或用户自定义函数对查询的影响情况
    • EXPLAIN不考虑各种Cache
    • EXPLAIN不能显示MySQL在执行查询时所作的优化工作
    • 部分统计信息是估算的，并非精确值
    • EXPALIN只能解释SELECT操作，其他操作要重写为SELECT后查看执行计划。

前缀索引

如果索引列长度过长，这种列索引时将会产生很大的索引文件，不便于操作，可以使用前缀索引方式进行索引前缀索引应该控制在一个合适的点，控制在0.31黄金值即可（大于这个值就可以创建）

>SELECT COUNT(DISTINCT(LEFT(`title`,10)))/COUNT(*) FROM Arctic;

在多表join的时候尽量少join几张表，因为一不小心就是一个笛卡尔乘积的恐怖扫描，另外，我们还建议尽量使用left join，以少关联多。因为使用join 的话，第一张表是必须的全扫描的，以少关联多就可以减少这个扫描次数。

不要盲目的创建索引，只为查询操作频繁的列创建索引，创建索引会使查询操作变得更加快速，但是会降低增加、删除、更新操作的速度，因为执行这些操作的同时会对索引文件进行重新排序或更新。

在大数据导入时，可以先删除索引，再批量插入数据，最后再添加索引。

[引用](https://www.runoob.com/w3cnote/mysql-index.html)











