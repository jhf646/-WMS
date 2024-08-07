var uploadedDataURL = "../json/home.json";
var myChart = echarts.init($('.map .geo')[0]);

//线条聚点
var geoGpsMap = {
    '1': [116.415, 39.915],
    '2': [116.448, 39.935],
    '3': [116.455, 39.915],
    '4': [116.435, 39.925],
    '基站1': [116.415, 39.915],
    '基站2': [116.448, 39.935],
    '基站3': [116.455, 39.915],
    '控制中心': [116.435, 39.925],

};
var l1 = {
    "MC1": [116.409, 39.928]
};
var l2 = {
    "MC2控制": [116.428, 39.939]
};

var l3 = {
    "MC2控制": [116.448, 39.939]
};
var l4 = {
    "L/UL1控制": [116.426, 39.918]
};
var l5 = {
    "L/UL2控制": [116.448, 39.920]
};
var l6 = {
    "P001控制": [116.443, 39.911]
};
var l7 = {
    "P001控制": [116.448, 39.905]
};
var zhuwo = {
    "MC1控制": [116.409, 39.928]
};



//geoCoordMap把所有可能出现的传感器加到数组里面
var geoCoordMap = {
    "L/UL11": [116.41, 39.9036],
    "L/UL12": [116.43, 39.918],
    'MC11': [116.409, 39.921],
    "MC12": [116.409, 39.935],
    'MC2': [116.432, 39.939],
    "MC2": [116.4516, 39.939],
    "L/UL13": [116.4516, 39.9306],
    'L/UL2': [116.4516, 39.920],
    "P001": [116.447, 39.911],
    "P001": [116.4516, 39.905],

};
var geoCoordMap001 = {
    "L/UL11": [116.41, 39.9036],
    "L/UL12": [116.43, 39.918],
    'MC11': [116.409, 39.921],
    "MC12": [116.409, 39.935],

};
var geoCoordMap002 = {

    'MC2': [116.432, 39.939],
    "MC2": [116.4516, 39.939],
    "L/UL13": [116.4516, 39.9306],


};
var geoCoordMap003 = {

    'L/UL2': [116.4516, 39.920],
    "P001": [116.447, 39.911],
    "P001": [116.4516, 39.905],


};
var geoCoordMap004 = {

    '基站1': [116.415, 39.915],
    '基站2': [116.448, 39.935],
    '基站3': [116.455, 39.915],


};
//温度
var d1 = {
    "L/UL11": 20,
    "L/UL12": 25,
    'MC11': 17,
    "MC12": 19,
    'MC2': 13,
    "MC2": 22,
    "L/UL13": 11,
    'L/UL2': 9,
    "P001": 29,
    "P001": 38,
    "基站1": 40,
    "基站2": 45,
    '基站3': 37,


};

//
// var d6 = {
//   "L/UL11": 40,
//     "L/UL12": 45,
//     'MC11': 37,
//     "MC12": 39,
//     'MC2': 23,
//     "MC2": 80,
//     "L/UL13": 56,
//     'L/UL2': 39,
//     "P001": 29,
//     "P001": 68,

// };
// 
// var d7 = {
//     "L/UL11": 40,
//     "L/UL12": 45,
//     'MC11': 37,
//     "MC12": 39,
//     'MC2': 23,
//     "MC2": 80,
//     "L/UL13": 56,
//     'L/UL2': 39,
//     "P001": 29,
//     "P001": 68,
// };

var database = [{
    name: "基站1",
    value: 0
},
{
    name: "基站2",
    value: 0
},
{
    name: "基站3",
    value: 0
},
{
    name: "控制中心",
    value: 0
},
];
var da1 = [{
    name: "MC1",
    value: 0
}];
var da2 = [{
    name: "MC2控制",
    value: 0
}];
var da3 = [{
    name: "MC2控制",
    value: 0
}];
var da4 = [{
    name: "L/UL1控制",
    value: 0
}];
var da5 = [{
    name: "L/UL2控制",
    value: 0
}];
var da6 = [{
    name: "P001控制",
    value: 0
}];
var da7 = [{
    name: "P001控制",
    value: 0
}];

