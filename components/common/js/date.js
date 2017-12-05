/**
 * Created by yu on 2016/5/12.
 */
/**
 * 日期常用工具封装，由tmsky库修改
 * 有问题自己看这里源码 不要问宝宝
 * 宝宝不说
 */
var _Seconds = 1000,
    _Minute = 60 * _Seconds,
    _Houre = 60 * _Minute,
    _Day = 24 * _Houre,
    _Week = 7 * _Day,
    __toString = Object.prototype.toString,
    _Week_Name = ['日', '一', '二', '三', '四', '五', '六'],
    DATCE_TCYPE = {
        y : 'FullYear',
        M : 'Month',
        d : 'Date',
        h : 'Hours',
        w : 'Week',
        m : 'Minutes',
        s : 'Seconds',
        S : 'Milliseconds'
    }
var date = {
    __FIELDS__ : {
        FORMAT : {
            DATE : 'yyyy-MM-dd',
            TIME : 'HH:mm:ss',
            DATE_TIME : 'yyyy-MM-dd HH:mm:ss',
            DATE_TIME_S : 'yyyy-MM-dd HH:mm:ss.SSS'
        },
        TIME : {
            SECONDS : _Seconds,
            MINUTE : _Minute,
            HOURS : _Houre,
            DAY : _Day,
            WEEK : _Week
        }
    },
    isNull : function (obj) {
        return undefined === obj || null === obj
    },
    isBoolean : function (obj) {
        return obj && date.type(obj) === 'boolean'
    },
    getFormat : function (fmt) {
        if (fmt) {
            fmt = typeof fmt === 'string' ? fmt : this.__FIELDS__.FORMAT.DATE
        } else {
            fmt = null
        }
        return fmt
    },
    // 生成日期
    date : function (arg) {
        if (!arg)
            return new Date();
        if (typeof arg === 'string') {
            arg = arg.replace(/-/g, "/");
            return new Date(arg);
        }
        return date.isDate(arg) ? arg : new Date(arg)
    },
    yesterday : function (fmt) {
        var d = this.plusDate(new Date(), -1, DATCE_TCYPE.d)
        return fmt ? this.format(d, this.getFormat(fmt)) : d
    },
    // 今天日期字符
    today : function () {
        return this.format(new Date())
    },
    tomorrow : function (fmt) {
        var d = this.plusDate(new Date(), 1, DATCE_TCYPE.d)
        return fmt ? this.format(d, this.getFormat(fmt)) : d
    },
    parse : function (s) {
        return date.isDate(s) ? s : new Date(Date.parse(s))
    },
    getWeek : function (date) {
        return _Week_Name[this.date(date).getDay()]
    },
    // 获取节日（包括阴历）
    getHoliday : function () {
        return _holiday.getHoliday.apply(_holiday, arguments)
    },
    getDayOfWeek : function (sDate) {
        var nWeek = null
        var oDate = new Date(sDate);
        nWeek = oDate.getDay();
        nWeek = (nWeek === 0) ? 7 : nWeek;
        return nWeek;
    },
    // 返回传入日期为星期几（星期一到星期日 分别为一---日）
    getDayOfWeekName : function (nDayOfWeek) {
        var index = 0;
        if (typeof nDayOfWeek == "string") {
            index = Number(nDayOfWeek);
        } else {
            index = nDayOfWeek;
        }
        var weekDays = ["一", "二", "三", "四", "五", "六", "日"];
        return weekDays[index - 1];
    },
    type : function (obj) {
        var type;
        if (obj == null) {
            type = String(obj);
        } else {
            type = __toString.call(obj).toLowerCase();
            type = type.substring(8, type.length - 1);
        }
        return type;
    },
    isDate : function (obj) {
        return obj && date.type(obj) === 'date'
    }
    ,
// 日期格式化
    format : function (d, fmt) {
        if (!date.isDate(d))
            d = new Date(d)
        var o = {
            "M+" : d.getMonth() + 1, // 月份
            "d+" : d.getDate(), // 日
            "h+" : d.getHours(), // 小时
            "m+" : d.getMinutes(), // 分
            "s+" : d.getSeconds(), // 秒
            "q+" : Math.floor((d.getMonth() + 3) / 3), // 季度
            "S" : d.getMilliseconds() // 毫秒
        };
        fmt = fmt || this.__FIELDS__.FORMAT.DATE;
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    ,
    /**
     * 指定日期加上 xx日期单位 后的日期
     *
     * @param date 日期或日期字符串(String|Date)
     * @param type [日期类型 | 默认为 天 'd'] 具体看 DATCE_TCYPE
     * @param num 向后几日期单位 默认为 1
     * @param fmt 格式化
     * @return Date新对象
     */
    plusDate : function (date, num, type, fmt) {
        if (date) {
            num = num == null ? 1 : +num;
            type = type ? type.length === 1 ? DATCE_TCYPE[type] : type : DATCE_TCYPE.d;
            var d = this.date(date),
                setter = 'set' + type,
                getter = 'get' + type;
            if (DATCE_TCYPE.w === type) {
                d.setDate(d.getDate() + num * 7);
            } else {
                d[setter](d[getter]() + num);
            }
            if (fmt)
                return this.format(d, fmt);
            return d;
        }
    }
    ,
    /**
     * 获取 结束日期 与开始日期 的差值（可能为负值）
     *
     * @param start [开始日期]
     * @param finish [结束日期]
     * @param type [差值类型 | 默认为 天] type值如：'d', 'y' 'M'....
     * @return [差值]
     */
    getDatePeriod : function (start, finish, type) {
        var start = this.date(start);
        var finish = this.date(finish);
        switch (type) {
            case 'y':
                return finish.getFullYear() - start.getFullYear();
            case 'M':
                return (finish.getFullYear() - start.getFullYear()) * 12 + (finish.getMonth() - start.getMonth());
            case 'w':
                return Math.floor((finish * 1 - start * 1) / _Day / 7);
            case 'h':
                return Math.floor((finish * 1 - start * 1) / _Houre);
            case 'm':
                return Math.floor((finish * 1 - start * 1) / 60 / 1000);
            case 's':
                return Math.floor((finish * 1 - start * 1) / 1000);
            case 'S':
                return Math.floor((finish * 1 - start * 1));
            default:
                return Math.floor((finish * 1 - start * 1) / _Day);
        }
    }
    ,
    /**
     * 获取某月的最后一天， date : 某月的一天
     */
    getLastDayOfMon : function (date) {
        date = typeof date == 'string' ? new Date(date.replace(/-/g, "/")) : date;
        var nextMon = date.addMonths(date, 1);
        var lastday = new Date(nextMon.getTime() - this.__FIELDS__.TIME.DAY);
        return date.format(lastday);
    }
    ,
    equals : function (d1, d2) {
        return d1 && d2 ? this.diffTime(d1, d2) == 0 : false
    }
    ,
    after : function (d1, d2) {
        return d1 && d2 ? this.diffTime(d1, d2) < 0 : false
    }
    ,
    before : function (d1, d2) {
        return d1 && d2 ? this.diffTime(d1, d2) > 0 : false
    }
    ,
    prevDate : function (date, fmt) {
        return date ? date.addDays(date, -1, fmt) : date.yesterday(fmt)
    }
    ,
    nextDate : function (date, fmt) {
        return date ? date.addDays(date, 1, fmt) : date.tomorrow(fmt)
    }
    ,
    getToMonthsEnd : function (date) {
        var tmpDate = this.date(date);
        var toDate = this.addMonths(tmpDate, 1);
        var days = this.diffDays(tmpDate, toDate);
        var tmp = this.format(tmpDate, "yyyy-MM");
        toDate = tmp + "-" + days;
        return toDate;
    }
    ,
    addMinutes : function (date, minutes, fmt) {
        return this.plusDate(date, minutes, DATCE_TCYPE.m, this.getFormat(fmt))
    }
    ,
    addHours : function (date, hours, fmt) {
        return this.plusDate(date, hours, DATCE_TCYPE.h, this.getFormat(fmt))
    }
    ,
    addDays : function (date, days, fmt) {
        return this.plusDate(date, days, DATCE_TCYPE.d, this.getFormat(fmt))
    }
    ,
    addWeeks : function (d1, weeks, fmt) {
        return this.plusDate(date, weeks, DATCE_TCYPE.w, this.getFormat(fmt))
    }
    ,
    addMonths : function (date, months, fmt) {
        return this.plusDate(date, months, DATCE_TCYPE.M, this.getFormat(fmt))
    }
    ,
    addQuarters : function (date, q, fmt) {
        return this.plusDate(date, q * 4, DATCE_TCYPE.M, this.getFormat(fmt))
    }
    ,
    addYears : function (date, years, fmt) {
        return this.plusDate(date, years, DATCE_TCYPE.y, this.getFormat(fmt))
    }
    ,
    diffTime : function (d1, d2, unit) {
        d1 = this.parse(d1)
        d2 = this.parse(d2)
        var t1 = d1.getTime(), t2 = d2.getTime(), diffTime = t2 - t1
        return unit ? diffTime / unit : diffTime
    }
    ,
    diffSeconds : function (d1, d2) {
        return this.diffTime(d1, d2, this.__FIELDS__.TIME.SECONDS)
    }
    ,
    diffMinutes : function (d1, d2) {
        return this.diffTime(d1, d2, this.__FIELDS__.TIME.MINUTE)
    }
    ,
    diffHours : function (d1, d2) {
        return this.diffTime(d1, d2, this.__FIELDS__.TIME.HOURS)
    }
    ,
    diffDays : function (d1, d2) {
        return this.diffTime(d1, d2, this.__FIELDS__.TIME.DAY)
    }
    ,
    isBetween : function (sDate, sBegin, sEnd) {
        if (this.diffDays(sBegin, sDate) < 0 || this.diffDays(sEnd, sDate) > 0) {
            return false;
        }
        return true;
    }
    ,
    convertDateToString : function (dateArr, format) {
        var result = [],
            f = date.isNull(format) ? this.__FIELDS__.FORMAT.DATE : format;
        for (var i = 0; i < dateArr.length; i++) {
            result.push(dateArr[i].format(f));
        }
        return result;
    }
}

module.exports = date