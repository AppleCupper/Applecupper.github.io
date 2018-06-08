---
layout: post
title:  "GitHub个人主页走过的坑"
categories: Other
tags: Other
author: 果果
description: fuck the gold.
---

GitHub
===

讲道理，这里应该有很多需要写的。但是自己太捞了反而没有能写的，日后再写。

jekyll
===

### 问题1：Permission denied - bind(2) for 127.0.0.1:4000？


这个127.0.0.1:4000接口被占用了，cmd执行
> netstat -aon | findstr "4000"

找到第一列为4000的对应进程的PID（最后一列）
<kbd>Ctrl</kbd>+<kbd>shift</kbd>+<kbd>esc</kbd>调起任务管理器，找到对应PID关掉进程

### 问题2：Dependency Error:Yikes!It looks like you don't have *jekyll-paginate*...

有类似的问题，项目目录下执行
> gem install XXXXXXX

XXXXXXX是指报错什么没有，就安装什么

markdown
============

目前还是不怎么会写呢。
暂时先把[简书](https://www.jianshu.com/p/b03a8d7b1719){:target="_blank"}上的链接弄过来


Thanks
======

1，[Jekyll][jekyll-url]

2，[Bootstrap][bootstrap-url]

3，[Github][github-url]

4，[Jekyll Clean Theme][Jekyll-Clean-Theme-url]

[jekyll-url]: http://jekyllrb.com/
[bootstrap-url]: http://getbootstrap.com/
[github-url]: https://github.com/
[Jekyll-Clean-Theme-url]: https://github.com/scotte/jekyll-clean
[xixia-url]: http://xixia.info/