var colors = [
    ["#1DE9B6", "#F46E36", "#04B9FF", "#5DBD32", "#FFC809", "#FB95D5", "#BDA29A", "#6E7074", "#546570", "#C4CCD3"],
    ["#37A2DA", "#67E0E3", "#32C5E9", "#9FE6B8", "#FFDB5C", "#FF9F7F", "#FB7293", "#E062AE", "#E690D1", "#E7BCF3", "#9D96F5", "#8378EA", "#8378EA"],
    ["#DD6B66", "#759AA0", "#E69D87", "#8DC1A9", "#EA7E53", "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
];

var colorIndex = 0;

$(function () {
    var year = ["温度（℃）",]
    var year1 = ["空调调温", "加湿器/窗户协调", "门锁锁定", "紧急消防", "照明系统"];

    var mapData = [
        [],
        [],
        [],
        [],
        []
    ];

    /*柱子Y名称*/
    var categoryData = [];
    var fei = [];
    var rong = [];
    var barData = [];
    var lineData1 = [
        [10, 12, 13, 12, 14, 14, 16, 17, 18, 20, 22, 26, 27, 26, 23, 20, 18, 18, 16, 16, 14, 13, 12, 10],
        [68, 67, 66, 63, 61, 55, 53, 48, 46, 44, 42, 42, 36, 34, 36, 37, 38, 42, 46, 44, 58, 62, 66, 68],
        [1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 1, 1, 3, 3, 1, 3, 3, 1, 1, 1],
        [56, 59, 60, 62, 56, 50, 40, 42, 38, 38, 39, 38, 40, 42, 38, 37, 34, 35, 38, 44, 46, 50, 54, 56],
        [1, 1, 2, 1, 5, 10, 20, 24, 30, 32, 32, 34, 38, 40, 40, 38, 32, 25, 32, 32, 5, 1, 1, 1]
    ];
    var lineData2 = [
        [11, 12, 14, 12, 15, 13, 16, 16, 16, 21, 22, 24, 22, 24, 23, 21, 19, 18, 15, 14, 15, 13, 12, 11],
        [62, 64, 66, 65, 62, 58, 54, 49, 45, 44, 41, 40, 32, 36, 36, 39, 38, 40, 46, 48, 52, 60, 63, 61],
        [1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 3, 1, 1, 1, 3, 2, 1, 1, 3, 1, 2, 1],
        [58, 59, 62, 62, 54, 50, 44, 42, 34, 33, 35, 38, 40, 44, 38, 35, 32, 35, 33, 40, 46, 53, 56, 54],
        [1, 1, 1, 1, 6, 12, 20, 22, 30, 33, 32, 35, 38, 42, 40, 37, 34, 28, 32, 33, 10, 1, 1, 1]
    ];

    var tian = [
        [],
        [],
        [],
        [],
        []
    ];

    var line1 = [];
    var line2 = [];
    var line3 = [];
    var line4 = [];
    for (var key in geoCoordMap001) {
        line1.push({
            "year": '温度',
            "name": key,
            "value": d1[key],
        });

    };
    for (var key in geoCoordMap002) {
        line2.push({
            "year": '温度',
            "name": key,
            "value": d1[key],
        });

    };
    for (var key in geoCoordMap003) {
        line3.push({
            "year": '温度',
            "name": key,
            "value": d1[key],
        });

    };
    for (var key in geoCoordMap004) {
        line4.push({
            "year": '温度',
            "name": key,
            "value": d1[key],
        });

    };

    for (var key in geoCoordMap) {
        mapData[0].push({
            "year": '温度',
            "name": key,
            "value": d1[key],
        })

    }
    var jian = [];
    var count = [];
    var datamax = [];
    var datamin = [];
    //visualMap的max正常值设定
    var zhu = [45, 80, 10, 80, 50,]
    //visualMap的min正常值设定
    var li = [-5, 15, 0, 20, 0,]
    //var count2=[];
    var count3 = [];
    for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a, b) {
            return a.value - b.value
        });
        barData.push([]);
        categoryData.push([]);
        fei.push([]);
        rong.push([]);
        tian.push([]);
        jian[i] = 0;
        count[i] = 0;
        count3[i] = 0;
        datamax[i] = 0;
        datamin[i] = 1000;
        for (var j = 0; j < mapData[i].length; j++) {

            if (mapData[i][j].name == 'MC11') {
                tian[i][0] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'MC12') {
                tian[i][1] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'MC2') {
                tian[i][2] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'MC2') {
                tian[i][3] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'L/UL11') {
                tian[i][4] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'L/UL12') {
                tian[i][5] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'L/UL13') {
                tian[i][6] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'L/UL2') {
                tian[i][7] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'P001') {
                tian[i][8] = mapData[i][j].value;

            } else if (mapData[i][j].name == 'P001') {
                tian[i][9] = mapData[i][j].value;

            }

            if (mapData[i][j].value >= -100) {
                jian[i] += mapData[i][j].value;
                count[i]++; //平均计数
            } else {
                fei[i].push(mapData[i][j].name)
            }

            if (mapData[i][j].value >= datamax[i]) {
                datamax[i] = mapData[i][j].value;

            }
            if (mapData[i][j].value <= datamin[i]) {
                datamin[i] = mapData[i][j].value;

            }
            //count2[i]=mapData[i].length-count[i];
            if (mapData[i][j].value < li[i] || mapData[i][j].value > zhu[i]) {
                count3[i]++;
                rong[i].push(mapData[i][j].name);

            }
            barData[i].push(mapData[i][j].value);
            categoryData[i].push(mapData[i][j].name);

        }
    }





    $.getJSON(uploadedDataURL, function (geoJson) {

        echarts.registerMap('home', geoJson);
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        var convertData1 = function (database) {
            var res = [];
            for (var i = 0; i < database.length; i++) {
                var geoCoord1 = geoGpsMap[database[i].name];
                if (geoCoord1) {
                    res.push({
                        name: database[i].name,
                        value: geoCoord1.concat(database[i].value)
                    });
                }
            }
            return res;
        };

        var convertedData1 = [
            convertData1(database),
            convertData1(database.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        //MC1控制开关legend
        var c1 = function (da1) {
            var res = [];
            for (var i = 0; i < da1.length; i++) {
                var g1 = l1[da1[i].name];
                if (g1) {
                    res.push({
                        name: da1[i].name,
                        value: g1.concat(da1[i].value)
                    });
                }
            }
            return res;
        };

        var cc1 = [
            c1(da1),
            c1(da1.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        //MC2控制开关legend
        var c2 = function (da2) {
            var res = [];
            for (var i = 0; i < da2.length; i++) {
                var g2 = l2[da2[i].name];
                if (g2) {
                    res.push({
                        name: da2[i].name,
                        value: g2.concat(da2[i].value)
                    });
                }
            }
            return res;
        };

        var cc2 = [
            c2(da2),
            c2(da2.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];

        //MC2控制开关legend
        var c3 = function (da3) {
            var res = [];
            for (var i = 0; i < da3.length; i++) {
                var g3 = l3[da3[i].name];
                if (g3) {
                    res.push({
                        name: da3[i].name,
                        value: g3.concat(da3[i].value)
                    });
                }
            }
            return res;
        };

        var cc3 = [
            c3(da3),
            c3(da3.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        //L/UL1控制开关legend
        var c4 = function (da4) {
            var res = [];
            for (var i = 0; i < da4.length; i++) {
                var g4 = l4[da4[i].name];
                if (g4) {
                    res.push({
                        name: da4[i].name,
                        value: g4.concat(da4[i].value)
                    });
                }
            }
            return res;
        };

        var cc4 = [
            c4(da4),
            c4(da4.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        //L/UL2控制开关legend
        var c5 = function (da5) {
            var res = [];
            for (var i = 0; i < da5.length; i++) {
                var g5 = l5[da5[i].name];
                if (g5) {
                    res.push({
                        name: da5[i].name,
                        value: g5.concat(da5[i].value)
                    });
                }
            }
            return res;
        };

        var cc5 = [
            c5(da5),
            c5(da5.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        //P001控制开关legend
        var c6 = function (da6) {
            var res = [];
            for (var i = 0; i < da6.length; i++) {
                var g6 = l6[da6[i].name];
                if (g6) {
                    res.push({
                        name: da6[i].name,
                        value: g6.concat(da6[i].value)
                    });
                }
            }
            return res;
        };

        var cc6 = [
            c6(da6),
            c6(da6.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];
        //P001控制开关legend
        var c7 = function (da7) {
            var res = [];
            for (var i = 0; i < da7.length; i++) {
                var g7 = l7[da7[i].name];
                if (g7) {
                    res.push({
                        name: da7[i].name,
                        value: g7.concat(da7[i].value)
                    });
                }
            }
            return res;
        };

        var cc7 = [
            c7(da7),
            c7(da7.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];

        //         //聚点随机程序
        var convertToLineData = function (data, gps) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem.name];
                debugger;
                var toCoord = gps; //郑州
                // var toCoord = geoGps[Math.random()*3]; 
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem.value
                    }, {
                        coord: toCoord,
                    }]);
                }
            }
            return res;
        };

        var convertToLineData001 = function (data, gps) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap004[dataItem.name];
                debugger;
                var toCoord = gps; //郑州
                // var toCoord = geoGps[Math.random()*3]; 
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                        value: dataItem.value
                    }, {
                        coord: toCoord,
                    }]);
                }
            }
            return res;
        };

        optionXyMap01 = {
            //底部滚动栏
            timeline: {

            },
            baseOption: {
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                //柱状图样式
                grid: [{
                    left: '65%',
                    top: '34.5%',
                    bottom: '44.5%',
                    width: '20%'
                }, {
                    gridindex: 1,
                    left: '65%',
                    right: '3%',
                    top: '65%',
                    bottom: '10%',
                    containLabel: true
                }],
                tooltip: {
                    trigger: 'axis', // hover触发器
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            color: '#aaa' //hover颜色
                        },
                    },


                },

                legend: [
                    {
                        data: ['基站', '传感器', '传输路线'],
                        top: '10%',
                        left: '35%',
                        textStyle: {
                            color: '#fff'
                        }
                    },



                ],

                //地图样式
                geo: {
                    show: true,
                    map: 'home',
                    roam: true,
                    zoom: 0.8,
                    center: [116.453, 39.920],
                    label: {
                        emphasis: {

                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
            },

            options: []

        };


        for (var n = 0; n < year.length; n++) {

            optionXyMap01.options.push({
                //背景色
                backgroundColor: '#013954',

                //标题
                title: [{
                    text: '实时监控平面图',
                    left: '16%',
                    top: '5%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 25
                    }
                },

                ],

                //             brush: {
                //     outOfBrush: {
                //         color: '#abc'
                //     },
                //     brushStyle: {
                //         borderWidth: 2,
                //         color: 'rgba(0,0,0,0.2)',
                //         borderColor: 'rgba(0,0,0,0.5)',
                //     },
                //     seriesIndex: [0, 1],
                //     throttleType: 'debounce',
                //     throttleDelay: 300,
                //     geoIndex: 0
                // },
                xAxis: [{
                    type: 'value',
                    scale: true,
                    position: 'top',
                    min: 0,
                    boundaryGap: false,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: 2,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                },
                {
                    gridIndex: 1,

                    boundaryGap: false,
                    axisLabel: {
                        margin: 2,
                        textStyle: {
                            color: '#fff'
                        }
                    }


                }
                ],
                yAxis: [{


                }, {
                    gridIndex: 1,

                    axisLabel: {
                        formatter: '{value} ',
                        textStyle: {

                        }
                    }
                }],

                series: [
                    //地图
                    {
                        type: 'map',
                        map: 'home',

                        geoIndex: 0,
                        aspectScale: 0.75, //长宽比
                        showLegendSymbol: true, // 存在legend时显示
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#031525',
                                borderColor: '#FFFFFF',
                            },
                            emphasis: {
                                areaColor: '#2B91B7'
                            }
                        },
                        animation: false,
                        data: mapData
                    },
                    //地图中闪烁的点
                    {
                        name: '传感器',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(mapData[n].sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 20)), //大小差异显示
                        symbolSize: function (val) {
                            return (val[2] * 40 + 1200) / 180;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                shadowBlur: 10,
                                shadowColor: colors[colorIndex][n]
                            },
                        },
                        zlevel: 1
                    },
                    {
                        //基站点显示
                        name: '基站',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData1(database.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 20)),
                        symbol: 'arrow',
                        symbolSize: 10,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },

                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                shadowBlur: 10,
                                shadowColor: '#2f4554'
                            },
                            emphasis: {


                            }
                        },
                        zlevel: 1
                    },

                    //线条聚点
                    {
                        name: '传输路线',
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 3, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                width: 0.1, //尾迹线条宽度
                                opacity: 0.5, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        //调用聚点随机
                        data: convertToLineData(line1, geoGpsMap[Math.ceil(1)])
                    },
                    {
                        name: '传输路线',
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 3, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                width: 0.1, //尾迹线条宽度
                                opacity: 0.5, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        //调用聚点随机
                        data: convertToLineData(line2, geoGpsMap[Math.ceil(2)])
                    },
                    {
                        name: '传输路线',
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 3, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                width: 0.1, //尾迹线条宽度
                                opacity: 0.5, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        //调用聚点随机
                        data: convertToLineData(line3, geoGpsMap[Math.ceil(3)])
                    },
                    {
                        name: '传输路线',
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 3, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                color: colors[colorIndex][n],
                                width: 0.1, //尾迹线条宽度
                                opacity: 0.5, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                        //调用聚点随机
                        data: convertToLineData001(line4, geoGpsMap[Math.ceil(4)])
                    },
                    //柱状图
                    {
                        zlevel: 1.5,
                        type: 'bar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: colors[colorIndex][n]
                            }
                        },
                        data: barData[n]
                    }
                ]
            })
        }
        myChart.setOption(optionXyMap01);
    });
});