---
layout: post
title:  "微信小游戏后台爬虫"
categories: 爬虫
tags: 爬虫 web-scraper
author: 果果
description: I will hava more and more new technical.
---
有需求需要把微信小游戏，后台的数据表格整理出弄成一个统一的表格。微信看数据只能看，不方便做后续的计算，而且管理多个微信小游戏的话，每天看数据扫码都是个让人头疼的事情。

事情就是这么个事情，交到我这个爬虫二把刀的人来说算是个挑战，这篇是没有跳出固有思维的情况下产生的爬虫方法。

### 浏览器爬虫设计

浏览器爬虫是我用的比较多的方式。无论是使用`web-scraper`进行短期大量数据的爬取；还是使用`pathon+selenium`的定时任务爬取都是一个道理。这次的任务需要每天执行，所以使用了定时任务的方式来做，具体步骤如下：

    1.导入selenium驱动浏览器，设置浏览器下载文件的位置，设置浏览器userdata的保存位置；
    2.打开微信登录页，输入账号密码，账号密码可以从服务端拿。点击登录保持扫码的页面状态；
    3.循环等待扫码，如果页面从扫码跳走了，认为登录成功；
    4.根据xpath获取页面的元素，点击元素，找到想要的内容，拿到html，或者直接点击下载按钮，根据情况来就可以了
    5.关闭浏览器，将数据传给服务端处理，实际上应该本地处理好的，但是我都python水平实在不行，就放弃了。

中间为了优化体验，每天登录爬虫的机器去扫码太难受了，就把二维码截图，发邮箱里了。结果发现微信登录只能用摄像头。。。。还挺麻烦的。但是还是做了些优化吧！

功能上感觉没有太多实现，主要是自己又写了写python的代码，把这些python的代码记一下，万一有用呢。

### 浏览器设置下载位置和保存userdata

    userdatapath='C:\\data\\wechatScraper\\userdata\\'+account
    if os.path.exists(userdatapath)==False:
        os.mkdir(userdatapath)
    storedir='C:\\data\\wechatScraper\\datadown\\'+account+'\\'+time.strftime('%Y%m%d',time.localtime(time.time()))
    if os.path.exists(storedir)==False:
        os.makedirs(storedir)
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument(r"user-data-dir="+userdatapath)
    prefs = {'profile.default_content_settings.popups': 0, 'download.default_directory': storedir}
    chrome_options.add_experimental_option('prefs', prefs)
    browser = webdriver.Chrome(chrome_options=chrome_options)

*设置下载位置：*可以配合chrome插件自动下载，或者注入js下载程序，或者是点击页面的下载按钮，然后下载到指定的位置方便程序处理

*设置userdata:*很多网站登录一次之后就不需要再登录了，会一直保持登录状态，记录userdata就可以每次启动，使用这个userdata启动，不用再登陆。如facebook之类的，这种遇到session过期的网站也有点无能为力，但是还是能减少登录次数。

### 截图&发邮件

截图的代码：

    def cutPicture(browser):
        picture_name=r'C:\\data\\wechatScraper\\pictureCut\\'+time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))+'.png'
        try:
            browser.save_screenshot(picture_name)
            baidu = browser.find_element_by_class_name('js_qrcode')
            left = baidu.location['x']
            top = baidu.location['y']
            elementWidth = baidu.location['x'] + baidu.size['width']
            elementHeight = baidu.location['y'] + baidu.size['height']
            picture = Image.open(picture_name)
            picture = picture.crop((left, top, elementWidth, elementHeight))
            #picture.show()
            picture.save(picture_name)
        except:
            print u'截图失败'
            return False
        return picture_name

