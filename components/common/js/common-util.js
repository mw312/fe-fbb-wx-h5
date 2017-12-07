/**
 * Created by hai on 2016/1/15.
 */
var COMMON_CONST = require('../const.js')
var CommonUtil = {
    __ENUMS__ : {
        METHOD : {
            SUCCESS : 'success',
            ERROR : 'error',
            ALWAYS : 'always',
            FAIL : 'fail'
        }
    },
    isSuccess : function (rs) {
        return rs && rs.status == 200
    },
    isFail : function (rs) {
        return rs && rs.status == 400
    },
    isError : function (rs) {
        return rs && rs.status == 500
    },
    fireCallbacks : function (cbs, method, rs) {
        if (!cbs) {
            return
        }
        if (tmsky.isObject(cbs)) {
            this.fire(cbs[method], rs)
        } else {
            this.fire(cbs, rs)
        }
    },
    fire : function (fn, rs) {
        fn && tmsky.isFunction(fn) && fn(rs)
    },
    /**
     * 为所选择控件绑定日历
     *
     * @param parentSelector
     * @param startSelector
     * @param endSelector
     * @param isSelectableBCT
     */
    bindingDatepictureOnload : function (parentSelector, startSelector, endSelector, isSelectableBCT) {
        var parent = typeof parentSelector == 'string' ? $(parentSelector) : parentSelector;
        var starts = parent.find(startSelector);
        var ends = parent.find(endSelector);
        // 绑定开始日期的日历控件
        $.each(starts, function (i, item) {
            CommonUtil.bindingDatepickerByElement($(item), true, startSelector, endSelector, isSelectableBCT, null, true);
        });
        // 绑定结束日期的日历控件
        $.each(ends, function (i, item) {
            CommonUtil.bindingDatepickerByElement($(item), false, startSelector, endSelector, isSelectableBCT, null, true);
        });
    },

    /**
     * 绑定单个日历控件
     *
     * @param ele 要绑定日历控件的节点
     * @param isStartDate 是否是开始时间
     * @param startSelector 开始时间选择器
     * @param endSelector 结束时间选择器
     * @param isSelectableBCT[BCT:before current time] 是否可选择今天之前的时间
     */
    bindingDatepickerByElement : function ($ele, isStartDate, startSelector, endSelector, isSelectableBCT, callback, isRestrictEndDate) {
        var currStartDate = $ele[0].value;
        if (isStartDate) {
            $ele.datepicker({
                onSelect : function (dateText, inst) {
                    // 动态改变结束时间的选择范围及显示
                    var $this = $(this);
                    // 记录当前触发事件的对象选择器至开始时间DOM属性active-selector
                    $this.attr("active-selector", startSelector).attr("non-active-selector", endSelector);
                    var $endDate = $this.siblings(endSelector),
                        currEndDate = $endDate.val(),
                        cedIsEmpty = tmsky.isEmpty(currEndDate);
                    if (cedIsEmpty || !tmsky.isDate(tmsky.date.date(currEndDate))) {
                        $endDate.val(dateText).removeAttr("disabled").datepicker("option", "minDate", dateText);
                    } else {
                        var isGreatThan = cedIsEmpty || Date.parse(dateText) > Date.parse(currEndDate);
                        $endDate.datepicker("option", "minDate", dateText);
                        $endDate.val(isGreatThan ? dateText : currEndDate).removeAttr("disabled");
                    }
                    if (callback) {
                        callback();
                    }
                }
            });
            if (!isSelectableBCT) {
                var minDate;
                if (!tmsky.isDate(tmsky.date.date(currStartDate))) {
                    minDate = new Date();
                } else {
                    minDate = new Date(currStartDate.replace(/-/g, "/"));
                }
                $ele.datepicker("option", "minDate", minDate);
            }
        } else {
            $ele.datepicker({
                // minDate : date,
                onSelect : function (dateText, inst) {
                    var $startDate = $(this).siblings(startSelector);
                    // 记录当前触发事件的对象选择器至开始时间DOM属性active-selector
                    $startDate.attr("active-selector", endSelector).attr("non-active-selector", startSelector);
                    var val = $startDate.val();
                    var valIsEmpty = tmsky.isEmpty(val);
                    if (valIsEmpty || tmsky.isChinese(val)) {
                        $startDate.val(dateText);
                    }
                    if (callback) {
                        callback();
                    }
                }
            });
            if (isRestrictEndDate) {
                if (isNaN(Date.parse($ele.val()))) {
                    $ele.attr("disabled", "disabled");
                } else {
                    var minDate = new Date(),
                        startDate;
                    startDate = tmsky.date.date($ele.siblings(startSelector).val());
                    minDate = tmsky.isDate(startDate) ? startDate : minDate;
                    $ele.datepicker("option", "minDate", minDate);
                }
            }
        }
    },
    getCurrActiveDateSelectors : function (selector) {
        selector = selector || "[active-selector]";
        var $dom = $(selector);
        return {
            active : $dom.attr("active-selector"),
            nactive : $dom.attr("non-active-selector")
        }
    },
    scan : function (id, tpl, cb) {
        var dom = document.getElementById(id)
        dom.innerHTML = tpl
        avalon.scan(dom)
        CommonUtil.fire(cb)
    },
    // 统一拦截ajax
    //ajaxPrefilter : function () {
    //    $.ajaxPrefilter(function (options) {
    //        var url = options.url,
    //            OMS_WHITE_URI = COMMON_CONST.AUTH_WHITE_URI.OMS
    //        if (url.indexOf(COMMON_CONST.DOMAIN.OMS) !== -1) {
    //            //统一拦截oms，白名单除外
    //            var toFilter = true
    //            if (!tmsky.isEmptyObject(OMS_WHITE_URI)) {
    //                for (name in OMS_WHITE_URI) {
    //                    if (url.indexOf(name) !== -1) {
    //                        toFilter = false
    //                        break
    //                    }
    //                }
    //            }
    //            if (toFilter) {
    //                var secure = CommonCacheUtil.innBaseInfo.secure
    //                url += (url.indexOf('?') < 0 ? '?' : '&')
    //                var i = 0
    //                for (name in secure) {
    //                    url += (i == 0 ? '' : '&') + name + '=' + secure[name]
    //                    i++
    //                }
    //                options.url = url
    //            }
    //        }
    //    });
    //},
    /**
     * 前端JS 导出Excel
     */
    idTmr : {},
    exportToExcel : function (tableid) {
        if ( $.support.msie) {
            var curTbl = document.getElementById(tableid);
            try {
                var oXL = new ActiveXObject("Excel.Application");

                var oWB = oXL.Workbooks.Add();
                var xlsheet = oWB.Worksheets(1);
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                sel.select();
                sel.execCommand("Copy");
                xlsheet.Paste();
                oXL.Visible = true;
                var fname = oXL.Application.GetSaveAsFilename("下载.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用");
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                //xls.visible = false;
                oXL.Quit();
                oXL = null;
                idTmr = window.setInterval("Cleanup();", 1);
            }
        } else {
            this.tableToExcel(tableid);
        }
    },
    Cleanup : function () {
        window.clearInterval(idTmr);
        CollectGarbage();
    },
    tableToExcel : (function (name) {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function (s, c) {
                return s.replace(/{(\w+)}/g,
                    function (m, p) {
                        return c[p];
                    })
            }
        return function (table, name) {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet : name || 'Worksheet', table : table.innerHTML}
            window.location.href = uri + base64(format(template, ctx))
        }
    })(),
    appendTable : function (pre, pro, target) {
        var content = ''
        var $pre = $('#' + pre);
        var $pro = $('#' + pro);
        var $target = $('#' + target);
        $target.html('');
        for (var i = 0; i < $pre.find('tr').length; i++) {
            content += '<tr>';
            content += $pre.find('tr').eq(i).html() + $pro.find('tr').eq(i).html();
            content += '</tr>';
        }
        $target.append(content);
    },
    saveCode : function (id) {
        var winname = window.open('', '_blank', 'top=10000');
        var strHTML = $('#' + id).html();
        winname.document.open('text/html', 'replace');
        winname.document.writeln(strHTML);
        winname.document.execCommand('saveas', '', ' 假植情况报表.xls');
        winname.close();
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }
}

//CommonUtil.ajaxPrefilter()

module.exports = CommonUtil