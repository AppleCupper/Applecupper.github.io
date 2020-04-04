---
layout: post
title:  "微信小游戏后台爬虫改"
categories: 爬虫
tags: 爬虫 charles
author: 果果
description: A new function.
---
上一个微信小游戏数据的爬虫，要不停的去扫页面的二维码，虽然已经算是比较优化了。这个操作还是有点反人类。实际上微信官方有一个可以看数据的小程序，能不能通过这个把数据取下来呢？（既然能看为什么还要爬虫）

当然是可以的。实际上常用的网络协议http和https都是要走网关的，虽然自己并不懂网络上的知识，但是抓包时可以实现的。那么我所需要的就是一个可以保存数据的`自动抓包工具`和`手机按键精灵`就可以实现数据的拉去。想象挺美好的，实际上，我没用过抓包工具。经过在网上的研究，我定下来一个方案。

### 小程序爬虫方案

1.安装好需要的工具，`charles`和一个手机模拟器，这里我用是夜神模拟器，当然其他的也是可以的。

2.手机模拟器需要具备的功能：
    
    a.自带按键精灵功能，省去了学习按键精灵的时间成本
    b.使用各个版本的手机去爬虫，还需要安装按键精灵，也可能不支持微信。太新的手机链接不上抓包工具，无法自己安装证书，需要root等。比较麻烦
    c.抓包需要在一个局域网里面，正常情况下没啥问题。手机模拟器和电脑一个网络的，当然没问题。

3.配置好`charles`，因为要抓https的包，需要安装证书;Proxy Setting里面勾选一个http的选项;ssl Proxy Setting设置*.*;等等。。。在help的菜单里安装ca证书，然后手机连接charles的代理，并下载ca证书，电脑允许接入配置就完成了。

