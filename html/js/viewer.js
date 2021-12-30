window.onload = initAll;     // 界面初始化

function checked(){
//事件一
//行政区划选择执行按钮
    Provice();//高亮显示行政区
    chgChart();//更改柱状图信息

    
}

function initAll(){
//执行初始化操作
//柱状图初始化
    var radioButtons = document.getElementsByTagName("input");
    for (var i=0; i<radioButtons.length; i++) {
        if (radioButtons[i].type == "radio") {
            radioButtons[i].onclick = chgChart;
        }
    }
    chgChart();
}

function chgChart() {
    var bChart = {
        name: "2011-2020GDP全国省份排名变化",
        provice: provice,
        fieldnames: ["城市","城镇","乡村"],
        fields: [
            [59,27,45,30,28,82,37,52,67,99.9,75.9,41.9,44.0,22.2,93.0,56.3,58.4,40.1,184.9,26.7,6.9,30.4,55.5,18.7,22.7,1.0,30.0,18.0,4.7,73.0,22.6,-1],
            [4.7,4.2,48.3,22.7,19.8,18.1,16.1,26.8,11.4,54.9,47.8,43.1,25.5,37.9,58.8,46.8,30.6,45.9,44.2,28.8,5.6,22.8,54.5,19.3,27.7,1.2,24.3,11.3,3.5,2.9,11.4,-1],
            [9.3,8.0,114,53.0,36.2,52.7,38.1,53,10.0,101.4,76.8,108.0,49.1,64.3,155.9,160.7,83.4,104.2,93.0,79.0,11.9,49.4,153.6,69.4,76.4,4.6,56.4,41.7,7.5,9.4,34.9,-1]
        ]
    }
    
    
    var radioButtons = document.getElementsByTagName("input");
    
    
    var selection=document.getElementById("NumProvice");
    var num=NumProvice.value;
    var imgSrc = "images/" + num + ".jpg";
    
    var string1=getButton("type");
    switch(string1){
    case "browser":
        var thisChart = bChart;
        break;
    case "platform":
        var thisChart = jsChart;
        break;
    case "oldData":
        var thisChart = oldData;
        break;
    }
    var chartBody = "<h4>"+thisChart.name +"——" +thisChart.provice[num]+"</h4>" ;

    //chartBody += "<tr class='horiz'><th rowspan='4'>"+thisChart.provice[num];
    chartBody += "</th><td colspan='2'></td></tr>";
    for (var j=0; j<1; j++) {
        //chartBody += "<tr class='horiz'><td>"+thisChart.fieldnames[j];
        chartBody += "</td><td><img alt='horiz bar' src='"+imgSrc;
        chartBody += "' width='"+500+"'>&nbsp;&nbsp;";
        //chartBody += thisChart.fields[j][num]+"</td></tr>";
    }
    chartBody += "</table>";
    document.getElementById("chartArea").innerHTML = chartBody;

    function getButton(buttonSet) {
        for (var i=0; i<radioButtons.length; i++) {
            if (radioButtons[i].name == buttonSet && radioButtons[i].checked) {
                return radioButtons[i].value;
            }
        }
        return -1;
    }
        //更改省份
        Provice();
        //读取省份概况    
            try{
                xmlDoc= new ActiveXObject("Microsoft.XMLDOM");
            }catch(e){
                try{
                    xmlDoc= document.implementation.createDocument(",",null);
                }catch(e){
                    alert(e.message);
                    return;
                }
            }
            xmlDoc.async = false;
            xmlDoc.load("note.xml");
            document.getElementById("sum").value=xmlDoc.getElementsByTagName("sum")[NumProvice.value].childNodes[0].nodeValue;
}

function Provice(){
    //加载省份柱
    // initAll();
    //高亮显示省份行政区划
    var bdary = new BMap.Boundary();
    //for(var i=0;i<provice.length;i++){
        bdary.get(provice[NumProvice.value], function(rs){       //获取行政区域
        map.clearOverlays();        //清除地图覆盖物 
        InfoPoint();        
            var count = rs.boundaries.length; //行政区域的点有多少个
            for(var i = 0; i < count; i++){
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeColor:"black", strokeWeight:2, strokeOpacity:0, fillColor:color[NumProvice.value]}); //建立多边形覆盖
                map.addOverlay(ply);  //添加覆盖物
                //map.setViewport(ply.getPath());    //调整视野 
                //弹出窗口  
            }                
        }); 
}




















































































