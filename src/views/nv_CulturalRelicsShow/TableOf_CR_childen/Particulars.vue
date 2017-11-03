<template>
    <div class="particulars my_padding" >
        <!-- 返回 -->
        <div @click="$router.back(-1)" class="goback">返回</div>
        <!-- 选择时间范围 -->
        <div class="time-wrapper">
            <el-form :inline='true'>
                <el-form-item label='采集时间：' class='myLabel'>
                    <el-date-picker :clearable='false' v-model='startDate' :type='dateType' class='myDate' @change='formatDate' format='yyyy-MM-dd HH:mm' placeholder="开始时间" :picker-options='pickerOptions0'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label='到：' class='myLabel'>
                    <el-date-picker :clearable='false' v-model='endDate' :type='dateType' class='myDate' @change='formatDate1' format='yyyy-MM-dd HH:mm' placeholder="结束时间" :picker-options='pickerOptions1'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='queryData'>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 详情内容 -->
        <div class="details-content">
            <el-row :gutter="22" type='flex'>
                <el-col :span="11">
                    <div class="grid-content">
                        <div class="tab_title_bg">{{ wenwusName }}</div>
                        <div class="img-content">
                            <img :src="DetailALL.RELICIM_PATH">
                            <div class="btn">
                                <el-button @click="relicPrev()" class="pre" type="primary" size="small">上一文物</el-button>
                                <el-button @click="relicNext()" class="next" type="primary" size="small">下一文物</el-button>
                            </div>
                        </div>
                        <div class="dec-content">
                            <div class="dynasty">
                                <h3>文物历史朝代：</h3>
                                <p>{{ DetailALL.RELIC_YEAR }}</p>
                            </div>
                            <div class="detail">
                                <h3>文物详细数据：</h3>
                                <p>{{ DetailALL.RELIC_DETAILED }}</p>
                            </div>
                            <div class="info-content">
                                <h3>文物介绍：</h3>
                                <p>{{ DetailALL.RELIC_DSC }}</p>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="13">
                    <div class="grid-content noPadding">
                        <div class="left-survey">
                            <div class="tab_title_bg">文物监测信息</div>
                            <div class="up-info">
                                <p>文物位置：{{ DetailALL.RELIC_POSITION }}</p>
                                <p>文物周边监测仪器：({{ DetailALL.LOGGER_SN }}){{ DetailALL.LOGGER_NAME }}</p>
                            </div>
                            <div class="table">
                                <el-row>
                                    <el-col :span="6">
                                        <div>监测指标</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>上限</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>下限</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>实时</div>
                                    </el-col>
                                </el-row>
                                <el-row v-show='detailReal.Ch1Name != null'>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch1Name }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch1CHONE_HIGH }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch1CHONE_LOW }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div :style='{color:detailReal.Ch1Color}'>{{ detailReal.Ch1 }} {{ detailReal.Ch1Unit }}</div>
                                    </el-col>
                                </el-row>
                                <el-row v-show='detailReal.Ch2Name != null'>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch2Name }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch2CHTWO_HIGH }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch2CHTWO_LOW }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div :style='{color:detailReal.Ch2Color}'>{{ detailReal.Ch2 }} {{ detailReal.Ch2Unit }}</div>
                                    </el-col>
                                </el-row>
                                <el-row v-show='detailReal.Ch3Name != null'>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch3Name }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch3CHTHR_HIGH }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch3CHTHR_LOW }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div :style='{color:detailReal.Ch3Color}'>{{ detailReal.Ch3 }} {{ detailReal.Ch3Unit }}</div>
                                    </el-col>
                                </el-row>
                                <el-row v-show='detailReal.Ch4Name != null'>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch4Name }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch4CHFOU_HIGH }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div>{{ detailReal.Ch4CHFOU_LOW }}</div>
                                    </el-col>
                                    <el-col :span="6">
                                        <div :style='{color:detailReal.Ch4Color}'>{{ detailReal.Ch4 }} {{ detailReal.Ch4Unit }}</div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                        <div class="right-warning">
                            <div class="tab_title_bg">预警统计</div>
                            <div class="warning">
                                <el-col :span='24' id='chartPieCurve' style='height:100%'></el-col>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content-bottom">
                        <div class="left-lineGraph">
                            <div class="tab_title_bg">{{ shebeiName}}</div>
                            <div class="select">
                                <el-select @change="toggerSelect()" class='tabSelect' v-model="defaultText" >
                                    <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div v-loading="loading" element-loading-text="加载中" id='chartCurve' class="humid-lineGraph" v-if="this.maximumMinimum != null" ></div>
                        </div>
                        <div class="right-thermograph">
                            <div class="tab_title_bg">
                                <ul class="mune">
                                    <li>指标</li>
                                    <li>最大值</li>
                                    <li>最小值</li>
                                    <li>平均值</li>
                                    <li>波动情况</li>
                                </ul>
                            </div>
                            <el-row type='flex' v-for="item in maximumMinimum" :key="item.Name">
                                <el-col :span="19">{{ item.Name }}</el-col>
                                <el-col :span="19">{{ item.Max }}</el-col>
                                <el-col :span="19">{{ item.Min }}</el-col>
                                <el-col :span="19">{{ item.Avg }}</el-col>
                                <el-col :span="24">{{ item.Waves }}</el-col>
                            </el-row>
                            <div v-show="this.maximumMinimum == null" class="noData">该段时间无数据,请重新选择!</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <!-- {{ DetailALL }} -->
        </div>
    </div>
