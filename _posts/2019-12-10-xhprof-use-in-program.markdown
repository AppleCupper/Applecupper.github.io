---
layout: post
title:  "在项目里面使用xhprof"
categories: php extension
tags: php xhprof
author: 果果
description: From now on, I will be more knowledgeable.
---
基于自己打算熟悉php更多扩展的原则，我接触了xhprof，和xdebug不一样的时候，xdebug只能用来开发环境的分析，说实话，自己也没有能很好的利用xdebug。与xdebug不同的时候xhprof能应用于线上环境来做性能分析。听着这么牛逼的东西怎么能不会呢。所以搞了一下。

### xhprof的安装

安装还是挺好安装的，pecl自带的就不看了，不能支持php7以上的版本，网上好多人都使用的是[https://github.com/longxinH/xhprof](https://github.com/longxinH/xhprof)这个版本的。下面就开始安装吧

下载&安装

    1.进入到项目目录，将来需要配置服务器
    2.git clone https://github.com/longxinH/xhprof
    3.cd xhprof/extension/
    4.phpize
    5. ./configure
    6.make && make install(假如make报错，执行make clean)
    7.ui界面显示性能图的话需要安装`sudo apt install graphviz`

配置：

    在php.ini里面添加
    [xhprof]
    extension=xhprof.so;
    xhprof.output_dir=/data/wwwlogs/xhprof

对应的目录必须可读可写，用来生成调试后的文件

配置xhprof的nginx服务器地址

    server {
        listen  80;
        server_name xhprof.dev;
        root /media/sf_www/xhprof;
        index index.php index.html;
        access_log /data/wwwlogs/xhprof/xhprof.dev.log;
        error_log /data/wwwlogs/xhprof/xhprof.dev.log.err;
        rewrite_log on;

        location ~* \.php$ {
                fastcgi_pass   127.0.0.1:9000;
                include fastcgi_params;
                fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                fastcgi_index index.php;

        }
    }

重启php-fpm,重启nginx

测试代码：

    1️以thinkphp为例：
    include_once('/media/sf_www/xhprof/xhprof_lib/utils/xhprof_lib.php');
    include_once('/media/sf_www/xhprof/xhprof_lib/utils/xhprof_runs.php');
    xhprof_enable();

    phpinfo();//用于调试的部分

    $xhprof_data=xhprof_disable();
    print_r($xhprof_data);
    $xhprof_runs = new \XHProfRuns_Default();  //因为thinkphp的语法所以这样引入
    $run_id = $xhprof_runs->save_run($xhprof_data, "xhprof_test");
    echo "---------------\n".
        "Assuming you have set up the http based UI for \n".
        "XHProf at some address, you can view run at \n".
        "http://xhprof.dev/xhprof_html/index.php?run=$run_id&source=xhprof_test\n".
        "---------------\n";
    exit;

执行之后可以通过*http://xhprof.dev/xhprof_html/index.php?run=$run_id&source=xhprof_test*来查看调试结果。

### xhprof的更多应用

这部分因为没有亲自试用只能说是意淫，但是把别人的总结记录下来也是好的

比如能搜到的更好的注入方式，可以把下面的放到代码的入口，或者逻辑单独保存为php文件，在`php.in`里面配置`auto_prepend_file = /opt/inject.php`,php-fpm 请求的 php 文件前都会自动注入/opt/inject.php文件。在nginx里面配置的话可以`fastcgi_param PHP_VALUE "auto_prepend_file=/opt/inject.php";`

    //开启xhprof
    xhprof_enable(XHPROF_FLAGS_MEMORY | XHPROF_FLAGS_CPU);
    //在程序结束后收集数据
    register_shutdown_function(function() {
        $xhprof_data        = xhprof_disable();

        //让数据收集程序在后台运行
        if (function_exists('fastcgi_finish_request')) {
            fastcgi_finish_request();
        }

        //保存xhprof数据
        ...
    });

至于网上说用什么ui的问题，这个不重要吧，反正我自己前端挺好的，写起来也简单。而且集成的都有现成的ui。欠缺的，就是把生成的结果存入到数据库里面，方便维护，甚至可以做一个简单的页面把这个东西给列出来。





