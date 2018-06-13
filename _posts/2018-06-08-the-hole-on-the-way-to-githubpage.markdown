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

markdown 语法笔记
============

目前还是不怎么会写呢。
暂时先把[简书](https://www.jianshu.com/p/b03a8d7b1719){:target="_blank"}上的链接弄过来


1，标题
----

Markdown的标题通过在行首插入`#`来实现，`#`的不同数量表示不同的标题级别，Markdown最多支持6级标题：

`# 一级标题`

一级标题
====

`## 二级标题`

二级标题
----

`### 三级标题`

### 三级标题

`#### 四级标题`

#### 四级标题

`##### 五级标题`

##### 五级标题

`###### 六级标题`

###### 六级标题

  

2，换行
----

建议直接使用html标记`<br/>`，**`因为Markdown原生的方式只能换行，无法实现空出多行的效果`**。

  

3，强调
----

### 3.1 斜体

用一对`*`扩起需要斜体的文本。

    *需要斜体的文本*

_需要斜体的文本_。

  

### 3.2 加粗

用一对`**`扩起需要加粗的文本。

    **需要加粗的文本**

**需要加粗的文本**。

  

### 3.3 加粗+斜体

用一对`***`扩起需要加粗的文本。

    ***需要加粗+斜体的文本***

**_需要加粗+斜体的文本_**。

  

### 3.4 行内代码

用一对`` ` ``扩起需要行内代码的文本。

    `需要行内代码的文本`

`需要行内代码的文本`。

  

### 3.5 行内代码+斜体

用一对`*`嵌套`` ` ``扩起需要行内代码+斜体的文本。

    *`需要行内代码+斜体的文本`*

_`需要行内代码+斜体的文本`_。

  

### 3.6 行内代码+加粗

用一对`**`嵌套`` ` ``扩起需要行内代码+加粗的文本。

    **`需要行内代码+加粗的文本`**

**`需要行内代码+加粗的文本`**。

  

### 3.7 行内代码+加粗+斜体

用一对`***`嵌套`` ` ``扩起需要行内代码+加粗+斜体的文本。

    ***`需要行内代码+加粗+斜体的文本`***

**_`需要行内代码+加粗+斜体的文本`_**。

  

4，分隔线
-----

Markdown有如下三种画分隔线的方式：

`---`

* * *

`***`

* * *

`<hr/>`

* * *

  

5，引用
----

### 5.1 单重引用

`>`用于表示引用。

    >鲁迅说>>西夏很好！

> 鲁迅说
> 
> 西夏很好！

  

### 5.2 多重引用

`>`的不同数量表示不同的引用嵌套。

    >鲁迅说>>西夏很好！>>西夏也说>>>>西夏很Nice！

> 鲁迅说
> 
> 西夏很好！
> 
> > 西夏也说
> > 
> > 西夏很Nice！

  

6，链接
----

### 6.1 直接链接

    [西夏](http://xixia.info/)

[西夏](http://xixia.info/)

  

### 6.2 间接链接

    [西夏][xixia][xixia]:http://xixia.info/

[西夏](http://xixia.info/)

  

7，图片
----

### 7.1 直接图片

    ![西夏](http://xixia.info/assets/images/xixia.gif)

![西夏](http://xixia.info/assets/images/xixia.gif)

  

### 7.2 间接图片

    ![西夏][xixia_pic][xixia_pic]:http://xixia.info/assets/images/xixia.gif

![西夏](http://xixia.info/assets/images/xixia.gif)

  

### 参考资料：

1，[Markdown 语法说明 (简体中文版)](http://www.appinn.com/markdown/)

2，[markdown 转义](http://blog.csdn.net/isaisai/article/details/51513116)

3，[markdown简明语法](http://www.cnblogs.com/back-man/p/5012746.html)

4，[markdown学习笔记](http://www.jianshu.com/p/4Q3aay)


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