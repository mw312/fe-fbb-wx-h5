var accout = {
    init: function () {
        document.getElementById('content').innerHTML = __inline('tpl/accout-main.html');
        __inline('vm/vm_accout.vm');
        // avalon.vmodels.vm_accout.init();
    },
};
module.exports = accout;