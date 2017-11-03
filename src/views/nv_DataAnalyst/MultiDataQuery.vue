<template>
	<el-row v-loading="loading" element-loading-text="加载中" style='height:100%;'>
		<el-col :span="24" class="btn_pad">
			<el-button type="primary" class='btn_Search_all' @click='chooseReference'><i class='chooseConsult el-icon--left'></i>{{ chooseReferences }}</el-button>
			<el-button type="primary" icon="search" @click="AddDataQuery" class="btn_Search_all">查询多组数据</el-button>
			<el-button @click="outDataMultiAll" class="btn_Search_all">导出数据</el-button>
			<el-button @click="html2CanvasMultiAll" class="btn_Search_all">导出图片</el-button>
			<div class='goBack' @click='$router.back(-1)'></div>
		</el-col>
		<el-col id="canvas_html_img" :span="24">
			<el-col :span="24" v-if="showhied_TF == true">
				<section class="null_data">暂无数据！ 请重新选择仪器或者时间段！</section>
			</el-col> 
			<el-col :span="24" class="hid_content active">
				<el-row class="box_pad_min">
					<el-col :span="24">
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
				              <tbody v-for="Datas in DataAnalyzer" class="tbd_bg" :key="Datas.Analyzer">
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
					</el-col>
				</el-row>
				<el-row class="box_pad_min"  :class='{isHide: !channelHide}'>
					<el-col :span="24">
						<el-col :span="22">
							<el-col :span='24' v-if="MaxDataChatLine <= 2" v-for="(inx,chat) in MaxDataChatLine" :name="inx" :class="'Chart' + inx" :id="'Chart' + inx" style="height:280px;"  :key="chat" :style='{width:twoChannelWidth}'>
									<!-- <p>chat{{inx}}{{chat}}</p> -->
							</el-col>
							<el-col :span='12' v-if="MaxDataChatLine > 2"  v-for="(inx,chat) in MaxDataChatLine" :name="inx" :class="'Chart' + inx" :id="'Chart' + inx" style="height:280px;display:inline-block"  :key="chat" :style='{width:threeChannelWidth}'>
								<!-- <p>chat{{inx}}{{chat}}</p> -->
							</el-col>
						</el-col>
						<el-col :span="2" class="box_pad_max_h">
							<section v-for="(inx,colr) in ChartLineColorNumber" class="overText">
								<span class="box_size" :style="{background: ChartLineColor[colr]}"></span><span class="font_size_min">{{ ChartLineColorName[colr] }}</span>
							</section>
						</el-col>
					</el-col>
				</el-row>
				<el-row :class='{isHide: channelHide}'>
					<el-col :span='24' id='humitureData' style='height:560px;' :style='{width: humitureWidth}'>
						
					</el-col>
					
				</el-row>
				
			</el-col>

			<el-col :span='24' class='footer' v-if='tabShow'>
				<el-button type="primary" :class='{active:channelHide}' @click='singleChannel()'>单通道数据综合</el-button >
				<el-button type="primary" :class='{active: !channelHide}' @click='dbChanel()'>温湿度数据综合</el-button>
			</el-col>
			
		</el-col>
		<section class='chooseCont' v-if='chooseContShow'>
			<section class='myRadioBox'>
				<section class='header'>
					选择参考设备
					<section class="fr_t" @click="CanCel">
			        	<i class="el-icon-close"></i>
			        </section>
				</section>
				<section class='contenanier' >
					<el-radio-group v-model='chooseSheBei'  size='small' @change='changeChooseShebei'>
						<el-tooltip v-for='item of AssFied' effect='dark' :content='item.value' placement='right'>
							<el-radio  :label='item.label'>{{ item.value }}</el-radio>
						</el-tooltip>
						
					</el-radio-group>
				</section>
				<section class='footer'>
					<el-button @click='setReference'>确定</el-button>
					<el-button @click='ReferenceEmpty'>清空</el-button>
				</section>
			</section>
		</section>
		<section class="fixed_pos_dadaMuilt">
			<section class="poa_abx">
				<!-- <h2><i class="el-icon-warning"></i>请选择仪器和时间进行查询(最多可选择10个仪器对比)</h2> -->
				<section class="pad_Search">
					<el-checkbox class='checkAll' :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" size='12'>全选</el-checkbox>
					<template><!-- 组件 -->
			          <span class="fot_MicYH">采集时间：</span>
			          <el-date-picker
			            v-model="S_value_data"
			            :clearable='false'
			            :type="dateType"
			            placeholder="开始时间"
			            :picker-options="S_data_Pic" 
			            class="data_inPut_Pic duo myDate"
			            format='yyyy-MM-dd HH:mm'
			            @change="data_Bigin">
			          </el-date-picker>
			        </template>
			        <!-- 组件 -->
			        <template>
			          <span class="fot_MicYH">到</span>
			          <el-date-picker
			            v-model="N_value_data"
			            :clearable='false'
			            :type="dateType"
			            placeholder="结束时间"
			            :picker-options="N_data_Pic" 
			            class="data_inPut_Pic duo myDate"
			            format='yyyy-MM-dd HH:mm'
			            @change="data_End">
			          </el-date-picker>
			        </template>
			        <section class="fr_t" @click="CanCel">
			        	<i class="el-icon-close"></i>
			        </section>
				</section>
				<section class="box_Checked">
					<el-checkbox-group 
					    v-model="checkedProduct"
					    :min="0"
					    :max="20" class="pad_Checked" @change="CheckedArray">
					    <el-checkbox v-for="AssF in AssFied" :label="AssF.label" :key="AssF.value"  class="wid_Checked">{{AssF.value}}</el-checkbox>
					  </el-checkbox-group>
				</section>
				<section class="TrueSelect">
					<el-button @click="get_Data_Instrument" class="TrueSelect_true">确定</el-button>
					<el-button @click="ClearChecked"  class="TrueSelect_clear">清空全部</el-button>
				</section>
			</section>
		</section>
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
  import shine from '../../../static/js/shine.js'
  import html2canvas from 'html2canvas'
  import qs from 'qs'
  import { Data_Instrument,MultiData,TabMulti,multiDataOutExl } from '../../api/api'
  
  // Vue.prototype.$echarts = echarts 
 
	export default {
		data(){
			return {
				OFdataloading: false, // 定义默认加载事件
				potDate: null,  // 传到后台的数据
				S_value_data: new Date(today - oneday * 7),  // 开始时间
				loading: false,   // 定义预加载
				S_data_Pic: {
					disabledDate(time) {
	            		return time.getTime() > Date.now();
	          		}
	          	},
				N_value_data: new Date(), // 结束时间 
				N_data_Pic: {
					disabledDate(time) {
	            		return time.getTime() > Date.now();
	          		}
	          	},
				checkedProduct: [],  // 默认选择的
				checkedSn: [], 
				AssFied: [],   // 全部
				AssFiedSn:[],   // 全部的sn
				// 通道数据
		        Anlyera_tab_had:[{
		          "channelNum":'',
		          "count": '',
		          "beginTime": '',
		          "endTime": ''
		        }],
		        DataAnalyzer:[],
		        isIdentical: false,   // 是否补数据
				MaxDataChatLine: '',  // 通过将获取过来的值整理取出最大值来创建 chart 图表 => 个数问题
				ChartLineColor: ['#336699','#77aa22','#776611','#ffdd44','#48bbef','#6d51eb','#f14562','#32beb2','#e911fc','#32beb2','#36f7a7','#03d723','#a4f736','#f7ea36','#f79736','#f76d36','#b06a00','#96b000','#00b00f','#00ffea','#a877da','#e911fc','#f873d9','#e7687d','#7596f8'],   //chart图表的颜色待选值
				ChartLineColorNumber: '',  // 通过个数从而遍历出颜色表
				ChartLineColorName: [],     // 颜色表所对应的仪器名称
				showhied_TF: true,
				lineStyleWidth: '1',      // 设置曲线图的线条粗细
				shebeiArr:null,            // 选择的设备sn
				checkAll:false,             // 全选
				isIndeterminate:true,
				tabShow:false,              // 温湿度与单通道切换按钮显示隐藏
				channelHide:true,            // 单通道与温湿度曲线图显示隐藏
				humitureWidth:'',
				twoChannelWidth:'',
				threeChannelWidth:'',
				turehumiColor:['#ebff0e', '#841bc1', '#6bff00', '#d013ae', '#22daa0','#e35a2a','#a7db61','#a60289','#fbbf56','#655ed3','#22abda','#b2640c','#d31145','#0ab242','#95b20b','#c359e8','#f5b508','#0285c5','#e86487','#4e1ec0'],     // 温湿度颜色
				chooseReferences: '选择参考设备',  //选择按钮显示的文字
				chooseSheBei: null,                 // 选择的设备
				chooseSheBeiSn: null,                // 选择的设备sn
				chooseSheBeiVerId: null,             // 选择的设备的verid  用于判断是否为同一类型 
				chooseContShow: false,               // true为显示选择参考设备的容器
				chooseReferenceData: [],             // 存放选择参考设备的数据
			}
		},
		props: ['dateType'],
		methods: {
			singleChannel(){
				this.channelHide = true;
			},
			dbChanel(){
				this.channelHide = false; 
			},
			breakpoint(arr){
				var arr = arr;
				for(var m = 0; m < arr.length; m++ ){
              		var item = arr[m];
              		
              		if(item == '-'){
              			continue;
              		} else {
              			// 找下一个有数据点
              			for(var s = m + 1; s< arr.length; s++){
              				if(arr[s] != '-'){
              					var next = parseFloat(arr[s]);
              					// console.log(next);
              					for(var w = m+1; w < s; w++){
              						// console.log(item)
              						// console.log(item == 'NaN');
              						arr[w] = Number((next - item)/(s - m)*(w - m) + parseFloat(item));
              						// console.log(parseFloat((next - item)/(s - m)*(w - m)))
              					}
              					 m = s;
              					 m--;
              					 break;
              				}
              				
              			}
              		}
              	}
              	return arr;
			},
			chooseReference(){  // 选择参考设备
				this.chooseContShow = !this.chooseContShow;
			},
			changeChooseShebei(value){
				console.log(value);
				this.chooseSheBei = value;
			},
			setReference(){   // 选择参考设备的确定事件
				for (var i = 0; i < this.AssFied.length; i++) {
					if(this.chooseSheBei == this.AssFied[i].label){
						this.chooseReferences = this.AssFied[i].value;
					}
				};
				this.chooseContShow = false;  // 关闭弹窗
				let veridSn = this.chooseSheBei;
				this.chooseSheBeiSn = this.analysisSn(veridSn).sn;
				this.chooseSheBeiVerId = this.analysisSn(veridSn).verId;
				console.log('sn--- '+this.chooseSheBeiSn+"---verid--"+this.chooseSheBeiVerId)
				// this.chooseReferences = this.chooseSheBei;
				
			},
			ReferenceEmpty(){    // 选择参考设备的清空事件
				this.chooseReferenceData = [];    // 清空选择的设备数据
				this.chooseReferences = '选择参考设备';
				this.chooseSheBei = null;   // 清空
				this.chooseSheBeiSn = null;   // 清空
				this.chooseSheBeiVerId = null;   // verid清空
				this.chooseContShow = false; // 关闭弹窗
			},
			humitureChart(data){
				// console.log(JSON.stringify(data));
				var dataTime = [];  //时间
				var sigleName = '';
				var sigleUnit = '';
				var tempData = [];  // 温度数据
				var humiData = [];  // 湿度数据
				var loggerName = []; // 设备名字通道
				var tempMax,tempMin,humiMax,humiMin;  // 温湿度的最大值最小值
				for(var i = 0; i < data.length; i++){
					var time = [],temp =[], humi = [];
					var dataLen = data[i].data.length;
					for(var j = 0; j < dataLen; j++){
						time.push(data[i].data[j].ITime);
						if( data[0].ChannelNum == 1){
							sigleName = data[i].Ch1Name;
							sigleUnit = data[i].Ch1Unit;
							temp.push(data[i].data[j].Ch1);
						} else {
							temp.push(data[i].data[j].Ch1);
							humi.push(data[i].data[j].Ch2);
						}
						
						
					}
					
					loggerName.push(data[i].IName);
					dataTime = time;
					if(this.isIdentical){
						tempData.push(this.breakpoint(temp));
						humiData.push(this.breakpoint(humi));
					}else{
						tempData.push(temp);
						humiData.push(humi);
					}
					
				}
				console.log(tempData);
				console.log(humiData);
				
				// console.log(dataTime);
				var chartData = [];
				var tempAll = [],humiAll = [];
				for(var k = 0; k<tempData.length;k++){
					if( data[0].ChannelNum == 1 ){
						chartData.push({
							name: loggerName[k] + '-' + sigleName,
							type:'line',
							symbol:'none',
							lineStyle:{
								normal:{width:1.5}
							},
							data:tempData[k]
						});
						tempAll = tempAll.concat(tempData[k]);
					} else {
						chartData.push({
							name: loggerName[k] + '-温度',
							type:'line',
							symbol:'none',
							lineStyle:{
								normal:{width:1.5}
							},
							data:tempData[k]
						});
						// console.log(tempData[k])
						tempAll = tempAll.concat(tempData[k]);
						chartData.push({
							name: loggerName[k] +'-湿度',
							type: 'line',
							symbol: 'none',
							yAxisIndex: 1,
							lineStyle:{
								normal:{ width: this.lineStyleWidth }
							},
							data: humiData[k]
						});
						humiAll = humiAll.concat(humiData[k]);
					}
					
				}
				// 温度最大最小值
				tempMax = this.integerMax(Math.ceil(this.arrayMax(tempAll)));
				tempMax = 40;
				tempMin = this.integerMin(Math.floor(this.arrayMin(tempAll)));
				// console.log(tempMin +'---tempMin');
				tempMin = tempMin == undefined ? 0 : tempMin;
				// 湿度最大最小值
				humiMax = this.integerMax(Math.ceil(this.arrayMax(humiAll)));
				humiMin = this.integerMin(Math.floor(this.arrayMin(humiAll)));
				humiMin = humiMin == undefined ? 0 : humiMin;
				if(humiMin < 20 ){
					humiMin = 0;
				} else {
					humiMin = 20;
				}

				// 图表y轴配置
				var yAxisData = [{
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
			        			}];
				if(data[0].ChannelNum == 1) {
					yAxisData = [{
						type: 'value',
        				name: '('+ sigleUnit +') ' + sigleName,
        				min: tempMin,
        				max: tempMax,
        				interval: TempInterVal,
        				axisLabel: {
        					formatter: '{value}'
        				},
        				splitNmuber: 5
					}]
				}

				
				console.log(chartData);
				
				// console.log(humiMax,humiMin)
				var legend = [];
				for(var i = 0;i<chartData.length;i++){
					legend.push(chartData[i].name);
				}
				var TempInterVal = (tempMax - tempMin )/5;
				var HumiInterVal = (humiMax - humiMin )/5;
				// console.log(chartData);
				this.$nextTick(function () {
			        this.chartLine = echarts.init(document.getElementById('humitureData'), 'shine');
			        	this.chartLine.setOption({
			        		tooltip: {
			        			trigger:'axis',
			        			axisPointer: {
			        				type:'',
			        				crossStyle: {
			        					color: '#666'
			        				}
			        			},
			        			formatter:function(params){
	                   			  	// console.log(params);
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
			        		grid:{
			        			right: '20%',
			        			left: '5%'
			        		},
			        		toolbox: {
			        			itemSize: 25,
					            width: '20%',
					            right: '25%',
					            show: false,
					            feature: {
					                dataZoom: {
					                    yAxisIndex: 'none'
					                },
					                restore: {},
					                saveAsImage: { show: false }
					            }
			        		},
			        		legend: {
			        			align: 'left',
			        			orient: 'vertical',
			        			right: '0',
			        			top: '5%',
			        			data: legend
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
			        		yAxis: yAxisData,
			        		series:chartData,
			        		// color:this.turehumiColor
			        	},true)
			    })
			},
			get_Data_Instrument: function(){
				this.CanCel();     //  清除弹框
				this.loading = true;   // 打开loading 事件
				/**
				 * 判断选择的类型是否统一
				 */
				 // console.log('----jinlai--');
				let chooseSn = this.checkedProduct;
				// this.checkedSn = [];  // 清空
				let verId = [];

				for( var i = 0; i < chooseSn.length; i++){
					// console.log(chooseSn[i])
					// console.log(this.analysisSn(chooseSn[i]));
					this.checkedSn.push(this.analysisSn(chooseSn[i]).sn);
					verId.push(this.analysisSn(chooseSn[i]).verId);
				}
				// console.log(this.checkedSn);
				verId = new Set(verId); // 去重；
				let myVerId = [];
				for( let item of verId ){
					myVerId.push(item);
				}
				// console.log(String(myVerId[0]));
				// console.log(this.chooseSheBeiVerId)
				// 不是统一类型，给出提示；
				if( myVerId.length > 1 ){
					this.loading = false;
					this.open_Warning('请选择同一类型的仪器！！！', 'error');
				}else if(this.chooseSheBeiVerId !== null && String(myVerId[0]) !== this.chooseSheBeiVerId) {
					this.hidd_show_boxL_true();
					this.open_Warning('参考设备和选择的设备类型不同！！！','error');
					this.loading = false;
					this.OFdataloading = false;
				}else if(new Date(this.S_value_data).getTime() <= new Date(this.N_value_data).getTime() ){  // 判断是否选择仪器 & 时间
					// 判断是否选择仪器
					if(this.checkedSn.length == 0){
						this.loading = false;
						this.open_Warning('请选择仪器！！！', 'error');
					} else {
						this.checkedSn = Array.from(new Set(this.checkedSn));
						// 数组转换字符串
						this.shebeiArr = this.checkedSn.join(',');
						// this.checkedSn = [];
						// 发送给后台的数据
						this.potDate = {  //  传到后台的必须参数
				            'beginTime': this.formatDate(this.S_value_data),
				            'endTime': this.formatDate(this.N_value_data),
				            'sn': this.shebeiArr
			          	};
			          	// console.log(this.potDate);
			          	// console.log(this.chooseSheBeiSn);
			          	// this.checkedProduct = [];  // 清空
			          	TabMulti(this.potDate).then( data => { // 表格数据
			          		// console.log(data);
			          		this.addTab_data(data);
			          	});
			          	if( this.chooseSheBeiSn !== null &&  this.chooseSheBeiSn.length !== 0){  // 判断有没有选择参考设备
			          		let params = {
			          			'beginTime': this.formatDate(this.S_value_data),
					            'endTime': this.formatDate(this.N_value_data),
					            'sn': this.chooseSheBeiSn
			          		};
			          		this.chooseReferenceData = [];
			          		MultiData(params).then( res => {
			          			console.log('参考设备');
			          			console.log(res);
			          			if( res == [] || res.length == 0 ) {
			          				this.loading = false;
			          				this.open_Warning('选择的参考设备没有数据请重新选择！！！','error');
			          			}
			          			this.chooseReferenceData = res[0].data;
			          			this.getMultiData();
			          		})
				        } else {
				        	// console.log('请求数据');
				        	this.getMultiData();
				        }
						
					}
				}else{
					// console.log(0);
					this.hidd_show_boxL_true();
					this.open_Warning('警告！请保证时间和仪器都已经正确选择！！','error');
					this.loading = false;
					this.OFdataloading = false;
				}
			},
			getMultiData(){
				// console.log(this.potDate);
				MultiData(this.potDate).then( res => {
					// this.checkedProduct = [];
					console.log('----多数据在此-----');
					console.log('--数据分析修改---');
					// console.log(new Date());
					console.log(res);
					// console.log(new Date().getTime());
					this.ChartLineColorName = []; 
					if(res !== [] && res !== '' && res !== null && res.length !== 0){
	          			this.tabShow = true;
	          			/**
	          			 * 去除没有数据的（）
	          			 */
	          			
	          			let removeEmptyData = res;
	          			res = [];
	          			for( var i = 0; i < removeEmptyData.length; i++ ) {
	          				// console.log(removeEmptyData[i] !== []);
	          				if( removeEmptyData[i] !== []  && removeEmptyData[i].length !== 0) {
	          					res.push(removeEmptyData[i]);
	          				}
	          			}
	          			console.log(removeEmptyData);
	          			/**
	          			 * 转化数据
	          			 */
	          			var sortData = this.bubbleSort(res);  // 把数据按长度排序，最长的在后面
						var dataMaxLength = sortData[sortData.length - 1];//最长的数组
						var data = res;
						data = data.sort(function(a, b){  // 按名字排序
							if(a.length > 0 && b.length > 0){
								return (a[0].IName).localeCompare(b[0].IName);
							};
							return ;
							
						});
						/**
						 * 判断多数据是否需要补数据
						 * @param  {[type]} data.length >             1 [description]
						 * @return {[type]}             [description]
						 */
						if ( this.chooseSheBeiSn !== null ){  // 如果选择参考设备
							console.log('选择设备补数据');
							this.isIdentical = false;
							for (var i = 0; i < data.length; i++) {
								if(this.chooseReferenceData.length !== data[i].data.length ){
									for (var j = 0; j < this.chooseReferenceData.length; j++) {

										if( data[i].data[j] ){
											var buData = data[i].data;
											if(Date.parse(new Date((this.chooseReferenceData[j].ITime).replace('-', '/'))) < Date.parse(new Date((buData[j].ITime).replace('-', '/'))) ){
												buData.splice(j, 0, {
													'Ch1': this.chooseReferenceData[j].Ch1,
													'Ch2': this.chooseReferenceData[j].Ch2,
													'Ch3': this.chooseReferenceData[j].Ch3,
													'Ch4': this.chooseReferenceData[j].Ch4,
													'ITime': this.chooseReferenceData[j].ITime
												})
											}else if(Date.parse(new Date((this.chooseReferenceData[j].ITime).replace('-', '/'))) > Date.parse(new Date((buData[j].ITime).replace('-', '/')))){
												this.chooseReferenceData.splice(j, 0, {
													'Ch1': '-',
													'Ch2': '-',
													'Ch3': '-',
													'Ch4': '-',
													'ITime': data[i].data[j].ITime
												})
											} else {
												if( buData[j].Ch1 == 0 ) {
													buData[j].Ch1 = this.chooseReferenceData[j].Ch1;
													buData[j].Ch2 = this.chooseReferenceData[j].Ch2;
													buData[j].Ch3 = this.chooseReferenceData[j].Ch3;
													buData[j].Ch4 = this.chooseReferenceData[j].Ch4;
												}
											}
										} else {

											
											data[i].data.splice(j, 0, {
												'Ch1': this.chooseReferenceData[j].Ch1,
												'Ch2': this.chooseReferenceData[j].Ch2,
												'Ch3': this.chooseReferenceData[j].Ch3,
												'Ch4': this.chooseReferenceData[j].Ch4,
												'ITime': this.chooseReferenceData[j].ITime
											})
										}
										
									}
								}
							}
						} else {// 没有选择参考设备
							console.log('没选择设备补数据');
							if(data.length > 1){
								this.isIdentical = false;
								for(var i = 0; i<data.length; i++){
									if(data[0].data.length !== data[i].data.length){
										this.isIdentical = true;  // 开启补数据
										// this.isIdentical = false;
										break;
									}
								}
							}
						}
						
						// 补数据
						if(this.isIdentical){
							// console.log('bushuju')
							// 补数据
							// var lastNum = false;
							for(var i = 0,len = dataMaxLength.data.length; i<len; i++){
								// console.log(dataMaxLength[i]);
								

								for(var j = 0; j < data.length;j++){
									
									// console.log(data[j][i])
									if(data[j].data[i]){
										var MaxDataDate = Date.parse(new Date(this.getHoursDate(dataMaxLength.data[i].ITime)));
										var buDataDate = Date.parse(new Date(this.getHoursDate(data[j].data[i].ITime)));
										// console.log(Date.parse(new Date((dataMaxLength[i].ITime).replace('-', '/'))));
										if( MaxDataDate !== buDataDate){
											
											if(MaxDataDate < buDataDate){
												data[j].data.splice(i, 0, {
													'Ch1': '-',
													'Ch2': '-',
													'Ch3': '-',
													'Ch4': '-',
													'ITime':dataMaxLength.data[i].ITime
												});
												
											} else {
												dataMaxLength.data.splice(i, 0, {
													'Ch1': '-',
													'Ch2': '-',
													'Ch3': '-',
													'Ch4': '-',
													'ITime':data[j].data[i].ITime
												});
												// lastNum = true;
												
												// console.log(i+ 'i');
												// i = i - 1 < 0 ? 0 : i-1;
												len += 1;
												j = -1;
												// continue;

												
											}
											
										}
									} else {
										console.log(i);
										data[j].data.splice(i, 0, {
											'Ch1': '-',
											'Ch2': '-',
											'Ch3': '-',
											'Ch4': '-',
											'ITime':dataMaxLength.data[i].ITime
										})
									}
									
								}
							}
						}
						console.log(dataMaxLength)
						// console.log(JSON.stringify(data));
	          			this.humitureChart(data);
	          			this.ChartLineColorName = [];
	          			this.MaxDataChatLine = data[0].ChannelNum; //通道的数量
	          			
	          			let allChartData = [];
	          			// let _date = []; 
	          			// let max = [];
	          			// let min = [];
          				for ( let [key, item] of Object.keys(data) ) {  // 遍历几台设备
          					// console.log(key);
          					// console.log(data[key]);
          					allChartData.splice(key, 1, {
          						name: '',                        // 通道名称
          						shebeiName: data[key].IName,     // 设备名称 
          						data: [],						 // 通道数据
          						date: []						 // 通道时间
          					});
          					let _chartData = [];
          					for( let val of data[key].data){
          						// console.log(val);
          						allChartData[key].date.push(val.ITime);  // 添加通道时间
          						for( let i = 0; i < this.MaxDataChatLine; i++ ) {
          							// console.log(i);
          							let idx = i + 1;
          							if(allChartData[key].data[i]){
          								allChartData[key].data[i].data.push(eval('val.Ch'+ idx ));
          							
          							} else {
          								allChartData[key].data.splice(i, 1, {
          									'name': eval('data[key].Ch'+ idx +'Name' ),
          									'wayName': eval('data[key].Ch'+ idx +'NumName'),
          									'data': [eval('val.Ch'+ idx )],
          									'unit': eval('data[key].Ch'+ idx +'Unit')
          								})
          							}
          						}
          					};
          					// max.push(Math.ceil(this.arrayMax(_data)))
          					


	          			}
	          			// console.log(allChartData);
	          			for(var i = 0; i < this.MaxDataChatLine; i++) {
	          			
	          				var dragChart = [], TilTND = '', date = '', dataMax = [], dataMin = [], buler ='150%', yAxis_Name = '';
	          				if( i == 0 ){
	          					buler = '80%'
	          				}
	          				this.ChartLineColorName = [];
	          				for( var j = 0; j < allChartData.length; j++) {
	          					// console.log(allChartData[j]);
	          					TilTND = allChartData[j].data[i].wayName; // 通道
	          					date = allChartData[j].date;  // 时间
	          					yAxis_Name = '('+allChartData[j].data[i].unit +')'+ ' ' + allChartData[j].data[i].name;
	          					// console.log(allChartData[j].data[i].data);
	          					dataMax.push(Math.ceil(this.arrayMax(allChartData[j].data[i].data)));
	          					dataMin.push(Math.floor(this.arrayMin(allChartData[j].data[i].data)));
	          					this.ChartLineColorName.push(allChartData[j].shebeiName);
	          					dragChart.push({
	          						'type': 'line',
	          						'name': allChartData[j].shebeiName,
	          						'smooth' : false,
	          						'symbol':'none',
	          						'data': this.isIdentical ? this.breakpoint(allChartData[j].data[i].data) : allChartData[j].data[i].data,
	          						'lineStyle':{'normal':{'width': this.lineStyleWidth}}
	          					})
	          					// max = Math.ceil(max);
	          					// min = Math.floor(min);
	          				}
	          				
	          				/**
	          				 * 参数1：
	          				 */
	          				// console.log(dragChart);
	          				// console.log(dataMax);
	          				// console.log(dataMin);
	          				this.ChartLine(i, '', date, dragChart, '', yAxis_Name, TilTND, Math.ceil(this.arrayMax(dataMax)), Math.floor(this.arrayMin(dataMin)), buler );
	          				this.loading = false;
	          				// console.log(new Date());
	          				
	          			}
	          			this.ChartLineColorNum(res.length);
	          			
	          			this.hidd_show_boxL_false();
	          			// console.log(allChartData);
	          			this.OFdataloading = true;
	          			// console.log(JSON.stringify(allChartData))
	          			// console.log(new Date());
	          		}else {
	          			this.hidd_show_boxL_true();
	          			this.loading = false;
	          		}
		
				})
			},
			getHoursDate(str) {
				var date = new Date(str);
				var year = date.getFullYear();
				var Month = date.getMonth() + 1;
				var day = date.getDate();
				var H = date.getHours();
				return year + '/'+ Month + '/' + day + ' ' + H + ':00:00';
			},
			bubbleSort(arr){
				var len = arr.length;
			    for (var i = 0; i < len; i++) {
			        for (var j = 0; j < len - 1 - i; j++) {
			            if (arr[j].data.length > arr[j+1].data.length) {        //相邻元素两两对比
			                var temp = arr[j+1];        //元素交换
			                arr[j+1] = arr[j];
			                arr[j] = temp;
			            }
			        }
			    }
			    return arr;
			},
			arrayMax:function(arr){
				// console.log(arr);
				var max = arr[0] == '-'?0:arr[0];
				for(var i = 1; i < arr.length; i++){
				  if( max < Number(arr[i]) ){
				    max = 	Number(arr[i]);
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
			outDataMultiAll:function(){
				multiDataOutExl(this.potDate).then(res => {
					// console.log(res);
					window.open(res);
				})
				// window.open('http://192.168.1.220:8080/api/LogsAll/GetContrastExportExcel?beginTime='+this.formatDate(this.S_value_data)+'&endTime='+this.formatDate(this.N_value_data)+'&sn='+this.shebeiArr)
			},
			html2CanvasMultiAll:function(){
				var _this = this;
		        // html2canvas(document.getElementById('#canvas_html_img')).then(function(canvas) {
		        //   document.body.appendChild(canvas);
		        // });
		        // console.log(document.getElementById('canvas_html_img'))
		        var hh = $('#canvas_html_img').height();
		        var zhantingName;
	            var zhantingGroup = this.$store.state.overViewName;
	    		var zhantingId = this.$store.state.zhantingID;
	    		for (var i = 0; i < zhantingGroup.length; i++) {
		    		if(zhantingGroup[i].GROUP_ID == zhantingId) {
		    			zhantingName = zhantingGroup[i].GROUP_NAME;
		    			break;
		    		}
	    		};
	    		// console.log(hh);
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
				    saveImg(canvas,filename)
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
			},
			addTab_data: function(data){ // 通道数据处理
		        // console.log(data)
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
		          	this.hidd_show_boxL_true();
		          	this.loading = false; 
		          	// this.alertMasg('该段时间无数据,请重新选择!','warning');
		        }
	      	},
	      	open_Warning: function(txt,Type){
		        // console.log(this)
		        this.$alert(txt, '警告', {
		          confirmButtonText: '确定',
		          callback: action => {
		            this.$message({
		              type: Type,
		              message: `查询失败!!!`
		            });
		          }
		        });
	      	},
	      	ChartLineColorNum: function(num){
	      		// console.log(this.checkedSn.length);
	      		this.ChartLineColorNumber = num;
	      		this.checkedSn = [];
	      	},
			data_Bigin: function(data){ // 开始时间转化
		        // this.S_value_data = data;
		        // console.log(data);
	      	},
	      	data_End: function(val){ // 结束时间转化
	      		// console.log(val);
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
	      		// console.log(val);
				var date = new Date(val);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0'+m : m;
				var d = date.getDate();
				d = d < 10 ? ('0'+ d) : d;
				var h = date.getHours();
				var minute = date.getMinutes();
				minute = minute < 10 ? ('0'+minute) : minute;
				return y +  '/' + m + '/'+d+ ' '+ h + ":"+minute ;
			},
			analysisSn(str){
				// console.log(str);
		      	var reg = /(\w*)\/(\d*)/;
		      	var sn =str.match(reg);
		      	// console.log(sn);
		      	if(sn !== null) {
		      		return {sn:sn[1],verId: sn[2]};
		      	}
		      	
		      	return false;
		    },
			handleCheckAllChange(ev){
				// console.log(ev.target.checked);
				this.checkedProduct = ev.target.checked ? this.AssFiedSn : [];
				this.isIndeterminate = false
			},
			CheckedArray: function(value){
				// console.log(this.checkedProduct,data)
				// console.log(value);
				let checkedSn = value.length;
				this.checkAll = checkedSn === this.AssFiedSn.length;
				// console.log(checkedSn);
				// console.log(this.AssFiedSn.length);
				this.isIndeterminate = checkedSn > 0 && checkedSn < this.AssFiedSn.length;
			},
			ClearChecked: function(){ // 清空所有的选中数据
				this.checkedProduct = [];
				this.checkedSn = [];
			},
			hidd_show_boxL_false:function(){
				$('.hid_content').removeClass('active');
				this.showhied_TF = false;
			},
			hidd_show_boxL_true:function(){
				$('.hid_content').addClass('active');
				this.showhied_TF = true;
			},
			AddDataQuery: function(){  // 显示选择框
				$('.fixed_pos_dadaMuilt').addClass('active');
				// console.log(this.$store.state.NewID)
			},
			CanCel: function(){  // 隐藏选择框
				$('.fixed_pos_dadaMuilt').removeClass('active');
				this.chooseContShow = false;
			},
			integerMax: function(max){
				// var isTrue = bool == undefined ? true : bool;
				// console.log(isTrue);
				// console.log('-----max----'+ max);
				if(max) {
					if(max%5 == 0){
						// console.log(max);
						return max;
					}else{
						max++;
						return this.integerMax(max);
					}
				}
			},
			integerMin: function(max, bool){
				var isTrue = bool == undefined ? true : bool;
				// console.log(isTrue);
				// console.log('-----max----'+ max);
				if(max) {
					
					if(max%5 == 0){
						// console.log(max);
						return max;
					}else{
						max--;
						return this.integerMin(max);
					}
					
					
				}
			},
			ChartLine: function(i,name,xAxis_data,yAxis_Adata,xAxis_Name,yAxis_Name,TilTND,Max,Min,buler){
				// console.log(xAxis_Name);
				
				// console.log(Max);
		        // console.log(Min);
				Max = this.integerMax(Max);
				Min = this.integerMin(Min);
		        // console.log(Max);
		        // console.log(Min);
		       var mean = Max - Min;
		       var interval = mean/5;
		        // console.log(JSON.stringify(yAxis_Adata));
		        // i ChOName IName ITime ChO data ChOUnit
		        // console.log(echarts.getInstanceById($('#Chart' + (i + 1)).attr('_echarts_instance_')));
		        // 基于准备好的dom，初始化echarts实例
		        this.$nextTick(function () {

			        this.chartLine = echarts.init(document.getElementById('Chart' + (i + 1)), 'infographic');
			        this.chartLine.setOption({
			              title: {
				              text: TilTND,
				              textStyle:{
				              	color: '#666',
				              	// fontStyle: '',
				              	fontSize: '14',
				              	fontWeight: '600',
				              	fontFamily: 'Microsoft YaHei'
				              },
				              textAlign: 'center',
				              left: '50%',
				              top: '0%'
				          },
				          tooltip: {
				              trigger: 'axis',
				              backgroundColor: 'rgba(0,0,0,0.7)',//背景颜色（此时为默认色）
				              position: function (point, params, dom, rect, size) {
	                           // 位置回调
	                           // console.log(point,  size);
	                           if( point[0] > (size.viewSize[0]) / 2 ){
	                           		return [point[0] - size.contentSize[0] - 10, point[1] - 10];
	                           }else{
	                           		return [point[0] + 10, point[1] - 10];
	                           }
	                           // return point;
                   			  },
                   			  formatter:function(params){
                   			  	// console.log(params);
                   			  	var date = params[0].axisValue;
                   			  	var date_before = date.split('\n')[0];
				          		var date_after = date.split('\n')[1];
                   			  	var temp =  date_after +' '+ date_before + '<br />';
                   			  	for(var i = 0; i < params.length; i++){
                   			  		var data = params[i].data;
                   			  		// console.log(typeof(data))
                   			  		if(data.toString().indexOf('.') != -1){
                   			  			var folatLength = data.toString().split('.')[1].length;
	                   			  		if(typeof(data) == 'number' ){
	                   			  			temp += '<span style="display:inline-block;margin-right:5px;width:15px;height:10px;background-color:'+ params[i].color +'"></span>'+params[i].seriesName+': - <br />';
	                   			  		}else{
	                   			  			temp += '<span style="display:inline-block;margin-right:5px;width:15px;height:10px;background-color:'+params[i].color +'"></span>'+ params[i].seriesName+': '+params[i].data+'<br />';
	                   			  		}
                   			  		}else{
                   			  			temp += '<span style="display:inline-block;margin-right:5px;width:15px;height:10px;background-color:' + params[i].color + '"></span>' + params[i].seriesName+': '+ params[i].data + '<br />';
                   			  		}
                   			  		
                   			  	}
                   			  	return temp;
                   			  }
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
				                  bottom: '0',
				                  showDetail:false
				              }
				          ],
				          legend: {
				              data: name,
				              top: '5%',
				              left: '5%',
				          },
				          grid: {
				              left: '8%',
				              right: '8%',
				              top:'25%',
				              bottom: '8%',
				              containLabel: false,
				              height: '60%',
				              tooltip:{
				              	axisPointer:{
						          	lineStyle:{
						          		width:'1'
						          	}
					          	}
				              }
				              
				          },
				          color:this.ChartLineColor,
				          calculable : true,
				          // lineWidth:2,
				          xAxis: {
				          	splitLine: {show: true},
				          	// axisLine: {onZero: false},
				            type: 'category',
				            boundaryGap: false,
				            // max: 'dataMax',
				            name: xAxis_Name,
				            nameTextStyle: {
				              color: '#666',
				              fontStyle: '黑体'
					        },
				          	data: xAxis_data.map(function (str) {
				          			var str_before = str.split(' ')[0];
				          			var str_after = str.split(' ')[1];
				          			return str_after + '\n' + str_before;
					                // return str.replace(' ', '\n')
					           }),
				          	// interval: xAxis_data/6,
				          	axisLabel: {
				          		interval: function(idx){
				          			// console.log('-----axisLabel--'+idx);
				          			var dataLength = xAxis_data.length;
				          			return (idx === dataLength - 1) || (idx%(Math.ceil(dataLength/6)) === 0);
				          		}
				          		
				          	},
				          	splitNmuber: 6   // 分割段数
				          },
				          yAxis: {
				          	  splitLine: {show: true},
				          	  // axisLine: {onZero: false},
				              type: 'value',
				              show: 'true',
				              interval: interval,
				              name: yAxis_Name,
				              max: Max,
				              min: Min,
				              splitNumber: 5   // 分割段数
				          },
				          series: yAxis_Adata,
				          progressiveThreshold: 1000    // 渐进式渲染
			        },true);
					
			        this.chartLine.group = "groupMulti";
			        echarts.connect('groupMulti'); // 设置联动数据 
			    })
				// console.log(this.chartLine);
		        // console.log(array)
	      	},
			potDateID: function() {// 可定义成全局函数
		        // 获取展厅的id
		        var zhantingID = this.$store.state.zhantingID;
		        // 将id传到后台并获取仪器数据列表
		        var potDateID_arry = {'groupID': zhantingID};
		        Data_Instrument(potDateID_arry).then(rel => {
		          	// console.log(rel)
		          	this.AssFied = [];
		          	this.AssFiedSn = [];
		          	if( rel != null && rel != '' ){
		          		this.AssFied = [];  // 清空数据
			          	for (var i = 0; i < rel.length; i++) {
			          		this.AssFiedSn.push(rel[i].sn + '/' + rel[i].VER_ID);
			          		this.AssFied.push({
			          			'value': rel[i].name,
			          			'label': rel[i].sn + '/' + rel[i].VER_ID
			          		})
			          	}
			          	// console.log(this.checkedProduct)
			          	// this.checkedProduct = [];
			          	// this.checkedProduct.push(rel[0].sn)
			          	// console.log(this.checkedProduct)
			          	// this.get_Data_Instrument();
			          }else{
			          	
				        // this.$message({
				        // 	type:'warning',
				        // 	message:'该展厅暂无仪器可查！请重新选择展厅！'
				        // })
			          }
		        })
	      	},
	      	chaert_Line_Milued: function(){

	      	},
	      	formatDate:function(value) {
      		 	var date = new Date(value);
          		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+' '+ date.getHours()+':'+date.getMinutes();
	      	},
	      	windowResize(){
                var ww = $(document).width();
                // console.log($('.content-container'));
                // $('.content-container').width(1800);
                var hh = $(document).height();
                // console.log(hh);
                $('.content-container').width(ww - 201 );
                $('.content-wrapper').css({'height': hh-90-32, 'overflow-y':'auto'});
                $('#canvas_html_img').height(hh-90-32-42-12);
                this.twoChannelWidth = (ww-201-20)*0.875 + 'px';
                this.threeChannelWidth = (ww-201-20-20)*0.875/2 + 'px';
                this.humitureWidth = (ww-201-20) + 'px';
                // console.log(this.threeChannelWidth)
            }	
		},
		mounted:function(){

			this.$nextTick(function(){this.potDateID();});
			this.windowResize();
			let _this = this;
		      this.$store.watch(
		        function(state) {
		          return state.zhantingID;
		          // return state.NewID;
		        },
		        function() {
		          // _this.data_Updata();
		          _this.potDateID();
		          _this.chooseSheBei = [];
		          _this.chooseSheBeiSn = null; // 清空参考设备
				  _this.chooseSheBeiVerId = null; // 清空参考设备的类型id
				  _this.chooseReferences = '选择参考设备';
		          // _this.checkedProduct = [];
		          // _this.ClearChecked();  // 清空以前的数据
		          // _this.get_Instrument();
		        }
		      );
		      window.onresize = function(){
		      	_this.windowResize();
		      }
		      // 获取数组最大值

		},
		activated(){
			if( this.$store.state.NewID != null && this.$store.state.NewID != '' ){
				this.checkedSn = [];  // 清空  只是查询单个设备 故清空
				this.chooseSheBeiSn = null; // 清空参考设备
				this.chooseSheBei = [];
				this.chooseSheBeiVerId = null; // 清空参考设备的类型id
				this.chooseReferences = '选择参考设备';
				this.checkedProduct = []; // 清空选择的
				this.checkedProduct = (this.$store.state.NewID).split(',');
				// this.checkedSn = (this.$store.state.NewID).split(',');
				console.log(this.checkedSn);
				// console.log(this.checkedProduct);
				// console.log(this.$store.state.NewID);
				// console.log(this.$store.state.startDate);
				// console.log(this.formatDateTime(this.S_value_data));
				// console.log(this.N_value_data);
				this.S_value_data = this.$store.state.startDate == null ? this.formatDateTime(this.S_value_data):this.formatDateTime(this.$store.state.startDate);
				this.N_value_data = this.$store.state.endDate == null ? this.formatDateTime(this.N_value_data) : this.formatDateTime(this.$store.state.endDate);
				this.$store.state.NewID = '';
				this.get_Data_Instrument();
			}else{
				if( this.checkedSn != null && this.checkedSn != '' ){
					if( !this.OFdataloading ){
						this.get_Data_Instrument();
					}else{
						console.log('已运行！')
					}
				}else{
					this.AddDataQuery(); // 设置默认弹窗事件
				}
			}
		}
	}
</script>
<style>
.chooseCont {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.7);
}
.chooseCont .myRadioBox  {
	width: 500px;
	height:240px;
	/*padding: 0 20px;*/
	position: absolute;
	top: 50%;
	/*right: 0;*/
	/*bottom: 0;*/
	left: 50%;
	transform: translate(-50%,-50%);
	background: #fff;
}
.myRadioBox  .header {
	width: 460px;
	height: 50px;
	line-height: 50px;
	/*color:#666;*/
	font-size: 15px;
	padding: 0 20px;
	text-align: center;
	border-bottom: 1px solid #ddd;
}
.chooseCont .myRadioBox .el-radio-group label{
	width: 140px;
	height: 28px;
	margin-right: 7px;
	overflow: hidden;
	line-height: 28px;
	font-size: 12px;
}
.myRadioBox .contenanier {
	padding: 0 20px;
	height: 140px; 
	max-height: 140px;
	overflow-y: auto;
}
.myRadioBox .footer {
	height: 44px;
	line-height: 44px;
	text-align: center;
	background: #eff3f8;
}
.el-radio+.el-radio {
	margin-left: 0;
}
.isHide{
	display: none;
}
#canvas_html_img .footer{
	/*position: fixed;*/
    /*bottom: 42px;*/
    margin: 20px 0;
    padding-left: 20px;
}
#canvas_html_img .footer button{
	float: left;
	margin-left: -2px;
	background: #fff;
	color:#333;
}
#canvas_html_img .footer button:first-child{
	border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
#canvas_html_img .footer button:last-child{
	border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
#canvas_html_img .footer .active{
	background: #6fb3e0;
    color: #fff;
}
.checkAll{
	margin-right: 15px;
}
	.checkAll .el-checkbox__label{
		font-size: 12px;
	}

	.checkAll .el-checkbox__input .el-checkbox__inner{
		width:14px;
		height:14px;
	}
	.checkAll .el-checkbox__input .el-checkbox__inner::after{
		    height: 6px;
    		left: 3px;
	}
	.wid_Checked>.el-checkbox__label{
		font-family: Microsoft YaHei;
		font-size: 12px;
		display: inline-block;
    	overflow: hidden;
    	height: 20px;
    	line-height: 25px;
    	width: 86%;
	}
	.wid_Checked .el-checkbox__inner::after{
	    height: 6px;
	    left: 2px;
	    top: -1px;
	    width: 3px;
	}
	.wid_Checked>.el-checkbox__input>.el-checkbox__inner{
		width: 10px;
		height: 10px;
		border-radius: 0;
	}
	.wid_Checked .el-checkbox__input.is-checked .el-checkbox__inner{
		background-color: #438eb9;
	    border-color: #438eb9;
	}
  	.el-date-editor.data_inPut_Pic.duo>input{
	  	height: 18px;
  	}
  	.el-date-editor.data_inPut_Pic>input{
		min-width: 140px;
	}
