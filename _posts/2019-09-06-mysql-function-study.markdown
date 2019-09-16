---
layout: post
title:  "mysql 函数学习"
categories: mysql study 
tags: mysql
author: 果果
description: To get more knowledge.
---
数据库的方法学习
___
数据库的函数很多，但是好多用不到就不会，用到了也不知道他是怎么运行的，有什么用处，是否能用到索引。这样去用一个方法其实是很不好的，知识不存在模棱两可，只有会和不会。

格式：<br>
    函数简介：<br>
    使用实例：<br>
    索引使用：<br>
    备注：<br>

### sql判断if

if(expr,v1,v2) 如果expr结果为true，返回v1，反之返回v2； 

(expr1 <> 0 and expr1 <> NULL)

该语句和case expr when 1 then v1 else v2 end;作用一致

case when 相当于其他语言的switch语句

    case expr
        when v1 then r1
        when v2 then r2
        when v3 then r3
    else r4 end

### 与null相关

**ifnull** ifnull(v1,v2)如果v1不为null，则返回v1，反之返回v2

    select ifnull(null,'hello world'); ->hello world

用于数据为空的时候返回，一个默认值。当然也可以是数据为某一个值，让他为空后返回默认值

isnull(null) 如果为空返回1

nullif(v1,v2)   如果两个值相等返回null，不相等返回v1

coalesce(exp1,exp2,exp3....) 返回参数第一个非空表达式（从左到右）如果全是null返回null，当只有2个参数的时候和ifnull作用一样

### 字符串函数

#### 返回字符串属性

ascll(s) 返回字符串s第一个字符的ascll码

char_length(s) 返回字符串长度=character_length(s)

space(n) 返回 n 个空格

strcmp(s1,s2) 同php<=>功能返回比较结果0，1，-1，可以比较数字

#### 字符格式化字符变换

format(x,n) 格式化，格式化浮点数时，可以保留第几位小数，并四舍五入和truncate(x,n)不一样

lcase()==lower() 全部变小写字母

ucase()==upper() 全部转换为大写

reverse(s) 字符串反向

#### 字符串拼接

concat(s1,s2,s3...) 将多个字符串链接成一个字符串

concat_ws(x,s1,s2,s3...) 链接字符串，每个重中间都要加上x的字符

#### 返回匹配位置的：

field(s,s1,s2,s3...) 返回与s匹配的位置，可以拿来排序,返回第一个匹配

find_in_set(s1,s2) 返回s2在s1中匹配字符串的位置，同上

position(s1 in s) 从字符串s中获取s1开始的位置，功能同locate

locate(s1,s) 从字符串 s 中获取 s1 的开始位置，某种程度上和find_in_set差不多

#### 增加字符串长度的

lpad(s1,len,s2) 在字符串 s1 的开始处填充字符串 s2，使字符串长度达到 len 

rpad(s1,len,s2) 和上面一样是从s1最后添加字符串

repeat(s,n) 将字符串重复n次

#### 修改字符串

insert(s1,x,len,s2) 字符串s2替换s1的x位置开始长度为len的字符串

replace(s,s1,s2) 将字符串 s2 替代字符串 s 中的字符串 s1

#### 减少字符串长度

left(s,n)    返回前n个字母 

right(s,n) 返回s后面的几个字符

ltrim(s) 去掉字符串前面的空格 ，rtrim(s) 去掉后面的空格，trim去掉两边的

mid(s,n,len) 从字符串 s 的 n 位置截取长度为 len 的子字符串，同 SUBSTRING(s,n,len)

substr(s, start, length) 从字符串 s 的 start 位置截取长度为 length 的子字符串

substring 同上

substring_index(str,delim,count) 返回第几个分割符分割后的内容，count为正，从左到右，保留左边的全部，count为负，从右到左数，返回右边全部

    str=www.wikibt.com
    substring_index(str,'.',1) www
    substring_index(str,'.',2) www.wikibt
    substring_index(str,'.',-1) com
    substring_index(str,'.',-2) wikibt.com

### 时间函数

目测要在这里停留一段时间了，好多函数啊，既然要精通就认真一个一个看看吧。

>时间格式+0可以将时间变成数值形式

关键字**interval**可以配合时间函数做好时间运算

interval可以生成一下时间间隔type：

