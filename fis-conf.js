// 环境相关配置
var __ReleaseConfig__ = {
    version : '1.0.0'
}
fis.set('version', __ReleaseConfig__.version);
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

// 发布到远程机
fis.media('inner').match('*', {
    optimizer: null,
    deploy: [
        fis.plugin('replace', {
            from : '_DOMAIN_CONST_.LOCAL',
            to : '_DOMAIN_CONST_.INNER'
        }),
        fis.plugin('http-push', {
            receiver: 'http://192.168.20.65:8999/receiver',
            //远端目录
            to: '/data/static/assets/fe-fbb-wx-h5'
        })
    ]
})

fis.media('simu').match('*', {
    deploy: [
        fis.plugin('replace', {
            from : '_DOMAIN_CONST_.LOCAL',
            to : '_DOMAIN_CONST_.SIMULATION'
        }),
        //发布到本地
        fis.plugin('local-deliver',{
            to: "./simu/fe-fbb-wx-h5"
        })
    ]
})

fis.media('pro').match('*', {
    deploy: [
        fis.plugin('replace', {
            from : '_DOMAIN_CONST_.LOCAL',
            to : '_DOMAIN_CONST_.PRODUCTION'
        }),
        //发布到本地
        fis.plugin('local-deliver',{
            to: "./pro/fe-fbb-wx-h5"
        })
    ]
})

// 生产发布 fis3 release pro -d ./fe-fbb-wx-h5