发邮件的代码,下面的代码是可以发送截图的代码：

    def sendSmtp(picture,name):
    print picture
    print name
    my_sender='xxxx@xxxx'    # 发件人邮箱账号
    my_pass = 'xxxxxx'              # 发件人邮箱密码
    my_user='xxxx@xxxx'      # 收件人邮箱账号，我这边发送给自己
    receivers = [my_user,]  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱

    msgRoot = MIMEMultipart('related')
    msgRoot['From'] = Header(formataddr(["果果",my_sender]), 'utf-8')
    msgRoot['To'] =  Header(formataddr(["果果",my_user]), 'utf-8')
    subject = name+u'wechat小游戏后台数据爬虫'
    msgRoot['Subject'] = Header(subject, 'utf-8')
    
    msgAlternative = MIMEMultipart('alternative')
    msgRoot.attach(msgAlternative)
    
    mail_msg = """
    <p>请用微信扫描下方二维码，并确认</p>
    <p>登陆的二维码：</p>
    <p><img src="cid:image1"></p>
    """
    msgAlternative.attach(MIMEText(mail_msg, 'html', 'utf-8'))
    
    # 指定图片为当前目录
    fp = open(picture, 'rb')
    msgImage = MIMEImage(fp.read())
    fp.close()
    
    # 定义图片 ID，在 HTML 文本中引用
    msgImage.add_header('Content-ID', '<image1>')
    msgRoot.attach(msgImage)
    print subject
    
    server=smtplib.SMTP_SSL("smtp.exmail.qq.com", 465)
    server.login(my_sender, my_pass)
    server.sendmail(my_sender, receivers, msgRoot.as_string())
    server.quit()  # 关闭连接
    print u"邮件发送成功"
    return true
    try:
        server=smtplib.SMTP_SSL("smtp.exmail.qq.com", 465)
        server.login(my_sender, my_pass)
        server.sendmail(my_sender, receivers, msgRoot.as_string())
        server.quit()  # 关闭连接
        print u"邮件发送成功"
        return true
    except smtplib.SMTPException:
        print u"Error: 无法发送邮件"
        return false

这个我感觉再爬虫阶段挺好用的，经常要保留中间状态，就可以自动截图下来。那些用python做自动测试的估计也是这样。

使用截图和发邮件的时候需要引用：

    from PIL import Image
    import smtplib
    from email.mime.image import MIMEImage
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.header import Header
    from email.utils import formataddr

### 读取excel

我是觉得python关于文件的都挺烦的，可能自己没有认真看过吧。这种文件格式搞不定，这里把读取excel的记下来。

    import xlrd
    import chardet
    import pandas as pd

    def readexcel(path,hashead):
    # fileList = os.listdir(path)
    # print fileList
    tabledata=[]

    try:
        data = xlrd.open_workbook(path)#打开文件
        table1 = data.sheets()[0]
        row_length=table1.nrows
        
        i=0+int(hashead)
        while i<row_length:
            row=table1.row_values(i)
            tabledata.append(row)
            i+=1
        print tabledata
    except:
        f = open(path,'rb')
        data = f.read()
        file_encoding = chardet.detect(data).get('encoding')
        print file_encoding #返回文件编码格式

        fp=fileobject = io.open(path,'r',encoding=file_encoding)
        i=0
        for line in fp.readlines():
            i+=1
            if(i==int(hashead)):
                continue
            line=line.rstrip()
            linesplit=re.split(',|\s',line)
            print linesplit
            tabledata.append(linesplit)
        fp.close()
    return tabledata

    readexcel(path+u"广告细分指标明细 (2).csv",0)
    pd.read_csv(path+u"数据报表.csv").values.tolist()

好像pd的更好用一点，因为用上面的readexcel会出现，csv里面使用金额的时候，会把金额的逗号当作分隔号处理。

