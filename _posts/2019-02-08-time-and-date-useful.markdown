---
layout: post
title:  "Date 和 Time常见用法和相关"
categories: date time 
tags: mysql php all
author: 果果
description: Little knowledge always be forgot.
---
时间函数经常用但是，每次都自己写还是挺烦的。能把整理来的各种时间函数都弄到一个里面那自然是极好的。

___

### date&time in PHP
设置时区

    在PHP.INI中设置时区
    date.timezone = PRC

    在代码中设置时区，可以解决时间相差8的问题，不同框架可能有不同的配置项

    1 date_default_timezone_set('Asia/Shanghai');//'Asia/Shanghai'   亚洲/上海

    2 date_default_timezone_set('Asia/Chongqing');//其中Asia/Chongqing'为“亚洲/重庆”

    3 date_default_timezone_set('PRC');//其中PRC为“中华人民共和国”

    4i ni_set('date.timezone','Etc/GMT-8');

    5 ini_set('date.timezone','PRC');

    6 ini_set('date.timezone','Asia/Shanghai');

    7 ini_set('date.timezone','Asia/Chongqing');
    
### date&time in js
### date&time in mysql








