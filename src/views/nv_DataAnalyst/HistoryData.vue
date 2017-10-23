<template>
  <el-row :span="24" v-loading="loading" element-loading-text="加载中" class='my_padding'>
    <el-form class="from_hei" :inline='true'>
      <el-form-item label='仪器名称：' class='myLabel '>
      <!-- 组件 -->
        <!-- <span class="fot_MicYH">仪器名称：</span> -->
        <el-select v-model="value" filterable placeholder="请选择" class="head_select_zt" @change="get_Instrument">
          <el-option
            v-for="item in slexs_1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  class="cj_data_Pic myLabel" label='采集时间:'>
          <el-date-picker
           :clearable='false'
            v-model="S_value_data"
            :type="dateType"
            placeholder="开始时间"
            :picker-options="S_data_Pic" 
            class="data_inPut_Pic myDate"
            format='yyyy-MM-dd HH:mm'
            @change="data_Bigin">
          </el-date-picker>
      </el-form-item>
      <el-form-item label='到'  class='myLabel'>
        <el-date-picker
         :clearable='false'
            v-model="N_value_data_ed"
            :type="dateType"
            placeholder="结束时间"
            :picker-options="N_data_Pic" 
            class="data_inPut_Pic myDate"
            format='yyyy-MM-dd HH:mm'
            @change="data_End">
          </el-date-picker>
      </el-form-item>
      <el-form-item class='margin0'>
        <el-button type="primary" @click="data_Updata()" class="fot_MicYH btn_cck_1 btn_cck_Query">查询</el-button>
        <el-button type="primary" id="export_Pic" class="fot_MicYH btn_cck_1" @click="htmlCanvasImg($event)">导出图片</el-button>
        <el-button type="primary" id="export_Data" class="fot_MicYH btn_cck_1" @click="out_data()">导出数据</el-button>
      </el-form-item>
      <el-form-item  align="right" class='fr'>
        <el-button-group class="btn_tab">
          <el-button type="primary" class='active'  @click="data_Updata()">曲线展示</el-button>
          <el-button type="primary"  @click="data_Updata()">数据展示</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-row :span="24" id="canvas_html_img">
      <el-row :span='24' id='hideenText'  style='text-align: center; color:#666;margin-top: 5px; opacity:0' >{{ hiddenImgName }}</el-row>
      <el-row v-if="TexNull == true" style="text-align:center;color:#999;line-height:290px;">该段时间暂无数据,请重新选择时间</el-row>
      <el-row :span="24" class="tab_Cls active" >
        <el-row class='singleChannel'>
          <el-row>
            <template>
              <table border='0' width="100%" cellpadding="0" cellspacing="0" class="data_Anlyera">
                <thead class="thd_bg">
                  <tr>
                    <th width="10%">{{ Anlyera_tab_had[0].channelNum }}个测量通道</th>
                    <th width="10%">{{ Anlyera_tab_had[0].count }}条记录</th>
                    <th width="10%">开始时间</th>
                    <th colspan="3">{{ Anlyera_tab_had[0].beginTime }}</th>
                    <th width="10%">结束时间</th>
                    <th colspan="3">{{ Anlyera_tab_had[0].endTime }}</th>
                  </tr>
                </thead>
                <tbody v-for="Datas in DataAnalyzer" class="tbd_bg">
                  <tr>
                    <td>{{ Datas.Analyzer }}</td>
                    <td>{{ Datas.record }}</td>
                    <td>{{ Datas.S_data }}</td>
                    <td>{{ Datas.S_datas_1 }}</td>
                    <td>{{ Datas.S_datas_2 }}</td>
                    <td>{{ Datas.S_datas_3 }}</td>
                    <td>{{ Datas.N_data }}</td>
                    <td>{{ Datas.N_datas_1 }}</td>
                    <td>{{ Datas.N_datas_2 }}</td>
                    <td>{{ Datas.N_datas_3 }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </el-row>
          <el-row :span="24" id="chart_tub" style='margin-bottom:20px'>
            <!-- <el-col :span="12" v-for="chrt in chats_item" class="chat_itens" ref="data_chart">
                <div id="chartLine" style="width:100%; height:400px;" class="chartLine"></div>
            </el-col> -->
          </el-row>
        </el-row>
        <el-row class='doubleChannel isHidden'>
          <el-col :span='24' id='wenshiChart' style='height: 560px; ' :style='{width: wenshiWidth+"px" }'>
          
          </el-col>
        </el-row>
        <el-row style='position: absolute;bottom: 0;' class='historyFooter'>
          <el-col :span='24' class='footer' v-if='tabShow' >
            <el-button type="primary" :class='{active:channelHide}' @click='singleChannel()'>单通道数据综合</el-button >
            <el-button type="primary" :class='{active: !channelHide}' @click='dbChanel()'>温湿度数据综合</el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row :span="24" class="tab_Cls padin_tab" :gutter="20" >
        <el-col :span="17" class="hide_TF">
          <template>
            <el-table
              :data="tab_data_two"
              stripe
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="仪器名称" min-width='150'>
              </el-table-column>
              <el-table-column
                prop="channel_num"
                label="通道数量">
              </el-table-column>
              <el-table-column
                prop="gather_data"
                label="采集时间" 
                sortable min-width='150'>
              </el-table-column>
              <el-table-column
                prop="tmp_data"
                :label="label_data_tab[0]" 
                v-if="parseInt(ChannelNum_tab) >= 1"
                sortable>
              </el-table-column>
              <el-table-column
                prop="humd_data"
                :label="label_data_tab[1]" 
                v-if="parseInt(ChannelNum_tab) >= 2"
                sortable>
              </el-table-column>
              <el-table-column
                prop="Lux_Co2_a" 
                :label="label_data_tab[2]"
                v-if="parseInt(ChannelNum_tab) >= 3"
                sortable>
              </el-table-column>
              <el-table-column
                prop="Lux_Co2_b"
                :label="label_data_tab[3]" 
                v-if="parseInt(ChannelNum_tab) >= 4"
                sortable>
              </el-table-column>
            </el-table>
            <el-pagination class='myPageination' 
                    layout=' sizes, ->, prev, pager, next' 
                    :page-size='pageSize' 
                    :current-page='pageIndex' 
                    @current-change='pageIndexChange' 
                    :total='pageNum' 
                    :page-sizes='pageSizes' 
                    @size-change='sizeChange'>
              
            </el-pagination>
          </template>
        </el-col>
        <el-col :span="7" class="right_pie_data hide_TF">
          <el-row :span="24" class="head_title">预警统计</el-row>
          <el-row :span="24">
            <div id="chartPie" style="windth:100%; height:240px;margin:auto;"></div>
          </el-row>
          <el-row :span="24" align="center" class="cent_marg">
            <el-table
              :data="MaxMIn_pie_tab"
              border
              style="width: 90%" class="tab_block">
              <el-table-column
                prop="name"
                label="指标" min-width='60'>
              </el-table-column>
              <el-table-column
                prop="max_data"
                label="最大值"  min-width='55'>
              </el-table-column>
              <el-table-column
                prop="min_data"
                label="最小值"  min-width='55'>
              </el-table-column>
              <el-table-column
                prop="Vao_data"
                label="平均值"  min-width='55'>
              </el-table-column>
              <el-table-column
                prop="Waves_data"
                label="波动值"  min-width='55'>
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>    
    </el-row>
<!-- <div id='cloneNodeDiv'></div> -->
  <!-- 弹出窗提示 -->
  </el-row>
  
  <!-- 组件 -->
  <!-- <el-col :span="24"></el-col> -->

</template>

<script>
var today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
var oneday = 1000 * 60 * 60 * 24;
//导入 echart 组件
  import echarts from '../../../static/js/echarts.js'
  import shine from '../../../static/js/shine.js'
  import html2canvas from 'html2canvas'
  import qs from 'qs'

  import { Data_Instrument,DataAnalyzer,DataStat,PieExceed,OutData,historyPageList } from '../../api/api'
  
  // 分析评估
  export default {
    data() {
      return {//选择仪器数据
        slexs_1: [],
        // valueVal:'',
        value: '',//定义空 使用动态默认
        S_data_Pic: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        N_data_Pic: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        S_value_data: new Date(today - oneday * 7),//定义空
        N_value_data_ed: new Date(),
        // 通道数据
        Anlyera_tab_had:[{
          "channelNum":'',
          "count": '',
          "beginTime": '',
          "endTime": ''
        }],
        DataAnalyzer:[],
        chartLine: null,
        slexes_data: '',
        chats_item: '',
        box_item: '',
        tab_data_two: [], // 数据展示的另一种方法 // 表格所有数据
        ChannelNum_tab: '',
        loading: false, // 预加载
        label_data_tab: [], // 饼图表格头数据
        PieExceedArryA: [], // 多少组
        PieExceedArryB: [],  // 数据详情
        MaxMIn_pie_tab: [],  //数据
        ofOn : false,
        TexNull: true,
        // TDArray:[]  // 通道数组
        Instrument_ID: '',
        listSn: null,
        pageSize:10,
        pageIndex:1,
        pageNum: null,
        pageSizes:[10,15,20],
        commonSn: null,
        picName:'',
        lineStyleWidth: '1.5', // 设置曲线图线条的粗细
        isHiddenImgName: false, // 是否显示
        opacity: 0,
        hiddenImgName: null,  // 导出的图片名称
        tabShow: true,
        chartOrData: false,    //  true数据展示 or  false 曲线展示 
        channelHide: true,   // true显示单通道，false显示温湿度数据综合
        wenshiWidth: null
      } 
    },
    props: ['dateType'],
    methods: {
      singleChannel(){
        this.channelHide = true;
        $('.singleChannel').removeClass('isHidden');
        $('.doubleChannel').addClass('isHidden');
      },
      dbChanel(){
        this.channelHide = false;
        // console.log($('.tab_Cls'));
        $('.singleChannel').addClass('isHidden');
        $('.doubleChannel').removeClass('isHidden');
      },
      data_Updata: function(){// 从它开始 => 点击事件 => 获取数据的方法
        // console.log(this.$store.state.NewID)
        // console.log(this.S_value_data)  //判断查询所发送的数据是否为空
        // this.potDateID()
        // if(this.$route.path == '/historyData'){
          // console.log(this.$route.path);
          this.chartOrData = !this.chartOrData;
          if(new Date(this.S_value_data).getTime() > new Date(this.N_value_data_ed).getTime() || this.S_value_data == '' || this.N_value_data_ed == '' || this.S_value_data == undefined || this.N_value_data_ed == undefined){
              this.$message({
                    type:'warning',
                    message:'请正确选择日期!!!'
                })
          }else{
            this.loading = true;
            if( this.S_value_data != '' && this.N_value_data_ed != '' && this.Instrument_ID != undefined ){
              if( this.$store.state.NewID != '' && this.$store.state.NewID != null ){
                this.value = this.$store.state.NewID;
                this.getDataA(this.$store.state.NewID);
                this.listSn = this.$store.state.NewID;
                // console.log(this.listSn);
              }else{
                // console.log(this.Instrument_ID);
                this.getDataA(this.Instrument_ID);
                this.listSn = this.Instrument_ID;
                // console.log(this.listSn);
              }
            } 
          }
        // }
      },
      out_data: function(){
        this.potDate = {
            'beginTime': this.timeFormatter(this.S_value_data),
            'endTime': this.timeFormatter(this.N_value_data_ed),
            'sn': this.Instrument_ID
          };
          // console.log('dayin')
        OutData(this.potDate).then(res => {
          // 下载 Excel
          // console.log(res);
          window.open(res);
        })
      },
      getDataA(SnID){
          this.potDate = {
              'beginTime': this.timeFormatter(this.S_value_data),
              'endTime': this.timeFormatter(this.N_value_data_ed),
              'sn': SnID
            };

            // console.log(this.$refs.data_Bigin.displayValue)
            // console.log(this.potDate)
            // console.log(S_NewData,this,N_NewData)
            // var params = { SName: this.zhantingID };     ?sn=HE20131580&beginTime=2017-03-18&endTime=2017-05-02
            // 现在读取数据 this.Instrument_ID
            DataStat(this.potDate).then(data => {
              // 添加图表
              // this.addClass_ID(data);
              // console.log(data)
              if( data != null && data != '' ){
                this.picName = data[0].IName;
              }else{
                this.picName = ''
              }
              this.addClass_ID(data);
              this.data_tab_all(data);
              this.humitureChart(data);
              this.get_table_data();
            });//
            DataAnalyzer(this.potDate).then(rel => {
              // console.log(rel)
              this.addTab_data(rel);
            });// 折线数据 && 表格数据
            PieExceed(this.potDate).then(piedata => {
              // console.log(piedata)
              this.pie_right_Exceed(piedata);
            });
      },
      humitureChart(data){
        console.log('wenshidu');
        console.log(data);
        if( data !== [] && data.length !== 0 ){
          let dataTime = [], tempData = [], humiData = [], loggerName = data[0].IName;
          let tempMax, tempMin, humiMax, humiMin;
          for (var i = 0; i < data.length; i++) {
             dataTime.push(data[i].ITime);
             tempData.push(data[i].Ch1);
             humiData.push(data[i].Ch2);
          };
          // 温度最大最小值
          tempMax = this.integerMax(Math.ceil(this.arrayMax(tempData)));
          tempMax = 40;
          tempMin = this.integerMin(Math.floor(this.arrayMin(tempData)));
          tempMin = tempMin == undefined ? 0 : tempMin;
          // 湿度最大最小值
          humiMax = this.integerMax(Math.ceil(this.arrayMax(humiData)));
          humiMin = this.integerMin(Math.floor(this.arrayMin(humiData)));
          humiMin = humiMin == undefined ? 0 : humiMin;
          if(humiMin < 20 ){
            humiMin = 0;
          } else {
            humiMin = 20;
          }
          var TempInterVal = (tempMax - tempMin )/5;
          var HumiInterVal = (humiMax - humiMin )/5;
          this.$nextTick(function () {
            this.chartLine = echarts.init(document.getElementById('wenshiChart'), 'shine');
            this.chartLine.setOption({
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  crossStyle: {
                    color: '#666'
                  }
                },
                formatter: function(params) {
                  var date = params[0].axisValue;
                    var date_before = date.split('\n')[0];
                    var date_after = date.split('\n')[1];
                    var temp =  date_after +' '+ date_before + '<br />';
                    for(var i = 0; i < params.length; i++){
                      var data = params[i].data;
                      // console.log(typeof(data))
                      if(data.toString().indexOf('.') != -1){
                        var folatLength = data.toString().split('.')[1].length;
                        if(folatLength > 3 || typeof(data) == 'number'){
                          temp += '<span style="display:inline-block;margin-right:5px;width:15px;height:10px;background-color:'+ params[i].color +'"></span>'+params[i].seriesName+': - <br />';
                        }else{
                          temp += '<span style="display:inline-block;margin-right:5px;width:15px;height:10px;background-color:'+params[i].color +'"></span>'+ params[i].seriesName+': '+params[i].data+'<br />';
                        }
                      }else{
                        temp += '<span style="display:inline-block;margin-right:5px;width:15px;height:10px;background-color:'+params[i].color +'"></span>'+ params[i].seriesName+': '+params[i].data+'<br />';
                      }
                      
                    }
                    // console.log(temp);
                    return temp;
                }
                
              },
              grid: {
                right: '5%',
                left: '5%'
              },
              toolbox: {
                  show: true,
                  itemSize: 25,
                  width: '20%',
                  // top: '1%',
                  orient: 'horizontal',
                  right: '8%',
                  feature: {
                      dataZoom: {
                          yAxisIndex: 'none'
                      },
                      restore: {},
                      saveAsImage: { show: false }
                  }
              },
              legend: {
                  // align: 'left',
                  // orient: 'vertical',
                  // right: '0',
                  // top: '5%',
                  data: [loggerName + '-温度', loggerName + '-湿度' ]
              },
              xAxis: [
                  {
                    boundaryGap: false,
                    type: 'category',
                    data: dataTime.map(function (str) {
                      // console.log(str);
                      var str_before = str.split(' ')[0];
                        var str_after = str.split(' ')[1];
                        return str_after + '\n' + str_before;
                          // return str.replace(' ', '\n')
                      })
                  }
              ],
              dataZoom: [
                  {
                      type: 'slider',
                      show: false,
                      start: 0,
                      end: 100,
                      handleSize: 15,
                      height: '5%',
                      filterMode: 'empty',
                      bottom: '0',
                      showDetail:false
                  }
              ],
              calculable : true,
              lineWidth:1.5,
              yAxis: [
                  {
                    type: 'value',
                    name: '(℃) 温度',
                    min: tempMin,
                    max: tempMax,
                    interval: TempInterVal,
                    axisLabel: {
                      formatter: '{value}'
                    },
                    splitNmuber: 5
                  },
                  {
                    type:'value',
                    name:'湿度 (%RH)',
                    min:humiMin,
                    max: humiMax,
                    interval:HumiInterVal,
                    axisLabel:{
                      formatter:'{value}'
                    },
                    splitNmuber: 5
                  }
              ],
              series: [
                {
                  name: loggerName + '-温度',
                  type: 'line',
                  symbol: 'none',
                  lineStyle: {
                    normal: { width: 1.5 }
                  },
                  data: tempData
                },
                {
                  name: loggerName + '-湿度',
                  type: 'line',
                  symbol: 'none',
                  yAxisIndex: 1,
                  lineStyle: {
                    normal: { width: 1.5 }
                  },
                  data: humiData
                }
              ]
            }, true);
          })
        }
         
      },
      pageIndexChange(pageIndex){
        this.pageIndex = pageIndex;
        this.get_table_data();
      },
      sizeChange(pageSize){
        this.pageSize = pageSize;
        this.get_table_data();
      },
      get_table_data(){
        var params = {
          sn: this.listSn,
          beginTime: this.timeFormatter(this.S_value_data),
          endTime: this.timeFormatter(this.N_value_data_ed),
          pageSize: this.pageSize, 
          pageIndex: this.pageIndex - 1 
        };
        historyPageList(params).then(data => {
           this.tab_data_two = []; // 清空
           if(data.length > 0){
             this.picName = data[0].IName;
              for (var k = 0; k < data.length; k++) {
                // this.ChannelNum_tab[i]
                
                this.tab_data_two.push({
                  "name": data[k].IName,
                  "channel_num": this.ChannelNum_tab,
                  "gather_data": data[k].ITime,
                  "tmp_data": data[k].Ch1,
                  "humd_data": data[k].Ch2,
                  "Lux_Co2_a": data[k].Ch3,
                  "Lux_Co2_b": data[k].Ch4
                })
              }
            }
        })
      },
      data_tab_all: function(data){
        // console.log(data);
        if( data != null && data != '' ){
          this.pageNum = data.length;
          this.TexNull = false;
          this.ChannelNum_tab = data[0].ChannelNum;
          // console.log(this.ChannelNum_tab + '-------');
          this.label_data_tab = []; // 清空
          for (var i = 1; i <= this.ChannelNum_tab; i++) {
            this.label_data_tab.push(eval("data[0].Ch" + i + "Name"))
            // data[0].Ch1Name
          }
          // console.log(this.label_data_tab)
         
        }else{
          this.TexNull = true;
          this.loading = false; 
          // this.alertMasg('该段时间无数据,请重新选择!','warning');
        }
      },
      addTab_data: function(data){
        // console.log(data)
        if( data != null ){
          this.Anlyera_tab_had = [];
          this.Anlyera_tab_had.push({
            "channelNum":data[0].ChannelNum,
            "count": data[0].count,
            "beginTime": data[0].beginTime,
            "endTime": data[0].endTime
          });
          // 清空数据=>重新渲染数据
          this.DataAnalyzer = [];
          this.MaxMIn_pie_tab = [];

          for(let i = 1 ; i < data.length ; i++){

            this.DataAnalyzer.push({
                "Analyzer": data[i].Name, 
                "record": data[i].Unit, 
                "S_data": '最大值:', 
                "S_datas_1": data[i].Max, 
                "S_datas_2": '最小值:', 
                "S_datas_3": data[i].Min, 
                "N_data": '平均值:', 
                "N_datas_1": data[i].Avg  , 
                "N_datas_2": '波动值:', 
                "N_datas_3": data[i].Waves  
            })
            // console.log(this.DataAnalyzer)
            this.MaxMIn_pie_tab.push({
              "name": data[i].Name,
              "max_data": data[i].Max,
              "min_data": data[i].Min,
              "Vao_data": data[i].Avg,
              "Waves_data": data[i].Waves
            })
          }
          // console.log(this.TDArray)
          // console.log(this.Anlyera_tab_had[0])
        }else{
          this.loading = false; 
          // this.alertMasg('该段时间无数据,请重新选择!','warning');
        }
      },
      potDateID: function() {// 可定义成全局函数
        // 获取展厅的id
        var zhantingID = this.$store.state.zhantingID;
        // 将id传到后台并获取仪器数据列表
        var potDateID_arry = {'groupID': zhantingID};
        Data_Instrument(potDateID_arry).then(rel => {
          // console.log(rel);
          this.value = rel[0].name;
          this.value = rel[0].sn;
          this.$store.state.ModifySn = rel[0].sn;
          this.hiddenImgName = rel[0].name + ' ' + rel[0].sn;
           // console.log(this.hiddenImgName);
          this.Instrument_ID = rel[0].sn;
          this.slexs_1 = [];
          for (var i = 0; i < rel.length; i++) {
            this.slexs_1.push(
              {
                'value': rel[i].sn,
                'label': rel[i].name
              }
            )
          };
          this.data_Updata();
        })
      },

      htmlCanvasImg:function(){
        var _this = this;
        $('#hideenText').css({'opacity':'1'});
        this.isHiddenImgName = true;
            // html2canvas(document.getElementById('#canvas_html_img')).then(function(canvas) {
            //   document.body.appendChild(canvas);
            // });
            // console.log(document.getElementById('canvas_html_img'))
            var hh = $('#canvas_html_img').height();
            var zhantingName;
            var zhantingGroup = this.$store.state.overViewName;
          var zhantingId = this.$store.state.zhantingID;
          for (var i = 0; i < zhantingGroup.length; i++) {
            if(zhantingGroup[i].GROUP_ID == zhantingId){
              zhantingName = zhantingGroup[i].GROUP_NAME;
              // this.hiddenImgName = zhantingGroup[i].GROUP_NAME + ' ' + zhantingGroup[i].GROUP_NAME
              break;
            }
          };
          // console.log(hh);
          if(this.isHiddenImgName) {
            html2canvas(document.getElementById('canvas_html_img'), {
              height: hh+400,
              onrendered: function(canvas) {
                // let CanvasUrl = canvas.toDataURL();
                // console.log(CanvasUrl)
                // document.body.appendChild(canvas);
                // console.log(_this)
                // _this.downloadFile('ship.png', canvas.toDataURL("image/png"));
                // 方法一: 兼容IE9+
                var type = 'png'
                var filename = zhantingName+'-数据分析' + (new Date()).getTime() + '.' + type;
                var saveImg = function (canvas, filename) {//canvas保存为图片
                  if (canvas.msToBlob) {//IE9+浏览器
                      var blob = canvas.msToBlob();
                      window.navigator.msSaveBlob(blob, filename);
                  } else {//firefox,chrome
                      var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                      save_link.href = canvas.toDataURL('image/png');
                      save_link.download = filename;
                      var event = document.createEvent('MouseEvents');
                      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                      save_link.dispatchEvent(event);
                  }
                  
              };
              // this.isHiddenImgName = false;
              saveImg(canvas,filename);
            // 方法二:
                // 图片导出为 png 格式
                // var type = 'png';
                // var imgData = canvas.toDataURL(type); 
                /**
                 * 获取mimeType
                 * @param  {String} type the old mime-type
                 * @return the new mime-type
                 */
                // var _fixType = function(type) {
                //     type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                //     var r = type.match(/png|jpeg|bmp|gif/)[0];
                //     return 'image/' + r;
                // };
                   
                // // 加工image data，替换mime type
                // imgData = imgData.replace(_fixType(type),'image/octet-stream');
                // /**
                //  * 在本地进行文件保存
                //  * @param  {String} data     要保存到本地的图片数据
                //  * @param  {String} filename 文件名
                //  */
                // var saveFile = function(data, filename){
                //     var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                //     save_link.href = data;
                //     save_link.download = filename;
                   
                //     var event = document.createEvent('MouseEvents');
                //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                //     save_link.dispatchEvent(event);
                // };
                // // 下载后的问题名
                // var filename = 'baidufe_' + (new Date()).getTime() + '.' + type;
                // // download
                // saveFile(imgData,filename);
              },
          
          });
        }
        $('#hideenText').css({'opacity':'0'});
        this.isHiddenImgName = false;
      },
      get_Instrument(data){

        this.Instrument_ID = data;
        // console.log(data);
        // console.log(this.slexs_1)

        if( (this.$store.state.NewID != undefined) && (this.$store.state.NewID != '') ){
          this.value = this.$store.state.NewID;  // 赋值选择框
          // console.log(this.$store.state.NewID);
          this.$store.state.NewID = '';   // 清空
        }else{
          this.$store.state.ModifySn = this.Instrument_ID;   // 将修改之后的值赋给取值者   默认&&修
          // console.log(this.$store.state.ModifySn)
        }
        for(var i = 0; i < this.slexs_1.length; i++){
          // console.log()
          if(data == this.slexs_1[i].value){
            this.hiddenImgName = this.slexs_1[i].label + ' ' + this.slexs_1[i].value;
          }
        }
        // console.log(this.hiddenImgName);
      },
      open_Warning: function(){
        // console.log(this)
        this.$alert('警告!!!数据选择不完整!', '!警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'error',
              message: `查询失败!!!`
            });
          }
        });
      },
      cartChat: function(){
        var chart_tB = document.getElementById('#chart_tub');
          let ohtml = '';
          for (var i = 0; i < this.chats_item; i++) {
            ohtml += "<div class='chat_itens size_chat'>"+
                            "<div id='chartLine' style='width:" + this.wenshiWidth/2 +  "px; height:280px;' class='chartLine'></div>"+
                        "</div>"
            $('#chart_tub').html(ohtml);
            // console.log(ohtml,$('#chart_tB'))
          }
      },
      addClass_ID: function(data){
        // console.log(data)
        if( data != null && data != '' ){
          this.chats_item = data[0].ChannelNum; // 判断有多少组数据 => 储存变量 => 并通过他来创建图表
          // console.log(this.chats_item)
          if( this.chats_item != 0 && this.chats_item != '' && this.chats_item != undefined ){
            this.loading = false;
            this.cartChat()
            var box_item = document.querySelectorAll('.chat_itens>div');
            let ChartDataArray = [];
            for (var i = 0; i < box_item.length; i++) {

              let art = []; //Y轴数据集合
              let Itie = []; //X轴数据集合
              let chK = 'Ch' + (i+1);// 数据读取需要的名称 => Y轴数据集合
              let ChKName = 'Ch' + (i+1) + 'Name'; //数据读取需要的名称 => 鼠标移入的名称
              let ChOName_1 = ''; // 鼠标移入的名称
              let IName = 'Ch' + (i+1) + 'NumName'; // 图表数据名称
              let IName_1 = '';
              let ChOUnit_1 = '';// Y轴数据名称
              let ChKUnit = 'Ch' + (i+1) + 'Unit';//数据读取需要的名称 => Y轴数据名称
              for (var j = 0; j < data.length; j++) {
                art.push(eval("data[j]." + chK));
                // console.log(eval("data[j]." + chK),chK)
                Itie.push(data[j].ITime);
                ChOName_1 = eval("data[j]." + ChKName);
                IName_1 = eval("data[j]." + IName);
                ChOUnit_1 = eval("data[j]." + ChKUnit);
              };
              // console.log(art);
              let minData = Math.floor(Math.min.apply(null, art));
              let maxData = Math.ceil(Math.max.apply(null, art));
              // console.log(minData);
              let sortArry = '';
              let Toptip = '150%';
              // console.log(IName_1)
              if( IName_1 == '通道一' ){
                sortArry = 1;
                Toptip = '80%';
              }else if ( IName_1 == '通道二' ){
                sortArry = 2;
              }else if ( IName_1 == '通道三' ){
                sortArry = 3;
              }else if ( IName_1 == '通道四' ){
                sortArry = 4;
              };
                ChartDataArray.push({
                  'ChOName':ChOName_1,
                  'IName':IName_1,
                  'ITime':Itie,
                  'ChO':art,
                  'data':'',
                  'ChOUnit': ChOUnit_1,
                  'MinDate': minData,
                  'MaxDate': maxData,
                  'name_un': ChOUnit_1,
                  'sortArry': sortArry,
                  'burle': Toptip
                });

            }
            for (var i = 0; i < box_item.length; i++) {
               //根据通道（sort）排序  
                function sortsArray(a,b){  
                   return a.sortArry-b.sortArry
                }  
                //利用js中的sort方法  
                ChartDataArray.sort(sortsArray);
                // console.log(ChartDataArray)
                this.chart_data_up(i,ChartDataArray[i].ChOName,ChartDataArray[i].IName,ChartDataArray[i].ITime,ChartDataArray[i].ChO,ChartDataArray[i].data, ChartDataArray[i].name_un ,ChartDataArray[i].MaxDate,ChartDataArray[i].MinDate,ChartDataArray[i].burle);
                // 停止加载loading
                this.loading = false;

                echarts.connect('group') // 设置联动数据           
              }

            this.ChartDataArray = ChartDataArray;
          }else{
            this.loading = false;
          }
          
          // console.log(box_item[0].id)
        }else{

          // 停止加载loading
          this.loading = false; 
          // this.alertMasg('该段时间无数据,请重新选择!','warning');
        }
      },
      integerMax: function(max, bool){
        // var isTrue = bool == undefined ? true : bool;
        // console.log(isTrue);
       
          // console.log('-----max----'+ max);
          if(max%5 == 0){
            // console.log(max);
            return max;
          }else{
            max++;
            return this.integerMax(max);
          }
        
        
      },
      integerMin: function(max, bool){
        // var isTrue = bool == undefined ? true : bool;
        // console.log(isTrue);
       
          // console.log('-----max----'+ max);
          if(max%5 == 0){
            // console.log(max);
            return max;
          }else{
            max--;
            return this.integerMin(max);
          }
        
      },
      arrayMax:function(arr){
        var max = arr[0] == '-'?0:arr[0];
        for(var i = 1; i < arr.length; i++){
          if( max < Number(arr[i]) ){
            max =   Number(arr[i]);
          }
        }
        // console.log(max)
        return max;
      },
      arrayMin: function(arr){
        // console.log(arr);
        var min = arr[0] == '-'?101:arr[0];
        for(var i = 1; i < arr.length; i++){
          if( min > Number(arr[i]) ){
            min = Number(arr[i]);
          }
        }
        return min;
      },
      chart_data_up: function(i,lineName,name,xAxis_data,yAxis_Adata,xAxis_Name,yAxis_Name,max,min,burle){
        // console.log(i,name,lineName,xAxis_data,yAxis_Adata,xAxis_Name,yAxis_Name)
        // i ChOName IName ITime ChO data ChOUnit
        // 基于准备好的dom，初始化echarts实例
        // console.log(this.lineStyleWidth);
        max = this.integerMax(Math.ceil(max));
        min = this.integerMin(Math.ceil(min));
        var interval = (max - min)/5;
        var _this = this;
        // this.chartLine = echarts.init(document.querySelectorAll('#chartLine')[i]);
        this.$nextTick(function () {
          this.chartLine = echarts.init(document.querySelectorAll('#chartLine')[i]);
          this.chartLine.setOption({
            title: {
                // text: 'Line Chart'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
              left: burle,
              top: '1%',
              itemSize: 25,
              width:'20%',
              show: true,
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {show: false, name: _this.picName + '-' + lineName }
                  }
              },
              dataZoom: [
                {
                    type: 'slider',
                    show: false,
                    start: 0,
                    end: 100,
                    handleSize: 15,
                    height: '5%',
                    filterMode: 'empty',
                    bottom: '3%',
                    showDetail:false
                }
            ],
            legend: {
                data: [name],
                top: '5%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            color:['#438eb9'],
            xAxis: {
              type: 'category',
              boundaryGap: true,
              name: xAxis_Name,
              data: xAxis_data.map(function (str) {
                var str_before = str.split(' ')[0];
                var str_after = str.split(' ')[1];
                return str_after + '\n' + str_before;
                // return str.replace(' ', '\n')
              })
            },
            yAxis: {
                type: 'value',
                show: 'true',
                interval: interval,
                name: yAxis_Name,
                max: max,
                min: min,
                splitNumber: 5   // 分割段数
            },
            series: [
                {
                    name: name,
                    type: 'line',
                    symbol: 'none',
                    smooth: false,
                    stack: lineName,
                    data: yAxis_Adata,
                    lineStyle: { normal: { width: this.lineStyleWidth }}
                }
            ]
          });

          this.chartLine.group = 'group';  // 添加联动绑定
        })
      },
      alertMasg: function(msg,type_msg){
        this.$message({
          showClose: true,
          message: msg,
          type: type_msg
        });
      },
      clickTab: function(){
        $('.btn_tab>button').on('click',function(){
          let inx = $(this).index();
          $(this).addClass('active').siblings().removeClass('active')
          $('.tab_Cls').eq([inx]).addClass('active').siblings().removeClass('active')
        })
      },
      PieExceed_data: function(Name,IName,LenData,SersData){//pie图
        this.$nextTick(function () {
          //基于准备好的dom，初始化echarts实例
          this.chartPie = echarts.init(document.getElementById('chartPie'));
          this.chartPie.setOption({
              title: {
                  text: Name,
                  // subtext: '纯属虚构',
                  x: 'center'
              },
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'horizontal', // 饼图数据排列方式 水平：horizontal 垂直：vertical inline-axis 子元素沿着内联坐标轴（映射到横向）
                  // block-axis  子元素沿着块坐标轴（映射到垂直）
                  // inherit box-orient 属性的值应该从父元素继承
                  bottom: 'bottom',  // 饼图数据排列位置 有 left,right,bottom,top *2
                  data: LenData
              },
              color: ['#55bfb9','#72391c','#bf7955'],
              series: [
                  {
                      name: IName,
                      type: 'pie',
                      radius: '50%',
                      center: ['50%', '50%'],
                      data: SersData,
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          });
        });
      },
      pie_right_Exceed: function(data){ // pie

        // 清空数据
        if( data != null && data != '' ){
          this.PieExceedArryA = [];
          this.PieExceedArryB = [];
          // 定义变量准备储存
          let Name = ''; // 饼图标题
          let IName = '数据详情'; // 饼图内名
          for (var i = 0; i < data.length; i++) {
            this.PieExceedArryA.push(data[i].name);
            this.PieExceedArryB.push({
              "value": data[i].value,
              "name": data[i].name
            })
          }
          //Name,IName,LenData,SersData
          this.PieExceed_data(Name,IName,this.PieExceedArryA,this.PieExceedArryB);
        }else{
          // console.log(0)
        }
        
      },
      data_Bigin: function(data){
        // this.S_value_data = data
      },
      data_End: function(val){
          var newDate = new Date();
          var chooseDate = new Date(Date.parse(val.replace(/-/g, "/")));
          var stopDateTime = new Date(Date.parse(val.replace(/-/g, '/')));
              stopDateTime.setHours(23);
              stopDateTime.setMinutes(59);
              stopDateTime.setSeconds(59);
          if(chooseDate.setHours(0,0,0,0) == newDate.setHours(0,0,0,0)){
              this.N_value_data_ed = this.formatDateTime(new Date());
          }else{
              this.N_value_data_ed = this.formatDateTime(stopDateTime);
          }
        // this.N_value_data_ed = val;
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
      formatDate:function(now) {
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var date=now.getDate();
        return year+"-"+month+"-"+date
      },
      timeFormatter(value){
          var date = new Date(value);
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+ date.getHours()+':'+date.getMinutes();
      },
      windowResize(){
        var ww = $(document).width();
        $('.content-container').width(ww - 201 );
        this.wenshiWidth = ww - 201 - 22;
        var hh = $(document).height();
        $('.content-wrapper').css({'height':hh - 90 - 32,'overflow-y':'auto'});
        $('#canvas_html_img').height(hh - 90 - 32 -70 );
        $('#chartPie').width(320);
      }
    },
    updated:function(){

      if( this.TexNull == true ){
        $('.data_Anlyera').hide();
        $('#chart_tub').empty();
        $('.hide_TF').hide();
      }else{
        $('.data_Anlyera').show();
        $('.hide_TF').show();
      }
      // console.log($('.btn_tab>button'));
      this.clickTab();
    },
    mounted: function(){
      //初始化函数
      //初始化并调用 potDateID 函数 => 通过展厅id进行数据获取
      // 监听事件 调用 => ID监听
      // console.log(this.chartOrData);
      this.potDateID(this);
      let _this = this;
      this.windowResize();
      this.$store.watch(
        function(state) {
            return state.zhantingID;
            return state.NewID;
        },
        function() {
            // _this.data_Updata();
            _this.potDateID();
            // _this.get_Instrument();
      });
      
      window.onresize = function(){  
          _this.windowResize();
      }
    },
    activated(){
      // this.value = this.$store.state.NewID;
      if(this.$store.state.NewID != '' && this.$store.state.NewID != ''){
        this.potDateID();
      }
      
    }

  }
