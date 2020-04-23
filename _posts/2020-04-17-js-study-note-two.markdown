---
layout: post
title:  "ES5学习笔记（二）"
categories: js
tags: js study
author: 果果
description: The more study,the more notes.
---
承接学习一，我觉得分开更好点，毕竟一已经太长了。前面的是基础里不熟悉的，这里可能就是我用的比较少，甚至不会的吧。

#### 异步操作

js是单线程的，为了避免浏览器过于复杂。这个特点构成了js的优势，如果用的好是不会出现阻塞的，这是Node可以用少的资源，应付大流量访问。

1.回调函数是异步操作的最基本方法，这个之后可以在小程序里试试，省的找不到顺序

    function f1(callback) {
      // ...
      callback();
    }

    function f2() {
      // ...
    }

    f1(f2);

2.时间监听，当某个时间发生执行另一个

    f1.on('done', f2);
    f1.trigger('done');

3.串行并行的结合执行异步方法

    var items = [ 1, 2, 3, 4, 5, 6 ];
    var results = [];
    var running = 0;
    var limit = 2;

    function async(arg, callback) {
      console.log('参数为 ' + arg +' , 1秒后返回结果');
      setTimeout(function () { callback(arg * 2); }, 1000);
    }

    function final(value) {
      console.log('完成: ', value);
    }

    function launcher() {
      while(running < limit && items.length > 0) {
        var item = items.shift();
        async(item, function(result) {
          results.push(result);
          running--;
          if(items.length > 0) {
            launcher();
          } else if(running == 0) {
            final(results);
          }
        });
        running++;
      }
    }

    launcher();

4.定时器

setTimeout(fun,time,arg1,arg2...) 除了方法和事件还可以传回调函数的参数进去

    setTimeout(f)==setTimeout(f, 0)

**5.Promise 对象**

Promise 可以让异步操作写起来，就像在写同步操作的流程，而不必一层层地嵌套回调函数；Promise回调函数属于异步任务，会在同步任务之后执行。

    function f1(resolve, reject) {
      // 异步代码...
    }

    var p1 = new Promise(f1);
    p1.then(f2);

    // Promise 的写法
    (new Promise(step1))
      .then(step2)
      .then(step3)
      .then(step4);

Promise包含3个对象状态

- 异步操作未完成（pending）
- 异步操作成功（fulfilled）
- 异步操作失败（rejected）

fulfilled和rejected合称resolved已定行

使用方法
---

    var promise = new Promise(function (resolve, reject) {
      // ...
      if (/* 异步操作成功 */){
        resolve(value);
      } else { /* 异步操作失败 */
        reject(new Error());
      }
    });

Promise 实例的`then`方法:可以链式使用

    var p1 = new Promise(function (resolve, reject) {
      resolve('成功');
    });
    p1.then(console.log, console.error);

    f1().then(function () {
      return f2();
    });

不同的写法带来的不同：

    // 写法一，f3的参数是f2的结果
    f1().then(function () {
      return f2();
    }).then(f3);

    // 写法二，f3的参数是undefined
    f1().then(function () {
      f2();
    }).then(f3);

    // 写法三，f3的参数是f2返回的结果，有就是有没有undefined
    f1().then(f2()).then(f3);

    // 写法四，和第一种类似，只是f2可以接受f1的结果
    f1().then(f2).then(f3);


#### DOM，什么是dom

DOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model），作用是将网页转为一个 JavaScript 对象。

1.DOM节点类型：这些节点都继承Node对象，对应常量，Node.DOCUMENT_NODE

- Document：整个文档树的顶层节点，9
- DocumentType：doctype标签（比如<!DOCTYPE html>），10
- Element：网页的各种HTML标签（比如`<body>、<a>`等），1
- Attr：网页元素的属性（比如class="right"），2
- Text：标签之间或标签包含的文本，3
- Comment：注释，8
- DocumentFragment：文档的片段，11

2.每个节点3个层级关系

- 父节点关系（parentNode）：直接的那个上级节点
- 子节点关系（childNodes）：直接的下级节点
- 同级节点关系（sibling）：拥有同一个父节点的节点

firstChild，lastChild，nextSibling，previousSibling

3.Node的属性