<table>
    <tr style="color:blue">
        <th>类型（type）</th>
        <th>含义</th>
        <th>expr表达形式</th>
    </tr>
    <tr>
        <td>year</td>
        <td>年</td>
        <td>YY</td>
    </tr>
    <tr>
        <td>month</td>
        <td>月</td>
        <td>MM</td>
    </tr>
    <tr>
        <td>day</td>
        <td>日</td>
        <td>DD</td>
    </tr>
    <tr>
        <td>hour</td>
        <td>时</td>
        <td>hh</td>
    </tr>
    <tr>
        <td>minute</td>
        <td>分</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>second</td>
        <td>秒</td>
        <td>ss</td>
    </tr>
    <tr>
        <td>year_month</td>
        <td>年月</td>
        <td>YY MM</td>
    </tr>
    <tr>
        <td>day_hour</td>
        <td>日时</td>
        <td>DD hh</td>
    </tr>
    <tr>
        <td>day_minute</td>
        <td>日分</td>
        <td>DD mm</td>
    </tr>
    <tr>
        <td>day_second</td>
        <td>日秒</td>
        <td>DD ss</td>
    </tr>
    <tr>
        <td>hour_minute</td>
        <td>时分</td>
        <td>hh mm</td>
    </tr>
    <tr>
        <td>hour_second</td>
        <td>时秒</td>
        <td>hh ss</td>
    </tr>
    <tr>
        <td>minute_second</td>
        <td>分秒</td>
        <td>mm ss</td>
    </tr>
    <tr>
        <td>microsecond</td>
        <td>毫秒</td>
        <td>没啥用</td>
    </tr>
</table>

#### 时间计算：

>d='2019-08-07' r='2019-08-07 14:19:59'

adddate(d,n) 本身是给d加上n天,如adddate(d,10)->2019-08-17，实际上配合interval可以变成各种时间操作,而且还和+连接的日期运算结果一致

    adddate(r,interval 10 day)=r+interval 10 day ->2019-08-17 14:19:59
    adddate(r,interval 10 hour)=r+interval 10 hour ->2019-08-08 00:19:599
    adddate(r,interval 10 second)=r+interval 10 hour ->2019-08-07 14:20:09
    adddate(r,interval '10 10' day_second) 略

subdate(d,n) 用法和adddate一样

addtime(r,n) 给r时间加上n秒，不和addate一样，很废物

subtime(r,n) 时间t减去n秒

adddate==date_add

date_add(date,interval expr type)只能这样使用,不能
<del>date_add(date,10)</del>

date_sub(date,interval expr type) 从日期减去指定的时间间隔,运算符号和函数作用一样

    date_sub(date,interval expr type)==date-interval expr type

datediff(d1,d2) 计算d1到d2直接间隔的天数，d1早，d2晚，结果为负数，反之正数

timediff(t1,t2) 计算2个时间之间的差值

timestamp(expression,interval) 单个参数时返回参数的日期时间格式，2个参数时是2个参数的加和，经过测试结果，其实是把第二个值的时分秒部分，加到第一个值上面。

    TIMESTAMP(CURRENT_TIME,CURRENT_TIME)；CURRENT_TIME=2019-09-10 18:28:32
    实际上是2019-09-10 18:28:32 + 18:28:32 得出2019-09-11 12:57:04的结果

单独的一些日期计算：

    dayname(d) 日期是本周的周几 Friday
    dayofweek(d) 日期是本周的第几天 1=星期天，2=星期一
    dayofmonth(d) 日期是本月的第几天
    dayofyear(d) 日期是本年的第几天
    weekday(d) 返回星期几，0是星期一，1是星期二
    last_day(d) 返回这个月最后一天的日期
    week(d)=weekofyear 返回本年的第几个星期
    monthname(d) 月份是本年的几月 Janyary

from_days\to_days这两个似乎没有什么用，用来计算到第零天的时间的

makedate(year ,day-of-year) 根据给定年份和天数需要返回月份

maketime(hour,minute,second) 组合时间

#### 时间格式转化

sec_to_time(s) ->将秒为单位的时间转化为时分秒的格式

time_to_sec(t) 将时间转为为s数

str_to_date(string,format_mask) 将字符串转变为日期 
    
    STR_TO_DATE("August 10 2017", "%M %d %Y");

date_fomat(d,f) DATE_FORMAT('2011-11-11 11:11:11','%Y-%m-%d %r')

convert_tz(dt,from_tz,to_tz) 从一个时区转化到另一个时区

    select convert_tz('2019-01-01 12:00:00','GMT','MET');->null 参数无效返回null
    select convert_tz('2019-01-01 12:00:00','+00:00','+10:00');->2019-01-01 22:00:00

period_add PERIOD_ADD(201703, 5)->201708

period_diff(201710,201703)

from_unixtime(unix_timestamp,format) 将时间戳变为日期格式，格式化输出YYYY-MM-DD hh:mm:ss或者是YYYYMMDDhhmmss.uuuuuu，返回值以会话时区表示，可能需要根据要求更改会话时区

unix_timestamp(format) 将时间转化为时间戳，也可以返回当前默认的时间戳

get_format({data|time|timestamp},{'EUR'|'USA'|'JIS'|'ISO'|'INTERNAL'}) 返回格式字符串，可以配合date_format和str_to_date功能结合使用

