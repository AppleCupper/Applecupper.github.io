---
layout: post
title:  "微信小程序商城总结"
categories: weChat 微信
tags: mysql binlog
author: 果果
description: There is always something I don't understand.
---
小程序的道具商城之前也有做过，这次又做了一次，在需求方思考的不够全面的情况下。我根据做商城的经验似乎考虑的过多了。感觉在敏捷开发的情况下，应该不要再一开始考虑那么多，这个度不太会把握。简单的把做道具商城遇到的一些问题，记录下来吧！

### 小程序电商资质申请

这里赶紧挺麻烦的，审核需要几天。小程序要做电商的话，涉及到支付。需要下面的一些步骤：

    1.申请电商资质的小程序，需要一些申请材料的
    2.申请一个公众平台的商户号
    3.小程序关联商户号，详情见https://pay.weixin.qq.com/static/pay_setting/appid_protocol.shtml
    4.后台设置key，返回配好的商户号

### 小程序服务端接口

微信这边总有一些接口是后台服务端调用的。在开发阶段，在开发环境下往往没有https或者安全域名的配置。虽然微信小程序或者是H5的前端开发和后端可以是前后端分离的。但是有时候总没有那么简单，当双方并行的时候这部分工作就难以进展。

小程序这里应该写一个分装好的sdk，专门放到测试服务器上，开放接口提供开发环境调用。这样就可以有一个方便的开发环境，可以使前端后端同时进行。

    //小程序登陆接口
    /** 小程序登录获取openid和sessionkey的接口
     * code 小程序回传的code
     * appid 小程序应用的appid
     * appSecret 小程序应用的appSecret
     */
    public function wxlogin()
    {
        $data['code'] = $this->get('code');
        $data['appid'] = $this->get('appid');
        $data['appSecret'] = $this->get('appSecret');

        $this->_logs($data, 'log=wxlogin $data=');

        $rtn = $this->xcxModel->wxlogin($data);

        $this->_logs('log=wxlogin wxLoginReturn $rtn=' . $rtn);

        echo $rtn;

        exit;
    }

    //小程序model放接口逻辑
    /** 小程序登录获取openid和sessionkey的接口
     * code 小程序回传的code
     * appid 小程序应用的appid
     * appSecret 小程序应用的appSecret
     */
    public function wxlogin($data)
    {
        $code = $data['code'];
        $appid = $data['appid'];
        $appSecret = $data['appSecret'];

        $this->_logs('log=wxlogin $code=' . $code . ' $appid=' . $appid . ' $appSecret=' . $appSecret);

        $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . $appid . '&secret=' . $appSecret . '&js_code=' . $code . '&grant_type=authorization_code';

        $result = http($url, 'GET');

        $this->_logs('log=wxlogin wxLoginReturn $result=' . $result);

        return $result;
    }

    ////请求微信统一下单接口
    private function weChatPay($data)
    {
        $param = array(
            'appid' => $data['app_id'],//小程序id
            'mch_id' => $data['mch_id'],//商户id
            'spbill_create_ip' => $_SERVER['REMOTE_ADDR'],//终端ip
            'notify_url' => $data['app_url'], //回调通知地址
            'nonce_str' => $this->createNoncestr(),//随机字符串
            'out_trade_no' => $data['order_bn'],//商户订单编号
            'total_fee' => floatval($data['price']), //总金额
            'openid' => $data['openid'],//用户openid
            'trade_type' => $data['trade_type'],//交易类型
            'body' => $data['name'], //商品信息
        );
        //通过签名算法计算得出的签名值，详见签名生成算法
        $param['sign'] = $this->getSign($param, $data['key']);
        //将数组内容转为xml格式，向微信发出请求
        $xmlData = $this->arrayToXml($param);
        $xml_result = $this->postXmlCurl($xmlData, 'https://api.mch.weixin.qq.com/pay/unifiedorder', 60);
        $result = $this->xmlToArray($xml_result);
        return $result;
    }

### 微信支付流程

    1.小程序端请求服务器想要发起支付
    2.服务端调用微信统一下单接口
    3.服务端组织数据范围给用户
    4.小程序端调用支付接口

相关文档有：

[微信支付](https://pay.weixin.qq.com/wiki/doc/api/index.html)

[小程序支付](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html)