| 属性 | 描述 | 例子 |
| ---- | ---- | ---- |
|nodeType| 节点类型| Node.DOCUMENT_NODE==9 |
|nodeName| 节点名称| DIV |
|nodeValue| 文本值| div.firstChild.nodeValue|
|textContent| 当前和后代的文本内容|document.getElementById('divA').textContent|
|baseURI|网页的绝对路径|document.baseURI|
|ownerDocument|顶层文档对象|p.ownerDocument|
|nextSibling |当前节点后面第一同级|包括文本节点和注释节点|
|previousSibling|当前节点前面的同级|没有返回null|
|parentNode|父节点|node.parentNode|
|parentElement|父元素节点|父级不是元素节点返回null|
|firstChild-lastChild |子节点|可能是文本节点或注释节点|
|childNodes|类似数组的对象|返回对象的数组|
|isConnected |当前节点是否在文档之中|test.isConnected|
|appendChild|插入文档的子节点|document.body.appendChild(p)|
|hasChildNodes|是否有子节点|foo.hasChildNodes()|
|cloneNode|克隆节点|div.cloneNode(true)|
|insertBefore|插入父节点内部的指定位置|parentNode.insertBefore(newNode, referenceNode)|
|removeChild|删除子节点|element.removeChild(element.firstChild);|
|replaceChild|替换子节点|parentNode.replaceChild(newChild, oldChild)|
|contains|是否为当前或者后代节点|nodeA.contains(nodeA)|
|getRootNode|返回根节点|-|

4.HTMLCollection实例

- document.links
- document.forms
- document.images

5.原始的元素选取

    document.querySelector() //不支持伪类
    document.querySelectorAll() //不支持伪类
    document.getElementsByTagName() //
    document.getElementsByClassName() //不用加.了
    document.getElementsByName()
    document.getElementById()

6.事件监听方法

- `Element.addEventListener()`：添加事件的回调函数
- `Element.removeEventListener()`：移除事件监听函数
- `Element.dispatchEvent()`：触发事件

[Dom和ElE节点的方法](https://wangdoc.com/javascript/dom/element.html)

7.删除行内样式可以使用`document.querySelector('div').style.cssText('')`

8.光滑滚动到某个位置

    window.scrollTo({
      top: 1000,
      behavior: 'smooth'
    });

9.iframe里元素的读取

    var frame = document.getElementById('theFrame');
    var frameDoc = frame.contentDocument;

    // 等同于
    var frameDoc = frame.contentWindow.document;

#### XMLHttpRequest 对象

AJAX通过原生的XMLHttpRequest发出http请求，得到服务器返回的数据后，在进行处理。

构建新的实例
>var xhr = new XMLHttpRequest();

建立新的http连接，第三个参数true标识异步请求
>xhr.open('GET', 'http://www.example.com/page.php', true);

指定回调函数，监听通讯状态变化,一旦实例发生变化就会调用回调函数
>xhr.onreadystatechange = handleStateChange;
>function handleStateChange(){}

最后发出请求，get这个不带数据体，如果post的化是要带数据体的
>xhr.send(null);

看代码：

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
      // 通信成功时，状态值为4
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          console.log(xhr.responseText);
        } else {
          console.error(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };

    xhr.open('GET', '/endpoint', true);
    xhr.send(null);

responseType ：

    ""（空字符串）：等同于text，表示服务器返回文本数据。
    "arraybuffer"：ArrayBuffer 对象，表示服务器返回二进制数组。
    "blob"：Blob 对象，表示服务器返回二进制对象。
    "document"：Document 对象，表示服务器返回一个文档对象。
    "json"：JSON 对象。
    "text"：字符串。

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/path/to/image.png', true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status === 200) {
        var blob = new Blob([xhr.response], {type: 'image/png'});
        // 或者
        var blob = xhr.response;
      }
    };
    xhr.send();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/path/to/image.png', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      var uInt8Array = new Uint8Array(this.response);
      for (var i = 0, len = uInt8Array.length; i < len; ++i) {
        // var byte = uInt8Array[i];
      }
    };
    xhr.send();

#### 同源策略

1.同公司总域名下面的子域名可以通过同源策略，获取不同站点的cookie

    document.domain = 'example.com';//需要同源的2个域名都要设置
    document.cookie

也可以用来再iframe里面用来父子页面通讯，否则不同源的是不能通讯的

2.片段识别码

父窗口可以把信息写入子窗口的片段识别码

    var src = originURL + '#' + data;
    document.getElementById('myIFrame').src = src;
子窗口识别响应

    window.onhashchange = checkMessage;
    function checkMessage() {
      var message = window.location.hash;
      // ...
    }

