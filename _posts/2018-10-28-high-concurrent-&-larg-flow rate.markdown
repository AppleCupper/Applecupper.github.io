---
layout: post
title:  "高并发大流量问题解决"
categories: study class
tags: php
author: 果果
description: I'm just a student and want to study.
---

写在前面
---
高并发和大流量问题的处理也是当前面试必考的内容了。虽然说是为了应对面试也逐一了解学习过，但是更具体的并不能详细搞清楚。打肿脸充胖子不太好，认真的简单研究一下emmm...

	从客户端的角度：防盗链处理
	从服务器资源的角度：图片，js，css的合并压缩，启用CDN，开启浏览器缓存，建立独立的图片服务器，动态语言静态化
	从数据库的角度：开启数据库缓存，数据库层面优化（SQL优化，表结构优化，索引优化）
	从服务器角度：使用负载均衡策略，等
	
下面还是详细的一一列举出来，自己记忆一次
___

### 1.防盗链
指的是：防止别人通过一些技术手段绕过本站的资源展示页面，盗用本站的资源；让绕过本站资源展示页面的资源链接失效

工作原理：通过referer或者签名，网站可以检测目标网页访问的来源网页，如果是资源文件，可以跟踪到显示他的网页地址

实现方法：

	referer：Nginx模块ngx_http_referer_module用于阻挡来源非法的域名请求；
	valid_referers none|blocked|server_names|string..;none代表referer来源为空也是合法的；blocked代表referer来源不为空，但是里面的值被防火墙删除了，这些值都不以http或者https开头；server_name：referer来源头部包含当前的server_names
	
	location ~ .*\.(wma|wmv|asf|mp3|mmf|zip|rar|jpg|gif|png|swf|flv)$ {
		valid_referers none blocked *.yiibase.com yiibase.com;
		if($invalid_referer) {
			#rewrite ^/ http://www.765h.com/error.html;
			return 403;
		}
	}
	
	使用加密签名实现：使用HttpAccessKeyModule模块 AccessKey on|off模块开关； accesskey_hashmethod md5|sha-1签名加密的方式；accesskey_arg GET参数名称；accesskey_signature加密规则；
	
	location /download {
        accesskey             on;
        accesskey_hashmethod  md5;
        accesskey_arg         "key";
        accesskey_signature   "mypass$remote_addr";
    }
	
### 2.减少HTTP请求

http链接过程的开销：域名解析->TCP链接->发送请求->等待->下载资源->解析时间

http1.1协议规定请求只能串行发送，也就是说一百个请求必须依次发送，前面的请求完成才能开始下一个请求
	
图片：图片地图，css背景position定位图片。采用base64编码的方式将图片直接嵌入网页<br>
js和css：合并文件

### 3.浏览器缓存和数据压缩

本地缓存：

	Pragma：no-cache会告知浏览器禁用本地缓存
	expires：thu，31 dec 2037 23：55：55GMT告诉浏览器缓存到期的时刻
	cache-control：no-store禁止浏览器缓存响应；no-cache不允许直接使用浏览器本地缓存，先发起请求和服务器协商；max-age=delta-seconds告知浏览器响应本地缓存的最长期限，以秒为单位。
	pragma>cache-control>expires

协商缓存：
	
	last-modified：通知浏览器资源的最后修改时间thu，31 dec 2037 23：55：55GMT
	Etag：文件的表示符
	
图片，css，js等不变的适合做本地缓存，html等动态的适合做协商缓存。Nginx配置方法？？？？？之后有空再记录

### 4.CDN加速

用户发起请求->只能DNS解析（根据IP判断地理位置、接入网络类型、选择最短的负载最轻的服务器）->（取得缓存服务器IP->将内容返回给用户）->向源站发起请求->返回用户->缓存到服务器
实现：使用lvs实现4层负载均衡，可以用Nginx和appache做7层负载均衡，使用squid或者Nginx做反向代理

### 5.独立的图片服务器

独立的图片服务器，独立的域名。独立的图片服务器分担web服务器io负载，可以专门针对图片服务器做优化（缓存方案）。独立的域名是因为同一域名在同一浏览器下并发链接数有限制

### 6.动态语言静态化

将现有的PHP等动态语言的逻辑代码生成HTML静态文件，用户访问动态脚本重定向到静态的HTML文件的过程

实现方式：
	模板引擎：可以使用smarty的缓存机制生成静态化文件
	使用ob_start等做缓存
	
### 7.动态语言层并发处理
### 8.数据库缓存层优化

使用mysql的查询缓存query_cache_type 0不用，1一直用，2看情况用
>select sql_no_cache * from my_table where condition;
>select sql_cache * from my_table where condition;
>set global query_cache_size = 201314159;

### 9.MySQL数据层优化
### 10.web服务器的负载均衡、请求分发





