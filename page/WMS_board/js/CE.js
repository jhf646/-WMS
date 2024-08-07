//自调用函数
(function () {
  // 1、页面一加载就要知道页面宽度计算
  var setFont = function () {
    // 因为要定义变量可能和别的变量相互冲突，污染，所有用自调用函数
    var html = document.documentElement; // 获取html
    // 获取宽度
    var width = html.clientWidth;

    // 判断
    if (width < 1024) width = 1024;
    if (width > 1920) width = 1920;
    // 设置html的基准值
    var fontSize = width / 80 + "px";
    // 设置给html
    html.style.fontSize = fontSize;
  };
  setFont();
  // 2、页面改变的时候也需要设置
  // 尺寸改变事件
  window.onresize = function () {
    setFont();
  };
})();
//函数
// function ajax(key) {
//   $.ajax({
//     url: http1 + "?interface=" + key,
//     type: "get",
//     dataType: "json",
//     success: function (data) {
//       let key1 = key.split("&");
//       if (typeof eval(key1[0]) == "function") {
//         eval(key1[0] + "(data);");
//       } else {
//         // 函数不存在
//       }
//       console.log(data);
//     },
//     error: function () {},
//   });
// }
function ajax(key) {
  let key1 = key.split("&");
  $.ajax({
    url: http1 + key1[0],
    type: "POST",
    dataType: "json",
    success: function (res) {
      let dataValue = res.data;

      if (typeof eval(key1[1]) == "function") {
        eval(key1[1] + "(dataValue);");
      } else {
        // 函数不存在
      }
      console.log(dataValue);
    },
    error: function () {},
  });
}

function load() {
  //1、 库位实时信息（总库位数、已使用库位、剩余库位数量、库位法兰数）
  ajax("VisualGetTotalInfo&VisualGetTotalInfoOne");

  //2、 当日运行效率(出库/入库)
  ajax("VisualGetTotalInfo&VisualGetTotalInfoThree");

  //3、 获取实时任务
  //   ajax("getRealTimeTask");

  //4、当日报警信息
  //   ajax("GetDailyErrorInfo");

  //5、 获取xx年12个月的出入库数量
  ajax("VisualGetOrderCountLogInfo&VisualGetOrderCountLogInfo");

  //6、获取7天内物料使用前10
  ajax("VisualItemUsedCountLogInfo&VisualItemUsedCountLogInfo");

  //7、 当日的入库订单完成数
  ajax("VisualGetTodayInOrderLineInfo&VisualGetTodayInOrderLineInfo");

  //8、当日的出库订单完成数
  ajax("VisualGetTodayOutOrderLineInfo&VisualGetTodayOutOrderLineInfo");

  //   9、库位占比
  ajax("VisualGetTotalInfo&VisualGetTotalInfoTwo");
}
load();
var i = 0;
// 循环刷新函数
setInterval(() => {
  console.log("第" + i + "次循环请求");
  load();
  i++;
}, 20000);

// 库位实时信息（总库位数、已使用库位、剩余库位数量、库位法兰数）
function VisualGetTotalInfoOne(data) {
  // "AllLocationCount": 41,  //总库位数
  // "AllFreeLocationCount": 37, //闲置库位数
  // "AllStockedLocationCount": 1,  //有货库位数
  // "AllEmptyPalletLocationCount": 3,//空盘库位数
  // "AllTodayInPalletCount": 0, //当日入库托数
  // "AllTodayOutPalletCount": 2 //当日出库托数
  $("#AllLocationCount").html("");
  $("#AllLocationCount").html(data.AllLocationCount);
  $("#AllFreeLocationCount").html("");
  $("#AllFreeLocationCount").html(data.AllFreeLocationCount);
  $("#AllStockedLocationCount").html("");
  $("#AllStockedLocationCount").html(data.AllStockedLocationCount);
  $("#AllEmptyPalletLocationCount").html("");
  $("#AllEmptyPalletLocationCount").html(data.AllEmptyPalletLocationCount);
}

// 当日运行效率(出库/入库)