</style>
<style lang="scss" scoped>
.chooseConsult{
	width: 12px;
	height:12px;
	vertical-align: middle;
	background: url('../../../static/img/chooseshebei.png') no-repeat;
	// background:  #4db3ff;
}
	.fixed_pos_dadaMuilt{
		position: absolute;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.7);
		visibility: hidden;
		.poa_abx{
			width: 540px;
			// padding: 10px;
			height: 240px;
			// min-width: 20%;
			position: absolute;
			top: 0;
			left: 0;
			right:0;
			bottom:0;
			margin:auto;
			background: #fff;
			border-radius: 3px;
			box-shadow: 1px 1px 1px 1px rgba(0,0,0,.4);
			.pad_Search{
				padding: 18px 20px 12px 40px;
				border: 1px solid #ddd;
			}
			.TrueSelect{
				height: 44px;
			    background: #eff3f8;
			    text-align: center;
			    line-height: 44px;
			    .TrueSelect_false{
		    	    background-color: #abbac3;
				    border-radius: 0;
				    border: 0;
				    font-size: 12px;
				    color: #fff;
				    font-family: Microsoft YaHei;
				    height: 24px;
				    width: 64px;
			    }
			    .TrueSelect_true{
			    	background-color: #428bca;
				    border-radius: 0;
				    border: 0;
				    font-size: 12px;
				    color: #fff;
				    font-family: Microsoft YaHei;
				    height: 24px;
				    width: 64px;
			    }
			    .TrueSelect_clear{
		    	    background-color: #428bca;
				    border-radius: 0;
				    border: 0;
				    font-size: 12px;
				    color: #fff;
				    font-family: Microsoft YaHei;
				    height: 24px;
			    }
			}
			h2{
				margin: 0;
				font-size: 14px;
				font-weight: 500;
				i{
					padding-right: 5px;
					color: red;
				}
			}
			.box_Checked{
			    // max-height: 144px;
			    height:146px;
			    width: 100%;
			    overflow: auto;
			    ms-scrollbar-face-color: #fff;
			    ms-scrollbar-highlight-color: #fff;
			    ms-scrollbar-shadow-color: #3bb8ff;
			    scroll-arrow-color:#3bb8ff;
			   	-ms-scrollbar-track-color: #fff;
			   	-webkit-scrollbar-face-color: #fff;
			    -webkit-scrollbar-highlight-color: #fff;
			    -webkit-scrollbar-shadow-color: #3bb8ff;
			    scroll-arrow-color:#3bb8ff;
			   	-webkit-scrollbar-track-color: #fff;
			}
		}
	}
	.pad_Checked{
		padding: 5px 40px;
    	line-height: 25px;
	}
	.fot_MicYH{
		font-size: 12px;
		font-family: Microsoft YaHei;
		vertical-align: top;
	}
	.data_inPut_Pic{
		width: 140px;
		font-size: 12px;
	}
	.el-date-editor.data_inPut_Pic>input{
		min-width: 110px;
	}
	.wid_Checked{
		width: 33%;
		margin: 0;
	}
	.fixed_pos_dadaMuilt.active{
		visibility: visible;
	}