</template>
<script>
var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
var oneday = 1000 * 60 * 60 * 24;
import echarts from '../../../../static/js/echarts';
import {
    wenwuDetail,
    warningDetail,
    wenwuList,
    humidGraphDetail,
    humidTableDetail,
    wenwuDetailReal
} from '../../../api/api'

export default {
    data() {
            return {
                id: '',
                startDate: new Date(today - oneday * 7), //开始日期
                endDate: new Date(), //结束日期
                DetailALL: Object,
                wenwuDetail: Object, //文物介绍信息
                LOGGER: Object, //文物监测信息
                relicNum: Number, //文物总数
                chartPieCurve: null, //预警统计饼图
                chartCurve: null, //温湿度折线图
                maximumMinimum: Object, //最大值、最小值、平均值
                selectOptions: [],
                value: '',
                defaultText: '',
                selectActiveNum: 1,
                loading: true,
                pickerOptions0: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
                pickerOptions1: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  }
                },
                lineData:[],      // 存放折线图的数据
                wenwusName: '',    // 存放文物名称
                lineStyleWidth: '1',  // 曲线图线条粗细
                shebeiName: '',
                detailReal:''  // 实时数据以及上下限
            }
        },
        props: ['collapsed','dateType'],
        methods: {
            hidemenu() { //进入文物详情页后自动折叠菜单，调用父组件collapse_true方法
                if (!this.collapsed) {
                    this.$emit('hidemenu');
                } else {
                    return;
                }
            },
            showmenu() { //离开文物详情页后自动展开菜单，调用父组件collapse_false方法
                // console.log(this.collapsed);
                this.$emit('showmenu');
            },
            formatDate(date) {
                // console.log(date)
                // this.startDate = date;
            },
            formatDate1(val) {
                var newDate = new Date();
                var chooseDate = new Date(Date.parse(val.replace(/-/g, "/")));
                // console.log(val);
                // console.log('--new--'+newDate);
                // console.log('--choose--'+chooseDate);
                // console.log(chooseDate);
                var stopDateTime = new Date(Date.parse(val.replace(/-/g, '/')));
                    stopDateTime.setHours(23);
                    stopDateTime.setMinutes(59);
                    stopDateTime.setSeconds(59);
                if(chooseDate.getDate() == newDate.getDate()){
                    console.log('--yiyangh--')
                    // console.log(this.formatDateTime(new Date()));
                    this.endDate = this.formatDateTime(new Date());
                }else{
                    // console.log(this.formatDateTime(stopDateTime));
                    this.endDate = this.formatDateTime(stopDateTime);
                }
                // this.endDate = val;
            },
            formatDateTime(val){
                var date = new Date(val);
                console.log(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0'+m : m;
                var d = date.getDate();
                d = d < 10 ? ('0'+ d) : d;
                var h = date.getHours();
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0'+minute) : minute;
                console.log(y +  '-' + m + '-'+d+ ' '+ h + ":"+minute);
                return y +  '/' + m + '/'+d+ ' '+ h + ":"+minute;
            },
            toggerSelect(value) {
                if(this.defaultText == '温度'){
                    this.selectActiveNum = 0;
                }else{
                    this.selectActiveNum = this.defaultText;
                }
                this.drawCurveChart(this.lineData, this.selectActiveNum)
                // console.log(this.defaultText);
                // this.queryData();
            },
            queryData() {
                if(new Date(this.startDate).getTime() > new Date(this.endDate).getTime() || this.startDate == '' || this.endDate == '' || this.startDate == undefined || this.endDate == undefined){
                    this.$message({
                        type:'warning',
                        message:'请正确选择日期!!!'
                    })
                }else{
                    
                        this.selectOptions = [];
                        // 饼图
                        var params = {
                            RlicName: this.$route.params.id,
                            beginTime: this.timeFormatter(this.startDate),
                            endTime: this.timeFormatter(this.endDate)
                        };
                        warningDetail(params).then(res => {
                            console.log(res)
                            this.drawPieChart(res);
                        });

                        // 参数 文物id、开始时间、结束时间
                        var humidGraph = {
                            RlicName: this.$route.params.id,
                            beginTime: this.timeFormatter(this.startDate),
                            endTime: this.timeFormatter(this.endDate)
                        };
                        // console.log(this.maximumMinimum)
                        // 曲线图
                        humidGraphDetail(humidGraph).then(res => {
                           this.selectOptions = [];
                           console.log(res);
                            if (res != [] && res != ''){
                              if(res[0].ChannelNum != null){
                                this.defaultText = res[0].Ch1Name;
                                switch(res[0].ChannelNum) {
                                    case 1:
                                        this.selectOptions.push({value:0,label:res[0].Ch1Name});
                                        break;
                                    case 2:
                                        this.selectOptions.push({value:0,label:res[0].Ch1Name},{value:1,label:res[0].Ch2Name});
                                        break;
                                    case 3:
                                        this.selectOptions.push({value:0,label:res[0].Ch1Name},{value:1,label:res[0].Ch2Name},{value:2,label:res[0].Ch3Name});
                                        break;
                                    case 4:
                                        this.selectOptions.push({value:0,label:res[0].Ch1Name},{value:1,label:res[0].Ch2Name},{value:2,label:res[0].Ch3Name},{value:3,label:res[0].Ch4Name});
                                        break;
                                };
                                this.lineData = res;
                                this.drawCurveChart(res);
                                this.loading = false;
                             }
                            
                            // this.graphData(res); 
                             
                            }else{
                                this.loading = false;
                                this.$message({
                                    type:'warning',
                                    message:'该段时间暂无数据!!!'
                                })
                            }
                            
                            
                        });

                        // 文物温湿度最大值、最小值、波动情况……
                        humidTableDetail(humidGraph).then(res => {
                            console.log(res)
                            this.maximumMinimum = res;
                        });
                    
                }
            },
            formatCurveData(data){      // 格式化曲线图数据
                    var categories = []; //X轴的数据
                    var series = [{}]; //Y轴的数据
                    var labels1 = []; //Yaxis的标签
                    var labels2 = []; //Yaxis的标签
                    var labels3 = []; //Yaxis的标签
                    var labels4 = []; //Yaxis的标签
                    var title1 = [];
                    var title2 = [];
                    var title3 = [];
                    var title4 = [];
                    var yAxis = [];
                    var s1 = []; //通道1
                    var s2 = []; //通道2
                    var s3 = []; //通道3
                    var s4 = []; //通道4
                    //highchart绘制图形
                    for (var i = 0; i < data.length; i++) {
                        categories.push(data[i].ITime); //压入X轴的坐标数据
                        s1.push(parseFloat(data[i].Ch1));
                        s2.push(parseFloat(data[i].Ch2));
                        s3.push(parseFloat(data[i].Ch3));
                        s4.push(parseFloat(data[i].Ch4));
                    };
                    if (data[0].Ch1Name != null && data[0].Ch1Name != "") {

                        series[0] = s1;
                        labels1.push(data[0].Ch1Unit);
                        title1.push(data[0].Ch1Name);
                    };


                    if (data[0].Ch2Name != null && data[0].Ch2Name != "") {

                        series[1] = s2;
                        labels2.push(data[0].Ch2Unit);
                        title2.push(data[0].Ch2Name);
                    };
                    if (data[0].Ch3Name != null && data[0].Ch3Name != "") {
                        series[2] = s3;
                        labels3.push(data[0].Ch3Unit);
                        title3.push(data[0].Ch3Name);
                    };
                    if (data[0].Ch4Name != null && data[0].Ch4Name != "") {

                        series[3] = s4;
                        labels4.push(data[0].Ch4Unit);
                        title4.push(data[0].Ch4Name);
                    };
                    return {
                        categories: categories,
                        series: series,
                        title1: title1,
                        labels1: labels1,
                        title2: title2,
                        labels2: labels2,
                        title3: title3,
                        labels3: labels3,
                        title4: title4,
                        labels4: labels4
                    };

            },
            getData() {
                // 文物信息
                var params = {
                    RlicName: this.$route.params.id
                };
                wenwuDetail(params).then(res => {
                    console.log(res);
                    this.wenwusName = res[0].RELIC_NAME;
                    this.DetailALL = res[0];
                    // console.log(this.DetailALL);
                    if(res[0].LOGGER_SN == null){
                        this.$message({
                            type:'warning',
                            message:'暂无设备！！！'
                        });
                        this.loading = false;
                    }else{
                        this.queryData();
                    }
                    this.wenwuDetail = res[0].TO_RELIC_All;
                    this.LOGGER = res[0].LoggerInfo;
                    this.shebeiName = res[0].LOGGER_NAME;
                });
                wenwuDetailReal(params).then(res => {
                    console.log(res[0]);
                    this.detailReal = res[0];
                });
                // 文物总数
                var Num = {
                    groupID: '',
                    Name: '',
                    Type: '',
                    pageSize: 5, 
                    pageIndex: 0
                };
                wenwuList(Num).then(res => {
                    // console.log(res);
                    for(var i in res){
                        // console.log(i);
                        this.relicNum = i;
                    }
                    
                });
                
            },
            relicPrev() { //上一文物
                if (this.$route.params.id == 1) { //到第一个文物时则停止“上一文物”
                    this.$message({
                        showClose: true,
                        message: '这已经是第一件文物了！',
                        type: 'warning'
                    });
                    return;
                } else {
                    var id = this.$route.params.id--;
                    // var windowUrl = window.location.href;
                    // var reg = /particulars\/(\w+)/;
                    // // var reg1 = '/(\w.+\/particulars)\/' + id + '/';
                    // var paramsID = windowUrl.match(reg);
                    // var id = parseInt(paramsID[1])-1;
                    // var replaceUrl = 'particulars/' + id;
                    // var changeUrl = windowUrl.replace(paramsID[0], replaceUrl);
                    // window.history.pushState({}, 0, changeUrl);
                    // this.$route.params.id = paramsID[1];
                    // console.log(paramsID);
                    // console.log(changeUrl);
                    // console.log(replaceUrl);
                    // this.$route.params.id--;
                    this.$router.push({ name: '文物详情', params:{id: this.$route.params.id--}});
                    // this.getData();
                    // this.queryData();
                }
            },
            relicNext() { //下一文物
                if (this.$route.params.id == this.relicNum) { //到最后一个文物时则停止“下一文物”
                    this.$message({
                        showClose: true,
                        message: '这已经是最后一件文物了！',
                        type: 'warning'
                    });
                    return;
                } else {
                    console.log(this.$route.path);
                    var id = this.$route.params.id++ ;
                    // console.log(id)
                    // this.$route.push('/particulars'+id);
                    // var windowUrl = window.location.href;
                    // var reg = /particulars\/(\w+)/;
                    // // var reg1 = '/(\w.+\/particulars)\/' + id + '/';
                    // var paramsID = windowUrl.match(reg);
                    // var id = parseInt(paramsID[1])+1;
                    // var replaceUrl = 'particulars/' + id;
                    // var changeUrl = windowUrl.replace(paramsID[0], replaceUrl);
                    // window.history.pushState({}, 0, changeUrl);
                    // this.$route.params.id = paramsID[1];
                    this.$router.push({ name: '文物详情', params:{id: this.$route.params.id++}});
                    // this.getData();
                    // this.queryData();
                }
            },
            changeRouter(){  // 监听路由变化，浏览器的后退问题
                // console.log('1234');
                this.getData();
                
            },
            timeFormatter(value) {
                var date = new Date(value);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+ date.getHours()+':'+date.getMinutes();
            },
            drawPieChart(datas) { //饼图
                var name = [],
                    data = [];
                for (var i = 0; i < datas.length; i++) {
                    name.push(datas[i].name);
                    data.push({
                        value: datas[i].value,
                        name: datas[i].name
                    });
                }
                this.chartPieCurve.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom: 20,
                        data: name
                    },
                    series: [{
                        type: 'pie',
                        radius: '60%',
                        center: ['50%', '42%'],
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        labelLine:{
                            normal:{
                                show:true,
                                length: 10,
                                length2:10
                            }
                        }
                    }],
                    color: ['#5ABEB8', '#713920', '#BD7958']
                })
            },
            drawCurveChart(data,val,) { //折线图
                var i = val || 0;
                var subText,subTit;
                
                this.chartCurve = echarts.init(document.getElementById('chartCurve'));
                var curve_datas = this.formatCurveData(data);
                if(i == 0){
                    subText = curve_datas.labels1;
                    subTit = curve_datas.title1;
                }else if( i == 1){
                    subText = curve_datas.labels2;
                    subTit = curve_datas.title2;
                }else if(i == 2){
                    subText = curve_datas.labels3;
                    subTit = curve_datas.title3;
                }else{
                    subText = curve_datas.labels4;
                    subTit = curve_datas.title4;
                };
                console.log(curve_datas.title1);
                this.chartCurve.setOption({
                    title: {
                        text:null,
                        subtext: subText,
                        left:'9%',
                        subtextStyle: {
                            color:'#333'
                        }
                    },
                    tooltip:{
                        trigger: 'axis',
                        formatter: '{b} <br/> '+subTit+':{c}'
                    },
                    toolbox: {
                        left:'80%',
                        top: '5%',
                        show: false,
                        itemSize:25,
                        width:'20%',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            magicType: {show:false,type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {show:false,name:this.wenwusName+'-'+subTit }
                        }
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            start: 0,
                            end: 100,
                            handleSize: 15,
                            height: '5%',
                            filterMode: 'empty',
                            bottom: '3%'
                        }
                    ],
                    color:['#438eb9'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        splitLine: {
                            show:false
                        },
                        data: curve_datas.categories.map(function (str) {return str.replace(' ', '\n')})
                    },
                    yAxis: {
                      type: 'value',
                      show: 'true',
                      splitLine: {
                        show: false
                      }
                      
                    },
                    series: [
                      {
                          name: '111',
                          type: 'line',
                          lineStyle:{normal:{width: this.lineStyleWidth}},
                          data: curve_datas.series[i]
                      }
                    ]
                });
                
                
            },
            chart_data_up(i, lineName, name, xAxis_data, yAxis_Adata, xAxis_Name, yAxis_Name) {
                // console.log(i, name, lineName, xAxis_data, yAxis_Adata, xAxis_Name, yAxis_Name);

                // this.value = lineName;

                

                this.chartCurve.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: [name]
                    },
                    grid: {
                        top: '12%',
                        left: '5%',
                        right: '7%',
                        bottom: '10%',
                        containLabel: true
                    },
                    color: ['#64C4EF'],
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        name: xAxis_Name,
                        nameTextStyle: {
                            color: '#666',
                            fontStyle: '黑体'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#666',
                                edgeSymbol: 'arrow',
                                linkSymbol: 'arrow'
                            }
                        },
                        data: xAxis_data
                    },
                    yAxis: {
                        type: 'value',
                        show: 'true',
                        name: yAxis_Name
                    },
                    series: [{
                        name: lineName,
                        type: 'line',
                        stack: '总量',
                        data: yAxis_Adata
                    }],
                    dataZoom: [{
                        type: 'slider',
                        show: true,
                        start: 95,
                        end: 100,
                        handleSize: 8,
                        bottom: '10%'
                    }, {
                        type: 'inside',
                        start: 95,
                        end: 100
                    }, {
                        type: 'slider',
                        show: false,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 12,
                        height: '70%',
                        handleSize: 8,
                        showDataShadow: false,
                        left: '93%'
                    }, {
                        bottom: '10%'
                    }]
                })
            },
            windowResize(){
                var ww = $(document).width();
                // console.log($('.content-container'));
                // $('.content-container').width(ww - 51);
                var hh = $(document).height();
                // console.log(hh);
                $('.content-wrapper').css({'height': hh-90-32, 'overflow-y':'auto'});
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            // this.hidemenu(); //折叠菜单
            console.log(this.$router);

            this.chartPieCurve = echarts.init(document.getElementById('chartPieCurve'));
            this.getData();
            // this.queryData();
            this.windowResize();
            var _this = this;

            window.onresize = function(){
                _this.windowResize();
            }
        },
        destroyed() { // 销毁完成后执行===============   使用beforeDestroy钩子也是可以的》
            // console.log('当前页面已经关闭===============');
            if(this.collapsed){
                this.showmenu(); //展开菜单
            }
            
        },
        deactivated(){

            this.$destroy(true);
        },
        watch:{
            '$route':'changeRouter'
        }
}
</script>
<style scoped> 
.el-form-item {
    margin-bottom: 10px;
}
</style>
<style lang="less" >