function VisualGetTotalInfoThree(data) {
  // "AllLocationCount": 41,  //总库位数
  // "AllFreeLocationCount": 37, //闲置库位数
  // "AllStockedLocationCount": 1,  //有货库位数
  // "AllEmptyPalletLocationCount": 3,//空盘库位数
  // "AllTodayInPalletCount": 0, //当日入库托数
  // "AllTodayOutPalletCount": 2 //当日出库托数
  var dataStyle = {
    normal: {
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      shadowBlur: 0,
      shadowColor: "#203665",
    },
  };
  option = {
    backgroundColor: "",
    series: [
      {
        name: "第一次圆环",
        type: "pie",
        clockWise: false,
        radius: [70, 80],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ["25%", "50%"],
        data: [
          {
            value: data.AllTodayInPalletCount,
            label: {
              normal: {
                rich: {
                  a: {
                    color: "#3a7ad5",
                    align: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  b: {
                    color: "#fff",
                    align: "center",
                    fontSize: 16,
                  },
                },
                formatter: function (params) {
                  return "{b|入库统计}\n\n" + "{a|" + params.value + "次}" + "";
                },
                position: "center",
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "normal",
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#2c6cc4",
                shadowColor: "#2c6cc4",
                shadowBlur: 0,
              },
            },
          },
          {
            value: 0,
            name: "invisible",
            itemStyle: {
              normal: {
                color: "#24375c",
              },
              emphasis: {
                color: "#24375c",
              },
            },
          },
        ],
      },
      {
        name: "第二次圆环",
        type: "pie",
        clockWise: false,
        radius: [70, 80],
        itemStyle: dataStyle,
        hoverAnimation: false,
        center: ["75%", "50%"],
        data: [
          {
            value: data.AllTodayOutPalletCount,
            label: {
              normal: {
                rich: {
                  a: {
                    color: "#20b7db",
                    align: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                  b: {
                    color: "#fff",
                    align: "center",
                    fontSize: 16,
                  },
                },
                formatter: function (params) {
                  return "{b|出库统计}\n\n" + "{a|" + params.value + "次}" + "";
                },
                position: "center",
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "normal",
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#20b7db",
                shadowColor: "#20b7db",
                shadowBlur: 0,
              },
            },
          },
          {
            value: 0,
            name: "invisible",
            itemStyle: {
              normal: {
                color: "#412a4e",
              },
              emphasis: {
                color: "#412a4e",
              },
            },
          },
        ],
      },
    ],
  };
  var myechart = echarts.init($(".efficiency")[0]);
  myechart.setOption(option);
}

//库位使用占比
function VisualGetTotalInfoTwo(data) {
  var img =
    "data:image/png;base64,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";

  var trafficWay = [
    {
      name: "闲置库位数",
      value: data.AllFreeLocationCount,
    },
    {
      name: "物料库位数",
      value: data.AllStockedLocationCount,
    },
    {
      name: "空盘库位数",
      value: data.AllEmptyPalletLocationCount,
    },
  ];

  var data = [];
  var color = [
    "#00ffff",
    "#00cfff",
    "#006ced",
    "#ffe000",
    "#ffa800",
    "#ff5b00",
    "#ff3000",
  ];
  for (var i = 0; i < trafficWay.length; i++) {
    data.push(
      {
        value: trafficWay[i].value,
        name: trafficWay[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 20,
            borderColor: color[i],
            shadowColor: color[i],
          },
        },
      },
      {
        value: 2,
        name: "",
        itemStyle: {
          normal: {
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            color: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 0,
          },
        },
      }
    );
  }
  var seriesOption = [
    {
      name: "",
      type: "pie",
      clockWise: false,
      radius: [52.5, 54.5],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "outside",
            color: "#ddd",
            formatter: function (params) {
              var percent = 0;
              var total = 0;
              for (var i = 0; i < trafficWay.length; i++) {
                total += trafficWay[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== "") {
                return (
                  "库位状态：" +
                  params.name +
                  "\n" +
                  "\n" +
                  "占百分比：" +
                  percent +
                  "%"
                );
              } else {
                return "";
              }
            },
          },
          labelLine: {
            length: 5,
            length2: 25,
            show: true,
            color: "#00ffff",
          },
        },
      },
      data: data,
    },
  ];
  var option = {
    backgroundColor: "",
    color: color,
    title: {
      text: "库位占比",
      top: "47%",
      textAlign: "center",
      left: "49%",
      textStyle: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "400",
      },
    },
    graphic: {
      elements: [
        {
          type: "image",
          z: 3,
          style: {
            image: img,
            width: 78,
            height: 78,
          },
          left: "center",
          top: "center",
          position: [100, 100],
        },
      ],
    },
    tooltip: {
      show: false,
    },
    // legend: {
    //   icon: "circle",
    //   orient: "horizontal",
    //   // x: 'left',
    //   data: [" 闲置库位数", "物料库位数", "空盘库位数"],
    //   right: 340,
    //   bottom: 150,
    //   align: "right",
    //   textStyle: {
    //     color: "#fff",
    //   },
    //   itemGap: 20,
    // },
    toolbox: {
      show: false,
    },
    series: seriesOption,
  };
  var myechart = echarts.init($(".gauge")[0]);
  myechart.setOption(option);
}
//获取实时任务
function getRealTimeTask(data) {
  //         "OperType": "Out",
  //     "ItemCode": "0001",
  //     "StockIndex": "A11",
  //     "PlanNumber": ""
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += ` <div class="row">
        <span class="col">${data[i].StockIndex}</span>
        <span class="col">${data[i].OperType == "Out" ? "出库" : "入库"}</span>
        <span class="col">${data[i].ItemCode}</span>
        <span class="col">${data[i].PlanNumber}</span>
        <span class="icon-dot"></span>
    </div>`;
  }

  $("#getRealTimeTask").html("");
  $("#getRealTimeTask").html(html);
  if (data.length > 10) {
    //事件委托
    $(".monitor").on("click", " a", function () {
      //点击当前的a 加类名 active  他的兄弟删除类名
      $(this).addClass("active").siblings().removeClass("active");
      //获取一一对应的下标
      var index = $(this).index();
      //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
      $(".content").eq(index).show().siblings(".content").hide();
    });
    //滚动
    //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
    //      然后动画向上滚动，滚动到一半重新开始滚动
    //因为选取的是两个marquee  所以要遍历
    $(".monitor .marquee").each(function (index, dom) {
      //将每个 的所有子级都复制一遍
      var rows = $(dom).children().clone();
      //再将新的到的加入原来的
      $(dom).append(rows);
    });
  }
}
//当日报警信息
function GetDailyErrorInfo(data) {
  //             "errorInfo": "Warning3",
  //         "errorTime": "2020/9/10 16:16:30"

  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += ` <div class="row">
        <span class="col">${data[i].errorInfo}</span>
        <span class="col">${data[i].errorTime}</span>
        <span class="icon-dot"></span>
    </div>`;
  }

  $("#GetDailyErrorInfo").html("");
  $("#GetDailyErrorInfo").html(html);
  if (data.length > 10) {
    //事件委托
    $(".monitor").on("click", " a", function () {
      //点击当前的a 加类名 active  他的兄弟删除类名
      $(this).addClass("active").siblings().removeClass("active");
      //获取一一对应的下标
      var index = $(this).index();
      //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
      $(".content").eq(index).show().siblings(".content").hide();
    });
    //滚动
    //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
    //      然后动画向上滚动，滚动到一半重新开始滚动
    //因为选取的是两个marquee  所以要遍历
    $(".monitor .marquee").each(function (index, dom) {
      //将每个 的所有子级都复制一遍
      var rows = $(dom).children().clone();
      //再将新的到的加入原来的
      $(dom).append(rows);
    });
  }
}

