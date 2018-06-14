---
layout: post
title:  "Video在微信浏览器下的问题"
categories: Programmer
tags: 微信
author: 果果
description: Collect is a good behavior.
---


### 1，遇到一些问题
	
	*在微信浏览器内播放时，视频会自动全屏
	*视频的容器在安卓手机上会被视频的封面撑大到变形,如果每个视频都有一张自定义的图片作为封面，在显示视频的同时，如果没有给这个视频设置高度.
    

### 2，微信同层播放器的小知识收集

#### 2.1, `<video>`标签里的内联播放相关属性

微信在video标签上新增了一些x5的私有属性，分别是：<br>
1. `x5-video-player-type`
启用同层播放。取值固定为'h5'。
2. `x5-video-player-fullscreen`
是否全屏。取值为'true'或'false'。
3. `x5-video-orientation`
视频方向。取值分别为'landscape'、'portrait'或者'landscape|portrait'，分别对应横屏、竖屏及自动旋转（这个应该用的少）。
  
<br>
iOS平台相关的，则是这几个属性：
1. airplay （'allow'或'deny'）
2. x-webkit-airplay
3. playsinline (无需赋值，下同) /*IOS微信浏览器支持小窗内播放*/ 
4. webkit-playsinline /*这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/
<br>

安卓微信浏览器是X5内核，一些属性是不支持的，比如可以设置局部播放的属性 playsinline，因此，始终是全屏。
`webkit-playsinline playsinline`:视频播放时局域播放，不脱离文档流 。但是这个属性比较特别， 需要嵌入网页的APP比如WeChat中UIwebview 的allowsInlineMediaPlayback = YES webview.allowsInlineMediaPlayback = YES，才能生效。换句话说，如果APP不设置，你页面中加了这标签也无效，这也就是为什么安卓手机WeChat 播放视频总是全屏，因为APP不支持playsinline，而ISO的WeChat却支持。

这里就要补充下，如果是想做全屏直播或者全屏H5体验的用户，ISO需要设置删除 webkit-playsinline 标签，因为你设置 false 是不支持的 ，安卓则不需要，因为默认全屏。但这时候全屏是有播放控件的，无论你有没有设置control。 做直播的可能用得着播放控件，但是全屏H5是不需要的，那么去除全屏播放时候的控件，需要以下设置：同层播放。

`x5-video-player-type`：启用同层H5播放器，就是在视频全屏的时候，div可以呈现在视频层上，也是WeChat安卓版特有的属性。

`autoplay="autoplay"`： 视频自动播放设置，但是有经验的人都应该知道，autoplay标签在手机上不兼容，APP中设置问题导致无法自动播放，无论安卓或IOS。需要模拟自动播放只能通过一些事件触发。
  
#### 2.2，video.js

有空了再去研究