详细的charles配置可以去看[charles教程](https://www.axihe.com/tools/charles/charles/tutorial.html)

4.配置charles过滤域名；配置模拟器按键精灵定时任务；配置charles定时保存文件。这里可以高频保存。这次抓包针对的是微信小程序，小程序的官方给的session_id可能每天才一次更新。彻底关掉微信，从新进入也会获取一个新的session_id。这里就不需要太过于纠结。按需设置间隔就好，实践出真知。

5.使用脚本代码拿到session_id，研究微信小程序的接口地址和参数。组装参数请求数据。具体脚本没有太多的价值，只是http请求的脚本。

### 微信小游戏数据的接口数据解释

下面是整理出来的参数标识的数据：

|stat_type|data_field_id|ads_field_id|ads_value|comment|location|
|----|----|----|----|----|----|
|1000001|5|||活跃|sequence_data_list|
|1000010|3|||活跃次留|sequence_data_list|
|1000010|4|||活跃三留|sequence_data_list|
|1000010|5|||活跃七留|sequence_data_list|
|1000011|3|||注册|sequence_data_list|
|1000021|3|||注册次留|sequence_data_list|
|1000021|4|||注册三留|sequence_data_list|
|1000021|5|||注册七留|sequence_data_list|
|1000028|3|||分享次数|sequence_data_list|
|1000028|4|||分享用户数|sequence_data_list|
|1000028|5|||分享率|sequence_data_list|
|1000020|3|2|8040321819858439|单日收入banner|sequence_data_list|
|1000020|6|2|8040321819858439|点击banner|sequence_data_list|
|1000020|5|2|8040321819858439|曝光banner|sequence_data_list|
|1000020|8|2|8040321819858439|点击率banner|sequence_data_list|
|1000020|3|2|1030436212907001|单日收入激励视频|sequence_data_list|
|1000020|6|2|1030436212907001|点击激励视频|sequence_data_list|
|1000020|5|2|1030436212907001|曝光激励视频|sequence_data_list|
|1000020|8|2|1030436212907001|点击率激励视频|sequence_data_list|
|1000020|3|2|3030046789020061|单日收入插屏|sequence_data_list|
|1000020|6|2|3030046789020061|点击插屏|sequence_data_list|
|1000020|5|2|3030046789020061|曝光插屏|sequence_data_list|
|1000020|8|2|3030046789020061|点击率插屏|sequence_data_list|
|1000020|7|2|8040321819858439|ecpm|sequence_data_list|
|1000020|7|2|1030436212907001|ecpm|sequence_data_list|
|1000020|7|2|3030046789020061|ecpm|sequence_data_list|
|1000020|10|||arpu|sequence_data_list|
|1000029|4|||累计注册用户|sequence_data_list|
|1000031|3|||累计总收入|sequence_data_list|
|1000012|4|||会话|group_data_list|
|1000036|6|||新增来源|rank_data_list|

### 微信小游戏接口

接口路径：https://game.weixin.qq.com/cgi-bin/gamewxagbdatawap/getwxagstat?session_id=%s&data=%s

data：替换掉里面的一些参数

    $replace=[
        'APPID'=>$job['appid'],
        'STARTTIME'=>$job['start_time'],
        'LASTTIME'=>$job['start_time']-86400*1,
        'THREETIME'=>$job['start_time']-86400*2,
        'SEVERNTIME'=>$job['start_time']-86400*6,
    ];

    {"need_app_info":true,"appid":"APPID","sequence_index_list":[{"size_type":24,"stat_type":1000001,"data_field_id":5,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000010,"data_field_id":3,"time_period":{"start_time":LASTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000010,"data_field_id":4,"time_period":{"start_time":THREETIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000010,"data_field_id":5,"time_period":{"start_time":SEVERNTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000011,"data_field_id":3,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000021,"data_field_id":3,"time_period":{"start_time":LASTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000021,"data_field_id":4,"time_period":{"start_time":THREETIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000021,"data_field_id":5,"time_period":{"start_time":SEVERNTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000028,"data_field_id":3,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000028,"data_field_id":4,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000028,"data_field_id":5,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[]},{"size_type":24,"stat_type":1000020,"data_field_id":3,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"banner","field_id":2,"value":"8040321819858439"}]},{"size_type":24,"stat_type":1000020,"data_field_id":5,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"banner","field_id":2,"value":"8040321819858439"}]},{"size_type":24,"stat_type":1000020,"data_field_id":6,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"banner","field_id":2,"value":"8040321819858439"}]},{"size_type":24,"stat_type":1000020,"data_field_id":7,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"banner","field_id":2,"value":"8040321819858439"}]},{"size_type":24,"stat_type":1000020,"data_field_id":8,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"banner","field_id":2,"value":"8040321819858439"}]},{"size_type":24,"stat_type":1000020,"data_field_id":3,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"插屏广告","field_id":2,"value":"3030046789020061"}]},{"size_type":24,"stat_type":1000020,"data_field_id":5,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"插屏广告","field_id":2,"value":"3030046789020061"}]},{"size_type":24,"stat_type":1000020,"data_field_id":6,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"插屏广告","field_id":2,"value":"3030046789020061"}]},{"size_type":24,"stat_type":1000020,"data_field_id":7,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"插屏广告","field_id":2,"value":"3030046789020061"}]},{"size_type":24,"stat_type":1000020,"data_field_id":8,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"插屏广告","field_id":2,"value":"3030046789020061"}]},{"size_type":24,"stat_type":1000020,"data_field_id":3,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"激励视频广告","field_id":2,"value":"1030436212907001"}]},{"size_type":24,"stat_type":1000020,"data_field_id":5,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"激励视频广告","field_id":2,"value":"1030436212907001"}]},{"size_type":24,"stat_type":1000020,"data_field_id":6,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"激励视频广告","field_id":2,"value":"1030436212907001"}]},{"size_type":24,"stat_type":1000020,"data_field_id":7,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"激励视频广告","field_id":2,"value":"1030436212907001"}]},{"size_type":24,"stat_type":1000020,"data_field_id":8,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"filter_list":[{"name":"激励视频广告","field_id":2,"value":"1030436212907001"}]},{"size_type":24,"stat_type":1000020,"data_field_id":3,"time_period":{"start_time":STARTTIME,"duration_seconds":86400}},{"size_type":24,"stat_type":1000020,"data_field_id":10,"time_period":{"start_time":STARTTIME,"duration_seconds":86400}}],"group_index_list":[{"size_type":24,"data_field_id":4,"group_id":2,"stat_type":1000012,"limit":50,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"is_stat_order_asc":false}],"rank_index_list":[{"size_type":24,"main_index":{"stat_type":1000036,"key_field_id":5,"data_field_id":6,"name":"来源","filter_list":[{"field_id":3,"value":"小游戏"},{"value":"-9999","field_id":4}]},"join_index_list":[{"name":"新增用户","stat_type":1000036,"key_field_id":5,"data_field_id":6,"filter_list":[{"field_id":3,"value":"小游戏"},{"value":"-9999","field_id":4}]},{"name":"首次付费用户数","stat_type":1000036,"key_field_id":5,"data_field_id":7,"filter_list":[{"field_id":3,"value":"小游戏"},{"value":"-9999","field_id":4}]},{"name":"首次付费总收入","stat_type":1000036,"key_field_id":5,"data_field_id":8,"unit":"元","filter_list":[{"field_id":3,"value":"小游戏"},{"value":"-9999","field_id":4}]},{"name":"注册用户次日留存率","stat_type":1000036,"key_field_id":5,"data_field_id":9,"unit":"%","filter_list":[{"field_id":3,"value":"小游戏"},{"value":"-9999","field_id":4}]}],"cur_page":0,"per_page":50,"time_period":{"start_time":STARTTIME,"duration_seconds":86400},"is_stat_order_asc":false}],"version":1}


