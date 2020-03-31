---
layout: post
title:  "简单爬虫计数-web scraper"
categories: 爬虫
tags: 爬虫 web-scraper
author: 果果
description: I need take more and more notes in 2020.
---
之前就使用过web scraper做个简单的爬虫，时隔半年，忘记的一干二净。看来程序员的脑子需要不断的进行保存，当然记录笔记是个不错的办法，不然下次去哪里找呢。

### web scraper使用场景和准备工作

web scraper 本身是一个chrome插件，所以准备一个chrome浏览器就行。额外需要一个couchdb来作为存储方存储，抓取到的东西。

### 在线教程

排名分先后先列出来的就是我觉得最好的教程。

[简易数据分析15讲](https://www.cnblogs.com/web-scraper/tag/%E7%AE%80%E6%98%93%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90/)

[webscraper中文网](www.iwebscraper.com)

### couchdb的简单实用

因为上述链接里面有详细的couchdb的安装使用，这里本不适合在赘述。那么这里就补充简单的链接，方便自己使用。

http://127.0.0.1:5984/_utils/# 这个是couchdb的启动域名

在web scraper里面配置的时候，先在couchdb里面新建一个sitemap的表，用来存放不同的爬虫配置。

~~在couchdb里面可以通过点击json的方式把数据导出来。之后使用自己熟悉的语言处理就行。这个估计等以后学了大数据估计能更好的的利用爬虫吧。~~

**通过`$ curl -X GET http://127.0.0.1:5984/my_database/{}数据库`这种方式请求本地的couchdb数据库就能解决之前大的json在页面上下载不下来的问题，之前还是太懒了，没有去研究。**

php也有couchdb的扩展，是这个php-on-couch/php-on-couch，用起来也就那样吧，简单的数据爬虫处理，用不到它。

### 爬取taptap的实例

爬取想爬的游戏的下载量等等，自己写一个简单的页面，使用二级页面跳转的方法来弄

    {"_id":"taptap_game_link","startUrl":["http://dev.g.hrgame.com.cn/taptap_game_link.html"],"selectors":[{"id":"container","type":"SelectorElement","parentSelectors":["_root"],"selector":"a","multiple":true,"delay":0},{"id":"name","type":"SelectorText","parentSelectors":["container"],"selector":"_parent_","multiple":false,"regex":"","delay":0},{"id":"link","type":"SelectorLink","parentSelectors":["container"],"selector":"_parent_","multiple":false,"delay":0},{"id":"Game_name","type":"SelectorText","parentSelectors":["link"],"selector":"h1","multiple":false,"regex":"","delay":0},{"id":"Install_num","type":"SelectorText","parentSelectors":["link"],"selector":"span.count-stats:nth-of-type(1)","multiple":false,"regex":"\\d+","delay":0},{"id":"Concern_num","type":"SelectorText","parentSelectors":["link"],"selector":"span.count-stats:nth-of-type(2)","multiple":false,"regex":"\\d+","delay":0},{"id":"Game_score","type":"SelectorText","parentSelectors":["link"],"selector":"span.app-rating-score","multiple":false,"regex":"","delay":0},{"id":"Evaluation_num","type":"SelectorText","parentSelectors":["link"],"selector":"[data-taptap-tab='review'] small","multiple":false,"regex":"","delay":0},{"id":"Guantie_num","type":"SelectorText","parentSelectors":["link"],"selector":"[data-taptap-tab='topic'] small","multiple":false,"regex":"","delay":0},{"id":"Game_id","type":"SelectorElementAttribute","parentSelectors":["link"],"selector":".app-main-container","multiple":false,"extractAttribute":"data-app-id","delay":0}]}

抓取某个剑与远征下面的所有主评论，这里面使用了递归的方式爬取下一页

    {"_id":"app-137515","startUrl":["https://www.taptap.com/app/137515/review?order=default&page=1#review-list"],"selectors":[{"id":"next_page","type":"SelectorLink","parentSelectors":["_root","next_page"],"selector":".taptap-button-more li:last-child a","multiple":true,"delay":0},{"id":"container","type":"SelectorElement","parentSelectors":["_root","next_page"],"selector":"div.review-item-text","multiple":true,"delay":0},{"id":"User_name","type":"SelectorText","parentSelectors":["container"],"selector":"div.item-text-header span a","multiple":false,"regex":"","delay":0},{"id":"Time_spending","type":"SelectorText","parentSelectors":["container"],"selector":"span.text-score-time","multiple":false,"regex":"\\d.*","delay":0},{"id":"User_id","type":"SelectorElementAttribute","parentSelectors":["container"],"selector":"div.item-text-header>span","multiple":false,"extractAttribute":"data-user-id","delay":0},{"id":"Content","type":"SelectorText","parentSelectors":["container"],"selector":">.item-text-body","multiple":false,"regex":"","delay":0},{"id":"Phone_style","type":"SelectorText","parentSelectors":["container"],"selector":"span.text-footer-device","multiple":false,"regex":"","delay":0},{"id":"Huanle_num","type":"SelectorText","parentSelectors":["container"],"selector":".vote-funny span[data-taptap-ajax-vote]","multiple":false,"regex":"","delay":0},{"id":"Haoping_num","type":"SelectorText","parentSelectors":["container"],"selector":".vote-up[data-obj='review'] span","multiple":false,"regex":"","delay":0},{"id":"Chaping_num","type":"SelectorText","parentSelectors":["container"],"selector":"button.vote-down[data-obj='review']","multiple":false,"regex":"","delay":0},{"id":"Reply_num","type":"SelectorText","parentSelectors":["container"],"selector":"span.normal-text","multiple":false,"regex":"\\d+","delay":0}]}

### 用到的shell命令

记录从user信息里拿出userid

`cat *.json | jq  '.rows[].doc .userid' | grep '[0-9]*' -o | sort | uniq > useridAll.txt`

获取userphone的数组

`cat *.json | jq  '[.rows[].doc |{userid:.userid,phone:.phone}]' >userPhone.txt`

分割大文件

`split -l 10000 -d -a 3 useridAll.txt user_`








