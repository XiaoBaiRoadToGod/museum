<template>
<el-row  v-loading="loading" element-loading-text="加载中" class='myPadding'>
	<el-col :span='24' class='MeanValueTop'>
		<el-form :inline='true'>
			<el-form-item label='查询时间:' class='myLabel'>
                <el-date-picker :clearable='false' v-model='startDate' type='date' class='myDate' @change='formatDate' format='yyyy-MM-dd HH:mm' :picker-options='pickerOptions0' placeholder="开始时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label='到:' class='myLabel'>
                <el-date-picker :clearable='false' v-model='endDate' type='date' class='myDate' @change='formatDate1' format='yyyy-MM-dd HH:mm' :picker-options='pickerOptions1' placeholder="结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='queryWarningData'>查询</el-button>
                <!-- <el-button>导出数据</el-button> -->
            </el-form-item>
            
            <div class='goBack' @click='$router.back(-1)'></div>
            
		</el-form>
	</el-col>
	<el-col :span='24' class='MeanValueTableCont'>
		
		<template>
            <table border='0' width="100%" cellpadding="0" cellspacing="0" class="data_Anlyera">
              <thead class="thd_bg">
                <tr>
                  <th width="12%">{{ Anlyera_tab_had[0].channelNum }}个测量通道</th>
                  <th width="12%">{{ Anlyera_tab_had[0].count }}条记录</th>
                  <th width="12%">开始时间</th>
                  <th colspan="2">{{ Anlyera_tab_had[0].beginTime }}</th>
                  <th width="12%">结束时间</th>
                  <th colspan="2">{{ Anlyera_tab_had[0].endTime }}</th>
                </tr>
              </thead>
              <tbody v-for="Datas of DataAnalyzer" class="tbd_bg" :key="Datas.Analyzer">
                <tr>
                  <td>{{ Datas.Analyzer }}</td>
                  <td>{{ Datas.record }}</td>
                  <td>{{ Datas.S_data }}</td>
                  <td>{{ Datas.S_datas_1 }}</td>
                  <td>{{ Datas.S_datas_2 }}</td>
                  <td>{{ Datas.S_datas_3 }}</td>
                  <!-- <td>{{ Datas.N_data }}</td> -->
                  <!-- <td>{{ Datas.N_datas_1 }}</td> -->
                  <td>{{ Datas.N_datas_2 }}</td>
                  <td>{{ Datas.N_datas_3 }}</td>
                </tr>
              </tbody>
            </table>
      	</template>
					
	</el-col>
	<el-col :span='24'>
		<el-col :span='24' v-for=' (idx,item) of galleryNum ' :key='item' v-if='galleryNum <= 2' :name='idx' :id='"meanChart" + idx' style='height:300px'>
			
		</el-col>
		<el-col :span='12' v-for=' (idx,item) of galleryNum ' :key='item' v-if='galleryNum > 2' :name='idx' :id='"meanChart" + idx' style='height:300px'>
			
		</el-col>
	</el-col>
