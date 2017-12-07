/**
 * 系统公用常量
 * Created by mo on 2016/5/5
 */
//各环境，各系统域名
var _DOMAIN_CONST_ = {
        LOCAL : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet',
            PMS : 'http://pms.local.fanqiele.com',
        },
        INNER_TEST : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet',
            PMS : 'http://pms.local.fanqiele.com',
        },
        ONLINE_TEST : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet',
            PMS : 'http://pms.test.fanqiele.com',
        },
        ONLINE : {
            WX_SERVER : 'http://preupgradesimu.congqipms.com/wechat/recewechatmessageservlet',
            PMS : 'http://www.fanqiele.com',
        }
    },

//当前所用环境域名，开发用非_DOMAIN_CONST_.LOCAL，生成环境用_DOMAIN_CONST_.ONLINE
    DOMAIN = _DOMAIN_CONST_.ONLINE

module.exports = {
    DOMAIN : DOMAIN
}
