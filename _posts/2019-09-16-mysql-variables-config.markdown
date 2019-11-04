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

#### 常用来数据库优化分析的

39.显示变量语法，显示MySQL系统变量的值

    SHOW [GLOBAL | SESSION] VARIABLES
    [LIKE 'pattern' | WHERE expr]

29.显示过程列表语法,调试mysql使用

    SHOW [FULL] PROCESSLIST

30.显示表示当前会话过程中执行的语句资源使用信息，调试mysql使用

    SHOW PROFILE [type [, type] ... ]
    [FOR QUERY n]
    [LIMIT row_count [OFFSET offset]]

    type: {
        ALL
      | BLOCK IO
      | CONTEXT SWITCHES
      | CPU
      | IPC
      | MEMORY
      | PAGE FAULTS
      | SOURCE
      | SWAPS
    }

    SHOW PROFILE

34.显示状态语法

    SHOW [GLOBAL | SESSION] STATUS
    [LIKE 'pattern' | WHERE expr]

35.显示表状态语法

    SHOW TABLE STATUS
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]

#### 常用语法，显示数据和结构内容的

36.显示表语法

    SHOW [FULL] TABLES
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]

5.SHOW COLUMNS显示有关给定表中列的信息

    SHOW [FULL] {COLUMNS | FIELDS}
    {FROM | IN} tbl_name
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]

22.显示索引语法

    SHOW {INDEX | INDEXES | KEYS}
        {FROM | IN} tbl_name
        [{FROM | IN} db_name]
        [WHERE expr]

14.显示数据库或者数据表

    show databases|schemas，show tables

#### 显示创建类语法

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

    SHOW CREATE USER user ->格式'root@localhost'

13.显示创建视图的语法

    SHOW CREATE VIEW view_name

#### 显示错误分析日志文件

1.列出服务器上的二进制日志文件
    
    SHOW BINARY LOGS
    SHOW MASTER LOGS

2.查看指定的日志文件

    SHOW BINLOG EVENTS
    [IN 'log_name']                 --要查看的日志文件
    [FROM pos]                      --查看的起始点
    [LIMIT [offset,] row_count]     --偏移量，总条数

17.仅显示有关错误的信息

    SHOW ERRORS [LIMIT [offset,] row_count]
    SHOW COUNT(*) ERRORS

#### 显示数据库服务器引擎等语法

3.显示所有可用的字符集

    SHOW CHARACTER SET  [LIKE 'pattern' | WHERE expr]

4.列出了服务器支持的排序规则

    SHOW COLLATION [LIKE 'pattern' | WHERE expr]

15.显示有关存储引擎的操作信息SHOW ENGINE语法

    SHOW ENGINE engine_name {STATUS | MUTEX}
    SHOW ENGINE INNODB STATUS
    SHOW ENGINE INNODB MUTEX
    SHOW ENGINE PERFORMANCE_SCHEMA STATUS

16.显示有关服务器的存储引擎的状态信息

    SHOW [STORAGE] ENGINES

18.显示有关事件管理器事件的信息

    SHOW EVENTS
    [{FROM | IN} schema_name]
    [LIKE 'pattern' | WHERE expr]

19.显示功能代码语法

    SHOW FUNCTION CODE func_name

20.显示功能状态语法

    SHOW FUNCTION STATUS
        [LIKE 'pattern' | WHERE expr]

21.显示分配给MySQL用户帐户 的权限

    SHOW GRANTS [FOR user]

23.显示主状态语法

    SHOW MASTER STATUS

24.显示开放式表格语法

    SHOW OPEN TABLES
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]

25.显示插件语法

    SHOW PLUGINS

26.显示特权语法

    SHOW PRIVILEGES

27.显示过程代码语法

    SHOW PROCEDURE CODE proc_name

28.显示过程状态语法

    SHOW PROCEDURE STATUS
    [LIKE 'pattern' | WHERE expr]

31.显示继电器事件语法

    SHOW RELAYLOG EVENTS
    [IN 'log_name']
    [FROM pos]
    [LIMIT [offset,] row_count]
    [channel_option]

    channel_option:
        FOR CHANNEL channel

32.显示从主机语法
    
    SHOW SLAVE HOSTS

33.显示从站状态语法

    SHOW SLAVE STATUS [FOR CHANNEL channel]

37.显示触发器的语法

    SHOW TRIGGERS
    [{FROM | IN} db_name]
    [LIKE 'pattern' | WHERE expr]

40.显示警告语法

    SHOW WARNINGS [LIMIT [offset,] row_count]
    SHOW COUNT(*) WARNINGS



### 写在前面，防止忘记

不需要order by默认排序的话可以加上order by null

explain select SQL_BIG_RESULT c1,count(*) as count from t1_normal group by c1;

可以看到执行计划中已经没有了“Using temporary”，所以group by并非一定依赖临时表，临时表在group by中的作用主要是“去重”。所以，实际上有另外一种方式，不使用临时表，直接利用sort_buffer排序(sort_buffer不够时，进行文件排序，具体而言是每一个有序数组作为一个单独文件，然后进行外排归并)，然后再扫描得到聚合后的结果集。

SQL_SMALL_RESULT：显示指定用内存表(memory引擎)

SQL_BIG_RESULT：显示指定用磁盘临时表(myisam引擎或innodb引擎)

两者区别在于，使用磁盘临时表可以借助主键做去重排序，适合大数据量；使用内存表写入更快，然后在内存中排序，适合小数据量。下面是从MySQL手册中摘录的说明。












