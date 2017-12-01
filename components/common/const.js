/**
 * 系统公用常量
 * Created by mo on 2016/5/5
 */
//各环境，各系统域名
var _DOMAIN_CONST_ = {
        LOCAL : {
            BILL : 'http://localhost:8080',
            PMS : 'http://pms.local.fanqiele.com',
        },
        INNER_TEST : {
            BILL : 'http://bill.local.fanqiele.com',
            PMS : 'http://pms.local.fanqiele.com',
        },
        ONLINE_TEST : {
            BILL : 'http://bill.test.fanqiele.com',
            PMS : 'http://pms.test.fanqiele.com',
        },
        ONLINE : {
            BILL : 'http://bill.fanqiele.com',
            PMS : 'http://www.fanqiele.com',
        }
    },

//当前所用环境域名，开发用非_DOMAIN_CONST_.LOCAL，生成环境用_DOMAIN_CONST_.ONLINE
    DOMAIN = _DOMAIN_CONST_.ONLINE

module.exports = {
    DOMAIN : DOMAIN,
}