timestamp(date,[expr1]) 返回第一个参数日期时间格式，如果有第二个参数，就将第二个参数加在第一个上面返回

timestampadd(type num,date_expr) 

    SELECT TIMESTAMPADD(MINUTE,1,'2003-01-02');        -> '2003-01-02 00:01:00'
    SELECT TIMESTAMPADD(WEEK,1,'2003-01-02');           -> '2003-01-09'

timestampdiff(type,date1,date2)

    mysql> SELECT TIMESTAMPDIFF(MONTH,'2003-02-01','2003-05-01');
        -> 3
    mysql> SELECT TIMESTAMPDIFF(YEAR,'2002-05-01','2001-01-01');
        -> -1
    mysql> SELECT TIMESTAMPDIFF(MINUTE,'2003-02-01','2003-05-01 12:05:55');
        -> 128885

#### 当前时间：

查看当前时间绕不开时区设置那么

    查看时区设置
    show variables like '%zone%';
    select @@time_zone;
    my.cnf找到mysqld
    在下面修改
    default-time-zone = '+8:00'

下面等号两边结果一样，左边的可以忽略括号，同时一下都是返回开始执行的时间，systime()会根据系统时间而定，sleep(5)之后systime()就不一样了

current_date()==curdate() 返回当前日期，更像是一个当前时间的变量一样

current_time()==curtime() 返回当前时间hh:mm:ss

current_timestamp()==now()=localtime()=localtimestamp() 返回当前时间 YY-MM-DD hh:mm:ss

current_date如果返回数值型的如current_date+0 ->YYMMDD

#### 返回时间的各个部分：

year(),month(),day(),hour(),minute(),second()

extract(type from d) 可以根据type不同返回指定值

date() 返回年月日的部分

time() 返回时分秒的部分

week(date,mode) 根据mode不同返回值会不同，mode影响第一天是星期几来算mode:1-7

utc_date(),utc_time(),utc_timestamp()除了时间不一样，其他格式一致

### 字符集函数以及进制转换

convert(s using cs) 将字符串s的字符集变成cs

    select charset('ABC');->utf-8
    select charset(convert('ABC' using gbk));->gbk

conv(x,v1,v2) 将x从v1进制变成v2进制

    select conv(55,16,2); ->1010101

cast(x as type) 转化数据类型
    
    select cast("2019-09-10"  as datetime);->2019-09-10 00:00:00

binary(x) 字符串转化为二进制字符串 和运算符binary差不多

    binary(x) binary "x" 用于区分大小写，mysql不区分大小写

bin(x) 返回字符串的二进制编码

### AUTO_INCREMENT与自增相关

last_insert_id() 查看最近的insert_id，好多扩展都已经包含了这个功能

**注意：**使用insert into语句一次插入多行记录，会返回插入新的第一行的id

php扩展mysqli_insert_id($link) 返回最后一个语句(insert,update)的AUTO_INCREMENT,如果最后一个语句不是insert或者update或者没有AUTO_INCREMENT的列的话，返回值为0

### 数字函数

    ABS()   返回绝对值
    CEIL()  返回不小于参数的最小整数值
    CEILING()   返回不小于参数的最小整数值
    FLOOR() 返回不大于参数的最大整数值
    n div m 计算2个数相除
    GREATEST(q1,q2,q3...) 返回列表中的最大值
    LEAST(q1,q2,q3...) 返回列表中的最小值
    MAX()   返回最大值
    MIN()   返回最小值
    CONV()  转换进制，详见字符集转化
    MOD()   返回余数
    RAND()  返回随机浮点值，返回随机数
    ROUND() 围绕论点，返回离 x 最近的整数
    TRUNCATE()  截断到指定的小数位数，保留几位小数直接舍余,区分关键字truncate
    SIGN()  返回参数的符号 -1 1
    
    ACOS()  返回反余弦
    ASIN()  返回圆弧正弦
    ATAN()  返回反正切
    TAN()   返回参数的正切值
    DEGREES()   将弧度转换为度数
    RADIANS()   将角度转换为弧度
    ATAN2()， ATAN() 返回两个参数的反正切
    SIN()   返回参数的正弦值
    COS()   返回余弦
    COT()   返回余切
    
    EXP(m)   计算e的m次方
    LN()    返回参数的自然对数
    LOG()   返回第一个参数的自然对数
    LOG10() 返回参数的以10为底的对数
    LOG2()  返回参数的base-2对数
    PI()    返回pi的值
    POW()   返回 x 的 y 次方
    POWER() 返回 x 的 y 次方
    SQRT()  返回参数的平方根

    CRC32() 计算循环冗余校验值

### 不常用函数

>connection_id() 返回服务器的连接数
>DATABASE() 返回当前数据库的名称
>version() 查看版本号
>user();system_user();session_user();current_user(); 返回当前用户

