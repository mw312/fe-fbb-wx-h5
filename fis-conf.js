// 环境相关配置
var __ReleaseConfig__ = {
    version : '1.0.0',
    env : 'release',// 环境：可取值('release':生产环境; 'staging':线上测试环境; 'test':本地测试环境[可据实际情况而自行设置];)
    release : {
        domain : 'http://bill.fanqiele.com'
    },
    staging : {
        domain : 'http://bill.test.fanqiele.com'
    },
    test : {
        domain : 'http://bill.local.fanqiele.com'
    },
    domain : function() {
        return this[this.env].domain
    }
}
fis.set('version', __ReleaseConfig__.version);
fis.set('domain', __ReleaseConfig__.domain());
fis.set('project.ignore', ['/.idea/**']);
// 使用commonjs模块化
fis.hook('commonjs');

// 静态资源编译后的目录
fis.media('pro').match('*.{js,css,png}', {
    //query: '?version=' + fis.get('version'),
    useHash: true
    //release: fis.get('version') + '/$0'
});

// 配置打包阶段插件
fis.match('::packager', {
    // 启用 图片合并fis-spriter-csssprites 插件
    spriter: fis.plugin('csssprites'),
    // 打包后处理插件
    postpackager: fis.plugin('loader', {
        //allInOne: true
    })
});

// 图片压缩
fis.media('pro').match('*.png', {
    // fis-optimizer-png-compressor 插件进行压缩，已内置
    optimizer: fis.plugin('png-compressor'),
});
// js压缩
fis.media('pro').match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩，已内置
    optimizer: fis.plugin('uglify-js'),
});
// 已经是压缩过的js不再压缩
fis.media('pro').match('*.min.js', {
    optimizer: null,
});
// css压缩
fis.media('pro').match('*.css', {
    // FIS3 构建会对 CSS 中，路径带 ?__sprite 的图片进行合并。为了节省编译的时间，分配到 useSprite: true 的 CSS 文件才会被处理
    useSprite: true,
    // fis-optimizer-clean-css 插件进行压缩，已内置
    optimizer: fis.plugin('clean-css'),
    //packTo: '/sty.css'
});

// 生产发布加域名
fis.media('pro').match('*.{js,css,png,wav,swf}', {
    //domain: fis.get('domain'),
});

// 模块化开发
fis.match('/components/{*,**/*}.js', {
    isMod: true,
});
fis.match('/components/{*,**/*}.vm', {
    isJsLike: true
});

// 打包
fis.match('/static/js/widget/{*,**/*}.js', {
    packTo: '/static/js/widget/widget.js'
});

fis.media('dev').match('*.{js,css,png}', {
    useHash: false,
    useSprite: false,
    optimizer: null
});

// 如果需要发布到其他目录
//fis.match('*', {
//    deploy: fis.plugin('local-deliver', {
//        to: 'D:\\module1\\'
//    })
//})

// 发布到远程机
fis.media('inner').match('*', {
   deploy: fis.plugin('http-push', {
       receiver: 'http://192.168.20.65:8999/receiver',
       //远端目录
       to: '/data/static/assets/fe-fbb-wx-h5'
   })
})

// 发布 fis3 release pro -d ./fe-fbb-wx-h5