</script>

<style type="text/css" >

.myDate input {
    height: 24px;
    text-indent: 0;
    background: #fff;
    border: 1px solid #ddd;
}
.historyFooter .footer {
  margin: 15px 0;
}
#cloneNodeDiv{
  width: 100%;
  height:100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
}
.fr{
  float: right;
}
.myLabel label {
    padding: 5px 12px 5px 10px;
}

.divInline{
  display: inline-block;
}
.el-date-editor--datetime i.el-icon-time:before{
  content:'';
}
.data_inPut_Pic{
  max-width: 160px;
}
.isHidden {
  display: none;
}
    .el-select.head_select_zt>.el-input>input,
    .el-date-editor.data_inPut_Pic>input{
      min-width: 160px;
      padding: 0;
      height: 24px;
      text-indent: 1em;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 2px;
      color: #666;
    }
    .el-date-editor.data_inPut_Pic>input{
      max-width: 165px;
    }
    .size_chat{
      width: 50%;
      display: inline-block;
      /*height: 300px;*/
    }
    .tab_Cls{
      display: none;
      height: 100%;
    }
    .tab_Cls.active{
      display: block;
    }
    .btn_tab>button{
      background: #fff;
      color: #666;
    }
    .btn_tab>button:hover{
      background: none;
      color: #666;
    }
    .btn_tab>button.active{
      background: #6fb3e0;
      color: #fff;
    }
    .padin_tab{
      padding: 20px 20px 0 0;
    }