3.window.postMessage()

    // 父窗口打开一个子窗口
    var popup = window.open('http://bbb.com', 'title');
    // 父窗口向子窗口发消息
    popup.postMessage('Hello World!', 'http://bbb.com');
    // 子窗口向父窗口发消息
    window.opener.postMessage('Nice to see you', 'http://aaa.com');
    // 监听 message 消息
    window.addEventListener('message', function (e) {
      console.log(e.data);
    },false);

*4.JSONP 简单易用没有兼容性问题，老式浏览器全都支持*

第一步，添加一个这样的脚本

    <script src="http://api.foo.com?callback=bar"></script>

第二部，服务器接受到请求拼接一个json放在函数名利返回如`bar({...})`

第三步，客户端会将游戏服务器返回的字符串作为代码解析，浏览器会把script返回的内容认定为请求的脚本。返回的字符串相当于再执行bar()方法。

    function addScriptTag(src) {
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.src = src;
      document.body.appendChild(script);
    }

    window.onload = function () {
      addScriptTag('http://example.com/ip?callback=foo');
    }

    function foo(data) {
      console.log('Your public IP address is: ' + data.ip);
    };

5.websocket服务器支持就可以跨源

使用ws://（非加密）和wss://（加密）作为协议前缀

6.CORS 

服务器根据请求头信息里的Origin，判断是否允许跨源，返回头信息包含`Access-Control-Allow-Origin`

>Access-Control-Allow-Credentials:true//允许发送cookie

>php的写法：header("Access-Control-Allow-Origin: *");

#### 浏览器存储

1.Storage 接口`window.sessionStorage`和`window.localStorage`

storage 的存储空间也是比较大的，通常Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB

storage事件：

    Storage.setItem()
    Storage.getItem()
    Storage.removeItem()
    Storage.clear()
    Storage.key()
    window.addEventListener('storage', onStorageChange);

2.IndexedDB类似于NoSql可以在前端查询，建立索引

打开数据库,不存在就新建，version不写默认为1，或者当前版本
>var request = window.indexedDB.open(databaseName, version);

request数据库对象有3个事件来操作

    request.onerror = function (event) {
      console.log('数据库打开报错');
    };

    var db;
    request.onsuccess = function (event) {
      db = request.result;
      console.log('数据库打开成功');
    };

    //指定的版本号，大于数据库的实际版本号
    var db;
    request.onupgradeneeded = function (event) {
      db = event.target.result;
    }

新建数据库，之后基本上就是再`onupgradeneeded`里操作，因为版本号从无到有

新建一张表，主键是id,也可以先判断是否有表，`db.objectStoreNames.contains('person')`

    var db;
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      var objectStore = db.createObjectStore('person', { keyPath: 'id' });
    }
    //可以在建表的时候自动生成主键{ autoIncrement: true }

    //创建索引
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });

写入数据：

    function add() {
      var request = db.transaction(['person'], 'readwrite')//建立事物
        .objectStore('person')
        .add({ id: 1, name: '张三', age: 24, email: 'zhangsan@example.com' });
      request.onsuccess = function (event) {
        console.log('数据写入成功');
      };
      request.onerror = function (event) {
        console.log('数据写入失败');
      }
    }
    add();

读取数据：

    function read() {
       var transaction = db.transaction(['person']);
       var objectStore = transaction.objectStore('person');
       var request = objectStore.get(1);//主键的值

       request.onerror = function(event) {
         console.log('事务失败');
       };

       request.onsuccess = function( event) {
          if (request.result) {
            console.log('Name: ' + request.result.name);
            console.log('Age: ' + request.result.age);
            console.log('Email: ' + request.result.email);
          } else {
            console.log('未获得数据记录');
          }
       };
    }

    read();

更新内容：

    function update() {
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

      request.onsuccess = function (event) {
        console.log('数据更新成功');
      };

      request.onerror = function (event) {
        console.log('数据更新失败');
      }
    }

    update();

删除：

    function remove() {
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .delete(1);

      request.onsuccess = function (event) {
        console.log('数据删除成功');
      };
    }

    remove();

按照其他索引读取：

    var transaction = db.transaction(['person'], 'readonly');
    var store = transaction.objectStore('person');
    var index = store.index('name');
    var request = index.get('李四');

    request.onsuccess = function (e) {
      var result = e.target.result;
      if (result) {
        // ...
      } else {
        // ...
      }
    }

[更多IndexedDB](https://wangdoc.com/javascript/bom/indexeddb.html)
























    




