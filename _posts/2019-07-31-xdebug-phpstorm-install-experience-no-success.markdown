---
layout: post
title:  "Xdebug和phpstorm的配置联调（失败版）"
categories: PHP IDE 
tags: xdebug php
author: 果果
description: Not all questions have an answer，but it will has.
---
Xdebug和phpstorm的配置联调（失败版）
---
为了让var_dump好看一点，我在虚拟机配置了xdebug。既然这些都配置了，为啥不一步到位开始快乐的调试模式呢。然后一天过去了，还是没有结果。为了以后能有空接着这次的配置做下去，我把当前的情况记录一下。就酱。。。

手动目录：
    
    1.linux下xdebug的配置安装
    2.win7的phpstorm远程配置ubuntu的lnmp环境

___

### 1.linux下xdebug的配置安装

由于linux下装了2个版本的php，暂时还不会分开管理，我的fpm是编译安装的，所以需要xdebug也需要编译安装。过程如下：

1.下载合适的xdebug版本,[https://xdebug.org/wizard.php](https://xdebug.org/wizard.php),进入这个页面，然后在使用的开发环境（安装xdebug的环境）下打印phpinfo，`ctrl+u`打开页面源码，复制然后粘贴到https://xdebug.org/wizard.php这里的输入框。

![xdebug_version](/assets/images/xdebug/xdebug_version.png)

2.复制链接下载合适的版本，`wget http://www.xdebug.org/files/xdebug-2.7.2.tgz`,解压然后进入解压后端目录。

3.依次执行`phpize`,`./configure`,`make && make install`后看到一个框框，就成功了，然后复制xdebug.so的路径，用来配置php.ini

    php.ini
    [xdebug]
    zend_extension="/usr/local/xdebug/xdebug-2.7.2/modules/xdebug.so"
    xdebug.remote_enable=1
    xdebug.remote_handler=dbgp
    xdebug.remote_mode=req
    xdebug.remote_host=192.168.11.229
    xdebug.remote_port=9001
    xdebug.remote_log = "/data/wwwlogs/xdebug/xdebug.log"
    xdebug.idekey=PHPSTROM
    xdebug.remote_autostart=1
    xdebug.auto_trace=on
    xdebug.show_exception_trace=on

4.service php-fpm restart

5.可能存在./configure找不到php路径

    ./configure --with-php-config=/usr/local/webserver/php/bin/php-config


### 2.win7的phpstorm远程配置ubuntu的lnmp环境

因为本篇没有配置成功，配置是错的，这里的意义不大。网上人云亦云，我看的是很蒙蔽，把百度第一页的n种方法都尝试之后依然没有我想要的结果。

总结下来无非都是配置下面的几点：

1.setting->debug->xdebug端口号

2.setting->debug->dbgp proxy

3.setting->server配置

4.run/debug configuration 配置web page

我感觉我会把这个弄明白的，但不是现在，怀疑和配置的端口和代理有关但是，我没有证据，毕竟这里我不是很熟悉，之后弄熟悉的话会搞好的。