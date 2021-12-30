var myChart = echarts.init(document.getElementById('map'));


// 省会坐标
var geoCoordMap = {
    "北京": [116.417097, 39.913343],
    "天津": [117.166607, 39.169998],
    "河北": [115.143084, 38.449308],
    "山西": [112.564983, 37.817681],
    "内蒙古": [111.243001, 41.917667],
    "辽宁": [122.833298, 41.115690],
    "吉林": [126.218401, 43.411136],
    "黑龙江": [127.358889, 46.899735],
    "上海": [121.471754, 31.262431],
    "江苏": [119.889731, 32.897399],
    "浙江": [120.275930, 29.363012],
    "安徽": [117.093198, 32.627210],
    "福建": [118.325817, 26.139160],
    "江西": [115.112335, 28.544783],
    "山东": [118.141988, 36.095418],
    "河南": [114.039390, 33.915801],
    "湖北": [112.236455, 31.110283],
    "湖南": [111.923701, 27.842999],
    "广东": [113.395485, 23.407845],
    "广西": [109.053723, 23.814730],
    "海南": [109.679231, 19.167226],
    "重庆": [107.379569, 29.674884],
    "四川": [102.853834, 30.856663],
    "贵州": [106.790855, 26.675633],
    "云南": [101.547626, 24.641444],
    "西藏": [89.3134230, 31.046942],
    "陕西": [108.998531, 34.770387],
    "甘肃": [102.964218, 37.632768],
    "青海": [96.5987530, 35.856142],
    "宁夏": [106.018169, 37.398287],
    "新疆": [86.2226780, 41.807642]
};

// 六普和七普人口数据变化
var rawData = [
    ["北京", 1961.2, 2189.3],
    ["天津", 1293.9, 1386.6],
    ["河北", 7185.4, 7461],
    ["山西", 3571.2, 3491.6],
    ["内蒙古", 2470.6, 2404.9],
    ["辽宁", 4374.6, 4259.1],
    ["吉林", 2746.2, 2407.3],
    ["黑龙江", 3831.2, 3185.0],
    ["上海", 2301.9, 2487.1],
    ["江苏", 7866, 8474.8],
    ["浙江", 5442.7, 6456.8],
    ["安徽", 5950.1, 6102.7],
    ["福建", 3689.4, 4154],
    ["江西", 4456.7, 4518.9],
    ["山东", 9579.3, 10152.7],
    ["河南", 9402.4, 9936.6],
    ["湖北", 5723.8, 5775.3],
    ["湖南", 6568.4, 6644.5],
    ["广东", 10430.3, 12601.3],
    ["广西", 4602.7, 5012.7],
    ["海南", 867.2, 1008.1],
    ["重庆", 2884.6, 3205.4],
    ["四川", 8041.8, 8367.5],
    ["贵州", 3474.6, 3856.2],
    ["云南", 4596.6, 4720.9],
    ["西藏", 300.2, 364.8],
    ["陕西", 3732.7, 3952.9],
    ["甘肃", 2557.5, 2502],
    ["青海", 562.7, 592.4],
    ["宁夏", 630.1, 720.3],
    ["新疆", 2181.3, 2585.2]
];

function makeMapData(rawData) {
    var mapData = [];
    for (var i = 0; i < rawData.length; i++) {
        var geoCoord = geoCoordMap[rawData[i][0]];     // rawData[i][0]对应省份，geoCoordMap是一个字典，geoCoord对应是省会经纬度
        if (geoCoord) {
            mapData.push({
                name: rawData[i][0],
                value: geoCoord.concat(rawData[i].slice(1))
            });
        }
    }
    return mapData;
};

option = {
    animation: false,
    // 地图背景颜色
    backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{       // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
        offset: 0,
        color: '#4b5769'
    }, {
        offset: 1,
        color: '#404a59'
    }]),                   // 显示背景色
    tooltip: {
        trigger: 'axis'
    },                
    geo: {
        map: 'china',
        // silent: true,
        roam: true,
        zoom: 1, // 地图初始大小
        // center: [100.366794, 32.400309], // 初始中心位置
        label: {
            emphasis: {
                show: false,
                areaColor: '#eee'
            }
        },
        // 地区块儿颜色
        itemStyle: {
            normal: {
                areaColor: '#ffe096',
                borderWidth: "3",
                borderColor: '#525354'
            },
            emphasis: {
                areaColor: '#FEE5D9'
            }
        }
    }
};

