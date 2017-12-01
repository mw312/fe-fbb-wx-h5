/**
 * Created by dai on 2016/9/20.
 */
var manage = {
    init : function () {
        document.getElementById('header').innerHTML = __inline('../header/tpl/header.html')
        document.getElementById('content').innerHTML = __inline('tpl/manage-main.html')
        __inline('vm/vm_manage.vm')
        avalon.vmodels.vm_manage.init()
        $('#header #menu li').removeClass('active')
        $('#header #menu #manage').addClass('active')
    },
}
module.exports = manage