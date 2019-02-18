---
layout: post
title:  "临时存储的小问题集锦"
categories: problem daily 
tags: problem note
author: 果果
description: Fuck the problem.
---
暂时没有想到更好的形式保存细小的笔记，如果不前进只是浪费时间。索性都写到一起，目录结构大概就是日期和问题名。写的方便以后有搜索功能了来查找，你问我会不会有搜索功能，这个嘛，应该会有的

___

### 2019/01/04
#### emijo昵称无法存入数据库

tags：微信、emijo、昵称

解决方案：编码类型改为utf8mb4格式，字符类型改为varbinary。

#### php匹配中文问题

tags：中文、编码、base64

php-unicode转化：

    中文转unicode
    function UnicodeEncode($str){
        preg_match_all('/./u', $str, $matches);
        $unicodeStr = "";
        foreach ($matches[0] as $m){
            //拼接
            $unicodeStr .= "&#" . base_convert(bin2hex(iconv('UTF-8', "UCS-4", $m)), 16, 10);
        }
        return $unicodeStr;
    }
    $str="新浪微博";
    echo UnicodeEncode($str);
    var_dump(UnicodeEncode($str));

    unicode转中文
    function unicodeDecode($unicode_str){
    $json ='{"str":"'.$unicode_str.'"}';
    $arr = json_decode($json,true);
    if(empty($arr)) return '';
    return $arr['str'];
    }
    $unicode_str ="\u65b0\u6d6a\u5fae\u535a";
    echo unicodeDecode($unicode_str);

注:关于utf8，ASCII，Unicode的关系详情请看连接：[ASCII，Unicode 和 UTF-8的关系](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

#### base64资源在页面上的使用

tags:base64、图片、字体

资源格式：data:[MIME-type][;charset=encoding][;base64],[data]

base64编码原理：以6个bit来编码，正常的1B为8bit,最小公倍数是24，也就是说3Bit可以变成4个base64字符。不够6bit的在后面补0.

文本abc->YWJj，ab->YWI=,a->YQ==;所以base64的的字符一般是4的倍数，不够4个用=填充

相关连接：[base64与css优化](http://www.cnblogs.com/coco1s/p/4375774.html)

应用：邮件、证书，通常用来解决传输ascii码128位后不可见元素的问题。

#### iphone在微信下面点击连接自动跳转https

tags：iphone、http

这个问题知道就好，不给http前缀会自动跳过去，而且还可能因为缓存导致页面一直好不了。需要单独总结一个iphone会遇到的问题。

#### 压力测试方案

tags：appache、ab、并发测试

ab相关操作：

Usage: ab [options] [http[s]://]hostname[:port]/path

用法：ab [选项] 地址

选项：

    Options are:
        -n requests    #执行的请求数，即一共发起多少请求。
        -c concurrency    #请求并发数。
        -t timelimit    #测试所进行的最大秒数。其内部隐含值是-n 50000，它可以使对服务器的测试限制在一个固定的总时间以内。默认时，没有时间限制。
        -s timeout    #指定每个请求的超时时间，默认是30秒。
        -b windowsize    #指定tcp窗口的大小，单位是字节。
        -B address    #指定在发起连接时绑定的ip地址是什么。
        -p postfile    #指定要POST的文件，同时要设置-T参数。
        -u putfile    #指定要PUT的文件，同时要设置-T参数。
        -T content-type    #指定使用POST或PUT上传文本时的文本类型，默认是'text/plain'。
        -v verbosity    #设置详细模式等级。
        -w    #将结果输出到html的表中。
        -i    #使用HEAD方式代替GET发起请求。
        -y attributes    #以表格方式输出时，设置html表格tr属性。 
        -z attributes    #以表格方式输出时，设置html表格th或td属性。
        -C attribute    #添加cookie,比如'Apache=1234'。（可重复）
        -H attribute    #为请求追加一个额外的头部，比如'Accept-Encoding: gzip'。（可重复）
        -A attribute    #对服务器提供BASIC认证信任。用户名和密码由一个:隔开，并以base64编码形式发送。无论服务器是否需要(即,是否发送了401认证需求代码)，此字符串都会被发送。
        -P attribute    #对一个中转代理提供BASIC认证信任。用户名和密码由一个:隔开，并以base64编码形式发送。无论服务器是否需要(即, 是否发送了401认证需求代码)，此字符串都会被发送。
        -X proxy:port   #指定代理服务器的IP和端口。
        -V              #打印版本信息。
        -k              #启用HTTP KeepAlive功能，即在一个HTTP会话中执行多个请求。默认时，不启用KeepAlive功能。
        -d              #不显示"percentage served within XX [ms] table"的消息(为以前的版本提供支持)。
        -q              #如果处理的请求数大于150，ab每处理大约10%或者100个请求时，会在stderr输出一个进度计数。此-q标记可以抑制这些信息。
        -g filename     #把所有测试结果写入一个'gnuplot'或者TSV(以Tab分隔的)文件。此文件可以方便地导入到Gnuplot,IDL,Mathematica,Igor甚至Excel中。其中的第一行为标题。
        -e filename     #产生一个以逗号分隔的(CSV)文件，其中包含了处理每个相应百分比的请求所需要(从1%到100%)的相应百分比的(以微妙为单位)时间。由于这种格式已经“二进制化”，所以比'gnuplot'格式更有用。
        -r              #当收到错误时不要退出。
        -h              #输出帮助信息
        -Z ciphersuite  指定SSL/TLS密码套件
        -f protocol     指定SSL/TLS协议(SSL3, TLS1, TLS1.1, TLS1.2 or ALL)

暂时没有单独的压测篇章，写一个备用到这里

#### php脚本阻止浏览器访问

tags：php、脚本

做法：PHP_SAPI!= 'cli' //访问端不是命令行格式

#### 给table加边框

tags：html、table、边框

实例：

    <table border="1" cellspacing="0" cellpadding="0">

#### strtr和str_replace的区别

tags：php、区别

strtr(string,from,to)：逐个字符替换，以from和to中较短的为准

    例：strtr("aidenliu","a","bc")  只替换原始字符串中出现的a 输出：bidenliu

该方法逐个字符替换，每次替换都会遍历一次原始的字符串。大小写敏感，不会重复替换。

    例：strtr("aidenliu","aA","A@") 会输出Aidenliu 而不是@idenliu

strtr(string,array)：字符串替换，用关联数组的值替换原始字符串中出现的对应的键。大小写敏感，以原始字符串为主，不发生重复替换。

strtr(string,from,to) vs strtr(string,array)：
    
    strtr("aidenliu","ai","") 不发生替换（第二个参数为零长度字符串）
    strtr("aidenliu",array("ai"=>"")) 发生替换

注：所有关于区别的问题都应该移动到单独的区别区块里去

### 2019/02/01
#### iphone下滑动弹窗滚动条会卡死

tags：iphone、适配

方法一：换一个大一点的弹窗不要点击到遮罩层

方法二：点击遮罩层关闭掉弹窗，大多数弹窗都支持这样做，然后再次打开弹窗，弹窗内滑块滑动到顶部。
    
    setTimeout(function(){
        $('.listcon').scrollTop(0);
    },200);




