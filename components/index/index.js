/**
 * Created by dai on 2016/9/18.
 */



var index = {
    init : function () {
        document.getElementById('header').innerHTML = __inline('../header/tpl/header.html')
        document.getElementById('content').innerHTML = __inline('tpl/index-main.html')
        __inline('vm/vm_index.vm')
        avalon.vmodels.vm_index.init()
        $('#header #menu li').removeClass('active')
        $('#header #menu #index').addClass('active')
    },
}
module.exports = index