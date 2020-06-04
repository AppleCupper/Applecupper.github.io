---
layout: post
title:  "学习socket编程学习路线"
categories: socket
tags: php socket
author: 果果
description: I am going to the deepness.
---

作为近期的目标之一，这里保留socket学习的流程。从初期的了解来看，学习路线应该是`Socket原理`->`前端websocket和php端socket`->`使用workman等框架实现socket`，学习中间夹杂着网络通讯的shell命令学习，保留node,python,go实现socket的学习。

### web Socket实现

Web Socket是H5的新特性之一 ，具体的可以查看MDN上的文档[WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

    var ws = new WebSocket('ws://localhost:8080');//使用IP或者是域名都可以

    ws.onopen = function(evt) { //当前连接已经准备好发送和接受数据了
      console.log("Connection open ..."); 
      ws.send("Hello WebSockets!"); //发送消息到服务器
    };

    ws.onmessage = function(evt) { //从服务器接收到的内容
      console.log( "Received Message: " + evt.data);
      
      if(typeof evt.data === String){
        console.log("Received data string");
      }
    
      if(event.data instanceof ArrayBuffer){
        var buffer = event.data;
        console.log("Received arraybuffer");
      }

      if(event.data instanceof Blob){
        var buffer = event.data;
        console.log("Received Blob");
      }
    
      ws.close();
    };

    ws.onclose = function(evt) { //当readystate变为close时调用，evt对象如下
      console.log("Connection closed.");
      var code = evt.code;
      var reason = evt.reason;
      var wasClean = evt.wasClean;
    };

下面可以根据监听ws的readyState的状态来进行某些操作

    switch (ws.readyState) {
      case WebSocket.CONNECTING://值为0，表示正在连接
        // do something
        break;
      case WebSocket.OPEN://连接成功了
        // do something
        break;
      case WebSocket.CLOSING://正在关闭
        // do something
        break;
      case WebSocket.CLOSED://已经关闭，或连接失败
        // do something
        break;
      default:
        // this never happens
        break;
    }

可以使用addEventListener添加多个回调函数

    ws.addEventListener('open', function (event) {
      ws.send('Hello Server!');
    });

可以通过binaryType显式的指定受到二进制的类型

    // 收到的是 blob 数据
    ws.binaryType = "blob";
    ws.onmessage = function(e) {
      console.log(e.data.size);
    };

    // 收到的是 ArrayBuffer 数据
    ws.binaryType = "arraybuffer";
    ws.onmessage = function(e) {
      console.log(e.data.byteLength);
    };

发送的例子
    
    ws.send('your message');
    //发送blob对象
    var file = document.querySelector('input[type="file"]').files[0];
    ws.send(file);
    //发送ArrayBuffer对象
    var img = canvas_context.getImageData(0, 0, 400, 320);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++) {
      binary[i] = img.data[i];
    }
    ws.send(binary.buffer);
    
    //判断是否发送完毕
    if (socket.bufferedAmount === 0) {
      // 发送完毕
    } else {
      // 发送还没结束
    }

### PHP Socket实现

测试了php手册提供的服务端代码：

    <?php
    error_reporting(E_ALL);

    /* Allow the script to hang around waiting for connections. */
    set_time_limit(0);

    /* Turn on implicit output flushing so we see what we're getting
     * as it comes in. */
    ob_implicit_flush();

    $address = '192.168.10.204';
    $port = 10000;

    if (($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
        echo "socket_create() failed: reason: " . socket_strerror(socket_last_error()) . "\n";
    }

    if (socket_bind($sock, $address, $port) === false) {
        echo "socket_bind() failed: reason: " . socket_strerror(socket_last_error($sock)) . "\n";
    }

    if (socket_listen($sock, 5) === false) {
        echo "socket_listen() failed: reason: " . socket_strerror(socket_last_error($sock)) . "\n";
    }

    do {
        if (($msgsock = socket_accept($sock)) === false) {
            echo "socket_accept() failed: reason: " . socket_strerror(socket_last_error($sock)) . "\n";
            break;
        }
        /* Send instructions. */
        $msg = "\nWelcome to the PHP Test Server. \n" .
            "To quit, type 'quit'. To shut down the server type 'shutdown'.\n";
        socket_write($msgsock, $msg, strlen($msg));

        do {
            if (false === ($buf = socket_read($msgsock, 2048, PHP_NORMAL_READ))) {
                echo "socket_read() failed: reason: " . socket_strerror(socket_last_error($msgsock)) . "\n";
                break 2;
            }
            if (!$buf = trim($buf)) {
                continue;
            }
            if ($buf == 'quit') {
                break;
            }
            if ($buf == 'shutdown') {
                socket_close($msgsock);
                break 2;
            }
            $talkback = "PHP: You said '$buf'.\n";
            socket_write($msgsock, $talkback, strlen($talkback));
            echo "$buf\n";
        } while (true);
        socket_close($msgsock);
    } while (true);

    socket_close($sock);

php当然也可以发送socket不过没必要，毕竟我想要的时服务端的内容。

### 使用workman实现socket

[workman](https://www.workerman.net/) 留一手workman官方文档，文档还是很全的，里面有很多直接实现socket的例子，做的聊天工具。感觉可以基于那个做2次开发，但是实际上，更详细的还没有研究，之后单独研究那个对做即时通讯和游戏功能的一些应用。

同理，使用swoole也是一样的，不过swoole的官方教程不够好，之后再单独总结一下吧！