</style>
<style scoped lang="scss">
  // @import '~scss_conm';
  //字体
  .fot_MicYH{
    font-family: Microsoft YaHei;
    font-size: 14px;
    color: #666;
  }
  .el-form--inline .el-form-item{
    margin-right:0;
  }
  .btn_cck_Query{
    margin-left: 10px;
  }
  .my_padding{
    padding:13px 11px;
    // height: 100%;
  }
  .btn_cck_1{
    color: #fff;
    border-radius: 2px;
    border: none;
    height: 24px;
    line-height: 24px;
    padding: 0;
    padding: 0 10px;
  }
  .data_Anlyera{
    border-left: 1px solid #bbb;
    border-top: 1px solid #bbb;     
    border-radius: 2px;
    margin-top: 10px;
  }
  .thd_bg{
    height: 32px;
    tr{
      height: 32px;
      background: #ececec;
      th{
        border-right: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        font-family: Microsoft YaHei;
        font-weight: 500;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .tbd_bg{
    height: 26px;
    tr{
      height: 26px;
      text-align: center;
      td{
        border-right: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        font-family: Microsoft YaHei;
        font-weight: 500;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .padin_tab>.right_pie_data{
    border: 1px solid #ddd;
    padding: 0 !important;
  }
  .head_title{
    background: -webkit-linear-gradient(#fdfdfd, #efeff0); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#fdfdfd, #efeff0); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#fdfdfd, #efeff0); /* Firefox 3.6 - 15 */
    background: linear-gradient(#fdfdfd, #efeff0); /* 标准的语法 */
    height: 42px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    line-height: 42px;
  }
  .cent_marg{
    text-align: center;
    margin: 20px 0 10px 0;
    .tab_block{
      display: inline-block;
    }
  }
  .Snid{
    height: 24px;
  }
  .from_hei{
    height: 30px;
  }
  #canvas_html_img{
    background:#fff;
  }
</style>