### 被我抛弃的代码

    # -*- coding: utf-8 -*-
    from selenium import webdriver 
    import sys
    import io
    import os
    import time
    import re
    import random
    import logging
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.webdriver.common.keys import Keys
    import json
    import requests
    import xlrd
    import chardet
    import pandas as pd
    from PIL import Image
    import smtplib
    from email.mime.image import MIMEImage
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.header import Header
    from email.utils import formataddr
    from time import sleep
    print sys.getdefaultencoding()

    #打开浏览器登陆，等待扫码
    def openWebSignIn(url,account,passward,name):
        #user的用户记录
        userdatapath='C:\\data\\wechatScraper\\userdata\\'+account
        if os.path.exists(userdatapath)==False:
            os.mkdir(userdatapath)
        storedir='C:\\data\\wechatScraper\\datadown\\'+account+'\\'+time.strftime('%Y%m%d',time.localtime(time.time()))
        if os.path.exists(storedir)==False:
            os.makedirs(storedir)
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument(r"user-data-dir="+userdatapath)
        prefs = {'profile.default_content_settings.popups': 0, 'download.default_directory': storedir}
        chrome_options.add_experimental_option('prefs', prefs)
        browser = webdriver.Chrome(chrome_options=chrome_options)
        browser.maximize_window()
        browser.set_page_load_timeout(50)
        browser.set_script_timeout(40)
        browser.get(url)
        browser.implicitly_wait(2)

        #输入帐号密码
        try:
            account_xpath='//*[@id="header"]/div[2]/div/div/div[1]/form/div[1]/div[1]/div/span/input'
            passward_xpath='//*[@id="header"]/div[2]/div/div/div[1]/form/div[1]/div[2]/div/span/input'
            account_dom = browser.find_element_by_xpath(account_xpath)
            account_dom.send_keys(account)
            time.sleep(2)
            passward_dom = browser.find_element_by_xpath(passward_xpath)
            passward_dom.send_keys(passward)
            time.sleep(2)
            #点击“登录”按钮
            login_button = browser.find_element_by_xpath('//*[@id="header"]/div[2]/div/div/div[1]/form/div[4]/a')
            login_button.click()
            
            i=0
            while i<600:
                try:
                    i+=3
                    qrcode_xpath='//*[@id="app"]/div[3]/div/div[2]/div[1]/div/img'
                    qrcode_dom=browser.find_element_by_xpath(qrcode_xpath)
                    if i==3:
                        picture=cutPicture(browser)
                        if picture != False:
                            sendSmtp(picture,name)
                    sleep(3)
                    continue
                except:
                    break
            else:
                print '每人扫描二维码'
                #browser.close()
                #continue
                
            m=0
            while m < 120:
                try:
                    inner_dom=browser.find_element_by_xpath('/html/body/div[1]/div[2]/div/div/div[4]/a/img')
                    break
                except:
                    m+=3
                    sleep(3)
            else:
                print '登陆失败'
                #browser.close()
        except:
            print '不用重新登陆'

        print 12345678
        return browser
        
    #不同数据的爬虫处理
    def webScraper(browser,account):
        # btn_dom=browser.find_element_by_xpath('//*[@id="menuBar"]/dl[3]/dt/a')
        # btn_dom.click()
        # print 123
        # #return
        dict={}
        #判断找到并点击的统计
        if clickbtn('//*[@id="menuBar"]/dl[3]/dt/a',browser) == True:
            browser.switch_to.frame('js_iframe')
            #点击访问分析
            if clickbtn('//*[@id="topTab"]/ul/li[3]/a',browser) == True:
                #点击访问趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[2]/div[2]/div[2]/div[2]/span',browser) == True:
                    dict['into']=getHtml('/html/body/div[1]/div[2]/div/div[2]/div[2]/div[2]/div[2]/div',browser)
                    sleep(1)
                #点击分享趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[2]/div[2]/span',browser) == True:
                    dict['share']=getHtml('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[2]/div[2]/div',browser)
                    sleep(1)
                #点击活跃用户趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[4]/div[2]/div[3]/div[2]/span',browser) == True:
                    dict['useralive']=getHtml('/html/body/div[1]/div[2]/div/div[4]/div[2]/div[3]/div[2]/div',browser)
                    sleep(1)
                #点击用户趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[4]/div[2]/div[1]/span[2]',browser) == True:
                    sleep(2)
                    dict['usersignup']=getHtml('/html/body/div[1]/div[2]/div/div[4]/div[2]/div[3]/div[2]/div',browser)
                    sleep(1)
            #点击收入分析
            if clickbtn('//*[@id="topTab"]/ul/li[4]/a',browser) == True:
                #总收入趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[2]/div[2]/div[2]/div[2]/span',browser) == True:
                    dict['allmoney']=getHtml('/html/body/div[1]/div[2]/div/div[2]/div[2]/div[2]/div[2]/div',browser)
                    sleep(1)
                #广告总收入趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[3]/div[2]/span',browser) == True:
                    dict['ad_total_money']=getHtml('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[3]/div[2]/div',browser)
                    sleep(1)
                #banner广告收入趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[1]/span[2]',browser) == True:
                    dict['ad_banner_money']=getHtml('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[3]/div[2]/div',browser)
                    sleep(1)
                #激励视频广告收入趋势的详细
                if clickbtn('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[1]/span[3]',browser) == True:
                    dict['ad_video_money']=getHtml('/html/body/div[1]/div[2]/div/div[3]/div[2]/div[3]/div[2]/div',browser)
                    sleep(1)
                # #虚拟支付趋势的详细
                # if clickbtn('/html/body/div[1]/div[2]/div/div[4]/div[2]/div[2]/div[2]/span',browser) == True:
                    # dict['virtualpay']=getHtml('/html/body/div[1]/div[2]/div/div[4]/div[2]/div[2]/div[2]/div',browser)
                    # sleep(1)
                # #付费用户趋势的详细
                # if clickbtn('/html/body/div[1]/div[2]/div/div[5]/div[2]/div[2]/div[2]/span',browser) == True:
                    # dict['payuser']=getHtml('/html/body/div[1]/div[2]/div/div[5]/div[2]/div[2]/div[2]/div',browser)
                    # sleep(1)
                # #付费活跃用户留存的详细
                # if clickbtn('/html/body/div[1]/div[2]/div/div[6]/div[2]/div[3]/div[2]/span',browser) == True:
                    # dict['payuseralive']=getHtml('/html/body/div[1]/div[2]/div/div[6]/div[2]/div[3]/div[2]/div',browser)
                    # sleep(1)
                # #付费新增用户留存的详细
                # if clickbtn('/html/body/div[1]/div[2]/div/div[6]/div[2]/div[1]/span[2]',browser) == True:
                    # dict['payusernew']=getHtml('/html/body/div[1]/div[2]/div/div[6]/div[2]/div[3]/div[2]/div',browser)
                    # sleep(1)
            #点击用户画像
            if clickbtn('//*[@id="topTab"]/ul/li[5]/a',browser) == True:
                sleep(5)
                js="window.scrollTo(0,document.body.scrollHeight)"
                browser.execute_script(js)
                sleep(2)
                canvas=findHtml('/html/body/div[1]/div[2]/div/div[5]/div/div[2]/div[2]',browser)
                sleep(2)
                if canvas != False: 
                    dict['newuserphoto']=canvas.text
                    print dict['newuserphoto']
                sleep(2)
            #渠道分析暂时没有
            browser.switch_to.default_content()
        #保存dict里面的数据
        for key,value in dict.items():
            filename='C:\\data\\wechatScraper\\datadown\\'+account+'\\'+time.strftime('%Y%m%d',time.localtime(time.time()))+'\\'+key+'.txt'
            fo = io.open(filename,'w',encoding="utf-8")
            for line in value:
                fo.write(line+'\n')
            # 关闭打开的文件
            fo.close()
        # #点击下载流量主的数据
        if clickbtn('//*[@id="menuBar"]/dl[7]/dd[2]/a',browser) == True:
            #点击数据报告
            if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[1]/div/div[4]/a',browser) == True:
                sleep(4)
                #banner点击数据
                #点击下载表格
                if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[3]/div[2]/div[1]/button',browser) == True:
                    sleep(2)
                #banner点击细分数据
                if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[2]/div/label[2]/span[2]',browser) == True:
                    sleep(4)
                    #点击下载表格
                    if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[3]/div[2]/div[1]/button',browser) == True:
                        sleep(1)
                sleep(2)
                #点击激励视频
                if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[1]/div/div[2]/div/button[2]',browser) == True:
                    sleep(2)
                    #点击banner下载表格
                    if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[3]/div[2]/div[1]/button',browser) == True:
                        sleep(2)
                    #点击细分数据
                    if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[2]/div/label[2]/span[2]',browser) == True:
                        sleep(4)
                        #点击下载表格
                        if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[3]/div[2]/div[1]/button',browser) == True:
                            sleep(1)
                sleep(2)
                #点击插屏
                if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[1]/div/div[2]/div/button[3]',browser) == True:
                    sleep(2)
                    #点击下载表格
                    if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[3]/div[2]/div[1]/button',browser) == True:
                        sleep(2)
                    #点击细分数据
                    if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[2]/div/label[2]/span[2]',browser) == True:
                        sleep(4)
                        #点击下载表格
                        if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[3]/div[4]/div[3]/div[2]/div[1]/button',browser) == True:
                            sleep(1)
                sleep(2)
                #点击用户数据
                if clickbtn('//*[@id="wxadcontainer"]/div[1]/div[2]/a[2]',browser) == True:
                    sleep(2)
                    #点击数据报表
                    if clickbtn('//*[@id="wxadcontainer"]/div[2]/div[4]/div[1]/div[2]',browser) == True:
                        sleep(4)
                        #点击下载用户数据
                        if clickbtn('//*[@id="wxadcontainer"]/div[2]/div[4]/div[2]/div[1]/button',browser) == True:
                            sleep(1)
        return dict
    #点击页面元素
    def clickbtn(xpath,browser):
        # btn_dom=browser.find_element_by_xpath(xpath)
        # btn_dom.click()
        # sleep(2)
        # return True
        i=0
        while i < 3:
            try:
                btn_dom=browser.find_element_by_xpath(xpath)
                btn_dom.click()
                sleep(2)
                print 'success'+str(i)
                break
            except:
                print 'fail'+str(i)
                i+=1
                sleep(2)
        else:
            return False
        return True
    #找到页面元素
    def findHtml(xpath,browser):
        j=0
        while j < 3:
            try:
                _html=browser.find_element_by_xpath(xpath)
                return _html
                break
            except:
                j+=1
                sleep(1)
        else:
            return False
    #获取页面源码
    def getHtml(xpath,browser):
        #father_dom=browser.find_element_by_xpath(xpath)
        list=[]
        i=0
        while i<3:
            table_html=findHtml(xpath+'/div[1]/div[1]',browser)
            if table_html != False: 
                _html=table_html.get_attribute("outerHTML")
                list.append(_html)
                i+=1
                if i!=3 and clickbtn(xpath+'/div[1]/div[2]/div/span[1]/a[3]',browser) == True:
                    print '获取html'
                else:
                    break
            else:
                break
        else:
            print '获取html'
        return list
    #读取excel里面的数据
    def readexcel(path,hashead):
        # fileList = os.listdir(path)
        # print fileList
        tabledata=[]

        try:
            data = xlrd.open_workbook(path)#打开文件
            table1 = data.sheets()[0]
            row_length=table1.nrows
            
            i=0+int(hashead)
            while i<row_length:
                row=table1.row_values(i)
                tabledata.append(row)
                i+=1
            print tabledata
        except:
            f = open(path,'rb')
            data = f.read()
            file_encoding = chardet.detect(data).get('encoding')
            print file_encoding #返回文件编码格式

            fp=fileobject = io.open(path,'r',encoding=file_encoding)
            i=0
            for line in fp.readlines():
                i+=1
                if(i==int(hashead)):
                    continue
                line=line.rstrip()
                linesplit=re.split(',|\s',line)
                print linesplit
                tabledata.append(linesplit)
            fp.close()
        return tabledata
        
    def cutPicture(browser):
        picture_name=r'C:\\data\\wechatScraper\\pictureCut\\'+time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()))+'.png'
        try:
            browser.save_screenshot(picture_name)
            baidu = browser.find_element_by_class_name('js_qrcode')
            left = baidu.location['x']
            top = baidu.location['y']
            elementWidth = baidu.location['x'] + baidu.size['width']
            elementHeight = baidu.location['y'] + baidu.size['height']
            picture = Image.open(picture_name)
            picture = picture.crop((left, top, elementWidth, elementHeight))
            #picture.show()
            picture.save(picture_name)
        except:
            print u'截图失败'
            return False
        return picture_name

    def sendSmtp(picture,name):
        print picture
        print name
        my_sender='xxxxxxxxxxx'    # 发件人邮箱账号
        my_pass = 'xxxxxxxxxxx'              # 发件人邮箱密码
        my_user='xxxxxxxxxxx'      # 收件人邮箱账号，我这边发送给自己
        receivers = [my_user,]  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱

        msgRoot = MIMEMultipart('related')
        msgRoot['From'] = Header(formataddr(["果果",my_sender]), 'utf-8')
        msgRoot['To'] =  Header(formataddr(["果果",my_user]), 'utf-8')
        subject = name+u'wechat小游戏后台数据爬虫'
        msgRoot['Subject'] = Header(subject, 'utf-8')
        
        msgAlternative = MIMEMultipart('alternative')
        msgRoot.attach(msgAlternative)
        
        mail_msg = """
        <p>请用微信扫描下方二维码，并确认</p>
        <p>登陆的二维码：</p>
        <p><img src="cid:image1"></p>
        """
        msgAlternative.attach(MIMEText(mail_msg, 'html', 'utf-8'))
        
        # 指定图片为当前目录
        fp = open(picture, 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()
        
        # 定义图片 ID，在 HTML 文本中引用
        msgImage.add_header('Content-ID', '<image1>')
        msgRoot.attach(msgImage)
        print subject
        
        server=smtplib.SMTP_SSL("smtp.exmail.qq.com", 465)
        server.login(my_sender, my_pass)
        server.sendmail(my_sender, receivers, msgRoot.as_string())
        server.quit()  # 关闭连接
        print u"邮件发送成功"
        return true
        try:
            server=smtplib.SMTP_SSL("smtp.exmail.qq.com", 465)
            server.login(my_sender, my_pass)
            server.sendmail(my_sender, receivers, msgRoot.as_string())
            server.quit()  # 关闭连接
            print u"邮件发送成功"
            return true
        except smtplib.SMTPException:
            print u"Error: 无法发送邮件"
            return false
    # #关闭浏览器
    # def closeWeb(browser):
        # browser.close()
    # 获取任务的接口
    url='http://xxxxxxxxxxxxxxxxxxx'
    jobsJson=requests.get(url)
    print jobsJson
    m=jobsJson.json()
    print m
    if m['code'] != 0:
        print m['msg']
        exit(0)
    #主体流程
    _url='https://mp.weixin.qq.com/'
    _account=m['data']['account']
    _passward=m['data']['password']
    _name=m['data']['name']

    #正式战
    getData_url='http://上传文件的接口'
    print _account
    print _passward
    print _name

    #打开浏览器登陆
    _browser=openWebSignIn(_url,_account,_passward,_name)
    #植入js抓取数据
    dict=webScraper(_browser,_account)

    print dict
    sleep(5)
    path='C:\\data\\wechatScraper\\datadown\\'+_account+'\\'+time.strftime('%Y%m%d',time.localtime(time.time()))+'\\'
    print path
    dict['all_banner_csv']=readexcel(path+u"广告汇总指标明细.csv",0)
    sleep(1)
    dict['all_video_csv']=readexcel(path+u"广告汇总指标明细 (1).csv",0)
    sleep(1)
    dict['all_chaping_csv']=readexcel(path+u"广告汇总指标明细 (2).csv",0)
    sleep(1)
    dict['banner_csv']=readexcel(path+u"广告细分指标明细.csv",0)
    sleep(1)
    dict['video_csv']=readexcel(path+u"广告细分指标明细 (1).csv",0)
    sleep(1)
    dict['chaping_csv']=readexcel(path+u"广告细分指标明细 (2).csv",0)
    sleep(1)
    dict['userdata_csv']=pd.read_csv(path+u"数据报表.csv").values.tolist()
    sleep(1)

    #发送数据到接口
    jsondata=json.dumps(dict)
    return_data={'account':_account,'data':jsondata}
    page_return=requests.post(getData_url,return_data)
    print page_return
    _browser.close()
    #关闭浏览器
    exit(0)
    #exit(-1)