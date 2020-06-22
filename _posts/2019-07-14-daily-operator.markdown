---
layout: post
title:  "日常操作部分"
categories: preg text 
tags: preg note
author: 果果
description: A good memory is better than a bad pen.
---
自己太懒了，老是忘记写笔记。但是长时间不写笔记，或者长时间不用的操作都会忘记。更不如说知识了。先把平时用来记笔记或者其他的操作都记录下来吧。

### jekyll server

使用gitbash cd到applecupper.github.io的目录，然后输入
>jekyll server

然后跳转在页面输入，localhost：4000，就可以看到本地的博客页面了。

自己的博客页面用来存储文章，和js练手收集。工作日志记录。

### 关于日记的git操作

查看远程仓库
>git remote -v 

从远程的仓库拉取master到本地的一个分支
>git fetch origin master:temp

比较本地的主干和线上的分支的区别
>git diff temp

禁止git自动转化换行符
>git config --global core.autocrlf false

合并线上的版本
>git merge temp

删除多余的分支
>git branch -d temp

### Linux常用操作

查看端口连接数
>netstat -antp | grep 80 | grep ESTABLISHED -c

将用户加入到某个组里面,重启虚拟机，使用groups user查看
>usermod -aG vboxsf $(whoami)

虚拟机手动挂载
>mount -t vboxsf www /data/www/

假如挂载报错

    mount: /mnt/wwwroot: wrong fs type, bad option, bad superblock on www, missing codepage or helper program, or other error.

可以尝试安装

    apt install nfs-common
    apt install cifs-utils
    apt-get install virtualbox-guest-utils //可能只用这个，或者使用‘安装增强功能’

ssh连接远程，除了使用xshell可以使用ide的命令工具
>ssh -p 22 guoguo@192.168.11.41 -> 输入yes -> 输入密码连接成功

查看磁盘的大小和查看当前目录大小
>df -lh
>du -sh

使用非root打开vim时，已经编辑好了，可以用下面的命令
>:w !sudo tee %



