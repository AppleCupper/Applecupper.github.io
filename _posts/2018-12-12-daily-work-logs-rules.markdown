---
layout: post
title:  "工作日志记录规范"
categories: work use 
tags: logs linux
author: 果果
description: I want to be better.
---
工作日志记录规范
---
主要是数据日志的记录方式，方便查找分析，附带linux shell学习。

———

### 1.日志的记录方法
    
    logaction=XXX key1=value1 key2=value2 time=time() datetime=date("Y-m-d:i:s", time())
    logaction=XXX array();

大致日志分为这两种，一中是自己组合成的数组形式，一中是数组打出来的字符串。比较方便读取和转化为php程序。

原则上对一个项目或者一次活动比较大的时候，数据日志应该做一个keymap，key记成简单的abc 3个字符一下的key。节省服务资源和优化读取速度。当然根据使用的日志形式灵活运用，这里只是记录自己学到的。

### 2.日志实例

下面简单展示2中日志的读法

第一种

    [2018-12-12 14:16:07.1093]GET, 0, /zombie2/code, 124.77.211.188, array (), logaction=si foid=oWjYV1g4PlLZ3wo8Va5LiRscy2rU tab=1 oid=oWjYV1g4PlLZ3wo8Va5LiRscy2rU ua=iphone t=1544595367

目标后面字段的数值。可以执行以下操作：

    cat access_2018-12-12.log | grep logaction=si | awk -F" " '{print $8,$9,$10,$11,$12,$13}'

第二种

    [2018-12-12 10:57:12.1563]GET, 0, /zzzzzzz/code, 111.11.111.111, array (), logaction=ui array ('XXXX')

我想要的目标是logaction=ui后面的内容。当然如果可以的话我是想把array后面的也读出来的，目前没必要。执行以下操作读取日志文件，可以得到array('XXXX')：

    cat access_2018-12-12.log | grep logaction=ui | awk -F"logaction=ui+" '{print $2}'

日志配合 cat >log.txt 方法可以将收集好的数据存放在单独文件内

### 3.PHP读取日志里的数据

### 4.使用到的linux方法简单备份

#### 1.cat

cat filename 打开整个文件
cat > filename 创建一个文件
cat f1 f2 > 合并为一个文件
cat f1 f2 >> 追加到一个文件后面

#### 2.awk

awk -F"Y" 'NF==4{print $X}' OFS="\t" (filename)
Y：是分割符，以什么什么分割.空格" ",字符串"xxxxx",多个分隔符"[:#/]",正则"/[0-9]+/""/[0-9]*/"
NF==4:判断位置显示行，NF==4显示分割后只有4个字段的行，NR==5显示第5行，可以&&||
$X:$0是匹配整条语句，$1,$2显示个字段，“,”打出来用空格分割，或者用ofs="\t"

注：awk功能很多，目前用不到，先不研究