//获取xx年12个月的出入库数量
function VisualGetOrderCountLogInfo(data) {
  let arr = [];
  let arr1 = [];
  let arr2 = [];
  for (var i = 0; i < data.length; i++) {
    arr.push(data[i].InOrderCount + "");
    arr1.push(data[i].OutOrderCount + "");
    arr2.push(data[i].GroupName + "");
  }

  f2();

  function f2() {
    var option = {
      //鼠标提示工具
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        // 类目类型
        type: "category",
        // x轴刻度文字
        data: arr2,
        axisTick: {
          show: false, //去除刻度线
        },
        axisLabel: {
          color: "#4c9bfd", //文本颜色
        },
        axisLine: {
          show: false, //去除轴线
        },
        boundaryGap: false, //去除轴内间距
      },
      yAxis: {
        // 数据作为刻度文字
        type: "value",
        axisTick: {
          show: false, //去除刻度线
        },
        axisLabel: {
          color: "#4c9bfd", //文本颜色
        },
        axisLine: {
          show: false, //去除轴线
        },
        boundaryGap: false, //去除轴内间距
      },
      //图例组件
      legend: {
        textStyle: {
          color: "#4c9bfd", // 图例文字颜色
        },
        right: "10%", //距离右边10%
      },
      // 设置网格样式
      grid: {
        show: true, // 显示边框
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        borderColor: "#012f4a", // 边框颜色
        containLabel: true, // 包含刻度文字在内
      },
      series: [
        {
          name: "出库入数",
          // 数据
          data: arr,
          // 图表类型
          type: "line",
          // 圆滑连接
          smooth: true,
          itemStyle: {
            color: "#00f2f1", // 线颜色
          },
        },
        {
          name: "出库次数",
          // 数据
          data: arr1,
          // 图表类型
          type: "line",
          // 圆滑连接
          smooth: true,
          itemStyle: {
            color: "#ed3f35", // 线颜色
          },
        },
      ],
    };
    var myechart = echarts.init($(".line")[0]);
    myechart.setOption(option);
  }
}
//获取7天内物料使用前10
function VisualItemUsedCountLogInfo(data) {
  // "ItemID": "BBP0001",
  // "UsedCount": 10

  let arr = [],
    arr1 = [];
  for (var i = 0; i < data.length; i++) {
    arr.push(data[i].ItemID);
    arr1.push(data[i].UsedCount);
  }

  (function () {
    // 中间省略的数据  准备三项
    var item = {
      name: "",
      value: 1200,
      // 柱子颜色
      itemStyle: {
        color: "#254065",
      },
      // 鼠标经过柱子颜色
      emphasis: {
        itemStyle: {
          color: "#254065",
        },
      },
      // 工具提示隐藏
      tooltip: {
        extraCssText: "opacity:0",
      },
    };
    option = {
      // 工具提示
      tooltip: {
        // 触发类型  经过轴触发axis  经过轴触发item
        trigger: "item",
        // 轴触发提示才有效
        axisPointer: {
          // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果
          type: "shadow",
        },
      },
      // 图表边界控制
      grid: {
        // 距离 上右下左 的距离
        left: "0",
        right: "3%",
        bottom: "3%",
        top: "5%",
        // 大小是否包含文本【类似于boxsizing】
        containLabel: true,
        //显示边框
        show: true,
        //边框颜色
        borderColor: "rgba(0, 240, 255, 0.3)",
      },
      // 控制x轴
      xAxis: [
        {
          // 使用类目，必须有data属性
          type: "category",
          // 使用 data 中的数据设为刻度文字
          data: arr,
          // 刻度设置
          axisTick: {
            // true意思：图形在刻度中间
            // false意思：图形在刻度之间
            alignWithLabel: false,
            show: false,
          },
          //文字
          axisLabel: {
            color: "#4c9bfd",
            interval: 0, //文字间隔
          },
        },
      ],
      // 控制y轴
      yAxis: [
        {
          // 使用数据的值设为刻度文字
          type: "value",
          axisTick: {
            // true意思：图形在刻度中间
            // false意思：图形在刻度之间
            alignWithLabel: false,
            show: false,
          },
          //文字
          // axisLabel: {},
          axisLabel: {
            formatter: "{value} ",
            color: "#4c9bfd",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0, 240, 255, 0.3)",
            },
          },
        },
      ],
      // 控制x轴
      series: [
        {
          // series配置
          // 颜色
          itemStyle: {
            // 提供的工具函数生成渐变颜色
            color: new echarts.graphic.LinearGradient(
              // (x1,y2) 点到点 (x2,y2) 之间进行渐变
              0,
              0,
              0,
              1,
              [
                { offset: 0, color: "#00fffb" }, // 0 起始颜色
                { offset: 1, color: "#0061ce" }, // 1 结束颜色
              ]
            ),
          },
          // 图表数据名称
          name: "使用统计",
          // 图表类型
          type: "bar",
          // 柱子宽度
          barWidth: "60%",
          // 数据
          data: arr1,
        },
      ],
    };
    var myechart = echarts.init($(".users .bar")[0]);
    myechart.setOption(option);
  })();
}
//当日入库
function VisualGetTodayInOrderLineInfo(data) {
  // "ItemID": "CL0001",
  // "ItemQty": 44,
  // "LocationIDTo": "E05-01-03",

  var html = "";

  for (var i = 0; i < data.length; i++) {
    html += ` <div class="row" id="${data[i].LocationIDTo}">
    <span class="col">${i+1}</span>
    <span class="col">${data[i].LocationIDTo}</span>
    <span class="col" id="ItemCode">${data[i].ItemID}</span>
    <span class="col" id="PlanNumber">${data[i].ItemQty}</span>
    <span class="icon-dot"></span>
</div>`;
  }

  $("#GetFlangeStockInfo_left").html("");
  $("#GetFlangeStockInfo_left").html(html);

  if(data.length>4){

    (function () {

 
        $(".monitor .marquee").removeClass('run_stop');

        //事件委托
        $(".monitor").on("click", " a", function () {
          //点击当前的a 加类名 active  他的兄弟删除类名
          $(this).addClass("active").siblings().removeClass("active");
          //获取一一对应的下标
          var index = $(this).index();
          //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
          $(".content").eq(index).show().siblings(".content").hide();
        });
        //滚动
        //原理：把marquee下面的子盒子都复制一遍 加入到marquee中
        //      然后动画向上滚动，滚动到一半重新开始滚动
        //因为选取的是两个marquee  所以要遍历
        $(".monitor .marquee").each(function (index, dom) {
          //将每个 的所有子级都复制一遍
          var rows = $(dom).children().clone();
          //再将新的到的加入原来的
          $(dom).append(rows);
        });
        //因为选取的是两个marquee  所以要遍历
        $(".monitor .marquee").each(function (index, dom) {
          //将每个 的所有子级都复制一遍
          var rows = $(dom).children().clone();
          //再将新的到的加入原来的
          $(dom).append(rows);
        });
        //因为选取的是两个marquee  所以要遍历
        $(".monitor .marquee").each(function (index, dom) {
          //将每个 的所有子级都复制一遍
          var rows = $(dom).children().clone();
          //再将新的到的加入原来的
          $(dom).append(rows);
        });
        //因为选取的是两个marquee  所以要遍历
        $(".monitor .marquee").each(function (index, dom) {
          //将每个 的所有子级都复制一遍
          var rows = $(dom).children().clone();
          //再将新的到的加入原来的
          $(dom).append(rows);
        });
      })();
  }else{


    $(".monitor .marquee").addClass('run_stop');
  }


}
//当日出库
function VisualGetTodayOutOrderLineInfo(data) {
  // "ItemID": "CL0001",
  // "ItemQty": 44,
  // "LocationIDTo": "E05-01-03",
  var html1 = "";
  
    for (var i = 0; i < data.length; i++) {
      html1 += ` <div class="row" id="${data[i].LocationIDTo}">
      <span class="col">${i+1}</span>
      <span class="col">${data[i].LocationIDFrom}</span>
      <span class="col" id="ItemCode">${data[i].ItemID}</span>
      <span class="col" id="PlanNumber">${data[i].ItemQty}</span>
      <span class="icon-dot"></span>
  </div>`;
    }

//   for (var i = 0; i < 4; i++) {
//     html1 += ` <div class="row" id="A${i}">

// <span class="col">A${i}</span>
// <span class="col" id="ItemCode">-</span>
// <span class="col" id="PlanNumber">-</span>
// <span class="icon-dot"></span>
// </div>`;
//   }

  $("#GetFlangeStockInfo_right").html("");
  $("#GetFlangeStockInfo_right").html(html1);

  if(data.length>4){

    $(".monitor .marquee1").removeClass('run_stop');

    (function () {
      //事件委托
      $(".monitor").on("click", " a", function () {
        //点击当前的a 加类名 active  他的兄弟删除类名
        $(this).addClass("active").siblings().removeClass("active");
        //获取一一对应的下标
        var index = $(this).index();
        //选取content 然后狗日对应下标的 显示   当前的兄弟.content隐藏
        $(".content").eq(index).show().siblings(".content").hide();
      });
      // 滚动
      // 原理：把marquee下面的子盒子都复制一遍 加入到marquee中
      //      然后动画向上滚动，滚动到一半重新开始滚动
      // 因为选取的是两个marquee  所以要遍历
      $(".monitor .marquee1").each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
      });
        //因为选取的是两个marquee  所以要遍历
    $(".monitor .marquee1").each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
      });
      //因为选取的是两个marquee  所以要遍历
      $(".monitor .marquee1").each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
      });
      //因为选取的是两个marquee  所以要遍历
      $(".monitor .marquee1").each(function (index, dom) {
        //将每个 的所有子级都复制一遍
        var rows = $(dom).children().clone();
        //再将新的到的加入原来的
        $(dom).append(rows);
      });

    })();

}else{


    $(".monitor .marquee1").addClass('run_stop');
  }
}
