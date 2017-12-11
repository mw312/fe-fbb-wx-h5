/**
 * 系统公用常量
 * Created by mo on 2016/5/5
 */
//各环境，各系统域名
var _DOMAIN_CONST_ = {
        LOCAL : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet'
        },
        INNER_TEST : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet'
        },
        ONLINE_TEST : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet'
        },
        ONLINE : {
            WX_SERVER : 'http://preupgrade.congqipms.com/wechat/recewechatmessageservlet'
        }
    },

//当前所用环境域名，开发用非_DOMAIN_CONST_.LOCAL，生成环境用_DOMAIN_CONST_.ONLINE
    DOMAIN = _DOMAIN_CONST_.LOCAL

module.exports = {
    DOMAIN : DOMAIN
}
