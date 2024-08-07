layui.define(["jquery","laydate"],function(exports) {
    "use strict";

    var $ = layui.jquery,laydate = layui.laydate,
        //构造器
        Class = function () {
        },
        //单列
        singleInstance = new Class(),
        //监听鼠标中间键滚轮滚动回调事件
        scrollFunc=function(e){
            if(singleInstance.leaveStatus){
                singleInstance.deleteAll();
            }
        },
        //鼠标移动的回调事件
        mousemoveEventCall = function (e) {
            e = e || window.event;
            var p = singleInstance.point;
            if(e.pageX || e.pageY) {
                var xy = {x:e.pageX,y:e.pageY};
                if(xy.x > p.maxX || xy.x < p.minX || xy.y > p.maxY || xy.y < p.minY){
                    //此范围内删除所有下拉框和input
                    singleInstance.deleteAll();
                    //取消绑定的鼠标移动事件
                    $(window).unbind('mousemove',mousemoveEventCall);
                }
            }
        };
    /*注册事件*/
    if(document.addEventListener){
        //兼容火狐浏览器
        document.addEventListener('DOMMouseScroll',scrollFunc,false);
    }
    window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome

    //日期选择框
    Class.prototype.date = function(options){
        var othis = this;
        othis.cacheOptions = options;
        othis.callback = options.callback;
        othis.cacheOptions.dateType =  othis.isEmpty(othis.cacheOptions.dateType) ? "datetime":othis.cacheOptions.dateType;
        var that = options.element;
        othis.td = that;
        if ($(that).find('input').length>0) {
            return;
        }
        othis.deleteDate();
        var input = $('<input class="layui-input layui-table-select-input" type="text" id="thisDate">');
        $(that).append(input);
        var icon = $('<i class="layui-icon layui-table-select-edge">&#x1006;</i>');
        $(that).append(icon);
        icon.bind('click',function () {
            layui.stope();
            othis.deleteDate();
        });
        //日期时间选择器
        laydate.render({
            elem: '#thisDate'
            ,type: othis.cacheOptions.dateType
            ,done:function (value, date) {
                othis.deleteDate();
                if(othis.callback){
                    othis.callback({value:value,td:that});
                }
            }
        });
    };

    //判断是否为空函数
    Class.prototype.isEmpty = function(dataStr){
        if(typeof dataStr === 'undefined' || dataStr === null || dataStr.length <= 0){
            return true;
        }else {
            return false;
        }
    };

    //删除td中的input和时间选择器
    Class.prototype.deleteDate = function(){
        $("#thisDate").next().remove();
        $("#thisDate").remove();
        $("div.layui-laydate").remove();
    };

    //生成下拉框函数入口
    Class.prototype.register = function(options){
        var othis = this;
        othis.cacheOptions = options;
        othis.callback = options.callback;
        othis.data = options.data;
        var that = options.element;
        othis.td = that;
        if ($(that).find('input').length>0) {
            return;
        }
        othis.deleteAll(that);
        othis.leaveStatus = true;
        var input = $('<input class="layui-input layui-table-select-input" placeholder="关键字搜索">');
        var icon = $('<i class="layui-icon layui-table-select-edge" data-td-text="'+$(that).find("div.layui-table-cell").eq(0).text()+'" >&#xe625;</i>');
        $(that).append(input);
        $(that).append(icon);
        input.focus();
        input.bind('input propertychange', function(){
            var val = this.value;
            if(othis.cacheOptions.enabled === true){
                var ul = $('div.layui-table-select-div').find('ul.ul-edit-data').eq(0);
                if(val === null || val === '' || val.length === 0){
                    return;
                }
                var searchDDs = [];
                $(ul).find('li').each(function () {
                    var thisValue = $(this).data('value');
                    thisValue = othis.isEmpty(thisValue)?"":thisValue;
                    if(thisValue.indexOf(val) > -1){
                        var classText = $(this).attr("class");
                        var backgroundColor = "";
                        if(classText.indexOf("li-checked") > -1){
                            backgroundColor = "background-color: #60b979";
                        }
                        searchDDs.push('<li class="'+$(this).attr("class")+'" data-name="'+$(this).data('name')+'" data-value="'+thisValue+'"><div class="define-edit-checkbox" lay-skin="primary"><span>'+thisValue+'</span><i style="'+backgroundColor+'" class="layui-icon layui-icon-ok"></i></div></li>');
                        $(this).remove();
                    }
                });
                ul.prepend(searchDDs.join(" "));
                othis.liClick(that);
            }else {
                var dl = $('div.layui-table-select-div').find('dl').eq(0);
                var searchDDs = [];
                if(val === null || val === '' || val.length === 0){
                    searchDDs = othis.createHtml(othis.data);
                }else {
                    searchDDs = othis.searchHtml(othis.data,val);
                }
                dl.html("");
                dl.prepend(searchDDs.join(" "));
                othis.ddClick(that);
            }
            //重新注册鼠标移动事件
            othis.registerMousemove(that,tdInfo.type); //注册事件
        });
        icon.bind('click',function () {
            layui.stope();
            othis.deleteAll();
        });
        //layui.stope(input);
        var thisY = that.getBoundingClientRect().top; //y坐标
        var thisX = that.getBoundingClientRect().left; //x坐标
        var tdHeight = that.offsetHeight;
        var tdWidth = that.offsetWidth;
        var tdInfo = {
            x:thisX,
            y:thisY,
            width:tdWidth,
            height:tdHeight,
            type:'',
            td:that
        };
        var winHeight = $(window).height();
        //当前y坐标大于窗口0.55倍的高度则往上延伸，否则往下延伸。
        if(thisY+tdHeight > 0.55*winHeight){
            //往上延伸
            tdInfo.type = 'up';
        }else {
            //往下延伸
            tdInfo.type = 'down';
        }
        othis.dynamicGenerationSelect(othis.data,tdInfo);
        othis.registerMousemove(that,tdInfo.type);
        othis.registerHover();
    };

    //给下拉列表注册点击事件
    Class.prototype.ddClick = function(){
        var othis = this;
        $('div.layui-table-select-div').find('dd').bind('click',function (e) {
            layui.stope(e);
            var name = $(this).attr('lay-value');
            othis.deleteAll();
            if(othis.callback){
                var update = {name:name,value:$(this).text()};
                var thisObj = {
                    select:update,
                    td:othis.td
                };
                othis.callback(thisObj);
            }
        });
    };

    //给下拉列表注册点击事件
    Class.prototype.liClick = function(){
        $('div.layui-table-select-div').find('li').unbind('click');
        $('div.layui-table-select-div').find('li').bind('click',function (e) {
            layui.stope(e);
            var icon = $(this).find("i");
            var liClass = $(this).attr("class");
            if(liClass && liClass.indexOf("li-checked") > -1){
                icon.css("background-color","#fff");
                $(this).removeClass("li-checked");
            }else {
                icon.css("background-color","#60b979");
                $(this).addClass("li-checked");
            }
        });
    };


    //生成下拉选择框的html代码(单选)
    Class.prototype.createHtml = function(selectData,data){
        if(!data)data = [];
        selectData.forEach(function (e) {
            data.push('<dd lay-value="'+e.name+'" class="layui-table-select-dd">'+e.value+'</dd>');
        });
        return data;
    };
    //生成根据关键字搜索的下拉选择框(单选)
    Class.prototype.searchHtml = function(selectData,search,data){
        if(!data)data = [];
        selectData.forEach(function (e) {
            if((e.value+'').indexOf(search)>-1){
                data.push('<dd lay-value="'+e.name+'" class="layui-table-select-dd">'+e.value+'</dd>');
            }
        });
        return data;
    };


    //生成下拉选择框的html代码(多选)
    Class.prototype.createHtmlLi = function(selectData,data){
        if(!data)data = [];
        selectData.forEach(function (e) {
            data.push('<li class="define-edit-checkbox" data-name="'+e.name+'" data-value="'+e.value+'"><div class="define-edit-checkbox" lay-skin="primary"><span>'+e.value+'</span><i class="layui-icon layui-icon-ok"></i></div></li>');
        });
        return data;
    };

    //删除所有删除下拉框和input和div
    Class.prototype.deleteAll = function(td){
        var othis = this;
        othis.deleteDate();
        $('div.layui-table-body').find('td').each(function () {
            var icon = $(this).find('i.layui-table-select-edge');
            if(icon.length === 0){
                return;
            }
            $(this).find('input.layui-table-select-input').blur();
            $(this).find('input.layui-table-select-input').remove();
            icon = icon.eq(0);
            var text = icon.attr('data-td-text');
            $(this).find("div.layui-table-cell").eq(0).text(text);
            icon.remove();
        });
        delete othis.leaveStatus;
        $('div.layui-table-select-div').remove();
    };

    //动态生成下拉框
    Class.prototype.dynamicGenerationSelect = function(data,tdInfo){
        var othis = this;
        var domArr = [];
        var winHeight = $(window).height()+window.scrollY;//加上滚动条滚动高度
        var type = tdInfo.type === 'up'?'top:auto;bottom: '+(winHeight-tdInfo.y)+'px;':'bottom:auto;top:'+(tdInfo.y+tdInfo.height)+'px;';
        var width = tdInfo.width;
        var left = tdInfo.x;
        if(othis.cacheOptions.enabled === true){
            othis.createDivli(domArr,tdInfo,width,left,type);
        }else {
            domArr.push('<div class="layui-table-select-div div-style" style="z-index: 19910908;'+type+' width:'+width+'px;position: absolute; left: '+left+'px;">');
                domArr.push('<dl>');
                    if(data){
                        othis.createHtml(data,domArr);
                    }else {
                        domArr.push('<dd lay-value="" class="">无数据</dd>');
                    }
                domArr.push('</dl>');
            domArr.push('</div>');
            $('body').append(domArr.join(" "));
            othis.ddClick();
        }
    };

    //生成多选下拉框
    Class.prototype.createDivli = function(domArr,tdInfo,width,left,type){
        var othis = this;
        domArr.push('<div class="layui-table-select-div" style="z-index: 19910908;'+type+' width:'+width+'px;position: absolute; left: '+left+'px;">');
            domArr.push('<div><spn style="text-align: left"><button type="button" id="selectAll" class="layui-btn layui-btn-sm layui-btn-primary">全选</button></spn><span style="float: right"><button id="confirmBtn" type="button" class="layui-btn layui-btn-sm layui-btn-primary">确定</button></span></div>');
                domArr.push('<div style="margin:0;background-color: #93f3ff;border: 1px solid #d2d2d2;max-height: 290px;overflow-y: auto;font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;">');
                domArr.push('<ul class="ul-edit-data" >');
                    if(othis.data){
                        othis.createHtmlLi(othis.data,domArr);
                    }else {
                        domArr.push('<li>无数据</li>');
                    }
                domArr.push('</ul>');
            domArr.push('</div>');
        domArr.push('</div>');
        $('body').append(domArr.join(" "));
        othis.liClick();
        othis.btnClick();
    };

    //多选下拉框 注册（“确定”或“全选”按钮）点击事件
    Class.prototype.btnClick = function(){
        var othis = this;
        //“确定”按钮
        $('#confirmBtn').bind('click',function (e) {
            var dataList = new Array();
            $("div.layui-table-select-div").find("div li").each(function (e) {
                var liClass = $(this).attr("class");
                if(!liClass || liClass.indexOf("li-checked") <= -1){
                    return;
                }
                var name = $(this).data("name");
                var value = $(this).data("value");
                var update = {name:name,value:value};
                dataList.push(update);
            });
            othis.deleteAll();
            if(othis.callback){
                var thisObj = {
                    select:dataList,
                    td:othis.td
                };
                othis.callback(thisObj);
            }
        });

        //“全选”按钮
        $('#selectAll').bind('click',function () {
            var btn = this;
            var status = $(this).attr('data-status');
            $('ul.ul-edit-data').find('li').each(function (e) {
                var icon = $(this).find("i");
                if(othis.isEmpty(status) || status === 'false'){
                    icon.css("background-color","#60b979");
                    $(this).addClass("li-checked");
                    $(btn).attr("data-status","true");
                }else {
                    icon.css("background-color","#fff");
                    $(this).removeClass("li-checked");
                    $(btn).attr("data-status","false");
                }
            });
        });
    };

    //注册鼠标移动事件
    Class.prototype.registerMousemove = function (that,type) {
        var othis = this;
        var divDom = $('div.layui-table-select-div')[0];
        var divHeight = divDom.offsetHeight;
        var thisY = that.getBoundingClientRect().top; //y坐标
        var thisX = that.getBoundingClientRect().left; //x坐标
        var tdHeight = that.offsetHeight;
        var tdWidth = that.offsetWidth;
        var maxY,maxX,minY,minX;
        //计算出最大y坐标、最小y坐标、最大x坐标，最小x坐标。
        if('down' === type){
            //往下延伸
            maxY = thisY+tdHeight+divHeight;
            maxX = thisX + tdWidth;
            minY = thisY;
            minX = thisX;
        }else {
            //往上延伸
            maxY = thisY+tdHeight;
            maxX = thisX + tdWidth;
            minY = thisY-divHeight;
            minX = thisX;
        }
        othis.point = {
            maxX:maxX
            ,maxY:maxY
            ,minX:minX
            ,minY:minY
        };
        //先解绑鼠标移动事件
        $(window).unbind('mousemove',mousemoveEventCall);
        //再次绑定鼠标移动事件
        $(window).bind('mousemove',mousemoveEventCall);
    };

    //更新单元格中的显示值
    Class.prototype.update = function (options) {
        $(options.element).find("div.layui-table-cell").eq(0).text(options.value);
    };

    //给下拉框注册鼠标悬停事件
    Class.prototype.registerHover = function () {
        var othis = this;
        $('div.layui-table-select-div').hover(
            function () {
                othis.leaveStatus = false;
            },function () {
                othis.leaveStatus = true;
            }
        );
    };

    var active = {
        createSelect:function (options) {
            singleInstance.register(options);
        },
        update:function (options) {
            singleInstance.update(options);
        },
        createDate:function (options) {
            singleInstance.date(options);
        }
    };
    layui.link(layui.cache.base + 'css/layuiTableColumnEdit.css');
    exports('layuiTableColumnEdit', active);
});