function renderEachCity() {
    var option = {
        xAxis: [],
        yAxis: [],
        grid: [],
        series: []
    };

    echarts.util.each(rawData, function(dataItem, idx) {
        var geoCoord = geoCoordMap[dataItem[0]];
        var coord = myChart.convertToPixel('geo', geoCoord);
        idx += '';
        inflationData = [];

        for (var k = 1; k < 3; k++) {
            inflationData.push(dataItem[k]);
        }
        
        option.xAxis.push({
            id: idx,
            gridId: idx,
            type: 'category',
            name: dataItem[0],
            nameLocation: 'middle',
            nameGap: 3,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: '#000'
                }
            },
            // data: xAxisCategory,
            data: ["六普","七普"],
            z: 100

        });

        option.yAxis.push({
            id: idx,
            gridId: idx,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#1C70B6'
                }
            },
            z: 100
        });

        option.grid.push({
            id: idx,
            width: 25,
            height: 50,
            left: coord[0] - 10,
            top: coord[1] - 40,
            z: 100
        });

        option.series.push({
            id: idx,
            type: 'bar',
            xAxisId: idx,
            yAxisId: idx,
            barGap: 0,
            barCategoryGap: 0,
            data: inflationData,
            z: 100,
            itemStyle: {
                normal: {
                    color: function(params){
                        // 柱状图每根柱子颜色
                        var colorList = ['#F75D5D','#64bbd9'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        });
    });
    console.time('a');
    myChart.setOption(option);
    console.timeEnd('a');
}

setTimeout(renderEachCity, 0);

// 缩放和拖拽
function throttle(fn, delay, debounce) {

    var currCall;
    var lastCall = 0;
    var lastExec = 0;
    var timer = null;
    var diff;
    var scope;
    var args;

    delay = delay || 0;

    function exec() {
        lastExec = (new Date()).getTime();
        timer = null;
        fn.apply(scope, args || []);
    }

    var cb = function() {
        currCall = (new Date()).getTime();
        scope = this;
        args = arguments;
        diff = currCall - (debounce ? lastCall : lastExec) - delay;

        clearTimeout(timer);

        if (debounce) {
            timer = setTimeout(exec, delay);
        } else {
            if (diff >= 0) {
                exec();
            } else {
                timer = setTimeout(exec, -diff);
            }
        }

        lastCall = currCall;
    };

    return cb;
}

var throttledRenderEachCity = throttle(renderEachCity, 0);
myChart.on('geoRoam', throttledRenderEachCity);
myChart.setOption(option);


// 点击显示柱状图
myChart.on('click',function(e){
    console.log(e)
    // console.log(params);
    if(e.componentSubType == "bar"){
        // 先清除所有柱状图
        $('.tongJiTu').remove();
        // 创建遮挡层
        creatWrap();
        // 创建柱状图容器
        var divObj = document.createElement('div');
        $(divObj).addClass('tongJiTu');
        divObj.id = 'zhuzhuang';
        var divX = getMousePos()['x']; 
        var divY = getMousePos()['y']; 
        $(divObj).css({
            'width': 250,
            'height': 180,
            'border': '1px solid #ccc',
            'position': 'absolute',
            'top': divY,
            'left': divX
        }).appendTo('.wrap');
        // 创建柱状图
        zhuZhuangTu();
        // 点击遮挡层消失
        clearWrap('.zhedang');
    }
    return;
});

// 获取横纵坐标
function getMousePos(e) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    // console.log(x,y)
    return {'x': x,'y': y};
}

// 生成柱状图
function zhuZhuangTu() {
    var zhuzhuang = echarts.init(document.getElementById('zhuzhuang'));
    option = {
        backgroundColor: 'rgba(255,255,255,3)',
        legend: {
            data: ['六普','七普']
        },
        xAxis: [
            {
                type: 'category',
                data: ['六普','七普']
            }
        ],
        yAxis: [
            {
                splitLine: {
                    show: false
                },
                type: 'value'
            }
        ],
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params){
                            var colorList = ['#F75D5D','#59ED4F'];
                            return colorList[params.dataIndex];
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#000'
                            }
                        }
                    }
                },
            }
        ]
    };
    zhuzhuang.setOption(option);
}

// 生成遮挡层
function creatWrap(){
    var zheDang = document.createElement('div');
    $(zheDang).addClass('zhedang').css({
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.2)'
    }).appendTo('.wrap');
}
// 去掉遮挡层
function clearWrap(id){
    $(id).click(function(e){
        // console.log(this);
        this.remove();
        $('.tongJiTu').remove();
        return false;
    });
}