.fr_t{
	float: right;
	i{
		font-size: 12px;
		font-weight: 400;
		color: #5d5d5d;
		cursor:pointer;
	}
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
  .btn_pad{
  	padding: 12px 40px 0;
  }
  .btn_pad .goBack{
  		width: 30px;
  		height:30px;
  		float: right;
  		margin-right: 20px;
  		background: url('../../../static/img/icon.png') no-repeat;
        background-position: -19px -767px;
        cursor: pointer;
  }
  .box_pad_min{
  	padding: 0px 10px;
  }
  .box_size{
  	width: 15px;
  	height: 8px;
  	display: block;
  	display: inline;
  	display: inline-block;
  }
  .box_pad_max_h{
  	padding: 20px 0;
  	line-height: 15px;
  }
  .overText{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .font_size_min{
  	font-size: 12px;
  	// text-indent: .5em;
  	padding-left: 3px;
  }
  .btn_Search_all{
  	height: 18px;
  	font-size: 12px;
  	color: #fff;
  	border-radius: 0;
  	border: none;
  	line-height: 18px;
  	padding: 0;
  	text-align: center;
  	padding: 0 10px;
  }
  .hid_content{
  	display: block;
  }
  .hid_content.active{
  	display: none;
  }
  .null_data{
  	height: 300px;
  	width: 100%;
  	font-size: 12px;
  	color: #666;
  	text-align: center;
  	line-height: 300px;
  }
  #canvas_html_img{
  	background: #fff;
  	padding-top: 12px;
  }

</style>