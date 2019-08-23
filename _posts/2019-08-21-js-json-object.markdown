---
layout: post
title:  "JS 中 JSON.parse和JSON.stringify的坑"
categories: js daily
tags: JSON keng
author: 果果
description: Js has many problem which I don't know.
---

最近在做前后端接口的时候遇到了一个问题，顺便把这2个东西给单独拿出来查清楚。这两个小可爱是什么呢？JSON.parse和JSON.stringify，下面来简单介绍一下。

### 1，JSON.parse

JSON.parse() 方法将数据转换为 JavaScript 对象，一般后台输出的json格式需要使用这个来转化一下，使用jq返回ajax的话不需要，ajax返回的值本身就已经被转化成了js对象了。

如原生ajax：

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = myObj.name;
        }
    };
    xmlhttp.open("GET", "/try/ajax/json_demo.txt", true);
    xmlhttp.send();
	

第二个参数可以遍历对象执行回调函数：

    var text = '{ "name":"Runoob", "initDate":"2013-12-14", "site":"www.runoob.com"}';
    var obj = JSON.parse(text, function (key, value) {
        if (key == "initDate") {
            return new Date(value);
        } else {
            return value;
    }});
     
    document.getElementById("demo").innerHTML = obj.name + "创建日期：" + obj.initDate;

### 2，JSON.stringify

JSON.stringify() 方法将 JavaScript 对象转换为json字符串

JSON.stringify(value[, replacer[, space]])

value:必需， 要转换的 JavaScript 值（通常为对象或数组）。

replacer:可选。用于转换结果的函数或数组。

    如果 replacer 为函数，则 JSON.stringify 将调用该函数，并传入每个成员的键和值。使用返回值而不是原始值。如果此函数返回 undefined，则排除成员。根对象的键是一个空字符串：""。

    如果 replacer 是一个数组，则仅转换该数组中具有键值的成员。成员的转换顺序与键在数组中的顺序一样。当 value 参数也为数组时，将忽略 replacer 数组。

space:

    可选，文本添加缩进、空格和换行符，如果 space 是一个数字，则返回值文本在每个级别缩进指定数目的空格，如果 space 大于 10，则文本缩进 10 个空格。space 也可以使用非数字，如：\t。

### 3.实际问题

当json遇到bigint的时候会出现错误，因为超过json的最大承受范围。解决方案是把数字变成字符串。

前端html要显示json格式：代码

展示代码的部分要用pre标签圈起来

下面是js

    json=eval('(' + json.replace(/:\s*(\d{16,})(?=\s*[,\}])/g,":\"$1\"") + ')');//将bigint型数据转化为字符串，用来代替JSON.parse()
    json=JSON.stringify(json,null,4);
    $('#json_'+id).children('td').children('pre').children('code').html(json);

这个方法同样但是不是很好用

    var formatJson = function(json, options) {
            var reg = null,
                formatted = '',
                pad = 0,
                PADDING = '    '; // one can also use '\t' or a different number of spaces
            // optional settings
            options = options || {};
            // remove newline where '{' or '[' follows ':'
            options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
            // use a space after a colon
            options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

            // begin formatting...

            // make sure we start with the JSON as a string
            if (typeof json !== 'string') {
                json = JSON.stringify(json);
            }
            // parse and stringify in order to remove extra whitespace
            json = JSON.parse(json);
            json = JSON.stringify(json);

            // add newline before and after curly braces
            reg = /([\{\}])/g;
            json = json.replace(reg, '\r\n$1\r\n');

            // add newline before and after square brackets
            reg = /([\[\]])/g;
            json = json.replace(reg, '\r\n$1\r\n');

            // add newline after comma
            reg = /(\,)/g;
            json = json.replace(reg, '$1\r\n');

            // remove multiple newlines
            reg = /(\r\n\r\n)/g;
            json = json.replace(reg, '\r\n');

            // remove newlines before commas
            reg = /\r\n\,/g;
            json = json.replace(reg, ',');

            // optional formatting...
            if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
                reg = /\:\r\n\{/g;
                json = json.replace(reg, ':{');
                reg = /\:\r\n\[/g;
                json = json.replace(reg, ':[');
            }
            if (options.spaceAfterColon) {
                reg = /\:/g;
                json = json.replace(reg, ': ');
            }

            $.each(json.split('\r\n'), function(index, node) {
                var i = 0,
                    indent = 0,
                    padding = '';

                if (node.match(/\{$/) || node.match(/\[$/)) {
                    indent = 1;
                } else if (node.match(/\}/) || node.match(/\]/)) {
                    if (pad !== 0) {
                        pad -= 1;
                    }
                } else {
                    indent = 0;
                }

                for (i = 0; i < pad; i++) {
                    padding += PADDING;
                }

                formatted += padding + node + '\r\n';
                pad += indent;
            });

            return formatted;
        };

