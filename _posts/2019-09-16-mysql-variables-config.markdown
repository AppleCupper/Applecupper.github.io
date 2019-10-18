---
layout: post
title:  "mysql 配置变量学习"
categories: mysql study 
tags: mysql
author: 果果
description: To get more knowledge.
---
数据库配置变量的学习
___
数据库函数学了告一段落，来学习数据库的配置参数，当然目前还没有完全了解配置参数的范围，先记录为好。

### mysql 的 show 命令

1.列出服务器上的二进制日志文件
    
    SHOW BINARY LOGS
    SHOW MASTER LOGS

2.查看指定的日志文件

    SHOW BINLOG EVENTS
    [IN 'log_name']                 --要查看的日志文件
    [FROM pos]                      --查看的起始点
    [LIMIT [offset,] row_count]     --偏移量，总条数

3.显示所有可用的字符集

    SHOW CHARACTER SET  [LIKE 'pattern' | WHERE expr]

4.列出了服务器支持的排序规则

    SHOW COLLATION [LIKE 'pattern' | WHERE expr]

5.SHOW COLUMNS显示有关给定表中列的信息

    SHOW [FULL] {COLUMNS | FIELDS}
    {FROM | IN} tbl_name
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]

6.显示CREATE DATABASE 创建命名数据库的语句。

    SHOW CREATEE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name

7.显示创建表的语法

    SHOW CREATE TABLE tbl_name

8.显示创建事件语法

    SHOW CREATE EVENT event_name

9.显示创建功能语法SHOW CREATE FUNCTION语法,显示有关存储函数的信息

    SHOW CREATE FUNCTION func_name

10.显示创建过程语法,它返回可用于重新创建命名存储过程的确切字符串

    SHOW CREATE PROCEDURE proc_name

11.显示创建触发器的语法

    SHOW CREATE TRIGGER trigger_name

12.显示创建用户的语法

    SHOW CREATE USER user


### 写在前面，防止忘记

不需要order by默认排序的话可以加上order by null

explain select SQL_BIG_RESULT c1,count(*) as count from t1_normal group by c1;

可以看到执行计划中已经没有了“Using temporary”，所以group by并非一定依赖临时表，临时表在group by中的作用主要是“去重”。所以，实际上有另外一种方式，不使用临时表，直接利用sort_buffer排序(sort_buffer不够时，进行文件排序，具体而言是每一个有序数组作为一个单独文件，然后进行外排归并)，然后再扫描得到聚合后的结果集。

SQL_SMALL_RESULT：显示指定用内存表(memory引擎)

SQL_BIG_RESULT：显示指定用磁盘临时表(myisam引擎或innodb引擎)

两者区别在于，使用磁盘临时表可以借助主键做去重排序，适合大数据量；使用内存表写入更快，然后在内存中排序，适合小数据量。下面是从MySQL手册中摘录的说明。












