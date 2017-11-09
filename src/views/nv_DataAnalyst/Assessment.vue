<template>
  	<el-row :span="24" v-loading="loading" element-loading-text="加载中" class='my_padding_ass'>
	  <el-row :span="24">
	     <el-col :span='20' class="cj_data_Pic ">
		    <el-form :inline='true'>
		        <el-form-item label='采集时间：' class='myLabel'><!-- 组件 -->
		          <el-date-picker
		           :clearable='false'
		            v-model="S_value_data"
		            :type="dateType"
		            placeholder="开始时间"
		            :picker-options="S_data_Pic" 
		            class="data_inPut_Pic myDate"
		            format='yyyy-MM-dd HH:mm'
		            ref="data_Bigin">
		          </el-date-picker>
		        </el-form-item>
		        <!-- 组件 -->
		        <el-form-item label='到' class='myLabel'>
		          <el-date-picker
		           :clearable='false'
		            v-model="N_value_data"
		            :type="dateType"
		            placeholder="结束时间"
		            :picker-options="N_data_Pic" 
		            format='yyyy-MM-dd HH:mm'
		            @change='endDateTime'
		            class="data_inPut_Pic myDate"
		            ref="data_End">
		          </el-date-picker>
		          
		        </el-form-item>
		        <el-form-item>
		        	<el-button type="primary" @click="getData()" class='assessBtn'>查询</el-button>
		        </el-form-item>
	        </el-form>
	      </el-col>
	      <el-col :span="2">
	      	
	      </el-col>
	  </el-row>
	  <el-row :span="24" class="contt_tab" :gutter="20">
	  	<el-col :span="16">
	  		<el-col :span="24" class="bor_ddd">
		  	    <el-row :span="24" class="tab_title_bg" align="center">温湿度平均曲线图</el-row>
		  	    <el-row :span="24">
		  	    	<div id="chartLine1" style="width:100%; height:239px;"></div>
		  	    </el-row>
		  	    <el-row v-if="TexNull == true" style="text-align:center;color:#999">该段时间暂无数据,请重新选择时间</el-row>
		  	    <el-row :span="24">
		  	    	<div id="chartLine2" style="width:100%; height:239px;"></div>
		  	    </el-row>
		  	</el-col>
	  	</el-col>
	  	<el-col :span="8">
	  		<el-col :span="24" class="bor_ddd">
		  		<el-row :span="24" class="tab_title_bg" align="center">区域九方格温湿度平均值</el-row>
		  		<el-row :span="24">
		  			<el-row :span="24" class="center_radio">
		  				<el-radio class="radio" v-model="radio" label="1">温度</el-radio>
	  					<el-radio class="radio" v-model="radio" label="2">湿度</el-radio>
		  			</el-row>
		  			<el-row :span="24" class="Sudu_item_act active">
		  				<el-col :span="8" v-for="item in Suduku" :keyW="item.value1" class="item_cont_br">{{ item.value1 }}</el-col>
		  			</el-row>
		  			<el-row :span="24" class="Sudu_item_act">
		  				<el-col :span="8" v-for="item in Suduku" :keyW="item.value2" class="item_cont_br">{{ item.value2 }}</el-col>
		  			</el-row>
		  			<el-row :span="24" class="Yield_sixe">
		  				<el-col :span="12">指标</el-col>
		  				<el-col :span="12">合格率</el-col>
		  			</el-row>
		  			<el-row :span="24" v-model="YIELD_data" class="data_model_Yi">
		  				<el-row :span="24" class="Tmp_Huid">
		  					<el-col :span="12">温度</el-col>
		  					<el-col :span="12">{{ YIELD_data[0].value1 }}</el-col>
		  				</el-row>
		  				<el-row :span="24" class="Tmp_Huid">
		  					<el-col :span="12">湿度</el-col>
		  					<el-col :span="12">{{ YIELD_data[0].value2 }}</el-col>
		  				</el-row>
		  			</el-row>
		  		</el-row>
		  	</el-col>
	  	</el-col>
	  </el-row>
	  <el-row :span="24" class="magn_tp">
	  	<el-table
		    :data="tab_buttom_data"
		    border
		    height="200"
		    style="width: 100%">
		    <el-table-column
		      prop="name"
		      label="仪器名称">
		    </el-table-column>
		    <el-table-column
		      prop="Tmp_data_Max"
		      label="Max温度(°C)">
		    </el-table-column>
		    <el-table-column
		      prop="Tmp_data_Min"
		      label="Min温度(°C)">
		    </el-table-column>
		    <el-table-column
		      prop="Vaio_data_Tmp"
		      label="平均温度(°C)">
		    </el-table-column>
		    <el-table-column
		      prop="wave_data_Tmp" 
		      label="温度波动">
		    </el-table-column>
		    <el-table-column
		      prop="Huid_data_Max"
		      label="Max湿度(%RH)">
		    </el-table-column>
		    <el-table-column
		      prop="Huid_data_Min"
		      label="Min湿度(%RH)">
		    </el-table-column>
		    <el-table-column
		      prop="Vod_data_Huid"
		      label="平均湿度(%RH)">
		    </el-table-column>
		    <el-table-column
		      prop="Wave_data_Huid"
		      label="湿度波动">
		    </el-table-column>
	  	</el-table>
	  </el-row>
	</el-row>
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
  import qs from 'qs'
  import { BenchmarkStatistics,SudukuMean,YIELD,Wave } from '../../api/api'
	export default{
		data(){
			return{
				loading: false,
				TexNull: true,
				S_value_data: new Date(today - oneday * 7),  //  开始查询的时间
				N_value_data: new Date(),   //  结束查询的时间
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
        		radio: '1', //选择温湿度
        		Suduku: [], // 九宫格
        		zhantingID : '', // 储存id值
        		tab_buttom_data: [], //数据分析概览    name Tmp_data_Max  Tmp_data_Min Vaio_data_Tmp wave_data_Tmp Huid_data_Max Huid_data_Min Vod_data_Huid Wave_data_Huid
        		YIELD_data: [{
        			"value1": '',
        			"value2": ''
        		}], //合格率
        		lineStyleWidth: '1.5'  //曲线图的线条宽度  可小数 

			}
		},
		props: ['dateType'],
		methods: {
			getData: function(){
				if(this.$route.path == '/assessment'){
					// console.log(new Date(this.S_value_data).getTime() > new Date(this.N_value_data).getTime())
					if(new Date(this.S_value_data).getTime() > new Date(this.N_value_data).getTime() || this.S_value_data == '' || this.N_value_data == '' || this.S_value_data == undefined || this.N_value_data == undefined){
			            this.$message({
			                  type:'warning',
			                  message:'请正确选择日期!!!'
			              })
			        }else{
						// 添加加载事件
						this.loading = true;
						if( this.S_value_data != '' && this.N_value_data != '' ){
							this.potDate = {
								'groupID': this.zhantingID,
					            'beginTime': this.timeFormatter(this.S_value_data),
					            'endTime': this.timeFormatter(this.N_value_data)
					          };
					        BenchmarkStatistics(this.potDate).then( data => {
					        	console.log(data)
					        	this.DataLoading(data);
					        });
					        SudukuMean(this.potDate).then( data => {
					        	// console.log(data)
					        	this.Suduku_UpData(data);
					        });
					        YIELD(this.potDate).then( data => { 
					        	// console.log(data)
					        	this.YiEld_UpData(data);
					        });
					        Wave(this.potDate).then( data => {
					        	console.log(data)
					        	this.Wear_UpData(data);
					        });
						}else{
							// alert(1)  数据选择不完整 弹出实例窗口
				          	this.open_Warning();
				          	this.loading = false;
						}
					}
				}
			},
			Suduku_UpData: function(data){
				// console.log(data);
				this.Suduku = [];
				for (var i = 0; i < data.length; i++) {
					this.Suduku.push({
						"value1": data[i][0],
						"value2": data[i][1]
					})
				}
			},
			YiEld_UpData: function(data){
				// console.log(data);
				let temprate = ((1.0 - (1.0 * parseFloat(data[1]) / parseFloat(data[0]))).toFixed(4) * 100).toFixed(2) + '%'; 
            	let humirate = ((1.0 - (1.0 * parseFloat(data[2]) / parseFloat(data[0]))).toFixed(4) * 100).toFixed(2) + '%';
            	// console.log(temprate,humirate)
            	this.YIELD_data = [];
            	this.YIELD_data.push({
            		"value1": temprate,
            		"value2": humirate
            	})
			},
			Wear_UpData: function(data){
				//   name Tmp_data_Max  Tmp_data_Min Vaio_data_Tmp wave_data_Tmp Huid_data_Max Huid_data_Min Vod_data_Huid Wave_data_Huid
				// console.log(data);
				if( data != '' ){
					data = data.sort(function(a, b){  // 按名字排序							
						return (a[0]).localeCompare(b[0], 'zh-Hans-CN', {sensitivity: 'accent'});
					});
					this.tab_buttom_data = [];
					for (var i = 0; i < data.length; i++) {
						this.tab_buttom_data.push({
							"name": data[i][0],
							"Tmp_data_Max": data[i][1],
							"Tmp_data_Min":data[i][2],
							"Vaio_data_Tmp":data[i][3],
							"wave_data_Tmp":data[i][7],
							"Huid_data_Max":data[i][4],
							"Huid_data_Min":data[i][5],
							"Vod_data_Huid":data[i][6],
							"Wave_data_Huid":data[i][8]
						})
					}
					this.loading = false; 
					// console.log(this.tab_buttom_data)
				}else{
					this.loading = false; 
          			// this.alertMasg('该段时间无数据,请重新选择!','warning');
				}
			},
		 	DataLoading: function(data){
		 		// console.log(data);
		 		if( data != '' ){
		 			this.TexNull = false;
		 			let CarrayArrayTemp = [],
	 					DataTime = [],
	 					CarrayArrayHuid = [];
		 			for (var i = 0; i < data.length; i++) {
		 				CarrayArrayTemp.push(data[i].Temperature);
		 				DataTime.push(data[i].MyTime);
		 				CarrayArrayHuid.push(data[i].Humidity);
		 			}
		 			// console.log(CarrayArrayTemp,DataTime,CarrayArrayHuid);
		 			let minData1 = Math.min.apply(null, CarrayArrayTemp);
		 			let maxData1 = Math.max.apply(null, CarrayArrayTemp);
		 			this.CartUpData('chartLine1','温度',DataTime,'温度',CarrayArrayTemp,'','°C',minData1,maxData1,'80%');
		 			let minData2 = Math.min.apply(null, CarrayArrayHuid);
		 			let maxData2 = Math.max.apply(null, CarrayArrayHuid);
		 			this.CartUpData('chartLine2','湿度',DataTime,'湿度',CarrayArrayHuid,'','%RH',minData2,maxData2,'150%');
		 			this.loading = false; 
		 			echarts.connect('groupAsse');
		 		}else{
		 			this.TexNull = true;
		 			this.loading = false; 
          			// this.alertMasg('该段时间无数据,请重新选择!','warning');
          			this.tab_buttom_data = []; //  清空
          			$("#chartLine1").empty();
          			$("#chartLine2").empty();
		 		}
		 		
		 	},
			open_Warning: function(){ // 弹窗1
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
	      	alertMasg: function(msg,type_msg){  //弹窗2
		        this.$message({
		          showClose: true,
		          message: msg,
		          type: type_msg
		        });
		      },
			potDateID: (_this) => {// 可定义成全局函数
		        // 获取展厅的id
		        _this.zhantingID = _this.$store.state.zhantingID;
		    },
	      CartUpData: function( Id,name,xData,Name,SerData,xAxis_Name,yAxis_Name,min,max,brele){
	      	this.chartLine = echarts.init(document.getElementById(Id));
	        this.chartLine.setOption({
                title: {
                    // text: 'Line Chart'
                },
                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
			        show: false,
			        left: brele,
			        itemSize:25,
			        width:'20%',
			        feature: {
			            dataZoom: {
			                yAxisIndex: 'none'
			            },
			            // dataView: {readOnly: false},
			            // magicType: {type: ['line', 'bar']},
			            restore: {},
			            saveAsImage: {show:false, name: '综合评估-温湿度平均值-'+ name}
			        }
			    },
			    dataZoom: [
		            {
		                type: 'slider',
		                show: false,
		                start: 0,
		                end: 100,
		                handleSize: 8,
		                height: '0%',
		                bottom: '0%',
		                showDetail:false
		            },
		        ],
                legend: {
                    data: [name]
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                color:['#438eb9'],
            	xAxis: {
	                type: 'category',
	                boundaryGap: true,
	                name: xAxis_Name,
	                nameTextStyle: {
	                  color: '#666',
	                  fontStyle: '黑体'
	                },
	                axisLine:{
	                  lineStyle:{
	                    color: '#666',
	                    edgeSymbol:'arrow',
	                    linkSymbol: 'arrow'
	                  }
	                },
	                data: xData.map(function (str) {return str.replace(' ', '\n')})
	            },
	            yAxis: {
	                type: 'value',
	                show: 'true',
	                name: yAxis_Name,
	                max: max,
	                min: min
	            },
                series: [
                    {
                        name: name,
                        type: 'line',
                        stack: Name,
                        symbol:'none',
                        data: SerData,
                        lineStyle:{normal:{width: this.lineStyleWidth}}
                    }
                ]
            });
            this.chartLine.group = 'groupAsse'
	      },
	      Click_tab:function(){
	      	// console.log($('.radio'))
	      	$('.radio').on('click',function(){
	      		let inx = $(this).index();
	      		// $(this).addClass('active').siblings().removeClass('active');
	      		$('.Sudu_item_act').eq(inx).addClass('active').siblings().removeClass('active');
	      	})
	      },
	      timeFormatter(value){
			var date = new Date(value);
			// console.log(value);
			// console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '+ date.getHours()+':'+date.getMinutes());
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '+ date.getHours()+':'+date.getMinutes();
		  },
		  windowResize(){
		      var ww = $(document).width();
		      $('.content-container').width(ww - 201);
		      var hh = $(document).height();
		      // console.log(hh);
		      $('.content-wrapper').height(hh - 90 - 32);
		   },
		   endDateTime(val){
		   		var newDate = new Date();
                var chooseDate = new Date(Date.parse(val.replace(/-/g, "/")));
                var stopDateTime = new Date(Date.parse(val.replace(/-/g, '/')));
                    stopDateTime.setHours(23);
                    stopDateTime.setMinutes(59);
                    stopDateTime.setSeconds(59);
                if(chooseDate.getDate() == newDate.getDate()){
                    this.N_value_data = this.formatDateTime(new Date());
                }else{
                    this.N_value_data = this.formatDateTime(stopDateTime);
                }
		   		// this.N_value_data = val;
		   },
		   formatDateTime(val){
				var date = new Date(val);
				// console.log(date);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0'+m : m;
				var d = date.getDate();
				d = d < 10 ? ('0'+ d) : d;
				var h = date.getHours();
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0'+minute) : minute;
				// console.log(y +  '-' + m + '-'+d+ ' '+ h + ":"+minute);
				return y +  '/' + m + '/'+d+ ' '+ h + ":"+minute;
			},

		},
		mounted: function(){

			this.potDateID(this);
			this.getData();
			this.Click_tab();
			this.windowResize();
			let _this = this;
			
				
            window.onresize = function(){  
               _this.windowResize();
                
            };
            this.$store.watch(
	          function(state){
	            return state.zhantingID;
	          },function(){
	            _this.potDateID(_this);
	            _this.getData();
	          },{
	            deep:true
	        })
		}
	}
</script>
<style scoped lang="scss">
.my_padding_ass{
	padding:16px 11px 0 11px;
}
.cj_data_Pic .el-form .el-form-item{
	margin-bottom: 0px;
}
.assessBtn{
	margin-left: 10px;
}
.myLabel label {
    padding: 5px 12px 5px 10px;
}
.data_inPut_Pic{
  max-width: 165px;
}
	.contt_tab{
		margin-top: 20px;
		.bor_ddd{
			border: 1px solid #ddd;
			padding: 0 !important;
			.tab_title_bg{
			    background: -webkit-linear-gradient(#fdfdfd, #efeff0); /* Safari 5.1 - 6.0 */
			    background: -o-linear-gradient(#fdfdfd, #efeff0); /* Opera 11.1 - 12.0 */
			    background: -moz-linear-gradient(#fdfdfd, #efeff0); /* Firefox 3.6 - 15 */
			    background: linear-gradient(#fdfdfd, #efeff0); /* 标准的语法 */
			    height: 42px;
			    border-bottom: 1px solid #ddd;
			    line-height:42px;
			    text-align:center;
			    font-family: 黑体;
			}
		}
	}
	.magn_tp{
		margin-top:20px;
	}
	.center_radio{
		text-align:center;
		height: 66px;
		line-height: 66px;
	}
	.Sudu_item_act{
		display: none;
		.item_cont_br{
			height: 68px;
			border-top: 1px solid #ddd;
			border-right: 1px solid #ddd;
			line-height: 68px;
			text-align: center;
		}
		.item_cont_br:nth-child(3n){
			border-right: none;
		}
	}
	.Sudu_item_act.active{
		display:block;
	}
	.Yield_sixe{
		height: 35px;
		text-align: center;
		border-top: 1px solid #ddd;
		line-height: 35px;
	}
	.data_model_Yi{
		border-top: 1px solid #ddd;
		height: 173px;
	}
	.Tmp_Huid{
		height: 73px;
		line-height: 73px;
		text-align:center;
	}
</style>