.particulars {
    position: relative;
    padding:16px 11px;
    .goback {
        position: absolute;
        top: 3px;
        right: 60px;
        width: 30px;
        height: 40px;
        margin-right: 35px;
        background: url(../../../../static/img/icon.png);
        background-position: -19px -767px;
        text-indent: -9999px;
        cursor: pointer;
        z-index:98;
    }
    .time-wrapper {
        .el-button {
            border: 0
        }
    }
    .details-content {
        margin: 0 20px;
        .tab_title_bg {
            background: -webkit-linear-gradient(#fdfdfd, #efeff0);
            /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#fdfdfd, #efeff0);
            /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#fdfdfd, #efeff0);
            /* Firefox 3.6 - 15 */
            background: linear-gradient(#fdfdfd, #efeff0);
            /* 标准的语法 */
            height: 40px;
            border-bottom: 1px solid #ddd;
            line-height: 40px;
            text-align: center;
            font-family: 'Microsoft YaHei';
            font-size: 18px;
            color: #666;
            .mune {
                width: 100%;
                margin: 0;
                padding: 0;
                list-style: none;
                overflow: hidden;
                li {
                    float: left;
                    width: 19%;
                    box-sizing: border-box;
                    border-right: 1px solid #BEBEBE;
                    font-size: 14px;
                    &:last-child {
                        width: 24%;
                        border-right: none;
                    }
                }
            }
        }
        .img-content {
            float: left;
            width: 44%;
            margin-top: 18px;
            border-right: 1px solid #BEBEBE;
            img {
                display: block;
                width: 71.9%;
                margin: 10px 0 20px 5.96%;
                border: 1px solid #8A9DA2;
            }
            .btn {
                width: 83%;
                margin-left: 5.96%;
                overflow: hidden;
                .pre {
                    float: left;
                    // margin-left: 5.96%;
                    padding: .15rem .46rem;
                }
                .next {
                    float: right;
                    // margin-left: 3rem;
                    padding: .15rem .46rem;
                }
            }
        }
        .dec-content {
            float: right;
            width: 51.77%;
            padding: 35px 1% 0;
            .dynasty,
            .detail {
                h3,
                p {
                    display: inline-block;
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                    font-family: 'Microsoft YaHei';
                    font-weight: normal;
                }
                h3 {
                    margin-bottom: 20px;
                }
            }
            .info-content {
                h3,
                p {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                    font-family: 'Microsoft YaHei';
                    font-weight: normal;
                }
                h3 {
                    margin-bottom: 10px;
                }
                p {
                    margin-left: 30px;
                }
            }
        }
        .left-survey {
            float: left;
            width: 53.1%;
            height:383px;
            border-right: 1px solid #ddd;
            .up-info {
                width: 100%;
                height: 110px;
                p {
                    margin: 18px 0 0 56px;
                    color: #666;
                    font-size: 14px;
                    font-family: 'Microsoft YaHei';
                    font-weight: normal;
                }
            }
            .table {
                width: 100%;
                border-bottom:1px solid #ddd;
                .el-row {
                    margin: 0;
                }
                .el-col {
                    height: 1.2rem;
                    margin: 0;
                    border-top: 1px solid #DDDDDD;
                    border-right: 1px solid #DDDDDD;
                    line-height: 1.2rem;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    font-family: 'Microsoft YaHei';
                    font-weight: normal;
                }
                .el-col:last-child {
                    border-right: 0;
                }
            }
        }
        .right-warning {
            float: right;
            width: 46.7%;
            .warning {
                height: 340px;
            }
        }
        .left-lineGraph {
            float: left;
            width: 62.5%;
            border-right: 1px solid #ddd;
            height:350px;
            .tab_title_bg {
                font-size: 14px;
            }
            .select {
                padding: 10px 20px;
            }
            .humid-lineGraph {
            
                height: 290px;
            }
        }
        .right-thermograph {
            float: right;
            width: 37.4%;

            .el-row {
                height: 40px;
                margin: 0;
                color: #666;
                line-height: 40px;
                text-align: center;
            }
            .el-col-19 {
                width: 19%;
            }
            .el-col-24 {
                width: 24%;
            }
            .noData {
                width: 100%;
                margin-top: 50px;
                color: #666;
                text-align: center;
            }
        }
    }
    .el-row {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        // height: 400px;
        padding-bottom: 15px;
        border: 1px solid #DDDDDD;
        overflow: hidden;
        &.noPadding {
            padding: 0;
        }
    }
    .grid-content-bottom {
        height: 350px;
        border: 1px solid #DDDDDD;
        overflow: hidden;
    }
    .tabSelect {
        .el-input input {
            height: 24px;
            width: 80px;
            padding-left: 5px;
            text-align: center;
            text-indent: 0;
            background: #fff;
            border: 1px solid #ddd;
        }
        .el-input__icon {
            width: 22px;
        }
        .el-input__icon+.el-input__inner {
            padding-right: 18px;
        }
    }
}
</style>