</el-row>
</template>
<script>
var today = new Date();
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
var oneday = 1000 * 60 * 60 * 24;
import { TabMulti, GetMeanValue } from '../../../api/api'
import echarts from '../../../../static/js/echarts';
	export default {
		data(){
			return {
				snArr:'',
				startDate: new Date(today - oneday * 7),  // 开始时间
				endDate: new Date(),          // 结束时间
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
                tableData: [],
                Anlyera_tab_had:[{
		          "channelNum":'',
		          "count": '',
		          "beginTime": '',
		          "endTime": ''
		        }],
		        DataAnalyzer:[],
		        loading:false,
		        galleryNum: null,    // 通道数量
		        chartLine:null
			}
		},
		methods:{
			queryWarningData(){
				var params = {  //  传到后台的必须参数
			            'beginTime': this.timeFormatter(this.startDate),
			            'endTime': this.timeFormatter(this.endDate),
			            'sn': this.snArr
		          	};
		          	// console.log(params);
		          	TabMulti(params).then( data => { // 表格数据
		          		// console.log(data);
		          		this.addTab_data(data);
		          	});
		          	this.getMeanQuxian();
			},
			addTab_data(data){
				 if( data != null && data != '' ){
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
		          // this.TDArray = [];
		          for(let i = 1 ; i < data.length ; i++){
		            // this.TDArray.push('通道-0'+ i);
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
        			// console.log('数据为空');
		          	// this.hidd_show_boxL_true();
		          	this.loading = false; 
		          	// this.alertMasg('该段时间无数据,请重新选择!','warning');
		        }
			},
			getMeanQuxian(){
				if(this.snArr !== '' && this.snArr !== null){
					this.loading = true;

					var params = {
						beginTime:this.timeFormatter(this.startDate),
						endTime: this.timeFormatter(this.endDate),
						Usn: this.snArr
					}
					// console.log(params);
					// console.log(params)
					GetMeanValue(params).then(res => {
						this.loading = false;
						console.log(res);
						if(res.length == 0 ){
							this.$message({
								type:'warning',
								message:'暂无平均值数据'
							})
							
						}else{
							this.galleryNum = res[0].LOGGER_CHNUM;
							console.log(this.galleryNum);
							this.formatMeanData(res);
						}
					})
				}else{
					this.$message({
						type:'warning',
						message:'请重新选择分组！'
					})
				}
			},
			formatMeanData(data){
				var galleryOne=[],  // 一通道数据
					galleryTow=[],  // 二通道
					galleryThree=[],  // 三通道
					galleryFour=[], // 四通道
					devType = [],    // 通道类型
					devUnit = [],  //  通道的单位
					galleryDate = [], // 时间
					galleryData = [];
				
					 
				
				devType.push(data[0].Ch1Name||null,data[0].Ch2Name||null,data[0].Ch3Name||null,data[0].Ch4Name||null);
				devUnit.push(data[0].Ch1Unit||null,data[0].Ch2Unit||null,data[0].Ch3Unit||null,data[0].Ch4Unit||null);
				for(var i = 0; i< data.length;i++){

					galleryOne.push(data[i].Ch1);
					galleryTow.push(data[i].Ch2);
					galleryThree.push(data[i].Ch3);
					galleryFour.push(data[i].Ch4);
					galleryDate.push(data[i].MyTime);
				}
				galleryData.push(galleryOne, galleryTow, galleryThree, galleryFour)
				// console.log(galleryData.length);
				var buler = '';
				for(var i = 0; i < this.galleryNum; i++){
					// console.log(galleryData[i]);
					if(i == 0){
						buler = '80%';
					}else{
						buler = '150%';
					}
					this.dragCharts(i, galleryData[i], galleryDate, buler, devType[i], devUnit[i]);
				}
				
			},
			dragCharts(i, data, date, buler, type, unit){
				// console.log(i);
				this.$nextTick(function () {
					// console.log(document.getElementById('meanChart'+ (i+1)));
					this.chartLine = echarts.init(document.getElementById('meanChart'+ (i+1)));
					// console.log(data);
					this.chartLine.setOption({
	                    title: {
	                        text:null,
	                        subtext: type+'平均值',
	                        left:'45%',
	                        textStyle:{
	                        	fontSize: 18,
	                        	color: '#666'
	                        },
	                        subtextStyle: {
	                            color:'#333'
	                        }
	                    },
	                    tooltip:{
	                        trigger: 'axis',
	                        formatter: '{b} <br/> '+type+'  :{c}'+ unit
	                    },
	                    toolbox: {
	                        left:buler,
				            top: '1%',
				            orient: 'horizontal',
				            itemSize:25,
				            width:'20%',
				            show: false,
				            feature: {
				                dataZoom: {
				                    yAxisIndex: 'none'
				                },
				                restore: {},
				                saveAsImage: {show:false}
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
	                        data: date
	                    },
	                    yAxis: {
	                      type: 'value',
	                      show: 'true',
	                      splitLine: {
	                        show: true
	                      }
	                      
	                    },
	                    series: [
	                      {
	                          name: '111',
	                          type: 'line',
	                          symbol:'none',
	                          // lineStyle:{normal:{width: this.lineStyleWidth}},
	                          data: data
	                      }
	                    ]
	                }, true);
	                this.chartLine.group = "groupMena";
	                echarts.connect('groupMena');
				});
			},
			formatDate(date) {
                // this.startDate = date;
            },
            formatDate1(val) {
                var newDate = new Date();
                var chooseDate = new Date(Date.parse(val.replace(/-/g, "/")));
                var stopDateTime = new Date(Date.parse(val.replace(/-/g, '/')));
                    stopDateTime.setHours(23);
                    stopDateTime.setMinutes(59);
                    stopDateTime.setSeconds(59);
                if(chooseDate.getDate() == newDate.getDate()){
                    this.endDate = this.formatDateTime(new Date());
                }else{
                    this.endDate = this.formatDateTime(stopDateTime);
                }
                // this.endDate = val;
            },
            formatDateTime(val){
                var date = new Date(val);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? '0'+m : m;
                var d = date.getDate();
                d = d < 10 ? ('0'+ d) : d;
                var h = date.getHours();
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0'+minute) : minute;
                return y +  '/' + m + '/'+d+ ' '+ h + ":"+minute;
            },
            timeFormatter(value){
                var date = new Date(value);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+ ' '+ date.getHours()+':'+date.getMinutes();
            }
		},
		mounted(){
			// this.queryWarningData();
			// this.getMeanQuxian();
		},
		activated(){
			// console.log(this.$store.state.NewID);
			// console.log(this.$store.state.startDate);
			this.snArr = this.$store.state.NewID;
			// console.log(this.snArr);
			this.startDate = this.$store.state.startDate == null ? this.formatDateTime(this.startDate):this.formatDateTime(this.$store.state.startDate);
			this.endDate = this.$store.state.endDate == null ? this.formatDateTime(this.endDate) : this.formatDateTime(this.$store.state.endDate);
			this.$store.state.NewID = null;
			this.queryWarningData();
			// this.getMeanQuxian();
		}
	}
</script>

<style scoped lang='scss'>
 .goBack{
  		width: 30px;
  		height:30px;
  		float: right;
  		margin-right: 20px;
  		background: url('../../../../static/img/icon.png') no-repeat;
        background-position: -19px -767px;
        cursor: pointer;
  }
.myPadding{
	padding: 0 20px 20px 20px;
}
	.MeanValueTop{
		margin-top: 20px;
	}
	//  表格样式
.data_Anlyera{
    border-left: 1px solid #bbb;
    border-top: 1px solid #bbb;     
    border-radius: 2px;
    // margin-top: 20px;
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
</style>