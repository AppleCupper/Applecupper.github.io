---
layout: post
title:  "使用swoole框架部署的第一个接口项目"
categories: swoole
tags: php swoole
author: 果果
description: I will be a good phper in the further.
---
swoole是php的一个基于协程的php扩展级框架，对实现高性能api和socket编程有很大的优势。当前swoole是4.4版本。第一次使用没有基于swoole从扩展级别零基础开始。开发是基于easyswoole进行的。写下当前情况下的理解方便之后加深印象。

相关连接：
[swoole文档](https://wiki.swoole.com/#/environment)
[easyswoole文档](https://www.easyswoole.com/)

### 1.环境搭建

直接看文档就能完成环境搭建，因为自己测试开发，所以新装了Ubuntu镜像从零开始尝试，写一下中间遇到的问题。和解决方式。

#### 常规安装swoole:

首先进入swoole的github下载地址:[https://github.com/swoole/swoole-src/releases](https://github.com/swoole/swoole-src/releases)

    /tmp$ wget https://github.com/swoole/swoole-src/archive/v4.4.16.tar.gz ## 下载
    /tmp$ tar -zvxf v4.4.16.tar.gz  ## 解压到当前目录
    /tmp$ cd swoole-src-4.4.16/## cd目录
    /tmp/swoole-src-4.4.16$ phpize ## 使用phpize创建php编译检测脚本 ./configure
    /tmp/swoole-src-4.4.16$ ./configure --with-php-config=/usr/local/php-7.2.2/bin/php-config --enable-openssl  ## 创建编译文件,第一个--with,后面是php的安装路径/bin/php-config ,第二个--enable,是开启swoole的ssl功能
    /tmp/swoole-src-4.4.16$sudo make && make install  ## 编译swoole并把编译好的文件移动到php的扩展目录(前面的配置php版本的扩展目录) 需要root权限

这个时候已经安装成功,需要进入/etc/php/7.4/cli/php.ini,在最后面增加上:

    [swoole]
    extension=/usr/lib/php/20190902/swoole.so //根据自己的情况，安装到哪里就连接哪里，也可以放到统一的扩展目录

成功安装swoole,通过`php --ri swoole` 查看swoole扩展的信息:

    tioncico@tioncico-PC:/tmp/swoole-src-4.4.16$ php --ri swoole
    
    swoole
    
    Swoole => enabled
    Author => Swoole Team <team@swoole.com>
    Version => 4.4.16
    Built => Feb 20202011:18:54
    coroutine => enabled
    epoll => enabled
    eventfd => enabled
    signalfd => enabled
    cpu_affinity => enabled
    spinlock => enabled
    rwlock => enabled
    openssl => OpenSSL 1.1.0h  27 Mar 2018
    pcre => enabled
    zlib => 1.2.11
    mutex_timedlock => enabled
    pthread_barrier => enabled
    futex => enabled
    async_redis => enabled
    
    Directive => Local Value => Master Value
    swoole.enable_coroutine => On => On
    swoole.enable_library => On => On
    swoole.enable_preemptive_scheduler => Off => Off
    swoole.display_errors => On => On
    swoole.use_shortname => On => On
    swoole.unixsock_buffer_size => 8388608 => 8388608

到此,swoole安装完毕

#### 安装easyswoole和踩过的坑

[安装easyswoole文档](https://www.easyswoole.com/Cn/QuickStart/install.html)

文档很详细呢，不需要再自己来一次。因为是自己在虚拟机下开发，还用了共享目录，这里会有一些问题。

1.官方提供的2中composer安装，要尝试看看能不能用

    composer require easyswoole/easyswoole=3.x
    php vendor/easyswoole/easyswoole/bin/easyswoole install

或者

    composer require easyswoole/easyswoole=3.x
    php vendor/bin/easyswoole install    

2.虚拟机我用的是virtualbox6.X的版本，老的版本不能自定义共享文件夹的位置，需要手动挂载，比较麻烦。

easyswoole官方文档里建议不要再共享目录下开发，主要是有几个问题，都和权限有关。执行的时候配置文件的两个目录，要配置到有权限执行的地方。
    
    // 临时文件存放的目录
    'TEMP_DIR'      => null,
    // 日志文件存放的目录
    'LOG_DIR'       => null,

3.权限不够运行

composer不能再root下运行，但是共享目录没有权限怎么办

    sudo usermod -aG vboxsf $(whoami) //把要使用composer的用户加入到vboxsf的group里

如果www-data权限不够执行怎么办，同上

    sudo usermod -aG vboxsf www-data

以上都可以通过groups {user} 查看用户时候已经被分到相应的组里了，可能需要重启虚拟机。

### 使用easyswoole

大部分的地方文档都有，还有好多内容不擅长使用的，这里只记录自己项目里用到的东西。

1. 事件注册类，引入redis连接池，设置连接池大小。
2. 在onWorkerStart事件中注册定时器，把redis的内容通过单例模式定时更新到内存里，减少远程查询redis的用时，以及不停读取redis的过程。每个worker的单例模式的对象在当前worker里的所有连接都能共享。
3. 导入自定义配置文件。

代码示例：

    class EasySwooleEvent implements Event
    {

        public static function initialize()
        {
            // TODO: Implement initialize() method.
            date_default_timezone_set('Asia/Shanghai');
            $redisConfig=\EasySwoole\EasySwoole\Config::getInstance()->getConf('REDIS');
            $config = new \EasySwoole\Pool\Config();
            //设置默认的连接池的参数
            $config->setMaxObjectNum($redisConfig['POOL_MAX_NUM']);
            $config->setMinObjectNum($redisConfig['POOL_MIN_NUM']);
            $config->setGetObjectTimeout($redisConfig['POOL_TIME_OUT']);
            $redisConfig1 = new \EasySwoole\Redis\Config\RedisConfig($redisConfig);
            \EasySwoole\Pool\Manager::getInstance()->register(new \App\Pool\RedisPool($config,$redisConfig1),'redis');
            //导入其他配置文件
            self::loadConf();
        }

        public static function mainServerCreate(EventRegister $register)
        {
            // TODO: Implement mainServerCreate() method.
            $register->add($register::onWorkerStart,function (\swoole_server $server,int $workerId){
                if ($server->taskworker == false) {
                    //每个worker进程都预创建连接,保持最小连接数
                    \EasySwoole\Pool\Manager::getInstance()->get('redis')->keepMin();
                    //每个worker都设置一个定时器去刷新redis
                    \App\library\RedisContent::getInstance()->flushRedis();
                }
            });
        }

        /**
         * 加载配置文件
         */
        public static function loadConf()
        {
            //遍历目录中的文件
            $files = File::scanDirectory(EASYSWOOLE_ROOT . '/App/Conf');
            if (is_array($files)) {
                //$files['files'] 一级目录下所有的文件,不包括文件夹
                foreach ($files['files'] as $file) {
                    $fileNameArr = explode('.', $file);
                    $fileSuffix = end($fileNameArr);
                    if ($fileSuffix == 'php') {
                        \EasySwoole\EasySwoole\Config::getInstance()->loadFile($file);//引入之后,文件名自动转为小写,成为配置的key
                    }
                }
            }
        }
    }

redis定时器到内存，连接池的redis用完要还回去

    class RedisContent
    {
        use Singleton;//引入即可使用单例模式

        /**
         * @var float|int 定时刷新的时间
         */
        private $flushTime=3*1000;

        static $redisData=[];

        function flushRedis()
        {
            Timer::getInstance()->loop($this->flushTime, function () {
                $redis=\EasySwoole\Pool\Manager::getInstance()->get('redis')->getObj();
                if(!$redis){
                    return;
                }
                //存入内存
                self::$redisData[$key]=$redis->hGetAll($key);

                //将连接池返回去
                \EasySwoole\Pool\Manager::getInstance()->get('redis')->recycleObj($redis);
            });
        }
    }

单例模式

    //注册
    use Singleton;
    //使用
    $staticRedis=\App\Library\RedisContent::getInstance();

### 配置的worker大小

这个可能需要实践才知道