### 附录

#### 时间函数的格式化表

<table summary="Specifier characters for the DATE_FORMAT function that may be used in the format string and provides a description of each specifier character."><colgroup><col width="20%"><col width="70%"></colgroup><thead><tr>
              <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">符</font></font></th>
              <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">描述</font></font></th>
            </tr></thead><tbody><tr>
              <td scope="row"><code class="literal">%a</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">工作日缩写名称（</font></font><code class="literal">Sun</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">Sat</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%b</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">缩写的月份名称（</font></font><code class="literal">Jan</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">Dec</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%c</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">月，数字（</font></font><code class="literal">0</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">12</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%D</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">这个月的一天，英语后缀（</font></font><code class="literal">0th</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，
                 </font></font><code class="literal">1st</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，</font></font><code class="literal">2nd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，
                 </font></font><code class="literal">3rd</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，...）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%d</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">每月的某一天，数字（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">31</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%e</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">每月的某一天，数字（</font></font><code class="literal">0</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">31</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%f</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">微秒（</font></font><code class="literal">000000</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">... </font></font><code class="literal">999999</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%H</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">小时（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">23</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%h</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">小时（</font></font><code class="literal">01</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">12</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%I</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">小时（</font></font><code class="literal">01</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">12</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%i</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">分钟，数字（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">59</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%j</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">一年中的一天（</font></font><code class="literal">001</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">366</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%k</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">小时（</font></font><code class="literal">0</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">23</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%l</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">小时（</font></font><code class="literal">1</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">12</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%M</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">月份名称（</font></font><code class="literal">January</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">December</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%m</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">月，数字（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">12</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%p</code></td>
              <td><code class="literal">AM</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> 要么 </font></font><code class="literal">PM</code></td>
            </tr><tr>
              <td scope="row"><code class="literal">%r</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">时间，12小时（</font></font><em class="replaceable"><code>hh:mm:ss</code></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">其次是
                 </font></font><code class="literal">AM</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">或</font></font><code class="literal">PM</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%S</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">秒（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">... </font></font><code class="literal">59</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%s</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">秒（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">... </font></font><code class="literal">59</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%T</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">时间，24小时（</font></font><em class="replaceable"><code>hh:mm:ss</code></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%U</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">周（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">53</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">），周日是一周的第一天;
                </font></font><a class="link" href="date-and-time-functions.html#function_week"><code class="literal">WEEK()</code></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">模式0</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%u</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">周（</font></font><code class="literal">00</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">53</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">），周一是一周的第一天;
                </font></font><a class="link" href="date-and-time-functions.html#function_week"><code class="literal">WEEK()</code></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">模式1</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%V</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">周（</font></font><code class="literal">01</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">53</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">），周日是一周的第一天;
                </font></font><a class="link" href="date-and-time-functions.html#function_week"><code class="literal">WEEK()</code></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">模式2; </font><font style="vertical-align: inherit;">用于
                </font></font><code class="literal">%X</code></td>
            </tr><tr>
              <td scope="row"><code class="literal">%v</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">周（</font></font><code class="literal">01</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">53</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">），周一是一周的第一天;
                </font></font><a class="link" href="date-and-time-functions.html#function_week"><code class="literal">WEEK()</code></a><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">模式3; </font><font style="vertical-align: inherit;">用于
                </font></font><code class="literal">%x</code></td>
            </tr><tr>
              <td scope="row"><code class="literal">%W</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">工作日名称（</font></font><code class="literal">Sunday</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">.. </font></font><code class="literal">Saturday</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%w</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">星期几（</font></font><code class="literal">0</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">=星期日.. </font></font><code class="literal">6</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">=星期六）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%X</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">星期日是星期的第一天的星期，数字，四位数; </font><font style="vertical-align: inherit;">用于</font></font><code class="literal">%V</code></td>
            </tr><tr>
              <td scope="row"><code class="literal">%x</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">一周的年份，星期一是一周的第一天，数字，四位数; </font><font style="vertical-align: inherit;">用于</font></font><code class="literal">%v</code></td>
            </tr><tr>
              <td scope="row"><code class="literal">%Y</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">年份，数字，四位数</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%y</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">年份，数字（两位数）</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%%</code></td>
              <td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">文字</font></font><code class="literal">%</code><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">字符</font></font></td>
            </tr><tr>
              <td scope="row"><code class="literal">%<em class="replaceable"><code>x</code></em></code></td>
              <td><em class="replaceable"><code>x</code></em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">，对于</font><font style="vertical-align: inherit;">上面未列出的</font><font style="vertical-align: inherit;">任何
                 </font></font><span class="quote"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">“ </font></font><span class="quote"><em class="replaceable"><code>x</code></em></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">”</font></font></span><font style="vertical-align: inherit;"></font></td>
</tr></tbody></table>










