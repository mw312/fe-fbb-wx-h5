var index = {
    init: function () {
        document.getElementById('content').innerHTML = __inline('tpl/report-main.html');
        __inline('vm/vm_report.vm');
        avalon.vmodels.vm_report.init();
    },
};
module.exports = index;