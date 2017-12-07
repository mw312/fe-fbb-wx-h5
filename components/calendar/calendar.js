var COMMON = require('../common/js/common.js')
var CONST = require('../common/const.js')
var canlender = {
    configs: {
        beginDateViewStr: "开始",
        endDateViewStr: "结束"
    },
    init: function (callback) {
        var beginStr = this.configs.beginDateViewStr, endStr = this.configs.endDateViewStr, maxDays = 7;
        $('body').append('<div id="calendar" style="display: none"></div>');
        document.getElementById('calendar').innerHTML = __inline('../calendar/tpl/calendar.html');
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var second = COMMON.DATE.plusDate(COMMON.DATE.today(), -1, 'M', 'yyyyMM');
        var third = COMMON.DATE.plusDate(COMMON.DATE.today(), -2, 'M', 'yyyyMM');
        initdate($('.firstM', $('.date-box')), third.substring(0, 4), third.substring(4));
        initdate($('.secondM', $('.date-box')), second.substring(0, 4), second.substring(4));
        initdate($('.thirdM', $('.date-box')), year, month);
        $('.date-box section .year_month').click(function () {
            $(this).next().toggle()
        });

        function initdate(obj, year, month) {
            var html = '<h6 class="year_month">' + year + '年' + month + '月</h6><ul id="month' + month + '" class="day">';
            //获取每月第一天为周几,用day表示，获得每月一共多少天，用allday表示
            var day = new Date(year + '/' + month + '/' + 1).getDay();
            var allday = new Date(year, month, 0).getDate();
            for (var i = 1; i <= allday + day; i++) {

                if (i < day + 1) {
                    html += '<li></li>'
                } else {
                    html += '<li class="day-num"><span class="up"></span><span>' + (i - day) + '</span><span class="down"></span><input type="hidden" value=' + year + '-' + (month < 10 ? '0' + month : month) + '-' + (i - day < 10 ? '0' + (i - day) : (i - day)) + ' /></li>'
                }
            }
            html += '</ul>';
            obj.html(html);
            // switch (month) {
            //     case 1:
            //         createSpan('元旦', 'holiday', 1);
            //         break;
            //     case 2:
            //         createSpan('情人节', 'holiday', 14);
            //         break;
            //     case 3:
            //         createSpan('妇女节', 'holiday', 8);
            //         break;
            //     case 4:
            //         createSpan('愚人节', 'holiday', 1);
            //         break;
            //     case 5:
            //         createSpan('劳动节', 'holiday', 1);
            //         break;
            //     case 6:
            //         createSpan('儿童节', 'holiday', 1);
            //         break;
            //     case 7:
            //         break;
            //     case 8:
            //         break;
            //     case 9:
            //         createSpan('教师节', 'holiday', 10);
            //         break;
            //     case 10:
            //         createSpan('国庆节', 'holiday', 1);
            //         break;
            //     case 11:
            //         break;
            //     case 12:
            //         createSpan('圣诞节', 'holiday', 25);
            //         break;
            //     default :
            //         break;
            // }
            // function createSpan(str, cla, n) {
            //     var oLi = obj.find('li').eq('+(day-1+n)+');
            //     oLi.find('.up').html(str).attr('class', cla);
            // }
            var aLi = $('li', obj);
            for (var i = 0; i < aLi.length; i++) {
                if (i % 7 == 0 || (i + 1) / 7 == parseInt((i + 1) / 7)) {
                    $(aLi[i]).addClass('color-red')
                }
            }
            // 将今日之后的日期颜色变灰
            var nowday = new Date();
            var today = nowday.getDate();
            // if (year < nowday.getFullYear() || (year == nowday.getFullYear() && month < nowday.getMonth() + 1)) {
            //     for (var i = 0; i < aLi.length; i++) {
            //         $(aLi[i]).css('color', '#ccc');
            //         $(aLi[i]).addClass('color-c')
            //     }
            // }
            if (year == nowday.getFullYear() && month == nowday.getMonth() + 1) {
                for (var i = 0; i < aLi.length; i++) {
                    if (i > today + day - 1) {
                        $(aLi[i]).css('color', '#ccc');
                        $(aLi[i]).addClass('color-c')
                    }
                }
            }
        }

        // $(".date-box").scroll(function () {
        //     var height = $(this).find('article').outerHeight() + 30, scrollTop = $(".date-box").scrollTop();
        //     if (scrollTop == 0)
        //         console.log("滚动到顶 加载上个月");
        //     if ((scrollTop + $(window).height()) >= height)
        //         console.log("滚动到底 加载下个月");
        // });

        //点击日期
        $('.day-num').on('click', function () {
            if (!$(this).hasClass('color-c')) {
                if ($('.date-box .selected').length == 0) {
                    $('.date-text').remove();
                    $(this).addClass('selected');
                    $(this).append("<b class='date-text'>" + beginStr + "</b>");
                } else if ($('.date-box .selected').length == 1) {
                    var first = $('.date-box .selected').find('input').val();
                    var index1 = $('.date-box .selected').index();
                    var now = $(this).find('input').val();
                    var diff = COMMON.DATE.getDatePeriod(first, now, 'd');
                    if (diff > 0) {
                        var pindex1 = {
                            index: $('.date-box .selected').parents('section').index() - 2,
                            length: $('.firstM').find('li').length
                        }
                        var pindex2 = {
                            index: $(this).parents('section').index() - 2,
                            length: $('.secondM').find('li').length
                        }
                        var index2 = $(this).index();
                        if (pindex2.index > 0 && pindex1.index == 0) {
                            if (pindex2.index == 1)
                                index2 += pindex1.length;
                            else if (pindex2.index == 2)
                                index2 += pindex1.length + pindex2.length;
                        } else if (pindex2.index > 0 && pindex1.index > 0) {
                            if (pindex2.index == 1) {
                                index1 += pindex1.length;
                                index2 += pindex1.length;
                            } else if (pindex2.index == 2) {
                                index1 += pindex1.length + pindex2.length;
                                index2 += pindex1.length + pindex2.length;
                            }
                        }
                        for (var i = index1; i < index2; i++) {
                            if ($('.date-box section li').eq(i).hasClass('day-num') && !$('.date-box section li').eq(i).hasClass('color-c')) {
                                $('.date-box section li').eq(i).addClass('selected');
                            }
                        }
                        $(this).addClass('selected');
                        $(this).append("<b class='date-text'>" + endStr + "</b>");
                        if ($('.date-box .selected').length > maxDays) {
                            $.alert("最多只能选择一周！");
                            $('.date-text').remove();
                            $('.date-box .selected').removeClass('selected');
                            return false;
                        }
                        setTimeout(function () {
                            $('#calendar').hide();
                        }, 300);
                        // var $calendar = $('#calendar')
                        // $calendar.animate({opacity: 0}, 400, 'ease-in', function () {
                        //     $calendar.css({display: 'none'})
                        // }, 200);
                        if (callback) {
                            callback(first, now);
                        }
                    } else if (diff == 0) {
                        $('.date-text').remove();
                        $('.date-box .selected').removeClass('selected');
                    }
                } else {
                    $('.date-text').remove();
                    $('.date-box .selected').removeClass('selected');
                }
            }
        });
        $('#back').on('click', function () {
            var $calendar = $('#calendar');
            // $calendar.animate({opacity : 0}, 600, 'ease-in', function () {
            //     $calendar.css({display : 'none'})
            // });
            $calendar.hide();
            $('.date-text').remove();
            $('.date-box .selected').removeClass('selected');
        })
    },
    updateSelectDateState: function (from, to) {
        function isContainArr(item, arr) {
            var count = 0
            arr.forEach(function (el, i) {
                if (el == item) {
                    count++
                }
            })

            if (count > 0) {
                return true
            } else {
                return false
            }
        }
        var initSeleted = [];
        var diffDay = COMMON.DATE.getDatePeriod(from, to, 'd');
        for (var i = 0; i < diffDay + 1; i++) {
            initSeleted.push(COMMON.DATE.plusDate(from, i, 'd', 'yyyy-MM-dd'));
        }
        $('.date-box .selected').removeClass('selected');
        $('.day-num').each(function (i, v) {
            if ($(this).find('input').val() && isContainArr($(this).find('input').val(), initSeleted)) {
                $(this).addClass('selected');
            }
        });
        if ($('.date-box .selected').length >= 2) {
            $('.date-box .selected').eq(0).append('<b class="date-text">' + this.configs.beginDateViewStr + '</b>');
            $('.date-box .selected').eq($('.date-box .selected').length - 1).append('<b class="date-text">' + this.configs.endDateViewStr + '</b>');
        }
    }

}

module.exports = canlender;
