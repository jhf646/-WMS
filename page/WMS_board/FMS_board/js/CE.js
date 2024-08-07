//函数 
function ajax(key) {
    $.ajax({
        url: http1 + '?interface=' + key,
        type: "get",
        dataType: 'json',
        success: function (data) {
            if (typeof (eval(key)) == "function") {
                eval(key + "(data);");
            }
            else {
                // 函数不存在
            }
            console.log(data)
        },
        error: function () {

        }
    })
}

function load() {
    
    //设备数 排产数 已完成数 
    ajax("getScheduleNum")

    //报警信息列表
    // ajax("getErrorList")

    //近七天机床使用效率 加工时间
    ajax("getMachineSchedule")

    //当日的订单完成数
    ajax("getFinishedPlanNum")
}
load()
var i = 0
setInterval(() => {
    console.log("第" + i + "次循环请求");
    load();
    i++
}, 30000);

//设备数 排产数 已完成数 
function getScheduleNum(data) {
    var html = ''
    html = `<div class="inner">
    <div class="item">
        <h4>${data.machineNum}</h4>
        <span>
            <i class="icon-dot" style="color: #006cff"></i>
            设备总数
        </span>
    </div>
    <div class="item">
        <h4>${data.allCnt}</h4>
        <span>
            <i class="icon-dot" style="color: #6acca3"></i>
            总排产数
        </span>
    </div>
    <div class="item">
        <h4>${data.finishedCnt}</h4>
        <span>
            <i class="icon-dot" style="color: #6acca3"></i>
            已完成数
        </span>
    </div>
    <div class="item">
        <h4>108</h4>
        <span>
            <i class="icon-dot" style="color: #ed3f35"></i>
            异常报警
        </span>
    </div>
</div>`
    $(".overview").html("")
    $(".overview").html(html)
}
//报警信息列表
function getErrorList(data) {
    var html = ''
    for (var i = 0; i < data.length; i++) {
        html += ` <div class="row">
        <span class="col">${data[i].time}</span>
        <span class="col">${data[i].errorInfo}</span>
    </div>`
    }

    $(".getErrorList").html("")
    $(".getErrorList").html(html)
    if (data.length>10) {
        //事件委托
        $('.monitor').on('click', ' a', function () {
            //点击当前的a 加类名 active  他的兄弟删除类名
            $(this).addClass('active').siblings().removeClass('active');
            //获取一一对应的下标 
            var index = $(this).index();
            //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
            $('.content').eq(index).show().siblings('.content').hide();
        });
        //滚动
        //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
        //      然后动画向上滚动，滚动到一半重新开始滚动
        //因为选取的是两个marquee  所以要遍历
        $('.monitor .marquee').each(function (index, dom) {
            //将每个 的所有子级都复制一遍
            var rows = $(dom).children().clone();
            //再将新的到的加入原来的
            $(dom).append(rows);
        });
    }
}
//近七天机床使用效率 加工时间
function getMachineSchedule(data) {

}
//当日的订单完成数
function getFinishedPlanNum(data) {

}

