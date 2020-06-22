---
layout: post
title:  "mysql主从复制实践"
categories: mysql
tags: mysql study
author: 果果
description: I have more dream.
---
看了网上一个关于主从复制的文章，自己尝试了一下，并且记录下来。

目的性，主从复制个人理解主要是可以做：读写分离，容灾备份。主库插入，从库读取。

#### 准备工作

2个数据库，有人使用的是2个linux机器做的，但是我懒得弄2个linux虚拟机，也懒得把mysql复制2份来搞。这里就用来一台windows和一个虚拟机来弄。

- 主库：192.168.10.204 /linux
- 从库：192.168.11.177 /window

#### 修改主库配置

找到my.cnf或者包含的文件里，再mysqld部分插入或者取消注释

    #server-id = 1
    #log_bin= /var/log/mysql/mysql-bin.log //binlog日志位置
    #binlog_do_db           = test  //设置binlog记录的数据库
    #binlog_ignore_db       = include_database_name //设置binlog忽略的数据库

保存重启mysql，创建用来同步的账号

    mysql> CREATE USER 'test'@'192.168.11.177' IDENTIFIED BY 'slavepass';#创建用户
    mysql> GRANT REPLICATION SLAVE ON *.* TO 'test'@'192.168.11.177';#分配权限
    mysql>flush privileges;   #刷新权限

查看master状态，从库设置的时候要用，如下，

    mysql> show master status;
    +------------------+----------+--------------+------------------+-------------------+
    | File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
    +------------------+----------+--------------+------------------+-------------------+
    | mysql-bin.000001 |     1192 | test         |                  |                   |
    +------------------+----------+--------------+------------------+-------------------+

#### 修改从库的配置

windows使用了phpstudy里的mysql，当然什么都可以。

先打开my.ini,添加server-id=2,不要和主库一样，一样的方式我没试过

重启mysql,命令行执行同步sql语句，记得加，号

    mysql> CHANGE MASTER TO
    ->     MASTER_HOST='192.168.10.204',
    ->     MASTER_USER='test',
    ->     MASTER_PASSWORD='slavepass',
    ->     MASTER_LOG_FILE='mysql-bin.000001',
    ->     MASTER_LOG_POS=1192;

#### 启动同步和关闭同步

    mysql>start slave;
    mysql>stop slave;

可以查看同步状态

    show slave status;

完结撒花






